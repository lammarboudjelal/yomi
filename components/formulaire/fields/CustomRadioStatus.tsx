import { View, Text, TouchableOpacity } from "react-native";
import { StatutPossession } from "../../../models/StatutPosession";
import { colors } from "../../../theme/styles";

type CustomRadioStatusProps = {
  valeur: string;
  onChange: (value: StatutPossession) => void;
};

const options: StatutPossession[] = ["acheté", "emprunté"];

export default function CustomRadioStatus({
  valeur,
  onChange,
}: CustomRadioStatusProps) {
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
              borderColor: colors.action,
              backgroundColor:
                valeur === statut ? colors.action : "transparent",
            }}
          />

          <Text style={{ textTransform: "capitalize" }}>{statut}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
