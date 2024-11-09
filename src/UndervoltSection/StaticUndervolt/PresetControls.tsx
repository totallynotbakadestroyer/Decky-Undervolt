import { Fragment, useContext } from "react";
import { PanelSectionRow, SliderField, ToggleField } from "@decky/ui";
import { Context } from "../../context";

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
  return (
    <Fragment>
      <PanelSectionRow>
        <ToggleField
          checked={useAsPreset}
          onChange={(value) => setUseAsPreset(value)}
          label={`Use only for ${state.runningAppName ? state.runningAppName : "current game"}?`}
          disabled={!state.runningAppName}
          description={
            !state.runningAppName
              ? "No game is running, please start a game to use this feature. Undervolting settings will be applied globally."
              : `Checking this will save the undervolt settings and will apply them only when ${state.runningAppName} is running instead of applying it globally.`
          }
        />
      </PanelSectionRow>
      {state.settings.isRunAutomatically && useAsPreset && (
        <Fragment>
          <PanelSectionRow>
            <ToggleField
              checked={usePresetTimeout}
              onChange={(value) => setUsePresetTimeout(value)}
              label={"Use timeout for this preset?"}
              description={`Checking this will apply the undervolt after some time when ${state.runningAppName} is opened. Might be useful for games with launchers.`}
            />
          </PanelSectionRow>
          {usePresetTimeout && (
            <PanelSectionRow>
              <SliderField
                bottomSeparator={"standard"}
                min={0}
                showValue
                max={1000}
                step={1}
                label={"Timeout in seconds"}
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
