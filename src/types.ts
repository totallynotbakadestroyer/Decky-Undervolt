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

export type State = {
  runningAppName: string | null;
  runningAppId: number | null;
  status: string;
  cores: number[];
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
