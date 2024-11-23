import { Fragment } from "react";
import { ButtonItem, PanelSectionRow } from "@decky/ui";
import { useTranslation } from "react-i18next";

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
}) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <PanelSectionRow>
        <ButtonItem layout="below" onClick={handleUpdatePreset}>
          {loading
            ? t("presetManager.actionButtons.saving")
            : t("presetManager.actionButtons.savePreset")}
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem
          disabled={loading}
          layout="below"
          onClick={handleDeletePreset}
        >
          {doubleCheckDelete
            ? t("presetManager.actionButtons.deleteConfirm")
            : t("presetManager.actionButtons.delete")}
        </ButtonItem>
      </PanelSectionRow>
    </Fragment>
  );
};

export default ActionButtons;
