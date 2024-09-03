import { Fragment, useContext, useEffect, useState } from "react";
import CoreSlider from "../components/CoreSlider";
import { PanelSectionRow, ToggleField, ButtonItem, SliderField } from "@decky/ui";
import { Context } from "../context";

const MainMenu = ({setCurrentPage}: {setCurrentPage: (page: string) => void}) => {
  const [cores, setCores] = useState<number[]>([5,5,5,5]);
  const [status, setStatus] = useState<string>("");
  const [useAsPreset, setUseAsPreset] = useState<boolean>(false);
  const [usePresetTimeout, setUsePresetTimeout] = useState<boolean>(false);
  const [presetTimeout, setPresetTimeout] = useState<number>(0);


  const [api, state]  = useContext(Context);

  useEffect(() => {
    setStatus(state.status!);
    setCores(state.cores);
    setUseAsPreset(!!state.currentPreset && !!state.runningAppName);
    setUsePresetTimeout(state?.currentPreset?.use_timeout || false);
    setPresetTimeout(state?.currentPreset?.timeout || 0);
  }, [state.status, state.cores, state.currentPreset, state.runningAppName]);

  const [loading, setLoading] = useState(false);

  const updateCore = (index: number, value: number) => {
    const newCores = [...cores];
    newCores[index] = value;
    setCores(newCores);
  };

  const updateCoreValues = async () => {
    setLoading(true);
    try {
      await api.saveAndApply(cores, useAsPreset, {use_timeout: usePresetTimeout, timeout: presetTimeout});
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const handleReset = async () => {
    setCores([5, 5, 5, 5]);
  };

  const handleDisableUndervolt = async () => {
    await api.disableUndervolt();
  };

  return (
    <Fragment>
      <PanelSectionRow>
        Undervolt Status: {status}
      </PanelSectionRow>

      <PanelSectionRow>
        <ButtonItem layout="below" onClick={() => setCurrentPage("preset-manager")}>
          Preset Manager
        </ButtonItem>
      </PanelSectionRow>

      <PanelSectionRow>
      <ToggleField
          checked={useAsPreset}
          onChange={(value) => setUseAsPreset(value)}
          label={`Use only for ${state.runningAppName ? state.runningAppName : 'current game'}?`}
          disabled={!state.runningAppName}
          description={
            !state.runningAppName ? 'No game is running, please start a game to use this feature. Undervolting settings will be applied globally.' :
            `Checking this will save the undervolt settings and will apply them only when ${state.runningAppName ? state.runningAppName : 'specific game'} is running instead of applying it globally.`
          }
        />  
      </PanelSectionRow>
      {(api.Settings.isRunAutomatically && useAsPreset) && (
        <Fragment>
          <PanelSectionRow>
            <ToggleField
              checked={usePresetTimeout}
              onChange={(value) => setUsePresetTimeout(value)}
              label={"Use timeout for this preset?"}
              description={
                `Checking this will apply the undervolt after some time when ${state.runningAppName ? state.runningAppName : 'specific game'} is opened. Might be useful for games with launchers.`
              }
            />
          </PanelSectionRow>
          {usePresetTimeout && (
            <PanelSectionRow>
            <SliderField
            bottomSeparator={'standard'}
              min={0}
              showValue
              max={1000}
              step={1}
              label={"Timeout in seconds"}
              value={presetTimeout}
              onChange={setPresetTimeout} />
            </PanelSectionRow>
          )}
        </Fragment>
      )}

      {cores.map((core: number, index: number) => (
        <CoreSlider
          key={index}
          coreValue={core}
          coreNumber={index}
          setCoreValue={(value) => updateCore(index, value)}
        />
      ))}
      <PanelSectionRow>
        <ButtonItem disabled={loading} layout={"below"} onClick={() => updateCoreValues()}>
          {loading ? "Applying..." : "Save & Apply"}
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem disabled={loading} layout={"below"} onClick={() => handleReset()}>
          Reset
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem disabled={loading} layout={"below"} onClick={() => handleDisableUndervolt()}>
          Disable
        </ButtonItem>
      </PanelSectionRow>
    </Fragment>
  );
};

export default MainMenu;
