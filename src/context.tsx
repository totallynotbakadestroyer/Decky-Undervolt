import React, { createContext, useEffect, useState } from "react";
import { Api, getApiInstance } from "./api";
import { State } from "./types";

// @ts-ignore
const Context = createContext<{ state: State; api: Api }>(null);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const initialState: State = {
    runningAppName: null,
    runningAppId: null,
    presets: [],
    status: "Disabled",
    cores: [5, 5, 5, 5],
    globalCores: [5, 5, 5, 5],
    currentPreset: null,
    settings: {
      isGlobal: false,
      runAtStartup: false,
      isRunAutomatically: false,
      timeoutApply: 15,
    },
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
