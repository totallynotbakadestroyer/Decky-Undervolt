import { PanelSectionRow } from "@decky/ui";
import FaqButton from "./faqButton";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const GeneralHelp = () => {
  const { t } = useTranslation();
  const faq = [
    {
      header: t("faq.general.curveOptimizer.header"),
      body: t("faq.general.curveOptimizer.body"),
    },
    {
      header: t("faq.general.biosUndervolt.header"),
      body: t("faq.general.biosUndervolt.body"),
    },
    {
      header: t("faq.general.combineUndervolt.header"),
      body: t("faq.general.combineUndervolt.body"),
    },
    {
      header: t("faq.general.minusSign.header"),
      body: t("faq.general.minusSign.body"),
    },
    {
      header: t("faq.general.screwUp.header"),
      body: t("faq.general.screwUp.body"),
    },
    {
      header: t("faq.general.dynamicUndervolt.header"),
      body: t("faq.general.dynamicUndervolt.body"),
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

export default GeneralHelp;
