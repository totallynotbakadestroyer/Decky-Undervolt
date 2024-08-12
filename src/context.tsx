import { createContext, useEffect, useState } from "react";
import { Api, Events, Preset } from "./api";

export type State = {
    runningAppName: string | null;
    status: string | null;
    cores: number[];
    currentPreset: null | Preset;
    settings: {
        isGlobal: boolean;
        runAtStartup: boolean;
        isRunAutomatically: boolean;
        timeoutApply: number;
    };
};

const Context = createContext<[Api, State]>([null as any, {} as any]);


const Provider = ({api, children}: {api: Api, children: React.ReactNode}) => {
    const stateFromApi: State = {
        runningAppName: api.CurrentRunningAppName || null,
        status: api.UndervoltStatus || 'Disabled',
        cores: api.CurrentCoreValues || [5,5,5,5],
        currentPreset: api.CurrentPreset || null,
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
            .on(Events.UPDATE_CORE_VALUES, (values: number[]) => {
                setState((state: State) => ({...state, cores: values}))
            }
            )
            .on(Events.UPDATE_SETTINGS, (settings: State['settings']) =>
                setState((state: State) => ({...state, settings}))
            )
            .on(Events.UPDATE_CURRENT_RUNNING_APP, (appName: string) =>
                setState((state: State) => ({...state, runningAppName: appName}))
            )
            .on(Events.UPDATE_CURRENT_PRESET, (currentPreset: Preset | null) =>
                setState((state: State) => ({...state, currentPreset}))
            );


        return () => {
            api.removeAllListeners();
        };
    }, [api]);

    return <Context.Provider value={[api, state]}>{children}</Context.Provider>;
};

export { Context, Provider };