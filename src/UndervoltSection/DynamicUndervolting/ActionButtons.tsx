import { ButtonItem, PanelSectionRow } from "@decky/ui";
import { useContext } from "react";
import { Context } from "../../context";

const ActionButtons = ({
  handleSave,
  loading,
}: {
  handleSave: () => void;
  loading: boolean;
}) => {
  const { api } = useContext(Context);
  return (
    <PanelSectionRow>
      <ButtonItem layout={"below"} onClick={handleSave} disabled={loading}>
        Save and Enable Dynamic
      </ButtonItem>
      <ButtonItem
        layout={"below"}
        onClick={api.disableGymdeck}
        disabled={loading}
      >
        Disable
      </ButtonItem>
    </PanelSectionRow>
  );
};

export default ActionButtons;
