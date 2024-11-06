import {
  ButtonItem,
  PanelSectionRow,
  TextField,
  ToggleField,
} from "decky-frontend-lib";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { useTranslation } from "react-i18next";
import '../i18n'; 

const Settings = () => {
  const { t } = useTranslation();
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
  };

  const handleTimeoutApplyChange = ($event: { target: { value: any; }; }) => {
    const value = Number($event?.target?.value);
    if (!isNaN(value)) {
      setSettings({ ...settings, timeoutApply: value });
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
  };

  useEffect(() => {
    setSettings({ ...state.settings });
  }, [state.settings]);

  const { isGlobal, runAtStartup, isRunAutomatically, timeoutApply } = settings;

  return (
    <Fragment>
      <PanelSectionRow>
        <ToggleField
          label={t("useGlobally")}
          checked={isGlobal}
          onChange={(checked) =>
            setSettings({ ...settings, isGlobal: checked })
          }
          description={t("useGloballyDescription")}
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <ToggleField
          label={t("runWithGame")}
          checked={isRunAutomatically}
          onChange={(checked) =>
            setSettings({ ...settings, isRunAutomatically: checked })
          }
          description={t("runWithGameDescription")}
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <ToggleField
          label={t("runAtStartup")}
          checked={runAtStartup}
          onChange={(checked) =>
            setSettings({ ...settings, runAtStartup: checked })
          }
          description={t("runAtStartupDescription")}
        />
      </PanelSectionRow>
      {runAtStartup && (
        <PanelSectionRow>
          <TextField
            label={t("timeoutApply")}
            mustBeNumeric={true}
            value={String(timeoutApply)}
            onChange={handleTimeoutApplyChange}
            description={t("timeoutApplyDescription")}
          />
        </PanelSectionRow>
      )}
      <PanelSectionRow>
        <ButtonItem disabled={loadingReset} onClick={handleResetConfig} layout="inline">
          {loadingReset ? t("resettingConfig") : t("resetConfig")}
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem disabled={loadingSave} onClick={handleSaveSettings} layout="inline">
          {loadingSave ? t("savingSettings") : t("saveSettings")}
        </ButtonItem>
      </PanelSectionRow>
    </Fragment>
  );
};

export default Settings;
