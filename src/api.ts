import { call } from '@decky/api';
import { Router } from '@decky/ui'
import EventEmitter from "eventemitter3";

interface Config {
    presets: any[],
    timeout_before_enable: number,
    cores: number[]
    status: string
    settings: {
        isGlobal: boolean,
        runAtStartup: boolean,
        isRunAutomatically: boolean,
        timeoutApply: number
    }
}

export interface Preset {
    app_id: number,
    value: number[],
    label: string,
    use_timeout: boolean,
    timeout: number
}

interface PresetSettings {
    use_timeout: boolean,
    timeout: number
}

export enum Events {
    STATUS_UPDATE = 'status_update',
    UPDATE_SETTINGS = 'update_settings',
    UPDATE_CORE_VALUES = 'update_core_values',
    UPDATE_CURRENT_RUNNING_APP = 'update_current_running_app',
    UPDATE_CURRENT_PRESET = 'update_preset_usage'
}

export class Api extends EventEmitter {
    private currentRunningAppName: string = ''
    private currentRunningAppId: number = 0
    private presets: any[] = [];
    private currentCoreValues = [5,5,5,5]
    private globalCoreValues = [5,5,5,5]
    private undervoltStatus = 'Disabled';
    private registeredListeners: any = [];
    private currentPreset: Preset | null = null
    private settings = {
        isGlobal: false,
        runAtStartup: false,
        isRunAutomatically: false,
        timeoutApply: 15
    }

    public get UndervoltStatus() {
        return this.undervoltStatus
    }

    public get Settings() {
        return this.settings
    }

    public get CurrentRunningAppName() {
        return this.currentRunningAppName
    }

    public set CurrentRunningAppName(value: string) {
        this.currentRunningAppName = value
        this.emit(Events.UPDATE_CURRENT_RUNNING_APP, value)
    }

    public get CurrentRunningAppId() {
        return this.currentRunningAppId
    }

    public set CurrentRunningAppId(appId: number) {
        this.currentRunningAppId = appId
    }

    public set Settings(settings: any) {
        this.settings = settings
        this.emit(Events.UPDATE_SETTINGS, settings)
    }

    public set UndervoltStatus(status: string) {
        this.undervoltStatus = status
        this.emit(Events.STATUS_UPDATE, status)
    }

    get Presets() {
        return this.presets
    }

    get CurrentPreset() {
        return this.currentPreset
    }

    get CurrentCoreValues() {
        if(!this.currentRunningAppId) {
            return this.currentCoreValues
        } else {
            const preset = this.presets.find(p => p.app_id === this.currentRunningAppId)
            this.currentPreset = preset
            if(preset) {
                return preset.value
            } else {
                this.currentPreset = null
                return this.currentCoreValues
            }
        }
    }

    set CurrentCoreValues(values: number[]) {
        this.currentCoreValues = values
        this.emit(Events.UPDATE_CORE_VALUES, values)
    }
    
    constructor() {
        super()    
    }
    public async init() {
        await call('init');
        await this.fetchConfig();
        this.registeredListeners.push(SteamClient.GameSessions.RegisterForAppLifetimeNotifications(this.onAppLifetimeNotification.bind(this)));
        this.registeredListeners.push(SteamClient.System.RegisterForOnResumeFromSuspend(this.onResumeFromSuspend.bind(this)));
        if(this.settings.isRunAutomatically && Router.MainRunningApp) {
            return await this.handleMainRunningApp();
        }
        if(this.settings.runAtStartup) {
            return await this.applyUndervolt(this.globalCoreValues, this.settings.timeoutApply)
        }
        await this.disableUndervolt();
    }
    
    private async handleMainRunningApp(id?: number, label?: string) {
        if (Router.MainRunningApp || (id && label)) {
            this.CurrentRunningAppId = Number(id || Router!.MainRunningApp!.appid!);
            this.CurrentRunningAppName = label || Router!.MainRunningApp!.display_name;
            await this.applyUndervoltBasedOnPreset();
        } else {
            this.CurrentCoreValues = this.globalCoreValues;
        }
    }
    
    private async applyUndervoltBasedOnPreset() {
        const preset: Preset = this.presets.find(p => p.app_id === this.CurrentRunningAppId);
        if (preset) {
            this.currentPreset = preset
            this.CurrentCoreValues = preset.value;
            await this.applyUndervolt(this.currentCoreValues, preset.use_timeout ? preset.timeout : 0 );
        } else {
            this.currentPreset = null
            this.CurrentCoreValues = this.globalCoreValues;
            await this.applyUndervolt(this.globalCoreValues);
        }
    }

    private async fetchConfig() {
        const config = await call('fetch_config') as Config;
        this.globalCoreValues = config.cores;
        this.presets = config.presets;
        this.Settings = config.settings;
    }


    private async onAppLifetimeNotification(app: any) {
        const gameId = app.unAppID;
        const gameInfo = appStore.GetAppOverviewByGameID(gameId);
        if(app.bRunning) {
            await this.handleMainRunningApp(gameId, gameInfo.display_name)
        } else {
            this.CurrentRunningAppId = 0
            this.CurrentRunningAppName = ''
            this.CurrentCoreValues = this.globalCoreValues
            if(this.settings.isGlobal) {
                await this.applyUndervolt(this.globalCoreValues)
            } else {
                await this.disableUndervolt()
            }
        }
    }

    private async onResumeFromSuspend() {
        if(this.undervoltStatus === 'Enabled') {
            await this.applyUndervolt(this.CurrentCoreValues, 5)
        }
    }

    public async saveAndApply(core_values: number[], use_as_preset: boolean, presetSettings: PresetSettings) {
        if(use_as_preset) {
            const presetIndex = this.presets.findIndex(p => p.app_id === this.currentRunningAppId)
            let preset;
            if(presetIndex !== -1) {
                this.presets[presetIndex] = {...this.presets[presetIndex], value: core_values, ...presetSettings}
                preset = this.presets[presetIndex]
            } else {
                preset = {app_id: this.currentRunningAppId, value: core_values, label: this.currentRunningAppName, ...presetSettings}
                this.presets.push(preset)
            }
            this.currentPreset = preset
            await call('save_preset', preset)
        } else {
            this.globalCoreValues = core_values
        }
        await this.applyUndervolt(core_values)
        if(!use_as_preset) {
        await call('save_setting', 'cores', core_values)
        }
    }

    public async applyUndervolt(core_values: number[], timeout = 0) {
        this.CurrentCoreValues = core_values;
        await call('apply_undervolt', core_values, timeout)
    }

    public async resetConfig() {
        const result = await call('reset_config') as Config;
        this.globalCoreValues = result.cores
        this.presets = result.presets
        this.undervoltStatus = result.status
        this.Settings = result.settings
        await this.disableUndervolt();
    }

    public async disableUndervolt() {
        await call('disable_undervolt')
    }

    public destroy() {
        this.registeredListeners.forEach((call: any) => {
            call.unregister()
        })
    }

    public async saveSettings({isGlobal, runAtStartup, isRunAutomatically, timeoutApply}: {isGlobal: boolean, runAtStartup: boolean, isRunAutomatically: boolean, timeoutApply: number}) {
        await call('save_settings', {isGlobal, runAtStartup, isRunAutomatically, timeoutApply})
        this.Settings = {isGlobal, runAtStartup, isRunAutomatically, timeoutApply}
    }

    public async deletePreset(app_id: number) {
        const presetIndex = this.presets.findIndex(p => p.app_id === app_id)
        if(presetIndex !== -1) {
            this.presets.splice(presetIndex, 1)
        }
        await call('delete_preset', app_id)
    }

    public async updatePreset(preset: Preset) {
        const presetIndex = this.presets.findIndex(p => p.app_id === preset.app_id)
        if(presetIndex !== -1) {
            this.presets[presetIndex] = preset
        }
        await call('update_preset', preset)
        if(preset.app_id === this.currentRunningAppId) {
           if(this.settings.isRunAutomatically) {
               await this.applyUndervolt(preset.value)
           }
        }
    }

}

