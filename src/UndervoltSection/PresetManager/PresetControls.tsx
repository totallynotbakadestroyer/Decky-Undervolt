import { Fragment } from "react";
import { PanelSectionRow, SliderField, ToggleField } from "@decky/ui";
import { useTranslation } from "react-i18next";

const PresetControls = ({
  editablePreset,
  setEditablePreset,
}: {
  editablePreset: { use_timeout: boolean; label: string; timeout: number };
  setEditablePreset: (value: any) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <PanelSectionRow>
        <ToggleField
          checked={editablePreset.use_timeout}
          onChange={(value) =>
            setEditablePreset({ ...editablePreset, use_timeout: value })
          }
          label={t("presetControls.useTimeout")}
          description={t("presetControls.timeoutDescription", {
            label: editablePreset.label,
          })}
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
            label={t("presetControls.timeoutLabel")}
            value={editablePreset.timeout}
            onChange={(value) =>
              setEditablePreset({ ...editablePreset, timeout: value })
            }
          />
        </PanelSectionRow>
      )}
    </Fragment>
  );
};

export default PresetControls;
