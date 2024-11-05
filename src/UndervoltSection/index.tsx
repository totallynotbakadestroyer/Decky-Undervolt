import { Fragment, useState } from "react";
import PresetManager from "./PresetManager";
import MainMenu from "./MainMenu";

const UndervoltSection = () => {
  const [currentPage, setCurrentPage] = useState("main");

  return (
    <Fragment>
      {currentPage === "main" && <MainMenu setCurrentPage={setCurrentPage} />}
      {currentPage === "preset-manager" && (
        <PresetManager setCurrentPage={setCurrentPage} />
      )}
    </Fragment>
  );
};

export default UndervoltSection;
