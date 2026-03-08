import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  label?: string;
  valeur: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function CustomSelect({
  label,
  valeur,
  options,
  onChange,
}: CustomSelectProps) {
  const selectedOption = options.find((o) => o.value === valeur);

  return (
    <View style={{ gap: 10 }}>
      <Text style={{ fontWeight: "500", fontSize: 12 }}>{label}</Text>

      <SelectDropdown
        data={options}
        onSelect={(item) => onChange(item.value)}
        renderButton={(selectedItem, isOpen) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: "#DBC2A9",
              backgroundColor: "white",
              borderRadius: 5,
              paddingHorizontal: 12,
              paddingVertical: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: selectedOption ? "black" : "#A1A1AA" }}>
              {selectedItem?.label ?? selectedOption?.label ?? "Sélectionner"}
            </Text>

            <MaterialIcons
              name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={22}
              color="#705C5C"
            />
          </View>
        )}
        renderItem={(item, isSelected) => (
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 15,
              backgroundColor: isSelected ? "#F5F5F5" : "white",
            }}
          >
            <Text>{item.label}</Text>
          </View>
        )}
        dropdownStyle={{
          borderRadius: 8,
        }}
      />
    </View>
  );
}
