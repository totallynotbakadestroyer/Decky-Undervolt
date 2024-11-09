import { Preset } from "../../types";
import { DropdownItem, PanelSectionRow } from "@decky/ui";

const PresetSelector = ({
  presets,
  selectedPreset,
  handleSetSelectedPreset,
}: {
  presets: Preset[];
  selectedPreset: Preset | null;
  handleSetSelectedPreset: (x: any) => void;
}) => (
  <PanelSectionRow>
    <DropdownItem
      rgOptions={[
        { label: "None", data: null },
        ...presets.map((x: { label: any }) => ({ label: x.label, data: x })),
      ]}
      selectedOption={selectedPreset}
      onChange={handleSetSelectedPreset}
      label="Preset to edit:"
    />
  </PanelSectionRow>
);

export default PresetSelector;
