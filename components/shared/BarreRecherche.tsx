import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

type BarreRechercheProps = {
  valeur: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  onClear?: () => void;
  placeholder?: string;
};

export default function BarreRecherche({
  valeur,
  onChange,
  onSubmit,
  onClear,
  placeholder,
}: BarreRechercheProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DBC2A9",
        borderRadius: 5,
        backgroundColor: "white",
        paddingHorizontal: 10,
      }}
    >
      <FontAwesome name="search" size={16} color="#705C5C" />

      <TextInput
        value={valeur}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        placeholder={placeholder ?? "Rechercher"}
        returnKeyType="search"
        style={{
          flex: 1,
          padding: 10,
        }}
      />

      {valeur.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <Text style={{ color: "#705C5C", fontWeight: 600 }}>Annuler</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
