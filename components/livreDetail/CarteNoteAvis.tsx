import { View, Text, TouchableOpacity } from "react-native";
import CustomRanking from "../formulaire/fields/CustomRanking";
import { MaterialIcons } from "@expo/vector-icons";
import { Livre } from "../../models/Livre";

type CarteNoteAvisProps = {
  livre: Livre;
  onPress: () => void;
};

export default function CarteNoteAvis({ livre, onPress }: CarteNoteAvisProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          gap: 10,
          borderRadius: 5,
          marginHorizontal: 20,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 6,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomRanking note={livre.note} />

          <MaterialIcons name="edit-note" size={24} color="#705C5C" />
        </View>

        <Text numberOfLines={1}>
          {livre.avis ?? "Modifier la note et l’avis"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
