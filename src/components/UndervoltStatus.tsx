import { PanelSectionRow } from "@decky/ui";
import { useContext } from "react";
import { Context } from "../context";

const UndervoltStatus = () => {
  const [api] = useContext(Context);

  return (
    <PanelSectionRow>Undervolt Status: {api.UndervoltStatus}</PanelSectionRow>
  );
};

export default UndervoltStatus;
