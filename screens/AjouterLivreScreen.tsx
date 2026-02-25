import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BarreNavigation from "../components/navigation/BarreNavigation";
import { Routes } from "../navigation/routes";

export default function AjouterLivreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        gap: 20,
        paddingTop: insets.top + 10,
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>Ajouter un livre</Text>

      <BarreNavigation pageActive={Routes.ajouterLivre} />
    </View>
  );
}
