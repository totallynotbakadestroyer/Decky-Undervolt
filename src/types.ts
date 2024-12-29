export interface AppStore {
  GetAppOverviewByGameID: (id: string) => AppOverview;
}

export interface AppOverview {
  appid: number;
  display_name: string;
}

export interface SteamClient {
  System: any;
  GameSessions: any;
}

export interface DynamicCoreSettings {
  maximumValue: number;
  minimumValue: number;
  threshold: number;
  manualPoints: { point: number; value: number }[];
}

export type State = {
  runningAppName: string | null;
  runningAppId: number | null;
  gymdeckRunning: boolean;
  status: string;
  cores: number[];
  isDynamic: boolean;
  dynamicSettings: {
    strategy: "MANUAL" | "AGGRESSIVE" | "DEFAULT";
    cores: DynamicCoreSettings[];
  };
  globalCores: number[];
  currentPreset: Preset | null;
  presets: Preset[];
  settings: {
    isGlobal: boolean;
    runAtStartup: boolean;
    isRunAutomatically: boolean;
    timeoutApply: number;
  };
};

export interface Preset {
  app_id: number;
  value: number[];
  label: string;
  use_timeout: boolean;
  timeout: number;
}

export enum Events {
  UPDATE_STATUS = "update_status",
}

export type ServerEventType = "update_status";

declare global {
  // @ts-ignore
  let appStore: AppStore;
  // @ts-ignore
  let SteamClient: SteamClient;
}
