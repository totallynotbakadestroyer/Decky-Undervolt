import os
import subprocess
from asyncio import sleep
from settings import SettingsManager #type: ignore
import decky_plugin

settingsDir = os.environ.get("DECKY_PLUGIN_SETTINGS_DIR")
settings = SettingsManager(name="settings", settings_directory=settingsDir)
defaultDir = os.environ.get("DECKY_PLUGIN_DIR")

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

    async def init(self):
        decky_plugin.logger.info('Initializing plguin...')
        for key in DEFAULT_SETTINGS:
            if settings.getSetting(key) is None:
                decky_plugin.logger.info(f"Setting {key} to default value")
                settings.setSetting(key, DEFAULT_SETTINGS[key])   
        decky_plugin.logger.info('Plugin initialized')        

    def calculate_hex_value(core, value):
        core_shifted = hex(core * 0x100000)
        magnitude = hex(value & 0xFFFFF)
        combined_value = int(core_shifted, 16) + int(magnitude, 16)
        return hex(combined_value).upper()
    

    async def disable_undervolt(self):
        decky_plugin.logger.info('Disabling undervolt')
        for core, value in enumerate([0, 0, 0, 0]):
            hex_value = Plugin.calculate_hex_value(core, value)
            subprocess.run(["sudo", RYZENADJ_CLI_PATH, f"--set-coper={hex_value}"], cwd=defaultDir)
        settings.setSetting("status", 'Disabled');

    async def apply_undervolt(self, core_values, timeout):
        decky_plugin.logger.info(f'Applying undervolt with negative values: {core_values} and timeout: {timeout}')
        if timeout is not None and timeout > 0:
            await sleep(timeout)
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
                    decky_plugin.logger.info(f"RYZENADJ: {stdout}")
                if stderr:
                    decky_plugin.logger.error(f"RYZENADJ: {stderr}")
        settings.setSetting("status", 'Enabled')
        await sleep(2)
        decky_plugin.logger.info('Undervolt applied')

    async def save_preset(self, preset):
        decky_plugin.logger.info(f'Saving preset: {preset}')
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
        decky_plugin.logger.info('Preset saved')

    async def save_settings(self, newSettings):
        decky_plugin.logger.info(f'Saving settings: {newSettings}')
        settings.setSetting("settings", newSettings)

    async def save_setting(self, key, value):
        decky_plugin.logger.info(f'Saving setting: {key} with value: {value}')
        settings.setSetting(key, value);

    async def get_setting(self, key):
        decky_plugin.logger.info(f'Getting setting: {key}')
        return settings.getSetting(key)
    
    async def reset_config(self):
        decky_plugin.logger.info('Resetting config')
        for key in DEFAULT_SETTINGS:
            settings.setSetting(key, DEFAULT_SETTINGS[key])
        return DEFAULT_SETTINGS

    async def fetch_config(self):
        decky_plugin.logger.info('Fetching config')
        config = {}
        for key in DEFAULT_SETTINGS:
            config[key] = settings.getSetting(key)
        decky_plugin.logger.info(f'Config fetched: {config}')    
        return config    
    
    async def update_preset(self, preset):
        decky_plugin.logger.info(f'Updating preset: {preset}')
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
        decky_plugin.logger.info(f'Deleting preset with app_id: {app_id} from presets {presets}')
        for existing_preset in presets:
            if existing_preset["app_id"] == app_id:
                presets.remove(existing_preset)
        settings.setSetting("presets", presets)    
    
    async def _update_status(status):
        settings.setSetting("status", status)     
