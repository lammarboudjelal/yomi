import { useState } from "react";
import { View, Text, TextInput } from "react-native";

type CustomDateFieldProps = {
  label?: string;
  valeur: string;
  onChange: (value: string) => void;
  erreur?: string;
};

export default function CustomDateField({
  label,
  valeur,
  onChange,
  erreur,
}: CustomDateFieldProps) {
  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, 8);

    let formatted = digits;

    if (digits.length > 2) {
      formatted = digits.slice(0, 2) + "/" + digits.slice(2);
    }

    if (digits.length > 4) {
      formatted =
        digits.slice(0, 2) + "/" + digits.slice(2, 4) + "/" + digits.slice(4);
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
        placeholder="JJ/MM/AAAA"
        placeholderTextColor="#A1A1AA"
        maxLength={10}
        style={{
          borderWidth: 1,
          borderColor: erreur ? "#9d0208" : "#DBC2A9",
          backgroundColor: "white",
          borderRadius: 5,
          padding: 10,
          height: 45,
        }}
      />

      {erreur && (
        <Text style={{ color: "#9d0208", fontSize: 12 }}>{erreur}</Text>
      )}
    </View>
  );
}
