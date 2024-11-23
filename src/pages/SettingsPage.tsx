import { ButtonItem, PanelSectionRow, TextField, ToggleField } from "@decky/ui";
import { ChangeEvent, Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    isGlobal: false,
    runAtStartup: false,
    isRunAutomatically: false,
    timeoutApply: 0,
  });
  const { api, state } = useContext(Context);

  useEffect(() => {
    setSettings({ ...state.settings });
  }, [state]);

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

  const handleTimeoutApplyChange = ($event: ChangeEvent<HTMLInputElement>) => {
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
  };

  const { isGlobal, runAtStartup, isRunAutomatically, timeoutApply } = settings;

  return (
    <Fragment>
      <PanelSectionRow>
        <ToggleField
          label={t("settings.useGlobally")}
          checked={isGlobal}
          onChange={(checked) =>
            setSettings({ ...settings, isGlobal: checked })
          }
          description={t("settings.useGloballyDescription")}
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <ToggleField
          label={t("settings.runWithGame")}
          checked={isRunAutomatically}
          onChange={(checked) =>
            setSettings({ ...settings, isRunAutomatically: checked })
          }
          description={t("settings.runWithGameDescription")}
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <ToggleField
          label={t("settings.runAtStartup")}
          checked={runAtStartup}
          onChange={(checked) =>
            setSettings({ ...settings, runAtStartup: checked })
          }
          description={t("settings.runAtStartupDescription")}
        />
      </PanelSectionRow>
      {runAtStartup && (
        <PanelSectionRow>
          <TextField
            label={t("settings.timeoutApply")}
            mustBeNumeric={true}
            value={String(timeoutApply)}
            onChange={handleTimeoutApplyChange}
            description={t("settings.timeoutApplyDescription")}
          />
        </PanelSectionRow>
      )}
      <PanelSectionRow>
        <ButtonItem
          disabled={loadingReset}
          onClick={handleResetConfig}
          layout="inline"
        >
          {loadingReset
            ? t("settings.resettingConfig")
            : t("settings.resetConfig")}
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem
          disabled={loadingSave}
          onClick={handleSaveSettings}
          layout="inline"
        >
          {loadingSave
            ? t("settings.savingSettings")
            : t("settings.saveSettings")}
        </ButtonItem>
      </PanelSectionRow>
    </Fragment>
  );
};

export default Settings;
