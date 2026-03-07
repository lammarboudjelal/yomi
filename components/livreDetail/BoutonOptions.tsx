import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BoutonOptionsProps = {
  onPress: () => void;
};

export default function BoutonOptions({ onPress }: BoutonOptionsProps) {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        zIndex: 100,
        right: 20,
        backgroundColor: "white",
        borderRadius: 30,
        padding: 10,
        marginTop: insets.top,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
      }}
    >
      <MaterialIcons name="more-vert" size={24} color="black" />
    </TouchableOpacity>
  );
}
