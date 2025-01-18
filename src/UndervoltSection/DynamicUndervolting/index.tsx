import { Fragment, useContext, useState } from "react";
import UndervoltStatus from "../../components/UndervoltStatus";
import ActionButtons from "./ActionButtons";
import StrategySelector from "./StrategySelector";
import DynamicCoreSettings from "./DynamicCoreSettings";
import { Context } from "../../context";
import { PanelSectionRow, SliderField, ToggleField } from "@decky/ui";

const DynamicUndervolt = () => {
  const { api, state } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [dynamicSettings, setDynamicSettings] = useState({
    ...state.dynamicSettings,
  });
  const setDynamicUndervolt = (checked: boolean) => {
    api.setState({ isDynamic: checked });
  };

  const handleUpdateStrategy = (strategy: any) => {
    setDynamicSettings((prevState) => ({
      ...prevState,
      strategy: strategy.data,
    }));
  };

  const handleUpdateSampleInterval = (value: number) => {
    setDynamicSettings((prevState) => ({
      ...prevState,
      sampleInterval: value,
    }));
  };

  const handleUpdateCoreSettings = (coreIndex: number, value: any) => {
    setDynamicSettings((prevState) => ({
      ...prevState,
      cores: prevState.cores.map((core, index) => {
        if (index === coreIndex) {
          return {
            ...core,
            ...value,
          };
        }
        return core;
      }),
    }));
  };

  const handleSave = async () => {
    api.setState({ dynamicSettings });
    setLoading(true);
    await api.enableGymdeck();
    setLoading(false);
  };

  return (
    <Fragment>
      <UndervoltStatus />
      <PanelSectionRow>
        <ToggleField
          checked={state.isDynamic}
          label={"Use Dynamic Undervolting"}
          onChange={setDynamicUndervolt}
        />
      </PanelSectionRow>
      <StrategySelector
        handleChangeStrategy={handleUpdateStrategy}
        selectedStrategy={dynamicSettings.strategy}
      />
      <PanelSectionRow>
        <SliderField
          label={"Sample Interval"}
          min={10000}
          showValue
          max={100000}
          value={dynamicSettings.sampleInterval}
          onChange={handleUpdateSampleInterval}
        />
      </PanelSectionRow>
      {state.dynamicSettings.cores.map((_core, index) => (
        <DynamicCoreSettings
          coreSettings={dynamicSettings.cores[index]}
          handleChange={(data) => handleUpdateCoreSettings(index, data)}
          key={index}
          label={`Core ${index}`}
        />
      ))}
      <ActionButtons handleSave={handleSave} loading={loading} />
    </Fragment>
  );
};

export default DynamicUndervolt;
