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
        runningAutomaticallyDisabled: 'Feature is disabled because "Run with Game" is not enabled in the plugin settings.',
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
      faq: {
        general: {
          curveOptimizer: {
            header: "What the hell is a Curve Optimizer?",
            body: "A curve optimizer is a tool that lets you undervolt each CPU core individually. This means you can reduce the amount of voltage a core uses when it boosts to higher speeds. Since some cores can run well with less power, undervolting them helps the CPU run cooler and more efficiently, and in many cases, it can actually boost higher because there's more room for thermal and power limits.",
          },
          biosUndervolt: {
            header: "Why use this plugin instead of BIOS undervolting?",
            body: "This plugin is better than a BIOS voltage offset because it offers per-core undervolting and only affects the CPU during boost, making it more precise and stable. It also includes presets, so you can undervolt your device differently for each game, optimizing performance and thermals based on the workload. In contrast, a BIOS offset applies globally across all cores and power states, which can lead to instability. In short, this plugin gives you better efficiency, stability, and per-game performance control.",
          },
          combineUndervolt: {
            header: "Can i combine Curve Optimizer with BIOS undervolting?",
            body: "HELL NO. Do not combine Curve Optimizer with BIOS undervolting. It is one or the other. Combining them WILL cause instability and crashes. So, don't you ever think about it.",
          },
          minusSign: {
            header: "Why is your plugin showing values without the minus sign?",
            body: 'The plugin shows the values without the minus sign for simplicity. The plugin will automatically add the minus sign when applying the undervolt. The plugin is called "Decky-UNDERVOLT" for a reason.',
          },
          screwUp: {
            header: "Can i screw up my Steam Deck with this plugin?",
            body: "No, you cant. Of course, if you set the undervolting too aggressive, it can cause instability and crashes, but it will not damage your Steam Deck.",
          },
          dynamicUndervolt: {
            header: "When will you release the dynamic undervolting feature?",
            body: "<div style='text-align: center'><img style='height: 300px' src='https://images.steamusercontent.com/ugc/2387556983693037950/7CD44486CA98629E82DFE5C65D0C870D2E8E4479/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false' alt='Soon'></div>",
          },
        },
        staticUndervolt: {
          curveOptimizerStep: {
            header: "What Curve Optimizer step should I set for my Steam Deck?",
            body: "Usually, Steam Decks can handle -20 or -25 step per each core. However, it depends on the silicon lottery. You can start with -20 and test it. If it's stable, you can try -25. If it's not stable, you can try -15 or -10.",
          },
          moreAggressiveUndervolt: {
            header: "How can I go for more aggressive undervolt?",
            body: "You can go for more aggressive undervolt if you're running a CPU intensive game (e.g. CPU load is about 100%) OR if you're limited your frequency to 1.5GHz or lower.",
          },
          presets: {
            header: "Why should i use undervolting per-game presets?",
            body: "Some games are more CPU intensive than others. For example, you may need more aggressive undervolt for Cyberpunk 2077 than for Stardew Valley. You can create per-game presets to have different undervolt settings for different games increasing your overall battery life.",
          },
          createPreset: {
            header: "How can I create per-game presets?",
            body: 'You can create per-game presets by checking "Run with game" checkbox in the plugin settings. After that, when you start a game, you will be able to create a new preset for that game.',
          },
          deletePreset: {
            header: "How can I delete per-game presets?",
            body: 'You can delete per-game presets by clicking the "Delete" button in the preset manager.',
          },
        },
        sidebar: {
          title: "FAQ",
        },
        generalHelp: {
          title: "General",
        },
        staticUndervoltHelp: {
          title: "Static Undervolt",
        },
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
        runningAutomaticallyDisabled: 'Функция отключена, так как "Включать с игрой" не включено в настройках плагина.',
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
      faq: {
        general: {
          curveOptimizer: {
            header: "Что, черт возьми, такое Curve Optimizer?",
            body: "Curve Optimizer - это инструмент, позволяющий уменьшать напряжение для каждого ядра ЦП по отдельности. Это означает, что вы можете снизить напряжение, используемое ядром во время повышения тактовой частоты. Поскольку некоторые ядра могут работать с меньшим напряжением, андервольтинг помогает ЦП работать холоднее и эффективнее, и во многих случаях он может работать на более высокой частоте, так как имеется больше ресурсов для термических и энергетических ограничений.",
          },
          biosUndervolt: {
            header:
              "Почему использовать этот плагин вместо андервольтинга в BIOS?",
            body: "Этот плагин лучше, чем смещение напряжения в BIOS, так как предлагает поядерный андервольтинг и влияет только на ЦП во время буста, делая его более точным и стабильным. Он также включает пресеты, что позволяет андервольтить устройство по-разному для каждой игры, оптимизируя производительность и температурный режим в зависимости от нагрузки. В отличие от смещения в BIOS, которое применяется ко всем ядрам и режимам питания, что может привести к нестабильности. Короче говоря, этот плагин обеспечивает лучшую эффективность, стабильность и управление производительностью для каждой игры.",
          },
          combineUndervolt: {
            header:
              "Могу ли я сочетать Curve Optimizer с андервольтингом в BIOS?",
            body: "Ни в коем случае. Не сочетайте Curve Optimizer с андервольтингом в BIOS. Это либо одно, либо другое. Их сочетание приведет к нестабильности и сбоям. Так что даже не думайте об этом.",
          },
          minusSign: {
            header: "Почему ваш плагин показывает значения без знака минус?",
            body: 'Плагин отображает значения без знака минус для упрощения. Знак минус будет автоматически добавлен при применении андервольтинга. Плагин называется "Decky-UNDERVOLT" не случайно.',
          },
          screwUp: {
            header: "Могу ли я испортить свой Steam Deck с этим плагином?",
            body: "Нет, не можете. Конечно, если установить слишком агрессивный андервольт, это может вызвать нестабильность и сбои, но повредить Steam Deck не повредит.",
          },
          dynamicUndervolt: {
            header: "Когда выйдет функция динамического андервольтинга?",
            body: "<div style='text-align: center'><img style='height: 300px' src='https://images.steamusercontent.com/ugc/2387556983693037950/7CD44486CA98629E82DFE5C65D0C870D2E8E4479/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false' alt='Скоро'></div>",
          },
        },
        staticUndervolt: {
          curveOptimizerStep: {
            header:
              "Какой шаг Curve Optimizer установить для моего Steam Deck?",
            body: "Обычно Steam Deck справляется с шагом -20 или -25 для каждого ядра. Однако это зависит от особенностей кремния. Вы можете начать с -20 и протестировать. Если стабильно, попробуйте -25. Если нестабильно, попробуйте -15 или -10.",
          },
          moreAggressiveUndervolt: {
            header: "Как сделать андервольт более агрессивным?",
            body: "Вы можете сделать андервольт более агрессивным, если игра нагружает ЦП на 100% ИЛИ если частота ограничена до 1.5 ГГц или ниже.",
          },
          presets: {
            header:
              "Почему стоит использовать пресеты андервольтинга для каждой игры?",
            body: "Некоторые игры требуют большего напряжения от ЦП, чем другие. Например, для Cyberpunk 2077 может потребоваться более агрессивный андервольт, чем для Stardew Valley. Вы можете создать пресеты для каждой игры, чтобы применять разные настройки андервольта и увеличить время работы от батареи.",
          },
          createPreset: {
            header: "Как создать пресеты для каждой игры?",
            body: 'Вы можете создать пресеты для каждой игры, поставив галочку "Включать с игрой" в настройках плагина. После этого при запуске игры вы сможете создать новый пресет для неё.',
          },
          deletePreset: {
            header: "Как удалить пресеты для каждой игры?",
            body: 'Вы можете удалить пресеты, нажав кнопку "Удалить" в менеджере пресетов.',
          },
        },
        sidebar: {
          title: "Вопросы и ответы",
        },
        generalHelp: {
          title: "Общее",
        },
        staticUndervoltHelp: {
          title: "Статичный Андервольт",
        },
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
        runningAutomaticallyDisabled: 'Функція вимкнена, оскільки "Увімкнути з грою" не увімкнено в налаштуваннях плагіна.',
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
      faq: {
        general: {
          curveOptimizer: {
            header: "Що таке Curve Optimizer?",
            body: "Curve Optimizer — це інструмент, який дозволяє зменшувати напругу окремо для кожного ядра процесора. Це означає, що ви можете зменшити кількість напруги, яку використовує ядро при збільшенні тактової частоти. Оскільки деякі ядра можуть працювати з меншою напругою, андервольтинг допомагає процесору працювати холодніше та ефективніше, а в багатьох випадках навіть може працювати на вищій частоті, оскільки є більше запасу для термічних та енергетичних обмежень.",
          },
          biosUndervolt: {
            header:
              "Чому варто використовувати цей плагін замість андервольтинга в BIOS?",
            body: "Цей плагін кращий за зсув напруги в BIOS, оскільки забезпечує поядерний андервольтинг і впливає лише на процесор під час буста, роблячи його більш точним та стабільним. Він також включає пресети, що дозволяють андервольтити пристрій по-різному для кожної гри, оптимізуючи продуктивність та температурний режим залежно від навантаження. На відміну від зсуву в BIOS, який застосовується до всіх ядер і режимів живлення, що може призвести до нестабільності. Коротко кажучи, цей плагін забезпечує кращу ефективність, стабільність та керування продуктивністю для кожної гри.",
          },
          combineUndervolt: {
            header:
              "Чи можна поєднувати Curve Optimizer з андервольтингом в BIOS?",
            body: "Ні, взагалі ні. Не поєднуйте Curve Optimizer з андервольтингом в BIOS. Це або те, або інше. Їхнє поєднання спричинить нестабільність та збої. Тож навіть не думайте про це.",
          },
          minusSign: {
            header: "Чому ваш плагін показує значення без мінусового знаку?",
            body: 'Плагін показує значення без мінусового знаку для спрощення. Мінусовий знак буде автоматично додано при застосуванні андервольтингу. Плагін названий "Decky-UNDERVOLT" не випадково.',
          },
          screwUp: {
            header: "Чи можу я пошкодити свій Steam Deck цим плагіном?",
            body: "Ні, не можете. Звичайно, якщо встановити занадто агресивний андервольт, це може призвести до нестабільності та збоїв, але пошкодити Steam Deck це не завдасть шкоди.",
          },
          dynamicUndervolt: {
            header: "Коли вийде функція динамічного андервольтинга?",
            body: "<div style='text-align: center'><img style='height: 300px' src='https://images.steamusercontent.com/ugc/2387556983693037950/7CD44486CA98629E82DFE5C65D0C870D2E8E4479/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false' alt='Брзы'></div>",
          },
        },
        staticUndervolt: {
          curveOptimizerStep: {
            header: "Який крок Curve Optimizer встановити для мого Steam Deck?",
            body: "Зазвичай Steam Deck справляється з кроком -20 або -25 для кожного ядра. Проте це залежить від характеристик чіпа. Ви можете почати з -20 і перевірити стабільність. Якщо стабільно — спробуйте -25. Якщо нестабільно — спробуйте -15 або -10.",
          },
          moreAggressiveUndervolt: {
            header: "Як зробити андервольт більш агресивним?",
            body: "Ви можете застосувати більш агресивний андервольт, якщо гра створює високе навантаження на процесор (наприклад, 100% завантаження) АБО якщо частота обмежена до 1.5 ГГц або нижче.",
          },
          presets: {
            header:
              "Чому варто використовувати пресети андервольтинга для кожної гри?",
            body: "Деякі ігри вимагають більшої потужності процесора, ніж інші. Наприклад, для Cyberpunk 2077 може знадобитися більш агресивний андервольт, ніж для Stardew Valley. Ви можете створити пресети для кожної гри, щоб застосовувати різні налаштування андервольта, що збільшує час роботи від батареї.",
          },
          createPreset: {
            header: "Як створити пресети для кожної гри?",
            body: 'Ви можете створити пресети для кожної гри, встановивши прапорець "Увімкнути з грою" в налаштуваннях плагіна. Після цього при запуску гри ви зможете створити новий пресет для даної гри.',
          },
          deletePreset: {
            header: "Як видалити пресети для кожної гри?",
            body: 'Ви можете видалити пресети, натиснувши кнопку "Видалити" в менеджері пресетів.',
          },
        },
        sidebar: {
          title: "Часті запитання",
        },
        generalHelp: {
          title: "Загальне",
        },
        staticUndervoltHelp: {
          title: "Статичний андервольт",
        },
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
        runningAutomaticallyDisabled: 'Funkce je vypnuta, protože "Spustit s hrou" není povoleno v nastavení pluginu.',
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
      faq: {
        general: {
          curveOptimizer: {
            header: "Co to sakra je Curve Optimizer?",
            body: "Curve Optimizer je nástroj, který umožňuje individuálně snížit napětí každého jádra CPU. To znamená, že můžete snížit množství napětí, které jádro využívá při zvyšování frekvence. Protože některá jádra dokážou fungovat i při nižším napětí, undervolting pomáhá CPU pracovat chladněji a efektivněji, a často umožňuje vyšší frekvence, protože je více prostoru pro tepelní a napěťová omezení.",
          },
          biosUndervolt: {
            header: "Proč používat tento plugin místo undervoltingu v BIOSu?",
            body: "Tento plugin je lepší než posunutí napětí v BIOSu, protože nabízí individuální undervolting a ovlivňuje CPU pouze při boostu, což zajišťuje přesnost a stabilitu. Obsahuje také přednastavené konfigurace, takže můžete nastavit undervolt pro každou hru zvlášť, optimalizovat výkon a teplotu podle zátěže. Na rozdíl od posunu v BIOSu, který se aplikuje globálně na všechna jádra a režimy napájení, což může vést k nestabilitě. Stručně řečeno, tento plugin vám poskytuje lepší efektivitu, stabilitu a kontrolu výkonu pro každou hru.",
          },
          combineUndervolt: {
            header: "Mohu kombinovat Curve Optimizer s undervoltingem v BIOSu?",
            body: "Vůbec ne. Nedoporučuje se kombinovat Curve Optimizer s undervoltingem v BIOSu. Je to buď jedno, nebo druhé. Kombinace povede k nestabilitě a pádům systému.",
          },
          minusSign: {
            header: "Proč váš plugin zobrazuje hodnoty bez záporné značky?",
            body: 'Plugin zobrazuje hodnoty bez záporné značky pro jednoduchost. Záporná značka bude automaticky přidána při aplikaci undervoltingu. Plugin se jmenuje "Decky-UNDERVOLT" záměrně.',
          },
          screwUp: {
            header: "Mohu si pokazit Steam Deck tímto pluginem?",
            body: "Ne, nemůžete. Samozřejmě, pokud nastavíte příliš agresivní undervolt, může to způsobit nestabilitu a pády, ale poškodit Steam Deck to nepoškodí.",
          },
          dynamicUndervolt: {
            header: "Kdy bude vydána funkce dynamického undervoltingu?",
            body: "<div style='text-align: center'><img style='height: 300px' src='https://images.steamusercontent.com/ugc/2387556983693037950/7CD44486CA98629E82DFE5C65D0C870D2E8E4479/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false' alt='Brzy'></div>",
          },
        },
        staticUndervolt: {
          curveOptimizerStep: {
            header: "Jaký krok Curve Optimizer nastavit pro můj Steam Deck?",
            body: "Obvykle Steam Deck zvládne krok -20 nebo -25 pro každé jádro. Záleží to však na kvalitě čipu. Můžete začít s -20 a vyzkoušet. Pokud je stabilní, můžete zkusit -25. Pokud není stabilní, zkuste -15 nebo -10.",
          },
          moreAggressiveUndervolt: {
            header: "Jak dosáhnout agresivnějšího undervoltu?",
            body: "Agresivnější undervolt můžete dosáhnout, pokud hrajete hru s vysokým zatížením CPU (např. 100% zátěž) NEBO pokud je vaše frekvence omezena na 1,5 GHz nebo méně.",
          },
          presets: {
            header:
              "Proč používat přednastavené konfigurace undervoltu pro každou hru?",
            body: "Některé hry jsou náročnější na CPU než jiné. Například pro Cyberpunk 2077 může být potřeba agresivnější undervolt než pro Stardew Valley. Můžete vytvořit přednastavené konfigurace pro každou hru, abyste měli různá nastavení undervoltu a prodloužili výdrž baterie.",
          },
          createPreset: {
            header: "Jak vytvořit přednastavené konfigurace pro každou hru?",
            body: 'Přednastavené konfigurace pro každou hru můžete vytvořit zaškrtnutím políčka "Spustit s hrou" v nastavení pluginu. Poté, co spustíte hru, budete moci vytvořit nový profil pro úpravu nastavení.',
          },
          deletePreset: {
            header: "Jak smazat přednastavené konfigurace pro každou hru?",
            body: 'Přednastavené konfigurace můžete smazat kliknutím na tlačítko "Odstranit" v manažeru profilů.',
          },
        },
        sidebar: {
          title: "Často kladené dotazy",
        },
        generalHelp: {
          title: "Obecné",
        },
        staticUndervoltHelp: {
          title: "Statický undervolt",
        },
      },
    },
  },
};
