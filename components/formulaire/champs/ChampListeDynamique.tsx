import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

type ChampListeDynamiqueProps = {
  label: string;
  valeurs: string[];
  onChange: (valeurs: string[]) => void;
};

export default function ChampListeDynamique({
  label,
  valeurs,
  onChange,
}: ChampListeDynamiqueProps) {
  const ajouter = () => {
    onChange([...valeurs, ""]);
  };

  const modifier = (index: number, texte: string) => {
    const copie = [...valeurs];
    copie[index] = texte;
    onChange(copie);
  };

  const supprimer = (index: number) => {
    onChange(valeurs.filter((_, i) => i !== index));
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

        <TouchableOpacity onPress={ajouter}>
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
            onChangeText={(text) => modifier(index, text)}
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

          <TouchableOpacity onPress={() => supprimer(index)}>
            <Entypo name="minus" size={24} color="#705C5C" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
