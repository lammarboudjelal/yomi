import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BoutonAction from "../components/buttons/BoutonAction";
import { Routes } from "../navigation/routes";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AccueilScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        flex: 1,
        gap: 20,
        paddingTop: insets.top + 10,
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>Accueil</Text>

      <BoutonAction
        label="Ajouter un livre"
        icon={<Entypo name="add-to-list" size={24} color="#705C5C" />}
        onPress={() =>
          navigation.navigate(Routes.ajouterLivre)
        }
      />
    </View>
  );
}
