import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { colors } from "../../theme/styles";

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
        borderColor: colors.fieldBorder,
        borderRadius: 5,
        backgroundColor: "white",
        paddingHorizontal: 10,
      }}
    >
      <FontAwesome name="search" size={16} color={colors.action} />

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
          <Text style={{ color: colors.action, fontWeight: 600 }}>Annuler</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
