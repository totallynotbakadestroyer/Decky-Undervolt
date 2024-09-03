import { Fragment, useContext, useEffect, useState } from "react";
import {
  ButtonItem,
  PanelSectionRow,
  DropdownItem,
  SliderField,
  ToggleField,
} from "@decky/ui";
import { Context } from "../context";
import { Preset } from "../api";
import CoreSlider from "../components/CoreSlider";

const PresetManager = ({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) => {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [editablePreset, setEditablePreset] = useState<Preset | null>(null);
  const [doubleCheckDelete, setDoubleCheckDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [api] = useContext(Context);

  const handleSetSelectedPreset = (preset: any | null) => {
    setDoubleCheckDelete(false);
    setSelectedPreset(preset.data);
    setEditablePreset(preset.data);
  };

  const updateCore = (index: number, value: number) => {
    const newCores = [...editablePreset!.value];
    newCores[index] = value;
    setEditablePreset({
      ...editablePreset!,
      value: newCores,
    });
  };

  const handleUpdatePreset = async () => {
    setSelectedPreset(editablePreset)
    setDoubleCheckDelete(false);
    setLoading(true);
    if (!editablePreset) return;
    await api.updatePreset(editablePreset);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const handleDeletePreset = async () => {
    if(!doubleCheckDelete) {
      setDoubleCheckDelete(true);
      return;
    }
    if (!editablePreset) return;
    setDoubleCheckDelete(false);
    await api.deletePreset(editablePreset.app_id);
    setSelectedPreset(null);
    setEditablePreset(null);
  }

  useEffect(() => {
    setPresets(api.Presets);
  }, []);

  return (
    <Fragment>
      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => {
            setCurrentPage("main");
          }}
        >
          Back
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <DropdownItem
          rgOptions={[
            { label: "None", data: null },
            ...presets.map((x) => ({ label: x.label, data: x })),
          ]}
          selectedOption={selectedPreset}
          onChange={handleSetSelectedPreset}
          label="Preset to edit:"
        />
      </PanelSectionRow>
      {editablePreset && (
        <Fragment>
          {api.Settings.isRunAutomatically && (
            <Fragment>
              <PanelSectionRow>
                <ToggleField
                  checked={editablePreset.use_timeout}
                  onChange={(value: boolean) => {
                    setEditablePreset({
                      ...editablePreset,
                      use_timeout: value,
                    });
                  }}
                  label={"Use timeout for this preset?"}
                  description={`Checking this will apply the undervolt after some time when ${editablePreset?.label} is opened. Might be useful for games with launchers.`}
                />
              </PanelSectionRow>
              {editablePreset?.use_timeout && (
                <PanelSectionRow>
                  <SliderField
                    bottomSeparator={"standard"}
                    min={0}
                    showValue
                    max={1000}
                    step={1}
                    label={"Timeout in seconds"}
                    value={editablePreset.timeout}
                    onChange={(value) => {
                      setEditablePreset({
                        ...editablePreset,
                        timeout: value,
                      });
                    }}
                  />
                </PanelSectionRow>
              )}
            </Fragment>
          )}

          {editablePreset.value.map((core: number, index: number) => (
            <CoreSlider
              key={index}
              coreValue={core}
              coreNumber={index}
              setCoreValue={(value) => updateCore(index, value)}
            />
          ))}
          <PanelSectionRow>
            <ButtonItem layout={"below"} onClick={handleUpdatePreset}>
              {loading ? "Saving..." : "Save Preset"}
            </ButtonItem>
          </PanelSectionRow>
          <PanelSectionRow>
            <ButtonItem
              disabled={loading}
              layout={"below"}
              onClick={handleDeletePreset}
            >
              {doubleCheckDelete ? "Really delete?" : "Delete"}
            </ButtonItem>
          </PanelSectionRow>
        </Fragment>
      )}
    </Fragment>
  );
};

export default PresetManager;
