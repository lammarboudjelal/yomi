import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Routes } from "../../navigation/routes";

type BoutonRetourProps = {
  goBackToBibliotheque?: boolean;
};

export default function BoutonRetour({
  goBackToBibliotheque: goBackRoute,
}: BoutonRetourProps) {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const handlePress = () => {
    if (goBackRoute)
      navigation.navigate("MainTabs", {
        screen: "bibliotheque",
      });
    else navigation.goBack();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
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
