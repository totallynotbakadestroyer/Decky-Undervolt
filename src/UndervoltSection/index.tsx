import { Fragment, useState } from "react";
import PresetManager from "./PresetManager";
import StaticUndervolt from "./StaticUndervolt";

const UndervoltSection = () => {
  const [currentPage, setCurrentPage] = useState("main");

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
