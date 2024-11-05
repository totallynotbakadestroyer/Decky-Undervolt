import { Fragment } from "react";
import { ButtonItem, PanelSectionRow } from "@decky/ui";

const ActionButtons = ({
  loading,
  updateCoreValues,
  handleReset,
  handleDisableUndervolt,
}: {
  loading: boolean;
  updateCoreValues: () => void;
  handleReset: () => void;
  handleDisableUndervolt: () => void;
}) => (
  <Fragment>
    <PanelSectionRow>
      <ButtonItem disabled={loading} layout="below" onClick={updateCoreValues}>
        {loading ? "Applying..." : "Save & Apply"}
      </ButtonItem>
    </PanelSectionRow>
    <PanelSectionRow>
      <ButtonItem disabled={loading} layout="below" onClick={handleReset}>
        Reset
      </ButtonItem>
    </PanelSectionRow>
    <PanelSectionRow>
      <ButtonItem
        disabled={loading}
        layout="below"
        onClick={handleDisableUndervolt}
      >
        Disable
      </ButtonItem>
    </PanelSectionRow>
  </Fragment>
);

export default ActionButtons;
