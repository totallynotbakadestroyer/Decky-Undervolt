import { Fragment, useContext, useEffect, useState } from "react";
import { ButtonItem, PanelSectionRow } from "@decky/ui";
import PresetSelector from "./PresetSelector";
import PresetControls from "./PresetControls";
import CoreSliders from "../components/CoreSliders";
import ActionButtons from "./ActionButtons";
import { Preset } from "../../api";
import { Context } from "../../context";

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

  const handleSetSelectedPreset = (preset: { data: Preset } | null) => {
    setDoubleCheckDelete(false);
    setSelectedPreset(preset?.data || null);
    setEditablePreset(preset?.data || null);
  };

  const updateCore = (index: number, value: number) => {
    const newCores = [...editablePreset!.value];
    newCores[index] = value;
    setEditablePreset({ ...editablePreset!, value: newCores });
  };

  const handleUpdatePreset = async () => {
    setSelectedPreset(editablePreset);
    setDoubleCheckDelete(false);
    setLoading(true);
    if (!editablePreset) return;
    await api.updatePreset(editablePreset);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleDeletePreset = async () => {
    if (!doubleCheckDelete) {
      setDoubleCheckDelete(true);
      return;
    }
    if (!editablePreset) return;
    setDoubleCheckDelete(false);
    await api.deletePreset(editablePreset.app_id);
    setSelectedPreset(null);
    setEditablePreset(null);
  };

  useEffect(() => {
    setPresets(api.Presets);
  }, [api]);

  return (
    <Fragment>
      <PanelSectionRow>
        <ButtonItem layout="below" onClick={() => setCurrentPage("main")}>
          Back
        </ButtonItem>
      </PanelSectionRow>
      <PresetSelector
        presets={presets}
        selectedPreset={selectedPreset}
        handleSetSelectedPreset={handleSetSelectedPreset}
      />
      {editablePreset && (
        <Fragment>
          {api.Settings.isRunAutomatically && (
            <PresetControls
              editablePreset={editablePreset}
              setEditablePreset={setEditablePreset}
            />
          )}
          <CoreSliders cores={editablePreset.value} updateCore={updateCore} />
          <ActionButtons
            loading={loading}
            doubleCheckDelete={doubleCheckDelete}
            handleUpdatePreset={handleUpdatePreset}
            handleDeletePreset={handleDeletePreset}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default PresetManager;
