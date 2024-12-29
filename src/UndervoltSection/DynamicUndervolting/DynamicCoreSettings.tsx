import { PanelSectionRow, SliderField } from "@decky/ui";
import { DynamicCoreSettings } from "../../types";

const DynamicCoreSettings = ({
  label,
  coreSettings,
  handleChange,
}: {
  label: string;
  coreSettings: DynamicCoreSettings;
  handleChange: (coreSettings: DynamicCoreSettings) => void;
}) => {
  const handleSliderChange = (key: string, value: number) => {
    handleChange({ ...coreSettings, [key]: value });
  };
  return (
    <div style={{ marginBottom: 10 }}>
      {label}
      <PanelSectionRow>
        <SliderField
          showValue
          label={"Minimal Value"}
          min={0}
          max={100}
          value={coreSettings.minimumValue}
          onChange={(value) => handleSliderChange("minimumValue", value)}
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <SliderField
          label={"Maximum Value"}
          min={0}
          showValue
          max={100}
          value={coreSettings.maximumValue}
          onChange={(value) => handleSliderChange("maximumValue", value)}
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <SliderField
          label={"Threshold"}
          min={0}
          showValue
          max={100}
          value={coreSettings.threshold}
          onChange={(value) => handleSliderChange("threshold", value)}
        />
      </PanelSectionRow>
    </div>
  );
};

export default DynamicCoreSettings;
