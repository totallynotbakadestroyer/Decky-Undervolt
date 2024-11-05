# Decky-Undervolt

<img style="height: 100%; object-fit: contain" src="./assets/preview.jpg" />

Decky-Undervolt is a Decky Loader plugin that allows you to undervolt your Steam Deck without any pain using [ryzenadj](https://github.com/FlyGoat/RyzenAdj).

## Future Plans

- [x] Preset management
- [ ] Dynamic undervolt adjustment based on CPU load

## Usage

### Plugin Setup

1. Open the plugin menu.
2. Click on the gear icon (settings).
3. In the “Settings” section, the following interface will open:
   There will be three checkboxes and two buttons:
   - Use Globally - Undervolting will continue work after the game is closed.
   - Run With Game - Undervolting will be automatically applied with game.
   - Run at Startup - Undervolting automatically starts with system, after a timeout period. Timeout can be customized.
   - Reset Config - Reset the settings to default. Deletes saved presets.
   - Save Settings - Applies changes in the “Settings” section.
   - Select the modes you want and click the “Save Settings” button.

#### Using the Plugin

1. Open the plugin menu.
2. Check the undervolt status at the top of the screen - “Undervolt Status”.
3. Preset Manager will allow you to edit the already saved presets without starting the game.
4. Use the “Use only for” checkbox to save undervolting settings only for a specific game as a preset.
   - You might want to set timeout if game is launched through 3rd party launcher. Keep in mind that this setting is only avaiable when "run with game" option is turned on in settings.
5. Adjust the undervolting (Curve Optimizer) step for each core using the Core 0/1/2/3 sliders.
6. After setting the undervolt, click the “Save & Apply” button to save changes.
7. The “Reset” button resets the undervolt values to their initial settings.
8. The “Disable” button disables the undervolt.

#### Recommendations for Selecting Values

1. If you want to use undervolting globally, do not set values lower than -20/-25.
2. Configure undervolting individually for each game.
3. Pay attention to the CPU usage intensity in each game:
   - If a game heavily utilizes the CPU, you can try setting a bigger step.
   - If your device freezes after enabling undervolting, reduce the values.

## Compatibility

Tested only on SteamOS, probably will work anywhere else if installed on Steam Deck except for Windows.

Issues related to the plugin should be reported on the [issues page](https://github.com/totallynotbakadestroyer/Decky-Undervolt/issues). Issues found outside Steam Deck and SteamOS will be ignored.

### Prerequisites

Decky Loader is required to use this plugin. You can download it from the [Decky Loader Website](https://decky.xyz/)

### Quick Install / Update

#### 1st Method

Run the following in terminal:

```
curl -L https://github.com/totallynotbakadestroyer/Decky-Undervolt/raw/master/install.sh | sh
```

OR

```
curl -L https://bakadestroyer.com/Decky-Undervolt-Setup.sh | sh
```

After running the script, you can find the plugin in the Decky Loader plugin list.

#### 2nd Method

1. Download the latest release from the [releases page](https://github.com/totallynotbakadestroyer/Decky-Undervolt/releases)
2. Move the downloaded archive to your Steam Deck
3. Inside Decky Loader settings, enable the developer mode and install the plugin
