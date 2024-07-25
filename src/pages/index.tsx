import {
    SidebarNavigation,
  } from "decky-frontend-lib";
  import SettingsPage from "./SettingsPage";
  import AboutPage from "./AboutPage";
  
  
  const Pages = () => {
    return (
      <SidebarNavigation
        title="Decky-Undervolt"
        showTitle={false}
        
        pages={[
          {
            title: "Settings",
            content: <SettingsPage />
          },
          {
            title: "About",
            content: <AboutPage />
          }
        ]}
      />
    );
  };
  
  export default Pages;
  