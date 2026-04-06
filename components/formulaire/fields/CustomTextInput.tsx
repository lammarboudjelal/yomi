import { View, Text, TextInput } from "react-native";
import { colors, styles } from "../../../theme/styles";

type CustomTextInputProps = {
  label?: string;
  valeur: string;
  onChange: (texte: string) => void;
  placeholder?: string;
  multiline?: boolean;
  erreur?: string;
};

export default function CustomTextInput({
  label,
  valeur,
  onChange,
  placeholder,
  multiline = false,
  erreur,
}: CustomTextInputProps) {
  return (
    <View style={{ gap: 5 }}>
      {label ? <Text style={styles.formLabel}>{label}</Text> : null}

      <TextInput
        value={valeur}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.default}
        multiline={multiline}
        style={{
          borderWidth: 1,
          borderColor: erreur ? colors.error : colors.fieldBorder,
          backgroundColor: "white",
          borderRadius: 5,
          padding: 10,
          minHeight: multiline ? 100 : 45,
          textAlignVertical: multiline ? "top" : "center",
        }}
      />

      {erreur && (
        <Text style={{ color: colors.error, fontSize: 12 }}>{erreur}</Text>
      )}
    </View>
  );
}
