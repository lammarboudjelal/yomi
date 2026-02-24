import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type NoteEtoilesProps = {
  note?: number;
};

export default function NoteEtoiles({ note }: NoteEtoilesProps) {
  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((etoile) => (
        <MaterialIcons
          key={etoile}
          name={etoile <= note ? "star" : "star-border"}
          size={24}
          color="#F2B705"
        />
      ))}
    </View>
  );
}
