import {
  definePlugin,
  DialogButton,
  Navigation,
  PanelSection,
} from "@decky/ui";
import { addEventListener, removeEventListener, routerHook } from "@decky/api";
import { FaCog, FaFire, FaQuestion } from "react-icons/fa";
import UndervoltSection from "./UndervoltSection";
import { Provider } from "./context";
import { getApiInstance } from "./api";
import Pages from "./pages";
import { ServerEventType, State } from "./types";
import i18next from "./i18n";
import FAQ from "./pages/FAQ";

i18next.t("en");

function Content() {
  return (
    <PanelSection>
      <UndervoltSection />
    </PanelSection>
  );
}

function TitleView() {
  const handleNavigate = (path: string) => {
    Navigation.CloseSideMenus();
    Navigation.Navigate(path);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <span style={{ fontSize: 18, flex: 1 }}>Decky-Undervolt</span>
      <DialogButton
        style={{
          marginLeft: "5px",
          height: "28px",
          width: "30px",
          minWidth: 0,
          padding: "10px 6px",
        }}
        onClick={() => handleNavigate("/decky-undervolt")}
      >
        <FaCog style={{ marginTop: "-4px", display: "block" }} />
      </DialogButton>
      <DialogButton
        style={{
          marginLeft: "5px",
          height: "28px",
          width: "30px",
          minWidth: 0,
          padding: "10px 6px",
        }}
        onClick={() => handleNavigate("/decky-undervolt-faq")}
      >
        <FaQuestion style={{ marginTop: "-4px", display: "block" }} />
      </DialogButton>
    </div>
  );
}

export default definePlugin(() => {
  routerHook.addRoute("/decky-undervolt", () => (
    <Provider>
      <Pages />
    </Provider>
  ));

  routerHook.addRoute("/decky-undervolt-faq", FAQ);

  const initialState: State = {
    runningAppName: null,
    runningAppId: null,
    status: "Disabled",
    globalCores: [0, 1, 2, 3],
    cores: [5, 5, 5, 5],
    currentPreset: null,
    presets: [],
    settings: {
      isGlobal: false,
      runAtStartup: false,
      isRunAutomatically: false,
      timeoutApply: 15,
    },
  };

  const api = getApiInstance(initialState);
  const handleServerEvent = (serverEvent: {
    type: ServerEventType;
    data: any;
  }) => {
    return api.handleServerEvent(serverEvent);
  };

  api.init();
  addEventListener("server_event", handleServerEvent);

  return {
    alwaysRender: true,
    titleView: <TitleView />,
    title: <div>Decky-Undervolt</div>,
    content: (
      <Provider>
        <Content />
      </Provider>
    ),
    icon: <FaFire />,
    onDismount: () => {
      routerHook.removeRoute("/decky-undervolt");
      removeEventListener("server_event", handleServerEvent);
      api.destroy();
    },
  };
});
