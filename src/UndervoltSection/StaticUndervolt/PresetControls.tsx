import { Fragment, useContext } from "react";
import { PanelSectionRow, SliderField, ToggleField } from "@decky/ui";
import { Context } from "../../context";
import { useTranslation } from 'react-i18next';

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
          label={t('presetControls.useForCurrentGame', {
            appName: state.runningAppName || t('presetControls.noGameRunning')
          })}
          disabled={!state.runningAppName}
          description={
            !state.runningAppName
              ? t('presetControls.noGameRunning')
              : t('presetControls.descriptionRunningGame', {
                  appName: state.runningAppName
                })
          }
        />
      </PanelSectionRow>
      {state.settings.isRunAutomatically && useAsPreset && (
        <Fragment>
          <PanelSectionRow>
            <ToggleField
              checked={usePresetTimeout}
              onChange={(value) => setUsePresetTimeout(value)}
              label={t('presetControls.useTimeout')}
              description={t('presetControls.timeoutDescription', {
                appName: state.runningAppName
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
                label={t('presetControls.timeoutLabel')}
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
