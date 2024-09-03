import {
  ButtonItem,
  PanelSectionRow,
  TextField,
  ToggleField,
} from "@decky/ui";
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

  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);

  const handleSaveSettings = async () => {
    setLoadingSave(true);
    try {
    await api.saveSettings(settings);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setLoadingSave(false), 1000);
    }
  }

  const handleTimeoutApplyChange = ($event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number($event?.target?.value);
    if (!isNaN(Number(value))) {
      setSettings({ ...settings, timeoutApply: Number(value) });
    }
  };

  const handleResetConfig = async () => {
    setLoadingReset(true);
    try {
    await api.resetConfig();
    setSettings({ ...state.settings });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setLoadingReset(false), 1000);
    }
  }

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
            onChange={handleTimeoutApplyChange}
            description={
              "The time in seconds to wait before applying the undervolt at startup."
            }
          />
        </PanelSectionRow>
      )}
      <PanelSectionRow>
        <ButtonItem disabled={loadingReset} onClick={handleResetConfig} layout="inline">
          {loadingReset ? 'Resetting Config...' : 'Reset Config'}
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem disabled={loadingSave} onClick={handleSaveSettings} layout="inline">
          {loadingSave ? "Saving Settings..." : "Save Settings"}
        </ButtonItem>
      </PanelSectionRow>
    </Fragment>
  );
};

export default Settings;
