import { DropdownItem, PanelSectionRow } from "@decky/ui";

const StrategySelector = ({
  handleChangeStrategy,
  selectedStrategy,
}: {
  handleChangeStrategy: (value: any) => void;
  selectedStrategy: string;
}) => {
  return (
    <PanelSectionRow>
      <DropdownItem
        rgOptions={[
          { label: "Manual", data: "MANUAL" },
          { label: "Aggressive", data: "AGGRESSIVE" },
          { label: "Default", data: "DEFAULT" },
        ]}
        selectedOption={selectedStrategy}
        onChange={handleChangeStrategy}
        label={"Strategy Selector"}
      />
    </PanelSectionRow>
  );
};
export default StrategySelector;
