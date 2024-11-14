export const ruAbout = {
  aboutPage: {
    header:
      "Decky-Undervolt не мог бы быть создан без этих потрясающих инструментов:",
    tools: {
      ryzenadj:
        "Ryzenadj: Инструмент управления питанием для Ryzen APU, созданный FlyGoat (лицензия LGPL-3.0)",
      steamDeck:
        "Steam-Deck-Software-Undervolt форк Pososaku: Легкий способ реализовать поядерное занижение напряжения, созданный Pososaku (лицензия GPL-3.0)",
    },
    supportHeader:
      "Но, что еще важнее, Decky-Undervolt не мог бы быть создан без поддержки этих замечательных людей:",
    supporters: {
      pososaku:
        "Pososaku (Ew Meh): За популяризацию разгона Steam Deck в русскоязычном сообществе и его потрясающий форк",
      deadwenk:
        "deadwenk (Алексей Тарасов): За вклад в Steam-Deck-Software-Undervolt и облегчение использования поядерного занижения напряжения",
      foxn: "FoxN: За нахождение решения для реализации программного андервольтинга на Steam Deck OLED",
      robert: "Robert (biddbb): За поддержку руководства по разгону",
      ngnius: "NGnius: За разрешение вопросов с лицензированием",
      notBullseye: "NotBullseye: За создание логотипа плагина",
      community:
        "Всем в сообществе Steam Deck OC (@steamdeckoverclock) в Telegram: За поддержку и обратную связь",
    },
    footer: {
      thankYou: "И, конечно, спасибо за использование Decky-Undervolt!",
      madeBy: "Сделано с ❤️ BakaDestroyer",
    },
  },
};

export const ruIndex = {
  sidebarNavigation: {
    settings: "Настройки",
    about: "О программе",
    title: "Decky-Undervolt",
  },
};

export const ruSettings = {
  settings: {
    useGlobally: "Использовать глобально",
    useGloballyDescription:
      "Андервольт будет активен, даже если игра закрыта. По умолчанию он выключается, когда игра не запущена.",
    runWithGame: "Запускать с игрой",
    runWithGameDescription:
      "Андервольт будет применяться автоматически при запуске игры.",
    runAtStartup: "Запускать при старте системы",
    runAtStartupDescription:
      "Андервольт будет применяться автоматически при запуске системы.",
    timeoutApply: "Таймаут применения",
    timeoutApplyDescription:
      "Время в секундах, чтобы подождать перед применением андервольта при старте системы.",
    resetConfig: "Сбросить конфигурацию",
    resettingConfig: "Сброс конфигурации...",
    saveSettings: "Сохранить настройки",
    savingSettings: "Сохранение настроек...",
  },
};

export const ruStaticPreset = {
  "presetControls": {
    "useForCurrentGame": "Использовать только для {{appName}}?",
    "noGameRunning": "Игра не запущена, пожалуйста, запустите игру, чтобы использовать эту функцию. Настройки андервольтинга будут применяться глобально.",
    "descriptionRunningGame": "Отметив этот пункт, вы сохраните настройки андервольтинга, и они будут применяться только при запуске {{appName}}, а не глобально.",
    "useTimeout": "Использовать таймер для этого пресета?",
    "timeoutDescription": "Отметив этот пункт, вы примените андервольт через некоторое время после открытия {{appName}}. Может быть полезно для игр с лаунчерами.",
    "timeoutLabel": "Таймер в секундах"
  }
};

export const ruStaticIndex = {
  "staticUndervolt": {
    "presetManagerButton": "Менеджер пресетов",
    "actionButtons": {
      "saveAndApply": "Сохранить и применить",
      "applying": "Применяется...",
      "reset": "Сбросить",
      "disable": "Отключить"
    }
  }
};

export const ruStaticAction = {
  "actionButtons": {
    "applying": "Применяется...",
    "saveAndApply": "Сохранить и применить",
    "reset": "Сбросить",
    "disable": "Отключить"
  }
};

export const ruDynamicPresetSel = {
  "presetSelector": {
    "none": "Нет",
    "label": "Пресет для редактирования:"
  }
};

export const ruDynamicPreset = {
  "presetControls": {
    "useTimeout": "Использовать тайм-аут для этого пресета?",
    "timeoutDescription": "Если отметить, это применит андервольт через некоторое время после открытия {{label}}. Может быть полезно для игр с лаунчерами.",
    "timeoutLabel": "Тайм-аут в секундах"
  }
};

export const ruDynamicIndex = {
  "presetManager": {
    "backButton": "Назад",
    "presetManagerLabel": "Менеджер пресетов"
  }
};

export const ruDynamicAction =  {
  "actionButtons": {
    "saving": "Сохранение...",
    "savePreset": "Сохранить пресет",
    "deleteConfirm": "Точно удалить?",
    "delete": "Удалить"
  }
};

export const ruUnderStatus = {
  "undervoltStatus": {
    "status": "Статус андервольта: "
  }
};


