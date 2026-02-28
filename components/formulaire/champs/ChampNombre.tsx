import { View, Text, TextInput } from "react-native";

type ChampNombreProps = {
  label: string;
  valeur: string;
  onChange: (texte: string) => void;
  placeholder?: string;
};

export default function ChampNombre({
  label,
  valeur,
  onChange,
  placeholder,
}: ChampNombreProps) {
  const handleChange = (texte: string) => {
    const filtre = texte.replace(/[^0-9.]/g, "");
    onChange(filtre);
  };

  return (
    <View style={{ gap: 5 }}>
      <Text style={{ fontWeight: 500, fontSize: 12 }}>{label}</Text>

      <TextInput
        value={valeur}
        onChangeText={onChange}
        keyboardType="numeric"
        placeholder={placeholder}
        placeholderTextColor="#A1A1AA"
        style={{
          borderWidth: 1,
          borderColor: "#DBC2A9",
          borderRadius: 5,
          padding: 10,
          backgroundColor: "white",
        }}
      />
    </View>
  );
}
