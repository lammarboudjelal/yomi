import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, ActivityIndicator, FlatList } from "react-native";
import { Routes } from "../navigation/routes";
import { ModeFormulaire } from "../utils/modeFormulaire";
import { useState } from "react";
import { LivreFormulaire } from "../models/Livre";
import { mapGoogleBookToLivre } from "../utils/googleBooksMapper";
import { rechercherLivres } from "../services/googleBooksService";
import BoutonCarteLivre from "../components/buttons/BoutonCarteLivre";
import BarreRecherche from "../components/shared/BarreRecherche";
import BoutonAction from "../components/buttons/BoutonAction";
import { colors, styles } from "../theme/styles";
import CustomSafeAreaView from "../components/shared/CustomSafeAreaView";

export default function AjouterLivreScreen() {
  const navigation = useNavigation<any>();

  const [query, setQuery] = useState("");
  const [resultats, setResultats] = useState<LivreFormulaire[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageErreur, setMessageErreur] = useState<string | null>(null);

  const lancerRecherche = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
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
      setIsLoading(false);
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
    <CustomSafeAreaView>
      <Text style={styles.h1}>Ajouter un livre</Text>

      <BoutonAction
        label="Saisir manuellement"
        icon={<Entypo name="keyboard" size={24} color={colors.action} />}
        onPress={() =>
          navigation.navigate(Routes.formulaireLivre, {
            mode: ModeFormulaire.ajouter,
          })
        }
      />

      <BoutonAction
        label="Scanner un code-barres"
        icon={<Entypo name="camera" size={24} color={colors.action} />}
        onPress={() => navigation.navigate(Routes.scanISBN)}
      />

      <BarreRecherche
        valeur={query}
        onChange={setQuery}
        onSubmit={lancerRecherche}
        onClear={clearRecherche}
        placeholder="Titre, auteur ou ISBN"
      />

      {isLoading && <ActivityIndicator size="large" />}

      {messageErreur && (
        <Text style={{ textAlign: "center" }}>{messageErreur}</Text>
      )}

      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
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
    </CustomSafeAreaView>
  );
}
