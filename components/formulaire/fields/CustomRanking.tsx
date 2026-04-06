import { TouchableOpacity, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, styles } from "../../../theme/styles";

type CustomRankingProps = {
  note?: number;
  editable?: boolean;
  label?: string;
  onChange?: (note: number) => void;
};

export default function CustomRanking({
  note = 0,
  editable = false,
  label,
  onChange,
}: CustomRankingProps) {
  return (
    <View style={{ gap: 5 }}>
      {label ? <Text style={styles.formLabel}>{label}</Text> : null}

      <View style={{ flexDirection: "row", gap: 1 }}>
        {[1, 2, 3, 4, 5].map((etoile) => {
          const icon = (
            <MaterialIcons
              name={etoile <= note ? "star" : "star-border"}
              size={24}
              color={colors.ranking}
              key={etoile}
            />
          );

          if (!editable || !onChange) return icon;

          return (
            <TouchableOpacity key={etoile} onPress={() => onChange(etoile)}>
              {icon}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
