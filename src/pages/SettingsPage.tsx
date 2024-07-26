import {
  ButtonItem,
  PanelSectionRow,
  TextField,
  ToggleField,
} from "decky-frontend-lib";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../context";

const Settings = () => {
  const [settings, setSettings] = useState({
    isGlobal: false,
    runAtStartup: false,
    isRunAutomatically: false,
    timeoutApply: 0,
  });
  const [api, state] = useContext(Context);

  useEffect(() => {
    setSettings({ ...state.settings });
  }, [state.settings]);

  const { isGlobal, runAtStartup, isRunAutomatically, timeoutApply } = settings;

  return (
    <Fragment>
      <PanelSectionRow>
        <ToggleField
          label="Use Globally"
          checked={isGlobal}
          onChange={(checked) =>
            setSettings({ ...settings, isGlobal: checked })
          }
          description={
            "Undervolt will persist even if the game is closed. By default, it turns off when the game is not running."
          }
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <ToggleField
          label="Run With Game"
          checked={isRunAutomatically}
          onChange={(checked) =>
            setSettings({ ...settings, isRunAutomatically: checked })
          }
          description={
            "Undervolt will be applied automatically when the game starts."
          }
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <ToggleField
          label="Run at Startup"
          checked={runAtStartup}
          onChange={(checked) =>
            setSettings({ ...settings, runAtStartup: checked })
          }
          description={
            "Undervolt will be applied automatically when the system starts."
          }
        />
      </PanelSectionRow>
      {runAtStartup && (
        <PanelSectionRow>
          <TextField
            label="Timeout Apply"
            mustBeNumeric={true}
            value={String(timeoutApply)}
            onChange={(value) =>
              !isNaN(Number(value)) &&
              setSettings({ ...settings, timeoutApply: Number(value) })
            }
            description={
              "The time in seconds to wait before applying the undervolt at startup."
            }
          />
        </PanelSectionRow>
      )}
      <PanelSectionRow>
        <ButtonItem onClick={() => api.resetConfig()} layout="inline">
          Reset Config
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem onClick={() => api.saveSettings(settings)} layout="inline">
          Apply
        </ButtonItem>
      </PanelSectionRow>
    </Fragment>
  );
};

export default Settings;
