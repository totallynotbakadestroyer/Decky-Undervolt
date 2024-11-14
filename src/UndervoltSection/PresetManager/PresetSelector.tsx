import { Preset } from "../../types";
import { DropdownItem, PanelSectionRow } from "@decky/ui";
import { useTranslation } from 'react-i18next';

const PresetSelector = ({
  presets,
  selectedPreset,
  handleSetSelectedPreset,
}: {
  presets: Preset[];
  selectedPreset: Preset | null;
  handleSetSelectedPreset: (x: any) => void;
}) => {
  const { t } = useTranslation();

  return (
    <PanelSectionRow>
      <DropdownItem
        rgOptions={[
          { label: t('presetSelector.none'), data: null },
          ...presets.map((x: { label: any }) => ({ label: x.label, data: x })),
        ]}
        selectedOption={selectedPreset}
        onChange={handleSetSelectedPreset}
        label={t('presetSelector.label')}
      />
    </PanelSectionRow>
  );
};

export default PresetSelector;
