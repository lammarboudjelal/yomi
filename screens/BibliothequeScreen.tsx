import { Text, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { ouvrirBaseDeDonnees } from "../data/database";
import { getTousLesLivres } from "../services/livreService";
import BoutonCarteLivre from "../components/BoutonCarteLivre";
import BarreNavigation from "../components/BarreNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BibliothequeScreen() {
  const [livres, setLivres] = useState<any[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const chargerLivres = async () => {
      const db = await ouvrirBaseDeDonnees();
      const data = await getTousLesLivres(db);
      setLivres(data);
    };

    chargerLivres();
  }, []);

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

      <BarreNavigation pageActive="Bibliotheque" />
    </View>
  );
}
