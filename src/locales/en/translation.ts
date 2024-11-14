export const enAbout = {
  aboutPage: {
    header: "Decky-Undervolt could not be made without this awesome tools:",
    tools: {
      ryzenadj:
        "Ryzenadj: Power Management tool for Ryzen APUs made by FlyGoat (LGPL-3.0 license)",
      steamDeck:
        "Steam-Deck-Software-Undervolt Pososaku's fork: Easy way to implement per-core undervolt, made by Pososaku (GPL-3.0 License)",
    },
    supportHeader:
      "But most importantly, Decky-Undervolt could not be made without the support of these amazing people:",
    supporters: {
      pososaku:
        "Pososaku (Ew Meh): For making Steam Deck overclocking popular in Russian community and his awesome fork",
      deadwenk:
        "deadwenk (Alexey Tarasov): For contributing Steam-Deck-Software-Undervolt and making it easier to use per-core undervolting",
      foxn: "FoxN: For finding a solution to make software undervolting possible at Steam Deck OLED",
      robert: "Robert (biddbb): For maintaining overclocking guide",
      ngnius: "NGnius: For resolving licensing issues",
      notBullseye: "NotBullseye: For creating plugin logo",
      community:
        "Everyone in the Steam Deck OC (@steamdeckoverclock) Telegram community: For their support and feedback",
    },
    footer: {
      thankYou: "And of course, thank you for using Decky-Undervolt!",
      madeBy: "Made with ❤️ by BakaDestroyer",
    },
  },
};

export const enIndex = {
  sidebarNavigation: {
    settings: "Settings",
    about: "About",
    title: "Decky-Undervolt",
  },
};

export const enSettings = {
  settings: {
    useGlobally: "Use Globally",
    useGloballyDescription:
      "Undervolt will persist even if the game is closed. By default, it turns off when the game is not running.",
    runWithGame: "Run With Game",
    runWithGameDescription:
      "Undervolt will be applied automatically when the game starts.",
    runAtStartup: "Run at Startup",
    runAtStartupDescription:
      "Undervolt will be applied automatically when the system starts.",
    timeoutApply: "Timeout Apply",
    timeoutApplyDescription:
      "The time in seconds to wait before applying the undervolt at startup.",
    resetConfig: "Reset Config",
    resettingConfig: "Resetting Config...",
    saveSettings: "Save Settings",
    savingSettings: "Saving Settings...",
  },
};

export const enStaticPreset = {
  "presetControls": {
    "useForCurrentGame": "Use only for {{appName}}?",
    "noGameRunning": "No game is running, please start a game to use this feature. Undervolting settings will be applied globally.",
    "descriptionRunningGame": "Checking this will save the undervolt settings and will apply them only when {{appName}} is running instead of applying it globally.",
    "useTimeout": "Use timeout for this preset?",
    "timeoutDescription": "Checking this will apply the undervolt after some time when {{appName}} is opened. Might be useful for games with launchers.",
    "timeoutLabel": "Timeout in seconds"
  }
};

export const enStaticIndex = {
  "staticUndervolt": {
    "presetManagerButton": "Preset Manager",
    "actionButtons": {
      "saveAndApply": "Save & Apply",
      "applying": "Applying...",
      "reset": "Reset",
      "disable": "Disable"
    }
  }
};

export const enStaticAction = {
  "actionButtons": {
    "applying": "Applying...",
    "saveAndApply": "Save & Apply",
    "reset": "Reset",
    "disable": "Disable"
  }
};

export const enDynamicPresetSel = {
  "presetSelector": {
    "none": "None",
    "label": "Preset to edit:"
  }
};

export const enDynamicPreset = {
  "presetControls": {
    "useTimeout": "Use timeout for this preset?",
    "timeoutDescription": "Checking this will apply the undervolt after some time when {{label}} is opened. Might be useful for games with launchers.",
    "timeoutLabel": "Timeout in seconds"
  }
};

export const enDynamicIndex = {
  "presetManager": {
    "backButton": "Back",
    "presetManagerLabel": "Preset Manager"
  }
};

export const enDynamicAction = {
  "actionButtons": {
    "saving": "Saving...",
    "savePreset": "Save Preset",
    "deleteConfirm": "Really delete?",
    "delete": "Delete"
  }
};

export const enUnderStatus = {
  "undervoltStatus": {
    "status": "Undervolt Status: "
  }
};







