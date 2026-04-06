import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { Routes } from "../../navigation/routes";
import { ModeFormulaire } from "../../utils/modeFormulaire";

type BoutonActionProps = {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export default function BoutonAction({
  label,
  icon,
  onPress,
}: BoutonActionProps) {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
        borderRadius: 5,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
      }}
    >
      {icon}

      <Text style={{ fontSize: 16, fontWeight: 600 }}>{label}</Text>
    </TouchableOpacity>
  );
}
