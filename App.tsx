import { useEffect } from "react";
import { View, Text } from "react-native";
import { ouvrirBaseDeDonnees } from "./data/database";
import { migrerBaseSiNecessaire } from "./data/schema";
import { insererDonneesDeTestSiVide } from "./data/seed";

export default function App() {
  useEffect(() => {
    const initialiser = async () => {
      try {
        const db = await ouvrirBaseDeDonnees();
        await migrerBaseSiNecessaire(db);
        await insererDonneesDeTestSiVide(db);
        console.log("Base initialisée avec succès");

        // const tables = await db.getAllAsync(
        //   "SELECT name FROM sqlite_master WHERE type='table';",
        // );
        // console.log("Tables existantes :", tables);
      } catch (error) {
        console.error("Erreur initialisation BDD :", error);
      }
    };

    initialiser();
  }, []);

  return (
    <View>
      <Text>Yomi</Text>
    </View>
  );
}
