import { PanelSectionRow, SliderField } from "decky-frontend-lib";

const CoreSlider = ({
  coreNumber,
  coreValue,
  setCoreValue,
}: {
  coreNumber: number;
  coreValue: number;
  setCoreValue: (value: number) => void;
}) => {
  return (
    <PanelSectionRow>
      <SliderField
        label={`Core ${coreNumber}`}
        showValue
        min={0}
        max={60}
        step={1}
        value={coreValue}
        onChange={setCoreValue}
      />
    </PanelSectionRow>
  );
};

export default CoreSlider