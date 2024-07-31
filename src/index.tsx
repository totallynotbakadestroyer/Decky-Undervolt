import {
  PanelSection,
  definePlugin,
  ServerAPI,
  DialogButton,
  Navigation,
} from "decky-frontend-lib";
import { FaFire, FaCog } from "react-icons/fa";
import UndervoltSection from "./UndervoltSection";
import {Provider} from './context'
import { Api } from "./api";
import Pages from "./pages";

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
  }
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
    <span style={{fontSize: 20, flex:1}}>Decky-Undervolt</span>
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

export default definePlugin((serverApi: ServerAPI) => {
  serverApi.routerHook.addRoute("/decky-undervolt", () => <Provider api={api}><Pages /></Provider>);
  const api = new Api(serverApi);
  api.init();
  return {
    alwaysRender: true,
    titleView: (
        <TitleView />
    ),
    title: <div>Decky-Undervolt</div>,
    content: <Provider api={api}><Content /></Provider>,
    icon: <FaFire />,
    onDismount: () => {
      serverApi.routerHook.removeRoute("/decky-undervolt");
    },
  };
});
