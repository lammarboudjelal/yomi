import { Text, View, FlatList } from "react-native";
import { useCallback, useState } from "react";
import { getTousLesLivres } from "../services/livreService";
import BoutonCarteLivre from "../components/boutonLivre/BoutonCarteLivre";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

export default function BibliothequeScreen() {
  const [livres, setLivres] = useState<any[]>([]);
  const insets = useSafeAreaInsets();
  const db = useSQLiteContext();

  useFocusEffect(
    useCallback(() => {
      const chargerLivres = async () => {
        const data = await getTousLesLivres(db);
        setLivres(data);
      };

      chargerLivres();
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        gap: 20,
        paddingTop: insets.top + 10,
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>Bibliothèque</Text>

      <FlatList
        data={livres}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BoutonCarteLivre livre={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
