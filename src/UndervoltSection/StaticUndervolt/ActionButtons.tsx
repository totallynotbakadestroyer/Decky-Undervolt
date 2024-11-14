import { Fragment } from "react";
import { ButtonItem, PanelSectionRow } from "@decky/ui";
import { useTranslation } from 'react-i18next';

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
}) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <PanelSectionRow>
        <ButtonItem disabled={loading} layout="below" onClick={updateCoreValues}>
          {loading ? t('actionButtons.applying') : t('actionButtons.saveAndApply')}
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem disabled={loading} layout="below" onClick={handleReset}>
          {t('actionButtons.reset')}
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem
          disabled={loading}
          layout="below"
          onClick={handleDisableUndervolt}
        >
          {t('actionButtons.disable')}
        </ButtonItem>
      </PanelSectionRow>
    </Fragment>
  );
};

export default ActionButtons;
