import { PanelSectionRow } from "@decky/ui";
import { useContext } from "react";
import { Context } from "../context";

const UndervoltStatus = () => {
  const { state } = useContext(Context);

  return <PanelSectionRow>Undervolt Status: {state.status}</PanelSectionRow>;
};

export default UndervoltStatus;
