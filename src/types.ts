export interface AppStore {
  GetAppOverviewByGameID: (id: string) => AppOverview;
}

export interface AppOverview {
  appid: number;
  display_name: string;
}

export interface SteamClient {
  GameSessions: any;
}

export type ServerEventType = "status_update";

declare global {
  // @ts-ignore
  let appStore: AppStore;
  // @ts-ignore
  let SteamClient: SteamClient;
}
