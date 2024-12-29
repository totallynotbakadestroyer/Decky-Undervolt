import asyncio
import json
import os
import subprocess
from sys import stdout

import decky  # type: ignore
from settings import SettingsManager  # type: ignore

settingsDir = os.environ.get("DECKY_PLUGIN_SETTINGS_DIR")
settings = SettingsManager(name="settings", settings_directory=settingsDir)
defaultDir = os.environ.get("DECKY_PLUGIN_DIR")

GYMDECK2_CLI_PATH = "./bin/gymdeck2"
RYZENADJ_CLI_PATH = "./bin/ryzenadj"

DEFAULT_SETTINGS = {
    "presets": [],
    "cores": [5, 5, 5, 5],
    "status": 'Disabled',
    "settings": {
        "isGlobal": False,
        "runAtStartup": False,
        "isRunAutomatically": True,
        "timeoutApply": 15
    }
}


class Plugin:
    def __init__(self):
        self.gymdeck_monitor_task = None
        self.delay_task = None
        self.gymdeck_instance = None

    async def init(self):
        decky.logger.info('Initializing plugin...')
        for key in DEFAULT_SETTINGS:
            if settings.getSetting(key) is None:
                decky.logger.info(f"Setting {key} to default value")
                settings.setSetting(key, DEFAULT_SETTINGS[key])
        decky.logger.info('Plugin initialized')

    async def disable_undervolt(self):
        decky.logger.info('Disabling undervolt')
        self._cancel_task()
        for core, value in enumerate([0, 0, 0, 0]):
            hex_value = Plugin.calculate_hex_value(core, value)
            subprocess.run(["sudo", RYZENADJ_CLI_PATH, f"--set-coper={hex_value}"], cwd=defaultDir)
        settings.setSetting("status", 'Disabled')
        await decky.emit('server_event', {"type": 'update_status', "data": 'disabled'})

    async def apply_undervolt(self, core_values, timeout):
        decky.logger.info(f'Applying undervolt with negative values: {core_values} and timeout: {timeout}')

        if timeout is not None and timeout > 0:
            await decky.emit('server_event', {"type": 'update_status', "data": 'scheduled'})
            self.delay_task = asyncio.create_task(asyncio.sleep(timeout))
            try:
                await self.delay_task
            except asyncio.CancelledError:
                decky.logger.info('Delay task was cancelled')
                return

        cores = [-value for value in core_values]
        for core, value in enumerate(cores):
            if value is not None:
                hex_value = Plugin.calculate_hex_value(core, value)
                result = subprocess.run(
                    ["sudo", RYZENADJ_CLI_PATH, f"--set-coper={hex_value}"],
                    cwd=defaultDir,
                    capture_output=True,
                    text=True
                )
                stdout = result.stdout
                stderr = result.stderr
                if stdout:
                    decky.logger.info(f"RYZENADJ: {stdout}")
                if stderr:
                    decky.logger.error(f"RYZENADJ: {stderr}")
                    await decky.emit('server_event', {"type": 'update_status', "data": 'error'})
                    return

        settings.setSetting("status", 'enabled')
        await decky.emit('server_event', {"type": 'update_status', "data": 'enabled'})
        decky.logger.info('Undervolt applied')

    def _cancel_task(self):
        if self.delay_task:
            self.delay_task.cancel()
            self.delay_task = None

    async def save_preset(self, preset):
        decky.logger.info(f'Saving preset: {preset}')
        presets = settings.getSetting("presets")
        for existing_preset in presets:
            if existing_preset["app_id"] == preset["app_id"]:
                presets.remove(existing_preset)
        presets.append({
            "label": preset["label"],
            "value": preset["value"],
            "app_id": preset["app_id"],
            "timeout": preset["timeout"],
            "use_timeout": preset["use_timeout"]
        })
        settings.setSetting("presets", presets)
        decky.logger.info('Preset saved')

    async def save_settings(self, newSettings):
        decky.logger.info(f'Saving settings: {newSettings}')
        settings.setSetting("settings", newSettings)

    async def save_setting(self, key, value):
        decky.logger.info(f'Saving setting: {key} with value: {value}')
        settings.setSetting(key, value);

    async def get_setting(self, key):
        decky.logger.info(f'Getting setting: {key}')
        return settings.getSetting(key)

    async def reset_config(self):
        decky.logger.info('Resetting config')
        for key in DEFAULT_SETTINGS:
            settings.setSetting(key, DEFAULT_SETTINGS[key])
        return DEFAULT_SETTINGS

    async def fetch_config(self):
        decky.logger.info('Fetching config')
        config = {}
        for key in DEFAULT_SETTINGS:
            config[key] = settings.getSetting(key)
        decky.logger.info(f'Config fetched: {config}')
        return config

    async def update_preset(self, preset):
        decky.logger.info(f'Updating preset: {preset}')
        presets = settings.getSetting("presets")
        for existing_preset in presets:
            if existing_preset["app_id"] == preset["app_id"]:
                existing_preset["label"] = preset["label"]
                existing_preset["value"] = preset["value"]
                existing_preset["timeout"] = preset["timeout"]
                existing_preset["use_timeout"] = preset["use_timeout"]
        settings.setSetting("presets", presets)

    async def delete_preset(self, app_id):
        presets = settings.getSetting("presets")
        decky.logger.info(f'Deleting preset with app_id: {app_id} from presets {presets}')
        for existing_preset in presets:
            if existing_preset["app_id"] == app_id:
                presets.remove(existing_preset)
        settings.setSetting("presets", presets)

    async def _update_status(status):
        settings.setSetting("status", status)


    async def start_gymdeck(self, dynamic_settings):
        await self.stop_gymdeck()

        decky.logger.info("Starting Gymdeck in dynamic run mode...")

        settings.setSetting("status", "DYNAMIC RUNNING")
        await decky.emit('server_event', {
            "type": 'update_status',
            "data": 'dynamic_running'
        })

        strategy_map = {
            "MANUAL": "manual",
            "AGGRESSIVE": "aggressive",
            "DEFAULT": "default"
        }
        strategy = strategy_map.get(dynamic_settings.get("strategy", "DEFAULT"), "default")

        language = str(dynamic_settings.get("language", "en"))
        sample_interval = str(dynamic_settings.get("sampleInterval", 50000))

        cores = dynamic_settings.get("cores", [])
        core_args = []
        for c in cores:
            core_args.append(str(c.get("maximumValue", 35)))
            core_args.append(str(c.get("minimumValue", 25)))
            core_args.append(str(c.get("threshold", 40.0)))

        manual_points_args = []
        for c in cores:
            manual_points_json = json.dumps(c.get("manualPoints", []))
            manual_points_args.append(manual_points_json)

        # Final list of args to pass to the CLI
        args = [
            'sudo',
            GYMDECK2_CLI_PATH,
            language,
            strategy,
            sample_interval,
            *core_args,
            *manual_points_args
        ]

        decky.logger.info(f"Gymdeck will be launched with arguments: {args}")


        try:
            self.gymdeck_instance = await asyncio.create_subprocess_exec(
                *args,
                cwd=defaultDir,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                text=False,
            )
        except Exception as e:
            decky.logger.error(f"Failed to start Gymdeck: {e}")
            settings.setSetting("status", "disabled")
            await decky.emit('server_event', {"type": 'update_status', "data": 'disabled'})
            return

        self.gymdeck_monitor_task = asyncio.create_task(self._monitor_gymdeck_output())

    async def stop_gymdeck(self):
        if self.gymdeck_monitor_task:
            self.gymdeck_monitor_task.cancel()
            self.gymdeck_monitor_task = None

        if self.gymdeck_instance and self.gymdeck_instance.returncode is None:
            decky.logger.info("Terminating Gymdeck process...")
            self.gymdeck_instance.terminate()
            try:
                await asyncio.wait_for(self.gymdeck_instance.wait(), timeout=5)
            except asyncio.TimeoutError:
                decky.logger.warning("Gymdeck did not exit in time; killing...")
                self.gymdeck_instance.kill()

        self.gymdeck_instance = None

        settings.setSetting("status", "disabled")
        await decky.emit('server_event', {"type": 'update_status', "data": 'disabled'})

    async def _monitor_gymdeck_output(self):
        decky.logger.info("Monitoring Gymdeck output...")
        # only write every 50 lines to avoid spamming the log
        line_count = 0

        try:
            while True:
                if self.gymdeck_instance.stdout and not self.gymdeck_instance.stdout.at_eof():
                    line_count += 1
                    line = await self.gymdeck_instance.stdout.readline()
                    if line and line_count % 25 == 0:
                        decky.logger.info(f"GYMDECK: {line.rstrip()}")
                        line_count = 0

        except asyncio.CancelledError:
            decky.logger.info("Gymdeck monitoring task was cancelled.")
            raise

        finally:
            decky.logger.info("Gymdeck process ended or was terminated.")
            settings.setSetting("status", "disabled")
            await decky.emit('server_event', {"type": 'update_status', "data": 'disabled'})
            self.gymdeck_instance = None
            self.gymdeck_monitor_task = None        
