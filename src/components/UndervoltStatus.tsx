import { PanelSectionRow } from "@decky/ui";
import { useContext } from "react";
import { Context } from "../context";
import { useTranslation } from "react-i18next";

const UndervoltStatus = () => {
  const { state } = useContext(Context);
  const { t } = useTranslation();

  return (
    <PanelSectionRow>
      {t("undervoltStatus.status")}{" "}
      {t("undervoltStatus." + state.status || "disabled")}
    </PanelSectionRow>
  );
};

export default UndervoltStatus;
