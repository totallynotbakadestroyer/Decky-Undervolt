import { ServerAPI, Router } from "decky-frontend-lib";
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
    label: string
}

export enum Events {
    STATUS_UPDATE = 'status_update',
    UPDATE_SETTINGS = 'update_settings',
    UPDATE_CORE_VALUES = 'update_core_values',
    UPDATE_CURRENT_RUNNING_APP = 'update_current_running_app',
    UPDATE_CURRENT_PRESET = 'update_preset_usage',
    UPDATE_RYZENADJ_STATUS = 'ryzenadj_status_update'
}

export class Api extends EventEmitter {
    private ryzenadjInstalled: boolean = true
    private api: ServerAPI
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

    get RyzenadjInstalled() {
        return this.ryzenadjInstalled
    }

    set RyzenadjInstalled(value: boolean) {
        this.emit(Events.UPDATE_RYZENADJ_STATUS, value)
        this.ryzenadjInstalled = value
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
    
    constructor(serverAPI: ServerAPI) {
        super()
        this.api = serverAPI
    
    }
    public async init() {
        await this.checkRyzenadjInstallation();
        await this.api.callPluginMethod('init', {});
        await 
        await this.fetchConfig();
        this.registeredListeners.push(SteamClient.GameSessions.RegisterForAppLifetimeNotifications(this.onAppLifetimeNotification.bind(this)));
    
        if (this.settings.runAtStartup) {
            await this.handleMainRunningApp();
            await this.applyUndervolt(this.globalCoreValues, false, false, this.settings.timeoutApply);
        } else {
            await this.disableUndervolt()
            await this.handleMainRunningApp();
        } 
    }

    private async checkRyzenadjInstallation() {
        const response = await this.api.callPluginMethod('check_ryzendj', {})
        this.RyzenadjInstalled = response.result as boolean
    }
    
    private async handleMainRunningApp() {
        if (Router.MainRunningApp) {
            const appId = Router.MainRunningApp.appid;
            this.CurrentRunningAppId = Number(appId);
            this.CurrentRunningAppName = Router.MainRunningApp.display_name;
            await this.applyUndervoltBasedOnPreset();
        } else {
            this.CurrentCoreValues = this.globalCoreValues;
        }
    }
    
    private async applyUndervoltBasedOnPreset() {
        const preset = this.presets.find(p => p.app_id === this.CurrentRunningAppId);
        if (preset) {
            this.currentPreset = preset
            this.CurrentCoreValues = preset.values;
            await this.applyUndervolt(this.currentCoreValues, false, false);
        } else {
            this.currentPreset = null
            this.CurrentCoreValues = this.globalCoreValues;
            await this.applyUndervolt(this.globalCoreValues, false, false);
        }
    }

    private async fetchConfig() {
        const response = await this.api.callPluginMethod('fetch_config', {})
        if (response.success) {
            console.log(response.result, 'fetching config')
            const config = response.result as Config;
            this.globalCoreValues = config.cores;
            this.presets = config.presets;
            this.undervoltStatus = config.status;
            this.Settings = config.settings;
        }
    }

    public async installRyzenadj() {
        await this.api.callPluginMethod('install_ryzenadj', {})
        await this.checkRyzenadjInstallation()
    }


    private async onAppLifetimeNotification(app: any) {
        if(app.bRunning) {
            this.CurrentRunningAppId = app.unAppID
            this.CurrentRunningAppName = appStore.GetAppOverviewByGameID(app.unAppID).display_name
            if(!this.settings.isRunAutomatically) return
            const preset = this.presets.find(p => p.app_id === this.currentRunningAppId)
            if(preset) {
                this.CurrentCoreValues = preset.value
                this.currentPreset = preset
                await this.applyUndervolt(this.currentCoreValues, false, false)
            } else {
                this.currentPreset = null
                await this.applyUndervolt(this.globalCoreValues, false, false)
                this.CurrentCoreValues = this.globalCoreValues
            }
        } else {
            this.CurrentRunningAppId = 0
            this.CurrentRunningAppName = ''
            this.CurrentCoreValues = this.globalCoreValues
            if(this.settings.isGlobal) {
                await this.applyUndervolt(this.globalCoreValues, false, false)
            } else {
                await this.disableUndervolt()
            }
        }
    }
    public async applyUndervolt(core_values: number[], use_as_preset = false, save_core_values = false, timeout = 0) {
        this.CurrentCoreValues = core_values;
        if(save_core_values) this.globalCoreValues = core_values
        if(use_as_preset) {
            const presetIndex = this.presets.findIndex(p => p.app_id === this.currentRunningAppId)
            let preset;
            if(presetIndex !== -1) {
                this.presets[presetIndex].value = core_values
                preset = this.presets[presetIndex]
            } else {
                preset = {app_id: this.currentRunningAppId, value: core_values, label: this.currentRunningAppName}
                this.presets.push(preset)
            }
            this.currentPreset = preset
        }
        this.UndervoltStatus = 'Enabled'
        await this.api.callPluginMethod('apply_undervolt', {core_values, use_as_preset, app_id: this.currentRunningAppId, app_name: this.currentRunningAppName, save_core_values, timeout})

    }

    public async resetConfig() {
        const response = await this.api.callPluginMethod('reset_config', {})
        if(response.success) {
            const result = response.result as Config;
            this.globalCoreValues = result.cores
            this.presets = result.presets
            this.undervoltStatus = result.status
            this.Settings = result.settings
        }
        await this.disableUndervolt();
    }

    public async disableUndervolt() {
        this.UndervoltStatus = 'Disabled'
        await this.api.callPluginMethod('disable_undervolt', {})
    }

    public destroy() {
        this.registeredListeners.forEach((call: any) => {
            call.unregister()
        })
    }

    public async saveSettings({isGlobal, runAtStartup, isRunAutomatically, timeoutApply}: {isGlobal: boolean, runAtStartup: boolean, isRunAutomatically: boolean, timeoutApply: number}) {
        await this.api.callPluginMethod('save_settings', {newSettings: {isGlobal, runAtStartup, isRunAutomatically, timeoutApply}})
        this.Settings = {isGlobal, runAtStartup, isRunAutomatically, timeoutApply}
    }
        

}

