import { View, Text } from "react-native";
import NoteEtoiles from "../shared/NoteEtoiles";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  livre: any;
};

export default function CarteNoteAvis({ livre }: Props) {
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
        <NoteEtoiles note={livre.note} />

        <MaterialIcons name="edit-note" size={24} color="#705C5C" />
      </View>

      <Text numberOfLines={1}>Modifier la note et l’avis</Text>
    </View>
  );
}
