import { createContext, useEffect, useState } from "react";
import { Api, Events } from "./api";

export type State = {
    runningAppName: string | null;
    status: string | null;
    cores: number[];
    settings: {
        isGlobal: boolean;
        runAtStartup: boolean;
        isRunAutomatically: boolean;
        timeoutApply: number;
    };
};

export type AcceptedActions = {
    type: "SET_RUNNING_APP_NAME";
    payload: string;
} | {
    type: "SET_CURRENT_PRESET";
    payload: string;
} | {
    type: "SET_STATUS";
    payload: string;
} | {
    type: "SET_CORES";
    payload: number[];
};

const Context = createContext<[Api, State]>([null as any, {} as any]);


const Provider = ({api, children}: {api: Api, children: React.ReactNode}) => {
    const stateFromApi: State = {
        runningAppName: api.CurrentRunningAppName || null,
        status: api.UndervoltStatus || 'Disabled',
        cores: api.CurrentCoreValues || [5,5,5,5],
        settings: api.Settings || {
            isGlobal: false,
            runAtStartup: false,
            isRunAutomatically: false,
            timeoutApply: 15
        }
    }
    const [state, setState] = useState(stateFromApi);

    useEffect(() => {
        api
            .on(Events.STATUS_UPDATE, (data: string) =>
                setState((state: State) => ({...state, status: data}))
            )
            .on(Events.UNDERVOLT_UPDATE, (payload: {presetName: string, values: number[]}) =>
                setState((state: State) => ({...state, currentPreset: payload.presetName, cores: payload.values}))
            )
            .on(Events.UPDATE_CORE_VALUES, (values: number[]) => {
                console.log(values)
                setState((state: State) => ({...state, cores: values}))
            }
            )
            .on(Events.UPDATE_SETTINGS, (settings: State['settings']) =>
                setState((state: State) => ({...state, settings}))
            )
            .on(Events.UPDATE_CURRENT_RUNNING_APP, (appName: string) =>
                setState((state: State) => ({...state, runningAppName: appName}))
            );


        return () => {
            api.removeAllListeners();
        };
    }, [api]);

    return <Context.Provider value={[api, state]}>{children}</Context.Provider>;
};

export { Context, Provider };