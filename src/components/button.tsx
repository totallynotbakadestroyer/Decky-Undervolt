import { definePlugin, ServerAPI, Button, PanelSection, PanelSectionRow } from "decky-frontend-lib";
import { useState, useEffect } from "react";

const Gymdeck2Control = ({ server }: { server: ServerAPI }) => {
  const [isRunning, setIsRunning] = useState(false);

  const fetchStatus = async () => {
    try {
      const status = await server.callPluginMethod<{ status: boolean }>("get_gymdeck2_status", {});
      if (typeof status.result === "boolean") {
        setIsRunning(status.result);
      } else {
        console.error("Unexpected status result type:", typeof status.result);
      }
    } catch (error) {
      console.error("Error fetching gymdeck2 status:", error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const toggleGymdeck2 = async () => {
    try {
      await server.callPluginMethod("toggle_gymdeck2", {});
      setIsRunning((prev) => !prev);
    } catch (error) {
      console.error("Error toggling gymdeck2:", error);
    }
  };

  return (
    <PanelSection>
      <PanelSectionRow>
        <Button onClick={toggleGymdeck2}>
          {isRunning ? "Stop gymdeck2" : "Start gymdeck2"}
        </Button>
      </PanelSectionRow>
    </PanelSection>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  return {
    name: "Gymdeck2 Controller",
    title: <div>Gymdeck2 Controller</div>,
    icon: <span className="material-icons">settings</span>,
    component: () => <Gymdeck2Control server={serverApi} />,
  };
});
