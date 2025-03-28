import { SidebarNavigation } from "@decky/ui";
import GeneralHelp from "./GeneralHelp";
import StaticUndervoltHelp from "./StaticUndervoltHelp";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <SidebarNavigation
      title={t("faq.sidebar.title")}
      showTitle={false}
      pages={[
        {
          title: t("faq.generalHelp.title"),
          content: <GeneralHelp />,
        },
        {
          title: t("faq.staticUndervoltHelp.title"),
          content: <StaticUndervoltHelp />,
        },
      ]}
    />
  );
};

export default FAQ;
