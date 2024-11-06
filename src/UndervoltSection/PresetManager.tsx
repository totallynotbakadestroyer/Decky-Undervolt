import { Fragment, SetStateAction, useContext, useEffect, useState } from "react";
import {
  ButtonItem,
  PanelSectionRow,
  DropdownItem,
  SliderField,
  ToggleField,
} from "decky-frontend-lib";
import { Context } from "../context";
import { Preset } from "../api";
import CoreSlider from "../components/CoreSlider";
import { useTranslation } from "react-i18next";
import "../translations/i18n";

const PresetManager = ({ setCurrentPage }) => {
  const { t } = useTranslation();
  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [editablePreset, setEditablePreset] = useState<Preset | null>(null);
  const [doubleCheckDelete, setDoubleCheckDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [api] = useContext(Context);

  const handleSetSelectedPreset = (preset: { data: SetStateAction<Preset | null>; }) => {
    setDoubleCheckDelete(false);
    setSelectedPreset(preset ? preset.data : null);
    setEditablePreset(preset ? preset.data : null);
  };

  const updateCore = (index: number, value: number) => {
    if (!editablePreset) return;
    const newCores = [...editablePreset.value];
    newCores[index] = value;
    setEditablePreset({
      ...editablePreset,
      value: newCores,
    });
  };

  const handleUpdatePreset = async () => {
    if (!editablePreset) return;
    setSelectedPreset(editablePreset);
    setDoubleCheckDelete(false);
    setLoading(true);
    try {
      await api.updatePreset(editablePreset);
    } catch (error) {
      console.error("Failed to update preset:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePreset = async () => {
    if (!editablePreset) return;
    if (!doubleCheckDelete) {
      setDoubleCheckDelete(true);
      return;
    }
    setDoubleCheckDelete(false);
    try {
      await api.deletePreset(editablePreset.app_id);
      setSelectedPreset(null);
      setEditablePreset(null);
    } catch (error) {
      console.error("Failed to delete preset:", error);
    }
  };

  useEffect(() => {
    setPresets(api.Presets);
  }, [api]);

  return (
    <Fragment>
      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => {
            setCurrentPage("main");
          }}
        >
          {t("back")}
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
          label={t("presetToEdit")}
        />
      </PanelSectionRow>
      {editablePreset && (
        <Fragment>
          {api.Settings.isRunAutomatically && (
            <Fragment>
              <PanelSectionRow>
                <ToggleField
                  checked={editablePreset.use_timeout}
                  onChange={(value) => {
                    setEditablePreset({
                      ...editablePreset,
                      use_timeout: value,
                    });
                  }}
                  label={t("useTimeout")}
                  description={t("useTimeoutDescription", { label: editablePreset.label })}
                />
              </PanelSectionRow>
              {editablePreset.use_timeout && (
                <PanelSectionRow>
                  <SliderField
                    bottomSeparator="standard"
                    min={0}
                    showValue
                    max={1000}
                    step={1}
                    label={t("timeoutInSeconds")}
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

          {editablePreset.value.map((core, index) => (
            <CoreSlider
              key={index}
              coreValue={core}
              coreNumber={index}
              setCoreValue={(value) => updateCore(index, value)}
            />
          ))}
          <PanelSectionRow>
            <ButtonItem layout="below" onClick={handleUpdatePreset}>
              {loading ? t("saving") : t("savePreset")}
            </ButtonItem>
          </PanelSectionRow>
          <PanelSectionRow>
            <ButtonItem
              disabled={loading}
              layout="below"
              onClick={handleDeletePreset}
            >
              {doubleCheckDelete ? t("reallyDelete") : t("delete")}
            </ButtonItem>
          </PanelSectionRow>
        </Fragment>
      )}
    </Fragment>
  );
};

export default PresetManager;
