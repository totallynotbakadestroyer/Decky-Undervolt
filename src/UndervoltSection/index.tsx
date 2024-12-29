import { Fragment, useContext, useState } from "react";
import PresetManager from "./PresetManager";
import StaticUndervolt from "./StaticUndervolt";
import { Context } from "../context";
import DynamicUndervolt from "./DynamicUndervolting";

const UndervoltSection = () => {
  const [currentPage, setCurrentPage] = useState("main");
  const { state } = useContext(Context);
  if (state.isDynamic) return <DynamicUndervolt />;

  return (
    <Fragment>
      {currentPage === "main" && (
        <StaticUndervolt setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "preset-manager" && (
        <PresetManager setCurrentPage={setCurrentPage} />
      )}
    </Fragment>
  );
};

export default UndervoltSection;
