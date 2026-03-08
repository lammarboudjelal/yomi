import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

type MultipleValueTextFieldProps = {
  label: string;
  valeurs: string[];
  onChange: (valeurs: string[]) => void;
};

export default function MultipleValueTextField({
  label,
  valeurs,
  onChange,
}: MultipleValueTextFieldProps) {
  const addValue = () => {
    onChange([...valeurs, ""]);
  };

  const editValue = (indexToUpdate: number, texte: string) => {
    const copie = [...valeurs];
    copie[indexToUpdate] = texte;
    onChange(copie);
  };

  const deleteValue = (indexToDelete: number) => {
    onChange(valeurs.filter((_, indexValeur) => indexValeur !== indexToDelete));
  };

  return (
    <View style={{ gap: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 16 }}>{label}</Text>

        <TouchableOpacity onPress={addValue}>
          <Entypo name="plus" size={24} color="#705C5C" />
        </TouchableOpacity>
      </View>

      {valeurs.map((valeur, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TextInput
            value={valeur}
            onChangeText={(text) => editValue(index, text)}
            placeholder="Nomination"
            placeholderTextColor="#A1A1AA"
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#DBC2A9",
              backgroundColor: "white",
              borderRadius: 5,
              padding: 10,
            }}
          />

          <TouchableOpacity onPress={() => deleteValue(index)}>
            <Entypo name="minus" size={24} color="#705C5C" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
