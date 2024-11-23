import { PanelSectionRow, SliderField } from "@decky/ui";
import { useTranslation } from "react-i18next";

const CoreSlider = ({
  coreNumber,
  coreValue,
  setCoreValue,
}: {
  coreNumber: number;
  coreValue: number;
  setCoreValue: (value: number) => void;
}) => {
  const { t } = useTranslation();
  return (
    <PanelSectionRow>
      <SliderField
        label={t("coreSlider", { coreNumber })}
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

export default CoreSlider;
