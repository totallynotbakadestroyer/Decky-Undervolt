import { Fragment, useContext, useEffect, useState } from "react";
import CoreSlider from "../components/CoreSlider";
import { PanelSectionRow, ToggleField, ButtonItem, SliderField } from "decky-frontend-lib";
import { Context } from "../context";
import { useTranslation } from "react-i18next";
import "../translations/i18n";

const MainMenu = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
  const { t } = useTranslation();

  const [cores, setCores] = useState<number[]>([5, 5, 5, 5]);
  const [status, setStatus] = useState<string>("");
  const [useAsPreset, setUseAsPreset] = useState<boolean>(false);
  const [usePresetTimeout, setUsePresetTimeout] = useState<boolean>(false);
  const [presetTimeout, setPresetTimeout] = useState<number>(0);

  const [api, state] = useContext(Context);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(state.status!);
    setCores(state.cores);
    setUseAsPreset(!!state.currentPreset && !!state.runningAppName);
    setUsePresetTimeout(state?.currentPreset?.use_timeout || false);
    setPresetTimeout(state?.currentPreset?.timeout || 0);
  }, [state]);

  const updateCoreValues = async () => {
    setLoading(true);
    try {
      await api.saveAndApply(cores, useAsPreset, { use_timeout: usePresetTimeout, timeout: presetTimeout });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <PanelSectionRow>
        {t("mainMenu.status", { status })}
      </PanelSectionRow>

      <PanelSectionRow>
        <ButtonItem layout="below" onClick={() => setCurrentPage("preset-manager")}>
          {t("mainMenu.presetManagerButton")}
        </ButtonItem>
      </PanelSectionRow>

      <PanelSectionRow>
        <ToggleField
          checked={useAsPreset}
          onChange={(value) => setUseAsPreset(value)}
          label={t("mainMenu.useAsPresetToggle", { runningAppName: state.runningAppName || "current game" })}
          disabled={!state.runningAppName}
          description={
            state.runningAppName
              ? t("mainMenu.useAsPresetToggleDescription.withGame", { runningAppName: state.runningAppName })
              : t("mainMenu.useAsPresetToggleDescription.noGame")
          }
        />
      </PanelSectionRow>

      {useAsPreset && (
        <Fragment>
          <PanelSectionRow>
            <ToggleField
              checked={usePresetTimeout}
              onChange={(value) => setUsePresetTimeout(value)}
              label={t("mainMenu.useTimeoutToggle")}
              description={t("mainMenu.useTimeoutDescription", { runningAppName: state.runningAppName || "game" })}
            />
          </PanelSectionRow>
          {usePresetTimeout && (
            <PanelSectionRow>
              <SliderField
                min={0}
                max={1000}
                step={1}
                label={t("mainMenu.timeoutSlider")}
                value={presetTimeout}
                onChange={setPresetTimeout}
              />
            </PanelSectionRow>
          )}
        </Fragment>
      )}

      {cores.map((core, index) => (
        <CoreSlider
          key={index}
          coreValue={core}
          coreNumber={index}
          setCoreValue={(value) => setCores((prev) => {
            const newCores = [...prev];
            newCores[index] = value;
            return newCores;
          })}
        />
      ))}
      
      <PanelSectionRow>
        <ButtonItem disabled={loading} onClick={updateCoreValues}>
          {loading ? t("mainMenu.applyLoading") : t("mainMenu.saveApplyButton")}
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem onClick={() => setCores([5, 5, 5, 5])}>
          {t("mainMenu.resetButton")}
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem onClick={() => api.disableUndervolt()}>
          {t("mainMenu.disableButton")}
        </ButtonItem>
      </PanelSectionRow>
    </Fragment>
  );
};

export default MainMenu;
