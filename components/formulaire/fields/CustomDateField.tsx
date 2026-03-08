import { View, Text, TextInput } from "react-native";

type CustomDateFieldProps = {
  label?: string;
  valeur: string;
  onChange: (value: string) => void;
};

export default function CustomDateField({
  label,
  valeur,
  onChange,
}: CustomDateFieldProps) {
  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, 8);

    let formatted = digits;

    if (digits.length > 4) {
      formatted = digits.slice(0, 4) + "-" + digits.slice(4);
    }
    if (digits.length > 6) {
      formatted =
        digits.slice(0, 4) + "-" + digits.slice(4, 6) + "-" + digits.slice(6);
    }

    onChange(formatted);
  };

  return (
    <View style={{ gap: 5 }}>
      {label && (
        <Text style={{ fontWeight: "500", fontSize: 12 }}>{label}</Text>
      )}

      <TextInput
        value={valeur}
        onChangeText={handleChange}
        keyboardType="numeric"
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#A1A1AA"
        maxLength={10}
        style={{
          borderWidth: 1,
          borderColor: "#DBC2A9",
          backgroundColor: "white",
          borderRadius: 5,
          padding: 10,
          height: 45,
        }}
      />
    </View>
  );
}
