import { Fragment, useContext, useEffect, useState } from "react";
import CoreSlider from "./CoreSlider";
import { PanelSectionRow, ToggleField, ButtonItem } from "decky-frontend-lib";
import { Context } from "../context";

const UndervoltSection = () => {
  const [cores, setCores] = useState<number[]>([5,5,5,5]);
  const [status, setStatus] = useState<string>("");
  const [isTemporary, setIsTemporary] = useState<boolean>(false);
  const [useAsPreset, setUseAsPreset] = useState<boolean>(false);

  const [api, state]  = useContext(Context);

  useEffect(() => {
    setStatus(state.status!);
    setCores(state.cores);
  }, [state.status, state.cores]);

  useEffect(() => {
    setUseAsPreset(!!state.currentPreset);
  }, [state.currentPreset]);

  const updateCore = (index: number, value: number) => {
    const newCores = [...cores];
    newCores[index] = value;
    setCores(newCores);
  };

  const updateCoreValues = async () => {
    await api.applyUndervolt(cores, isTemporary, useAsPreset, !useAsPreset);
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
        <ToggleField
          checked={isTemporary}
          onChange={(value) => setIsTemporary(value)}
          label={"Reset changes on restart?"}
          description={
            "Changes will go back to default values after reboot. Use this to test your settings before applying them permanently to prevent any issues."
          }
        />
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

      {cores.map((core: number, index: number) => (
        <CoreSlider
          key={index}
          coreValue={core}
          coreNumber={index}
          setCoreValue={(value) => updateCore(index, value)}
        />
      ))}
      <PanelSectionRow>
        <ButtonItem layout={"below"} onClick={() => updateCoreValues()}>
          Save & Apply
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem layout={"below"} onClick={() => handleReset()}>
          Reset
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem layout={"below"} onClick={() => handleDisableUndervolt()}>
          Disable
        </ButtonItem>
      </PanelSectionRow>
    </Fragment>
  );
};

export default UndervoltSection;
