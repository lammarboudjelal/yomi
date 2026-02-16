import { RouteProp } from "@react-navigation/native";
import { Text, View } from "react-native";
import { RootStackParamList } from "../navigation/types";
import { useEffect, useState } from "react";
import { Livre } from "../models/Livre";
import { ouvrirBaseDeDonnees } from "../data/database";
import { getLivreParId } from "../services/livreService";

type LivreDetailRouteProp = RouteProp<RootStackParamList, "LivreDetail">;

type Props = {
  route: LivreDetailRouteProp;
};

export default function LivreDetailScreen({ route }: Props) {
  const { livreId } = route.params;
  const [livre, setLivre] = useState<Livre | null>(null);

  useEffect(() => {
    const chargerLivre = async () => {
      const db = await ouvrirBaseDeDonnees();
      const data = await getLivreParId(db, livreId);
      setLivre(data);
    };

    chargerLivre();
  }, [livreId]);

  if (!livre) {
    return (
      <View>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{livre.titre}</Text>
      <Text>Auteur(s) : {livre.auteurs.join(", ")}</Text>
      <Text>Genre(s) : {livre.genres.join(", ")}</Text>
      <Text>État : {livre.etat_lecture}</Text>
      <Text>Note : {livre.note}</Text>
    </View>
  );
}
