import { PanelSectionRow, SliderField } from "@decky/ui";
import { DynamicCoreSettings, ManualPoint } from "../../types";
import UndervoltingPreview from "./UndervoltingPreview";
import { useEffect, useState } from "react";
import { debounce } from "../../utils";

const DynamicCoreSettings = ({
  label,
  coreSettings,
  handleChange,
  strategy,
}: {
  label: string;
  coreSettings: DynamicCoreSettings;
  handleChange: (coreSettings: DynamicCoreSettings) => void;
  strategy: string;
}) => {
  const [graphData, setGraphData] = useState<ManualPoint[]>([]);

  const generateGraphData = () => {
    const data = [];
    const threshold = coreSettings.threshold;
    const minValue = coreSettings.minimumValue;
    const maxValue = coreSettings.maximumValue;

    for (let i = 0; i < 100; i++) {
      const point = i;
      let value = minValue;

      if (strategy === "AGGRESSIVE") {
        if (point > threshold) {
          const loadAboveThreshold = point - threshold;
          const loadRange = 100 - threshold;
          const normalizedLoad = loadAboveThreshold / loadRange;
          value = minValue + Math.round(normalizedLoad * (maxValue - minValue));
        }
      } else if (strategy === "DEFAULT") {
        if (point > threshold) {
          value = Math.round((point / 100) * maxValue);
        } else {
          value = Math.round((point / 100) * minValue);
        }
        value = Math.max(minValue, Math.min(value, maxValue));
      }

      data.push({ point, value });
    }
    setGraphData(data);
  };

  const debouncedGenerateGraphData = debounce(generateGraphData, 200);

  const handleSliderChange = (key: string, value: number) => {
    handleChange({ ...coreSettings, [key]: value });
    debouncedGenerateGraphData();
  };

  useEffect(() => {
    debouncedGenerateGraphData();
  }, []);

  useEffect(() => {
    debouncedGenerateGraphData();
  }, [strategy]);

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
      <UndervoltingPreview data={graphData} />
    </div>
  );
};

export default DynamicCoreSettings;
