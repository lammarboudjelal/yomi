import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BoutonRetour() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        position: "absolute",
        zIndex: 100,
        left: 0,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: insets.top,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
      }}
    >
      <Ionicons name="arrow-back" size={24} color={"black"} />
    </TouchableOpacity>
  );
}
