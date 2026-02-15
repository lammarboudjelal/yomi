import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { ouvrirBaseDeDonnees } from "./data/database";
import { migrerBaseSiNecessaire } from "./data/schema";
import { insererDonneesDeTestSiVide } from "./data/seed";
import { getTousLesLivres } from "./services/livreService";
import { Livre } from "./models/Livre";

export default function App() {
  const [livres, setLivres] = useState<Livre[]>([]);

  useEffect(() => {
    const initialiser = async () => {
      try {
        const db = await ouvrirBaseDeDonnees();
        await migrerBaseSiNecessaire(db);
        await insererDonneesDeTestSiVide(db);

        const data = await getTousLesLivres(db);
        setLivres(data);
      } catch (error) {
        console.error(error);
      }
    };

    initialiser();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Ma Bibliothèque</Text>

      <FlatList
        data={livres}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: "bold" }}>{item.titre}</Text>
            <Text>Auteur(s) : {item.auteurs.join(", ")}</Text>
            <Text>État : {item.etat_lecture}</Text>
            <Text>Genre(s) : {item.genres.join(", ")}</Text>
          </View>
        )}
      />
    </View>
  );
}
