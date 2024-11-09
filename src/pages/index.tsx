import { SidebarNavigation } from "@decky/ui";
import SettingsPage from "./SettingsPage";
import AboutPage from "./AboutPage";
import { useTranslation } from "react-i18next";
import "../translation/i18n";
import '../translation/LangModules/index/en';
import '../translation/LangModules/index/rus';

const Pages = () => {
  const { t } = useTranslation('index');

  return (
    <SidebarNavigation
      title={t("sidebarNavigation.title")}
      showTitle={false}
      pages={[
        {
          title: t("sidebarNavigation.settings"),
          content: <SettingsPage />,
        },
        {
          title: t("sidebarNavigation.about"),
          content: <AboutPage />,
        },
      ]}
    />
  );
};

export default Pages;
