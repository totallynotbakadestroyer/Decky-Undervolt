import { SidebarNavigation } from "@decky/ui";
import SettingsPage from "./SettingsPage";
import AboutPage from "./AboutPage";
import { useTranslation } from "react-i18next";

const Pages = () => {
  const { t } = useTranslation();

  return (
    <SidebarNavigation
      title={t("sidebar.title")}
      showTitle={false}
      pages={[
        {
          title: t("sidebar.settings"),
          content: <SettingsPage />,
        },
        {
          title: t("sidebar.about"),
          content: <AboutPage />,
        },
      ]}
    />
  );
};

export default Pages;
