import { View, Text, TouchableOpacity } from "react-native";
import { StatutPossession } from "../../../utils/constantesStatutPosession";

type ChampRadioStatutProps = {
  valeur: string;
  onChange: (value: StatutPossession) => void;
};

const options: StatutPossession[] = ["acheté", "emprunté"];

export default function ChampRadioStatut({
  valeur,
  onChange,
}: ChampRadioStatutProps) {
  return (
    <View style={{ flexDirection: "row", gap: 30 }}>
      {options.map((statut) => (
        <TouchableOpacity
          key={statut}
          onPress={() => onChange(statut)}
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 9,
              borderWidth: 2,
              borderColor: "#705C5C",
              backgroundColor: valeur === statut ? "#705C5C" : "transparent",
            }}
          />

          <Text style={{ textTransform: "capitalize" }}>{statut}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
