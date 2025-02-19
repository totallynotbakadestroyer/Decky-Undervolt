export const translations = {
  en: {
    translation: {
      about: {
        header:
          "Decky-Undervolt could not be made without these awesome tools:",
        tools: {
          ryzenadj:
            "Ryzenadj: Power Management tool for Ryzen APUs made by FlyGoat (LGPL-3.0 license)",
        },
        supportHeader:
          "But most importantly, Decky-Undervolt could not be made without the support of these amazing people:",
        supporters: {
          kigs: "k1gs: For contributing to the project and helping with the development",
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
      sidebar: {
        settings: "Settings",
        about: "About",
        title: "Decky-Undervolt",
      },
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
      staticUndervolt: {
        useForCurrentGame: "Use only for {{appName}}?",
        currentGamePlaceholder: "current game",
        noGameRunning:
          "No game is running, please start a game to use this feature. Undervolting settings will be applied globally.",
        descriptionRunningGame:
          "Checking this will save the undervolt settings and will apply them only when {{appName}} is running instead of applying it globally.",
        presetManagerButton: "Preset Manager",
        actionButtons: {
          saveAndApply: "Save & Apply",
          applying: "Applying...",
          reset: "Reset",
          disable: "Disable",
        },
      },
      presetManager: {
        label: "Preset Manager",
        presetSelector: {
          none: "None",
          label: "Preset to edit:",
        },
        actionButtons: {
          saving: "Saving...",
          savePreset: "Save Preset",
          deleteConfirm: "Really delete?",
          delete: "Delete",
        },
        backButton: "Back",
      },
      coreSlider: "Core {{coreNumber}}",
      presetControls: {
        useTimeout: "Use timeout for this preset?",
        timeoutDescription:
          "Checking this will apply the undervolt after some time when {{label}} is opened. Might be useful for games with launchers.",
        timeoutLabel: "Timeout in seconds",
      },
      undervoltStatus: {
        status: "Undervolt Status: ",
        enabled: "Enabled",
        disabled: "Disabled",
        error: "Error",
        scheduled: "Scheduled",
      },
    },
  },
  ru: {
    translation: {
      about: {
        header:
          "Decky-Undervolt не мог бы быть создан без этих замечательных инструментов:",
        tools: {
          ryzenadj:
            "Ryzenadj: Инструмент управления питанием для Ryzen APU от FlyGoat (лицензия LGPL-3.0)",
        },
        supportHeader:
          "Но, самое главное, Decky-Undervolt не мог бы быть создан без поддержки этих потрясающих людей:",
        supporters: {
          kigs: "k1gs: За вклад в проект и помощь в разработке",
          deadwenk:
            "deadwenk (Алексей Тарасов): За вклад в Steam-Deck-Software-Undervolt и упрощение настройки поядерного андервольтинга",
          foxn: "FoxN: За решение, позволившее программный андервольтинг на Steam Deck OLED",
          robert: "Robert (biddbb): За поддержку гайда по разгону",
          ngnius: "NGnius: За решение вопросов лицензирования",
          notBullseye: "NotBullseye: За создание логотипа плагина",
          community:
            "Всем участникам сообщества Steam Deck OC (@steamdeckoverclock) в Telegram: За их поддержку и обратную связь",
        },
        footer: {
          thankYou: "И, конечно же, спасибо за использование Decky-Undervolt!",
          madeBy: "Создано с ❤️ BakaDestroyer",
        },
      },
      sidebar: {
        settings: "Настройки",
        about: "О плагине",
        title: "Decky-Undervolt",
      },
      settings: {
        useGlobally: "Использовать глобально",
        useGloballyDescription:
          "Андервольтинг будет сохраняться даже после закрытия игры. По умолчанию он отключается, если игра не запущена.",
        runWithGame: "Включать с игрой",
        runWithGameDescription:
          "Андервольтинг будет автоматически применяться при запуске игры.",
        runAtStartup: "Включать при запуске системы",
        runAtStartupDescription:
          "Андервольтинг будет автоматически применяться при включении системы.",
        timeoutApply: "Применение с задержкой",
        timeoutApplyDescription:
          "Задержка в секундах перед применением андервольтинга при старте системы.",
        resetConfig: "Сбросить настройки",
        resettingConfig: "Сброс настроек...",
        saveSettings: "Сохранить настройки",
        savingSettings: "Сохранение настроек...",
      },
      staticUndervolt: {
        useForCurrentGame: "Использовать только для {{appName}}?",
        currentGamePlaceholder: "текущей игры",
        noGameRunning:
          "Игра не запущена. Запустите игру, чтобы использовать эту функцию. Настройки андервольтинга будут применены глобально.",
        descriptionRunningGame:
          "Выбор этого параметра сохранит настройки андервольтинга и будет применять их только при запуске {{appName}}, а не глобально.",
        presetManagerButton: "Менеджер пресетов",
        actionButtons: {
          saveAndApply: "Сохранить и применить",
          applying: "Применение...",
          reset: "Сбросить",
          disable: "Отключить",
        },
      },
      presetManager: {
        label: "Менеджер пресетов",
        presetSelector: {
          none: "Нет",
          label: "Пресет для редактирования:",
        },
        actionButtons: {
          saving: "Сохранение...",
          savePreset: "Сохранить пресет",
          deleteConfirm: "Удалить пресет?",
          delete: "Удалить",
        },
        backButton: "Назад",
      },
      coreSlider: "Ядро {{coreNumber}}",
      presetControls: {
        useTimeout: "Использовать задержку для этого пресета?",
        timeoutDescription:
          "Выбор этого параметра применит андервольтинг через некоторое время после запуска {{label}}. Может быть полезно для игр с лаунчерами.",
        timeoutLabel: "Задержка (в секундах)",
      },
      undervoltStatus: {
        status: "Статус андервольтинга: ",
        enabled: "Включено",
        disabled: "Отключено",
        error: "Ошибка",
        scheduled: "Запланировано",
      },
    },
  },
  uk: {
    translation: {
      about: {
        header:
          "Decky-Undervolt не міг би бути створений без цих чудових інструментів:",
        tools: {
          ryzenadj:
            "Ryzenadj: Інструмент керування живленням для Ryzen APU від FlyGoat (ліцензія LGPL-3.0)",
        },
        supportHeader:
          "Але найважливіше, Decky-Undervolt не міг би існувати без підтримки цих дивовижних людей:",
        supporters: {
          kigs: "k1gs: За внесок у проєкт та допомогу у розробці",
          deadwenk:
            "deadwenk (Олексій Тарасов): За вклад у Steam-Deck-Software-Undervolt та спрощення налаштування поядерного андервольтингу",
          foxn: "FoxN: За рішення, яке дозволило програмний андервольтинг для Steam Deck OLED",
          robert: "Robert (biddbb): За підтримку гайду з розгону",
          ngnius: "NGnius: За вирішення питань ліцензування",
          notBullseye: "NotBullseye: За створення логотипу плагіна",
          community:
            "Усім учасникам спільноти Steam Deck OC (@steamdeckoverclock) у Telegram: За їхню підтримку та відгуки",
        },
        footer: {
          thankYou: "І, звісно, дякуємо за використання Decky-Undervolt!",
          madeBy: "Створено з ❤️ BakaDestroyer",
        },
      },
      sidebar: {
        settings: "Налаштування",
        about: "Про плагін",
        title: "Decky-Undervolt",
      },
      settings: {
        useGlobally: "Використовувати глобально",
        useGloballyDescription:
          "Андервольтинг буде зберігатися навіть після закриття гри. За замовчуванням він вимикається, якщо гра не запущена.",
        runWithGame: "Увімкнути з грою",
        runWithGameDescription:
          "Андервольтинг буде автоматично застосовуватися під час запуску гри.",
        runAtStartup: "Увімкнути при запуску системи",
        runAtStartupDescription:
          "Андервольтинг буде автоматично застосовуватися при увімкненні системи.",
        timeoutApply: "Застосувати із затримкою",
        timeoutApplyDescription:
          "Час у секундах, через який буде застосовано андервольтинг після запуску системи.",
        resetConfig: "Скинути налаштування",
        resettingConfig: "Скидання налаштувань...",
        saveSettings: "Зберегти налаштування",
        savingSettings: "Збереження налаштувань...",
      },
      staticUndervolt: {
        useForCurrentGame: "Використовувати лише для {{appName}}?",
        currentGamePlaceholder: "поточної гри",
        noGameRunning:
          "Жодна гра не запущена. Запустіть гру, щоб скористатися цією функцією. Налаштування андервольтингу будуть застосовані глобально.",
        descriptionRunningGame:
          "Вибір цього параметра збереже налаштування андервольтингу і застосовуватиме їх тільки під час запуску {{appName}}, а не глобально.",
        presetManagerButton: "Менеджер пресетів",
        actionButtons: {
          saveAndApply: "Зберегти та застосувати",
          applying: "Застосування...",
          reset: "Скинути",
          disable: "Вимкнути",
        },
      },
      presetManager: {
        label: "Менеджер пресетів",
        presetSelector: {
          none: "Немає",
          label: "Пресет для редагування:",
        },
        actionButtons: {
          saving: "Збереження...",
          savePreset: "Зберегти пресет",
          deleteConfirm: "Видалити пресет?",
          delete: "Видалити",
        },
        backButton: "Назад",
      },
      coreSlider: "Ядро {{coreNumber}}",
      presetControls: {
        useTimeout: "Використовувати затримку для цього пресета?",
        timeoutDescription:
          "Вибір цього параметра застосує андервольтинг через певний час після запуску {{label}}. Може бути корисно для ігор із лаунчерами.",
        timeoutLabel: "Затримка (у секундах)",
      },
      undervoltStatus: {
        status: "Стан андервольтингу: ",
        enabled: "Увімкнено",
        disabled: "Вимкнено",
        error: "Помилка",
        scheduled: "Заплановано",
      },
    },
  },
  sv: {
    translation: {
      about: {
        header:
          "Decky-Undervolt kunde inte ha gjorts utan dessa underbara verktyg:",
        tools: {
          ryzenadj:
            "Ryzenadj: Strömhanteringsverktyg för Ryzen APUer gjord av FlyGoat (LGPL-3.0 license)",
        },
        supportHeader:
          "Men mest viktigt så kunde Decky-Undervolt inte gjorts utan stödet från dessa underbara människor:",
        supporters: {
          kigs: "k1gs: För bidrag till projektet och hjälp med utvecklingen",
          deadwenk:
            "deadwenk (Alexey Tarasov): För bidrag till Steam-Deck-Software-Undervolt och gjort det enklare att använda undervolting per-kärna",
          foxn: "FoxN: För att hitta en lösning att göra programvarans undervolting möjlig på Steam Deck OLED",
          robert: "Robert (biddbb): För underhåll av överklockningsguide",
          ngnius: "NGnius: För lösning av licenseringsproblem",
          notBullseye: "NotBullseye: För skapandet av logotypen för insticksmodulen",
          community:
            "Alla i Telegram-communityn Steam Deck OC (@steamdeckoverclock): För deras stöd och återkoppling",
        },
        footer: {
          thankYou: "Och så klart, tack till dig för att du använder Decky-Undervolt!",
          madeBy: "Tillverkad med ❤️ av BakaDestroyer",
        },
      },
      sidebar: {
        settings: "Inställningar",
        about: "Om",
        title: "Decky-Undervolt",
      },
      settings: {
        useGlobally: "Använd globalt",
        useGloballyDescription:
          "Undervolt kommer att bestå även om spelet stängs. Som standard kommer det stängas av när spelet inte körs.",
        runWithGame: "Kör med spel",
        runWithGameDescription:
          "Undervolt kommer att tillämpas automatiskt när spelet startas.",
        runAtStartup: "Kör vid uppstart",
        runAtStartupDescription:
          "Undervolt kommer att tillämpas automatiskt när systemet startar.",
        timeoutApply: "Tillämpa tidsgräns",
        timeoutApplyDescription:
          "Tiden i sekunder att vänta innan undervolt tillämpas vid uppstart.",
        resetConfig: "Nollställ konfig",
        resettingConfig: "Nollställer konfig...",
        saveSettings: "Spara inställningar",
        savingSettings: "Sparar inställningar...",
      },
      staticUndervolt: {
        useForCurrentGame: "Använd endast för {{appName}}?",
        currentGamePlaceholder: "aktuellt spel",
        noGameRunning:
          "Inget spel körs. Starta ett spel för att använda denna funktion. Inställningar för Undervolt kommer att tillämpas globalt.",
        descriptionRunningGame:
          "Markera denna för att spara inställningar för undervolt och tillämpa dem endast när {{appName}} körs istället för att tillämpa det globalt.",
        presetManagerButton: "Förvalshanterare",
        actionButtons: {
          saveAndApply: "Spara och tillämpa",
          applying: "Tillämpar...",
          reset: "Nollställ",
          disable: "Inaktivera",
        },
      },
      presetManager: {
        label: "Förvalshanterare",
        presetSelector: {
          none: "Ingen",
          label: "Förval att redigera:",
        },
        actionButtons: {
          saving: "Sparar...",
          savePreset: "Spara förval",
          deleteConfirm: "Verkligen ta bort?",
          delete: "Ta bort",
        },
        backButton: "Tillbaka",
      },
      coreSlider: "Kärna {{coreNumber}}",
      presetControls: {
        useTimeout: "Använd tidsgräns för detta förval?",
        timeoutDescription:
          "Markera denna för att tillämpa undervolt efter en viss tid när {{label}} öppnas. Kan vara användbart för spel med launchers.",
        timeoutLabel: "Tidsgräns i sekunder",
      },
      undervoltStatus: {
        status: "Status för undervolt: ",
        enabled: "Aktiverad",
        disabled: "Inaktiverad",
        error: "Fel",
        scheduled: "Schemalagd",
      },
    },
  },
  cz: {
    translation: {
      about: {
        header:
          "Decky-Undervolt by nemohl vzniknout bez těchto skvělých nástrojů:",
        tools: {
          ryzenadj:
            "Ryzenadj: Nástroj pro správu výkonu pro Ryzen APU od FlyGoat (licence LGPL-3.0)",
        },
        supportHeader:
          "Ale především, Decky-Undervolt by nevznikl bez podpory těchto úžasných lidí:",
        supporters: {
          kigs: "k1gs: Za přispění do projektu a pomoc s vývojem",
          deadwenk:
            "deadwenk (Alexey Tarasov): Za příspěvky do Steam-Deck-Software-Undervolt a zjednodušení konfigurace undervoltingu na jednotlivých jádrech",
          foxn: "FoxN: Za nalezení řešení umožňujícího softwarový undervolting na Steam Deck OLED",
          robert: "Robert (biddbb): Za udržování průvodce přetaktováním",
          ngnius: "NGnius: Za řešení licenčních problémů",
          notBullseye: "NotBullseye: Za vytvoření loga pluginu",
          community:
            "Všem členům komunity Steam Deck OC (@steamdeckoverclock) na Telegramu: Za jejich podporu a zpětnou vazbu",
        },
        footer: {
          thankYou: "A samozřejmě děkujeme za používání Decky-Undervolt!",
          madeBy: "Vytvořeno s ❤️ BakaDestroyer",
        },
      },
      sidebar: {
        settings: "Nastavení",
        about: "O pluginu",
        title: "Decky-Undervolt",
      },
      settings: {
        useGlobally: "Používat globálně",
        useGloballyDescription:
          "Undervolting zůstane aktivní i po zavření hry. Ve výchozím nastavení se vypíná, když hra neběží.",
        runWithGame: "Spustit s hrou",
        runWithGameDescription:
          "Undervolting se automaticky aplikuje při spuštění hry.",
        runAtStartup: "Spustit při startu systému",
        runAtStartupDescription:
          "Undervolting se automaticky aplikuje při spuštění systému.",
        timeoutApply: "Aplikovat se zpožděním",
        timeoutApplyDescription:
          "Čas v sekundách, po kterém se undervolting aplikuje při spuštění systému.",
        resetConfig: "Obnovit nastavení",
        resettingConfig: "Obnovování nastavení...",
        saveSettings: "Uložit nastavení",
        savingSettings: "Ukládání nastavení...",
      },
      staticUndervolt: {
        useForCurrentGame: "Použít pouze pro {{appName}}?",
        currentGamePlaceholder: "aktuální hru",
        noGameRunning:
          "Žádná hra neběží. Spusťte hru, abyste mohli použít tuto funkci. Nastavení undervoltingu bude použito globálně.",
        descriptionRunningGame:
          "Zaškrtnutí tohoto políčka uloží nastavení undervoltingu a aplikuje je pouze při spuštění {{appName}}, místo aby se aplikovala globálně.",
        presetManagerButton: "Správce profilů",
        actionButtons: {
          saveAndApply: "Uložit a aplikovat",
          applying: "Aplikuje se...",
          reset: "Obnovit",
          disable: "Zakázat",
        },
      },
      presetManager: {
        label: "Správce profilů",
        presetSelector: {
          none: "Žádný",
          label: "Profil k úpravě:",
        },
        actionButtons: {
          saving: "Ukládání...",
          savePreset: "Uložit profil",
          deleteConfirm: "Opravdu odstranit?",
          delete: "Odstranit",
        },
        backButton: "Zpět",
      },
      coreSlider: "Jádro {{coreNumber}}",
      presetControls: {
        useTimeout: "Použít zpoždění pro tento profil?",
        timeoutDescription:
          "Zaškrtnutím tohoto políčka se undervolting aplikuje po určité době od spuštění {{label}}. Může být užitečné pro hry se spouštěčem.",
        timeoutLabel: "Zpoždění v sekundách",
      },
      undervoltStatus: {
        status: "Stav undervoltingu: ",
        enabled: "Povoleno",
        disabled: "Zakázáno",
        error: "Chyba",
        scheduled: "Naplánováno",
      },
    },
  },
};
