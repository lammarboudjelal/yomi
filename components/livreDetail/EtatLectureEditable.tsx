import SelectDropdown from "react-native-select-dropdown";
import { View, Text } from "react-native";
import EtiquetteEtatLecture from "../shared/EtiquetteEtatLecture";
import { EtatLecture } from "../../models/EtatLecture";

type Props = {
  valeur: EtatLecture;
  onChange: (etat: EtatLecture) => void;
};

export default function EtatLectureEditable({ valeur, onChange }: Props) {
  const options = Object.values(EtatLecture).map((val) => ({
    label: val,
    value: val,
  }));

  return (
    <SelectDropdown
      data={options}
      onSelect={(item) => onChange(item.value as EtatLecture)}
      renderButton={(selectedItem, isOpen) => (
        <View>
          <EtiquetteEtatLecture etat={valeur} editable isOpen={isOpen} />
        </View>
      )}
      renderItem={(item, isSelected) => (
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          <EtiquetteEtatLecture etat={item.value as EtatLecture} />
        </View>
      )}
      dropdownStyle={{
        borderRadius: 8,
      }}
    />
  );
}
