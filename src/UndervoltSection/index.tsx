import { Fragment, useContext, useEffect, useState } from "react";
import CoreSlider from "./CoreSlider";
import { PanelSectionRow, ToggleField, ButtonItem } from "decky-frontend-lib";
import { Context } from "../context";

const UndervoltSection = () => {
  const [cores, setCores] = useState<number[]>([5,5,5,5]);
  const [status, setStatus] = useState<string>("");
  const [useAsPreset, setUseAsPreset] = useState<boolean>(false);


  const [api, state]  = useContext(Context);

  useEffect(() => {
    setStatus(state.status!);
    setCores(state.cores);
    setUseAsPreset(!!state.currentPreset);
  }, [state.status, state.cores]);

  const [loading, setLoading] = useState(false);

  const updateCore = (index: number, value: number) => {
    const newCores = [...cores];
    newCores[index] = value;
    setCores(newCores);
  };

  const updateCoreValues = async () => {
    setLoading(true);
    try {
      await api.applyUndervolt(cores, useAsPreset, !useAsPreset);
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

export default UndervoltSection;
