import { View, Text, TextInput } from "react-native";

type ChampTexteProps = {
  label?: string;
  valeur: string;
  onChange: (texte: string) => void;
  placeholder?: string;
  multiline?: boolean;
  erreur?: string;
};

export default function ChampTexte({
  label,
  valeur,
  onChange,
  placeholder,
  multiline = false,
  erreur,
}: ChampTexteProps) {
  return (
    <View style={{ gap: 5 }}>
      {label ? (
        <Text style={{ fontWeight: "500", fontSize: 12 }}>{label}</Text>
      ) : null}

      <TextInput
        value={valeur}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#A1A1AA"
        multiline={multiline}
        style={{
          borderWidth: 1,
          borderColor: erreur ? "#9d0208" : "#DBC2A9",
          backgroundColor: "white",
          borderRadius: 5,
          padding: 10,
          minHeight: multiline ? 100 : 45,
          textAlignVertical: multiline ? "top" : "center",
        }}
      />

      {erreur && (
        <Text style={{ color: "#9d0208", fontSize: 12 }}>{erreur}</Text>
      )}
    </View>
  );
}
