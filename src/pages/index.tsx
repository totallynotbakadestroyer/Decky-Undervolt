import { SidebarNavigation } from "decky-frontend-lib";
import SettingsPage from "./SettingsPage";
import AboutPage from "./AboutPage";
import { useTranslation } from "react-i18next";
import '../i18n'; // Подключение конфигурации i18n

const Pages = () => {
  const { t } = useTranslation();

  return (
    <SidebarNavigation
      title={t("appTitle")}
      showTitle={false}
      pages={[
        {
          title: t("settingsPageTitle"),
          content: <SettingsPage />
        },
        {
          title: t("aboutPageTitle"),
          content: <AboutPage />
        }
      ]}
    />
  );
};

export default Pages;
