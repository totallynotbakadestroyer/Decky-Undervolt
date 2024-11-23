import { Fragment, useContext } from "react";
import { PanelSectionRow, SliderField, ToggleField } from "@decky/ui";
import { Context } from "../../context";
import { useTranslation } from "react-i18next";

const PresetControls = ({
  useAsPreset,
  setUseAsPreset,
  usePresetTimeout,
  setUsePresetTimeout,
  presetTimeout,
  setPresetTimeout,
}: {
  useAsPreset: boolean;
  setUseAsPreset: (value: boolean) => void;
  usePresetTimeout: boolean;
  setUsePresetTimeout: (value: boolean) => void;
  presetTimeout: number;
  setPresetTimeout: (value: number) => void;
}) => {
  const { state } = useContext(Context);
  const { t } = useTranslation();

  return (
    <Fragment>
      <PanelSectionRow>
        <ToggleField
          checked={useAsPreset}
          onChange={(value) => setUseAsPreset(value)}
          label={t("staticUndervolt.useForCurrentGame", {
            appName:
              state.runningAppName ||
              t("staticUndervolt.currentGamePlaceholder"),
          })}
          disabled={!state.runningAppName}
          description={
            state.runningAppName
              ? t("staticUndervolt.descriptionRunningGame", {
                  appName: state.runningAppName,
                })
              : t("staticUndervolt.noGameRunning")
          }
        />
      </PanelSectionRow>
      {state.settings.isRunAutomatically && useAsPreset && (
        <Fragment>
          <PanelSectionRow>
            <ToggleField
              checked={usePresetTimeout}
              onChange={(value) => setUsePresetTimeout(value)}
              label={t("presetControls.useTimeout")}
              description={t("presetControls.timeoutDescription", {
                appName: state.runningAppName,
              })}
            />
          </PanelSectionRow>
          {usePresetTimeout && (
            <PanelSectionRow>
              <SliderField
                bottomSeparator="standard"
                min={0}
                showValue
                max={1000}
                step={1}
                label={t("presetControls.timeoutLabel")}
                value={presetTimeout}
                onChange={setPresetTimeout}
              />
            </PanelSectionRow>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default PresetControls;
