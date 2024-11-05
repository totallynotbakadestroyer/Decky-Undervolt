import { Fragment } from "react";
import { PanelSectionRow, SliderField, ToggleField } from "@decky/ui";

const PresetControls = ({
  editablePreset,
  setEditablePreset,
}: {
  editablePreset: { use_timeout: boolean; label: string; timeout: number };
  setEditablePreset: (value: any) => void;
}) => (
  <Fragment>
    <PanelSectionRow>
      <ToggleField
        checked={editablePreset.use_timeout}
        onChange={(value) =>
          setEditablePreset({ ...editablePreset, use_timeout: value })
        }
        label="Use timeout for this preset?"
        description={`Checking this will apply the undervolt after some time when ${editablePreset.label} is opened. Might be useful for games with launchers.`}
      />
    </PanelSectionRow>
    {editablePreset.use_timeout && (
      <PanelSectionRow>
        <SliderField
          bottomSeparator="standard"
          min={0}
          showValue
          max={1000}
          step={1}
          label="Timeout in seconds"
          value={editablePreset.timeout}
          onChange={(value) =>
            setEditablePreset({ ...editablePreset, timeout: value })
          }
        />
      </PanelSectionRow>
    )}
  </Fragment>
);

export default PresetControls;
