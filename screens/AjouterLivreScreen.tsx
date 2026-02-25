import { Entypo } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function BoutonSaisieManuelle() {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        shadowColor: "black",
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
      <Entypo name="keyboard" size={24} color="black" />

      <Text style={{ fontSize: 16, fontWeight: 600 }}>Saisir manuellement</Text>
    </TouchableOpacity>
  );
}

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

      <BoutonSaisieManuelle />
    </View>
  );
}
