import { Fragment } from "react";
import { ButtonItem, PanelSectionRow } from "@decky/ui";

const ActionButtons = ({
  loading,
  doubleCheckDelete,
  handleUpdatePreset,
  handleDeletePreset,
}: {
  loading: boolean;
  doubleCheckDelete: boolean;
  handleUpdatePreset: () => void;
  handleDeletePreset: () => void;
}) => (
  <Fragment>
    <PanelSectionRow>
      <ButtonItem layout="below" onClick={handleUpdatePreset}>
        {loading ? "Saving..." : "Save Preset"}
      </ButtonItem>
    </PanelSectionRow>
    <PanelSectionRow>
      <ButtonItem
        disabled={loading}
        layout="below"
        onClick={handleDeletePreset}
      >
        {doubleCheckDelete ? "Really delete?" : "Delete"}
      </ButtonItem>
    </PanelSectionRow>
  </Fragment>
);

export default ActionButtons;
