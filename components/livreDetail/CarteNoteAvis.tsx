import { View, Text } from "react-native";
import ChampNoteEtoiles from "../formulaire/champs/ChampNoteEtoiles";
import { MaterialIcons } from "@expo/vector-icons";
import { Livre } from "../../models/Livre";

type CarteNoteAvisProps = {
  livre: Livre;
};

export default function CarteNoteAvis({ livre }: CarteNoteAvisProps) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 20,
        gap: 10,
        borderRadius: 5,
        marginHorizontal: 20,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ChampNoteEtoiles note={livre.note} />

        <MaterialIcons name="edit-note" size={24} color="#705C5C" />
      </View>

      <Text numberOfLines={1}>Modifier la note et l’avis</Text>
    </View>
  );
}
