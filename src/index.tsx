import {
  definePlugin,
  DialogButton,
  Navigation,
  PanelSection,
} from "@decky/ui";
import { addEventListener, removeEventListener, routerHook } from "@decky/api";
import { FaCog, FaFire } from "react-icons/fa";
import UndervoltSection from "./UndervoltSection";
import { Provider } from "./context";
import { getApiInstance } from "./api";
import Pages from "./pages";
import { ServerEventType, State } from "./types";
import i18next from "./i18n";

i18next.t("en");

function Content() {
  return (
    <PanelSection>
      <UndervoltSection />
    </PanelSection>
  );
}

function TitleView() {
  const handleNavigate = () => {
    Navigation.CloseSideMenus();
    Navigation.Navigate("/decky-undervolt");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <span style={{ fontSize: 20, flex: 1 }}>Decky-Undervolt</span>
      <DialogButton
        style={{
          height: "28px",
          width: "40px",
          minWidth: 0,
          padding: "10px 12px",
        }}
        onClick={() => handleNavigate()}
      >
        <FaCog style={{ marginTop: "-4px", display: "block" }} />
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

  const initialState: State = {
      gymdeckRunning: false,
      isDynamic: false,
      dynamicSettings: {
          cores: [
              {manualPoints: [], maximumValue: 100, minimumValue: 0, threshold: 0},
              {manualPoints: [], maximumValue: 100, minimumValue: 0, threshold: 0},
              {manualPoints: [], maximumValue: 100, minimumValue: 0, threshold: 0},
              {manualPoints: [], maximumValue: 100, minimumValue: 0, threshold: 0},
          ],
          strategy: 'DEFAULT'
      },
     runningAppName: null,
     runningAppId: null,
     status: "Disabled",
     cores: [5, 5, 5, 5],
     currentPreset: null,
     presets: [],
     settings: {
        isGlobal: false,
        runAtStartup: false,
        isRunAutomatically: false,
        timeoutApply: 15,
     },
     globalCores: []
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
