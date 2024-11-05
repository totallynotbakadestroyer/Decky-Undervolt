import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UndervoltStatus from "../../components/UndervoltStatus";
import { ButtonItem, PanelSectionRow } from "@decky/ui";
import PresetControls from "./PresetControls";
import CoreSliders from "../components/CoreSliders";
import ActionButtons from "./ActionButtons";

const StaticUndervolt = ({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) => {
  const [cores, setCores] = useState<number[]>([5, 5, 5, 5]);
  const [useAsPreset, setUseAsPreset] = useState<boolean>(false);
  const [usePresetTimeout, setUsePresetTimeout] = useState<boolean>(false);
  const [presetTimeout, setPresetTimeout] = useState<number>(0);

  const [api, state] = useContext(Context);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCores(state.cores);
    setUseAsPreset(!!state.currentPreset && !!state.runningAppName);
    setUsePresetTimeout(state?.currentPreset?.use_timeout || false);
    setPresetTimeout(state?.currentPreset?.timeout || 0);
  }, [state.status, state.cores, state.currentPreset, state.runningAppName]);

  const updateCore = (index: number, value: number) => {
    const newCores = [...cores];
    newCores[index] = value;
    setCores(newCores);
  };

  const updateCoreValues = async () => {
    setLoading(true);
    try {
      await api.saveAndApply(cores, useAsPreset, {
        use_timeout: usePresetTimeout,
        timeout: presetTimeout,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const handleReset = () => setCores([5, 5, 5, 5]);

  const handleDisableUndervolt = async () => {
    await api.disableUndervolt();
  };

  return (
    <Fragment>
      <UndervoltStatus />
      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => setCurrentPage("preset-manager")}
        >
          Preset Manager
        </ButtonItem>
      </PanelSectionRow>
      <PresetControls
        useAsPreset={useAsPreset}
        setUseAsPreset={setUseAsPreset}
        usePresetTimeout={usePresetTimeout}
        setUsePresetTimeout={setUsePresetTimeout}
        presetTimeout={presetTimeout}
        setPresetTimeout={setPresetTimeout}
      />
      <CoreSliders cores={cores} updateCore={updateCore} />
      <ActionButtons
        loading={loading}
        updateCoreValues={updateCoreValues}
        handleReset={handleReset}
        handleDisableUndervolt={handleDisableUndervolt}
      />
    </Fragment>
  );
};

export default StaticUndervolt;
