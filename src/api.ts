import EventEmitter from "eventemitter3";
import { call } from "@decky/api";
import { Router } from "@decky/ui";
import { Preset, ServerEventType, State } from "./types";

let apiInstance: Api | null = null;

export const getApiInstance = (initialState: State) => {
  if (!apiInstance) {
    apiInstance = new Api(initialState);
  }
  return apiInstance;
};

export class Api extends EventEmitter {
  private state: State;
  private registeredListeners: any[] = [];

  constructor(initialState: State) {
    super();
    this.state = initialState;
  }

  setState(newState: Partial<State>) {
    this.state = { ...this.state, ...newState };
    this.emit("state_change", this.state);
  }

  getState(): State {
    return this.state;
  }

  public async init() {
    await call("init");
    await this.fetchConfig();
    this.registeredListeners.push(
      SteamClient.GameSessions.RegisterForAppLifetimeNotifications(
        this.onAppLifetimeNotification.bind(this),
      ),
    );
    this.registeredListeners.push(
      SteamClient.System.RegisterForOnResumeFromSuspend(
        this.onResumeFromSuspend.bind(this),
      ),
    );
    if (this.state.settings.isRunAutomatically && Router.MainRunningApp) {
      return await this.handleMainRunningApp();
    }
    if (this.state.settings.runAtStartup) {
      return await this.applyUndervolt(
        this.state.cores,
        this.state.settings.timeoutApply,
      );
    }
    await this.disableUndervolt();
  }

  private async fetchConfig() {
    const config = (await call("fetch_config")) as any;
    this.setState({
      dynamicSettings: config.dynamicSettings,
      globalCores: config.cores,
      cores: config.cores,
      settings: config.settings,
      presets: config.presets,
      status: config.status,
    });
  }

  private async handleMainRunningApp(id?: number, label?: string) {
    if (Router.MainRunningApp || (id && label)) {
      this.setState({
        runningAppName: label || Router.MainRunningApp?.display_name || null,
        runningAppId: id || Number(Router.MainRunningApp?.appid) || null,
      });
      await this.applyUndervoltBasedOnPreset();
    } else {
      this.setState({ cores: this.state.globalCores });
    }
  }

  private async applyUndervoltBasedOnPreset() {
    const preset: Preset | undefined = this.state.presets.find(
      (p) => p.app_id === this.state.runningAppId,
    );
    if (preset) {
      this.setState({ cores: preset.value, currentPreset: preset });
      await this.applyUndervolt(
        preset.value,
        preset.use_timeout ? preset.timeout : 0,
      );
    } else {
      await this.applyUndervolt(this.state.globalCores);
    }
  }

  private async onAppLifetimeNotification(app: any) {
    const gameId = app.unAppID;
    const gameInfo = appStore.GetAppOverviewByGameID(gameId);
    if (app.bRunning) {
      if (!this.state.settings.isRunAutomatically) return;
      await this.handleMainRunningApp(gameId, gameInfo.display_name);
    } else {
      this.setState({ runningAppName: null, cores: this.state.globalCores });
      if (this.state.settings.isGlobal && this.state.status === "enabled") {
        await this.applyUndervolt(this.state.globalCores);
      } else {
        await this.disableUndervolt();
      }
    }
  }

  private async onResumeFromSuspend() {
    if (this.state.status === "enabled") {
      await this.applyUndervolt(this.state.cores, 5);
    }
  }

  public async enableGymdeck() {
    await call("start_gymdeck", this.state.dynamicSettings);
  }

  public async disableGymdeck() {
    await call('stop_gymdeck')
  }

  public async applyUndervolt(core_values: number[], timeout = 0) {
    this.setState({ cores: core_values });
    await call("apply_undervolt", core_values, timeout);
  }

  public async disableUndervolt() {
    await call("disable_undervolt");
  }

  public async saveAndApply(
    core_values: number[],
    use_as_preset: boolean,
    presetSettings: Pick<Preset, "timeout" | "use_timeout">,
  ) {
    if (use_as_preset) {
      const presetIndex = this.state.presets.findIndex(
        (p) => p.app_id === this.state.runningAppId,
      );
      let preset;
      const presets = [...this.state.presets];
      if (presetIndex !== -1) {
        presets[presetIndex] = {
          ...presets[presetIndex],
          ...presetSettings,
          value: core_values,
        };
        preset = presets[presetIndex];
      } else {
        preset = {
          ...presetSettings,
          app_id: this.state.runningAppId!,
          value: core_values,
          label: this.state.runningAppName!,
        };
        presets.push(preset);
      }
      this.setState({ presets, currentPreset: preset });
      await call("save_preset", preset);
    } else {
      this.setState({ cores: core_values, globalCores: core_values });
    }
    await this.applyUndervolt(core_values);
    if (!use_as_preset) {
      await call("save_setting", "cores", core_values);
    }
  }

  public async saveSettings(settings: State["settings"]) {
    await call("save_settings", settings);
    this.setState({ settings });
  }

  public async resetConfig() {
    const result = (await call("reset_config")) as any;
    this.setState({
      globalCores: result.cores,
      cores: result.cores,
      settings: result.settings,
      status: "Disabled",
      currentPreset: null,
    });
    await this.disableUndervolt();
  }

  public destroy() {
    this.registeredListeners.forEach((call: any) => {
      call.unregister();
    });
  }

  public async deletePreset(app_id: number) {
    const presets = [...this.state.presets];
    const presetIndex = presets.findIndex((p) => p.app_id === app_id);
    if (presetIndex !== -1) {
      presets.splice(presetIndex, 1);
    }
    this.setState({ presets });
    await call("delete_preset", app_id);
  }

  public async updatePreset(preset: Preset) {
    const presets = [...this.state.presets];
    const presetIndex = presets.findIndex((p) => p.app_id === preset.app_id);
    if (presetIndex !== -1) {
      presets[presetIndex] = preset;
    }
    this.setState({ presets });
    await call("update_preset", preset);
    if (preset.app_id === this.state.runningAppId) {
      if (this.state.settings.isRunAutomatically) {
        await this.applyUndervolt(preset.value);
      }
    }
  }

  public handleServerEvent({
    type,
    data,
  }: {
    type: ServerEventType;
    data: any;
  }) {
    switch (type) {
      case "update_status":
        this.setState({ status: data });
        break;
      default:
        break;
    }
  }
}
