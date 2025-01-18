import React, { createContext, useEffect, useState } from "react";
import { Api, getApiInstance } from "./api";
import { State } from "./types";

// @ts-ignore
const Context = createContext<{ state: State; api: Api }>(null);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const initialState: State = {
    gymdeckRunning: false,
    isDynamic: false,
    dynamicSettings: {
      cores: [
        { manualPoints: [], maximumValue: 100, minimumValue: 0, threshold: 0 },
        { manualPoints: [], maximumValue: 100, minimumValue: 0, threshold: 0 },
        { manualPoints: [], maximumValue: 100, minimumValue: 0, threshold: 0 },
        { manualPoints: [], maximumValue: 100, minimumValue: 0, threshold: 0 },
      ],
      sampleInterval: 50000,
      strategy: "DEFAULT",
    },
    runningAppName: null,
    runningAppId: null,
    status: "Disabled",
    cores: [5, 5, 5, 5],
    currentPreset: null,
    presets: [],
    settings: {
      isGlobal: false,
      runAtStartup: false,
      isRunAutomatically: false,
      timeoutApply: 15,
    },
    globalCores: [],
  };

  const api = getApiInstance(initialState);
  const [state, setState] = useState<State>(api.getState());

  useEffect(() => {
    const handleStateChange = (newState: State) => {
      setState((prev) => ({ ...prev, ...newState }));
    };

    api.on("state_change", handleStateChange);
    return () => {
      api.removeListener("state_change", handleStateChange);
    };
  }, [api]);

  return <Context.Provider value={{ state, api }}>{children}</Context.Provider>;
};

export { Context, Provider };
