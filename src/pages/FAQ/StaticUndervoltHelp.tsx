import { PanelSectionRow } from "@decky/ui";
import FaqButton from "./faqButton";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const StaticUndervoltHelp = () => {
  const { t } = useTranslation();
  const faq = [
    {
      header: t("faq.staticUndervolt.curveOptimizerStep.header"),
      body: t("faq.staticUndervolt.curveOptimizerStep.body"),
    },
    {
      header: t("faq.staticUndervolt.moreAggressiveUndervolt.header"),
      body: t("faq.staticUndervolt.moreAggressiveUndervolt.body"),
    },
    {
      header: t("faq.staticUndervolt.presets.header"),
      body: t("faq.staticUndervolt.presets.body"),
    },
    {
      header: t("faq.staticUndervolt.createPreset.header"),
      body: t("faq.staticUndervolt.createPreset.body"),
    },
    {
      header: t("faq.staticUndervolt.deletePreset.header"),
      body: t("faq.staticUndervolt.deletePreset.body"),
    },
  ];

  return (
    <Fragment>
      {faq.map((faqItem, index) => (
        <PanelSectionRow key={index}>
          <FaqButton header={faqItem.header} body={faqItem.body} />
        </PanelSectionRow>
      ))}
    </Fragment>
  );
};

export default StaticUndervoltHelp;
