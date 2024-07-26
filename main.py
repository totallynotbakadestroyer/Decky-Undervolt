import os
import subprocess
from time import sleep
from settings import SettingsManager #type: ignore
import decky_plugin

settingsDir = os.environ.get("DECKY_PLUGIN_SETTINGS_DIR")
settings = SettingsManager(name="settings", settings_directory=settingsDir)
defaultDir = os.environ.get("DECKY_PLUGIN_DIR")

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
        for key in DEFAULT_SETTINGS:
            if settings.getSetting(key) is None:
                settings.setSetting(key, DEFAULT_SETTINGS[key])
        if settings.getSetting("status") == 'Enabled':
            if(settings.getSetting("timeout_before_enable") is not None):
                sleep(settings.getSetting("timeout_before_enable"))
                Plugin.set_undervolt(self, settings.getSetting("cores"), False)

    async def check_ryzendj(self):
        if not os.path.exists(defaultDir + '/ryzenadj'):
            return False
        return True            

    async def install_ryzenadj(self):
        subprocess.run(['sudo', 'curl', '-L', 'https://github.com/Pososaku/Steam-Deck-Software-Undervolt/raw/main/home/deck/.local/bin/ryzenadj', '-o', defaultDir +'/ryzenadj'])   
        subprocess.run(['sudo', 'chmod', '+x', defaultDir + '/ryzenadj'])             

    def calculate_hex_value(core, value):
        core_shifted = hex(core * 0x100000)
        magnitude = hex(value & 0xFFFFF)
        combined_value = int(core_shifted, 16) + int(magnitude, 16)
        return hex(combined_value).upper()
    

    async def disable_undervolt(self):
        for core, value in enumerate([0, 0, 0, 0]):
            hex_value = Plugin.calculate_hex_value(core, value)
            subprocess.run(["sudo", "./ryzenadj", f"--set-coper={hex_value}"], cwd=defaultDir)
        settings.setSetting("status", 'Disabled');

    async def apply_undervolt(self, core_values, use_as_preset, app_id, app_name, save_core_values, timeout):
        if timeout is not None and timeout > 0:
            sleep(timeout)
        cores = [-value for value in core_values]
        for core, value in enumerate(cores):
            if value is not None:
                hex_value = Plugin.calculate_hex_value(core, value)
                decky_plugin.logger.debug('pre_undervokt')
                result = subprocess.run(
                    ["sudo", "./ryzenadj", f"--set-coper={hex_value}"],
                    cwd=defaultDir,
                    capture_output=True,
                    text=True
                )
                stdout = result.stdout
                stderr = result.stderr
                decky_plugin.logger.debug(stdout)
                decky_plugin.logger.debug(stderr)
        settings.setSetting("status", 'Enabled');
        if use_as_preset:
            presets = settings.getSetting("presets")
            for preset in presets:
                if preset["app_id"] == app_id:
                    presets.remove(preset)
            presets.append({"label": app_name, "value": core_values, "app_id": app_id})
            settings.setSetting("presets", presets)
        sleep(2)
        if save_core_values:
            settings.setSetting("cores", core_values)

    async def save_settings(self, newSettings):
        settings.setSetting("settings", newSettings)

    async def save_setting(self, key, value):
        settings.setSetting(key, value);

    async def get_setting(self, key):
        return settings.getSetting(key)
    
    async def reset_config(self):
        for key in DEFAULT_SETTINGS:
            settings.setSetting(key, DEFAULT_SETTINGS[key])
        return DEFAULT_SETTINGS

    async def fetch_config(self):
        config = {}
        for key in DEFAULT_SETTINGS:
            config[key] = settings.getSetting(key)
        return config    
    
    async def _update_status(status):
        settings.setSetting("status", status)     
