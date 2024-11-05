import CoreSlider from "../../components/CoreSlider";
import { Fragment } from "react";

const CoreSliders = ({
  cores,
  updateCore,
}: {
  cores: number[];
  updateCore: (index: number, value: number) => void;
}) => (
  <Fragment>
    {cores.map((core, index) => (
      <CoreSlider
        key={index}
        coreValue={core}
        coreNumber={index}
        setCoreValue={(value) => updateCore(index, value)}
      />
    ))}
  </Fragment>
);

export default CoreSliders;
