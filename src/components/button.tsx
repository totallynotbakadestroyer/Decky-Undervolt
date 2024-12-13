import { definePlugin, ServerAPI, Button } from "decky-frontend-lib";
import { useState, useEffect } from "react";

const Gymdeck2Control = ({ server }: { server: ServerAPI }) => {
  const [isRunning, setIsRunning] = useState(false);

  const fetchStatus = async () => {
    try {
      const status = await server.callPluginMethod<{ status: boolean }>("get_gymdeck2_status", {});
      setIsRunning(true);
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
    <Button onClick={toggleGymdeck2}>
      {isRunning ? "Stop gymdeck2" : "Start gymdeck2"}
    </Button>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  return {
    name: "Gymdeck2 Controller",
    title: <div>Gymdeck2 Controller</div>,
    icon: <span className="material-icons">settings</span>, // Replace with an appropriate icon
    component: () => <Gymdeck2Control server={serverApi} />,
  };
});
