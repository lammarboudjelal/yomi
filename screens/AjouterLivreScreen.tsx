import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Routes } from "../navigation/routes";
import { ModeFormulaire } from "../utils/modeFormulaire";
import { useState } from "react";
import { LivreFormulaire } from "../models/Livre";
import { mapGoogleBookToLivre } from "../utils/googleBooksMapper";
import { rechercherLivres } from "../services/googleBooksService";
import BoutonCarteLivre from "../components/boutonLivre/BoutonCarteLivre";
import BarreRecherche from "../components/shared/BarreRecherche";

function BoutonSaisieManuelle() {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.formulaireLivre, {
          mode: ModeFormulaire.ajouter,
        })
      }
      style={{
        backgroundColor: "white",
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
      <Entypo name="keyboard" size={16} color="#705C5C" />

      <Text style={{ fontSize: 16, fontWeight: 600 }}>Saisir manuellement</Text>
    </TouchableOpacity>
  );
}

export default function AjouterLivreScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [query, setQuery] = useState("");
  const [resultats, setResultats] = useState<LivreFormulaire[]>([]);
  const [loading, setLoading] = useState(false);
  const [messageErreur, setMessageErreur] = useState<string | null>(null);

  const lancerRecherche = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setMessageErreur(null);

    try {
      const items = await rechercherLivres(query);

      if (!items || items.length === 0) {
        setResultats([]);
        setMessageErreur("Aucun résultat trouvé.");
        return;
      }

      const livres = items.map(mapGoogleBookToLivre);

      setResultats(livres);
    } catch (error: any) {
      console.log(error);

      if (error.message === "Network request failed") {
        setMessageErreur(
          "Vous semblez hors connexion. Vérifiez votre connexion internet.",
        );
      } else {
        setMessageErreur(
          "Le service de recherche est momentanément indisponible.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const clearRecherche = () => {
    setQuery("");
    setResultats([]);
    setMessageErreur("");
  };

  const ouvrirFormulaire = (livre: LivreFormulaire) => {
    navigation.navigate(Routes.formulaireLivre, {
      mode: ModeFormulaire.ajouter,
      livreInitial: livre,
    });
  };

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

      <BarreRecherche
        valeur={query}
        onChange={setQuery}
        onSubmit={lancerRecherche}
        onClear={clearRecherche}
        placeholder="Titre, auteur ou ISBN"
      />

      {loading && <ActivityIndicator size="large" />}

      {messageErreur && (
        <Text style={{ textAlign: "center" }}>{messageErreur}</Text>
      )}

      <FlatList
        data={resultats}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <BoutonCarteLivre
            livre={item as any}
            mode="recherche"
            onPress={() => ouvrirFormulaire(item)}
          />
        )}
      />
    </View>
  );
}
