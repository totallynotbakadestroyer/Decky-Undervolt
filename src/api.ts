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

export enum Events {
    STATUS_UPDATE = 'status_update',
    UNDERVOLT_UPDATE = 'undervolt_update',
    UPDATE_SETTINGS = 'update_settings',
    UPDATE_CORE_VALUES = 'update_core_values',
    UPDATE_CURRENT_RUNNING_APP = 'update_current_running_app'
}

export class Api extends EventEmitter {
    private api: ServerAPI
    private currentRunningAppName: string = ''
    private currentRunningAppId: number = 0
    private presets: any[] = [];
    private currentCoreValues = [5,5,5,5]
    private globalCoreValues = [5,5,5,5]
    private undervoltStatus = 'Disabled';
    private registeredListeners: any = [];
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

    get CurrentCoreValues() {
        return this.currentCoreValues
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
        await this.api.callPluginMethod('init', {});
        await this.fetchConfig();
        this.registeredListeners.push(SteamClient.GameSessions.RegisterForAppLifetimeNotifications(this.onAppLifetimeNotification.bind(this)));
    
        if (this.settings.runAtStartup) {
            await this.handleMainRunningApp();
            await this.applyUndervolt(this.globalCoreValues, false, false);
        } else {
            await this.disableUndervolt()
            await this.handleMainRunningApp();
        } 
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
            this.CurrentCoreValues = preset.values;
            await this.applyUndervolt(this.currentCoreValues, false, false);
        } else {
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


    private async onAppLifetimeNotification(app: any) {
        if(app.bRunning) {
            this.CurrentRunningAppId = app.unAppID
            this.CurrentRunningAppName = appStore.GetAppOverviewByGameID(app.unAppID).display_name
            if(!this.settings.isRunAutomatically) return
            const preset = this.presets.find(p => p.app_id === this.currentRunningAppId)
            if(preset) {
                this.CurrentCoreValues = preset.value
                await this.applyUndervolt(this.currentCoreValues, false, false)
            } else {
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
    public async applyUndervolt(core_values: number[], is_temporary = false, use_as_preset = false, save_core_values = false) {
        this.UndervoltStatus = !is_temporary ? 'Enabled' : 'Enabled (Temporary)'
        this.CurrentCoreValues = core_values;
        if(use_as_preset) {
            if(!this.presets.find(p => p.app_id === this.currentRunningAppId)) {
                this.presets.push({app_id: this.currentRunningAppId, value: core_values, label: this.currentRunningAppName})
            }
        }
        await this.api.callPluginMethod('apply_undervolt', {core_values, is_temporary, use_as_preset, app_id: this.currentRunningAppId, app_name: this.currentRunningAppName, save_core_values})

    }

    public async disableUndervolt() {
        this.UndervoltStatus = 'Disabled'
        await this.api.callPluginMethod('disable_undervolt', {})
    }

    public updateStatus(status: string) {
        this.UndervoltStatus = status
    }

    public destroy() {
        this.registeredListeners.forEach((call: any) => {
            call.unregister()
        })
    }

    public saveSettings({isGlobal, runAtStartup, isRunAutomatically, timeoutApply}: {isGlobal: boolean, runAtStartup: boolean, isRunAutomatically: boolean, timeoutApply: number}) {
        this.api.callPluginMethod('save_settings', {newSettings: {isGlobal, runAtStartup, isRunAutomatically, timeoutApply}})
        this.Settings = {isGlobal, runAtStartup, isRunAutomatically, timeoutApply}
    }
        

}

