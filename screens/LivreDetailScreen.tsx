import { RouteProp } from "@react-navigation/native";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { RootStackParamList } from "../navigation/types";
import { useEffect, useState } from "react";
import { Livre } from "../models/Livre";
import { getLivreParId } from "../services/livreService";
import BlocInfosPrincipales from "../components/livreDetail/BlocInfosPrincipales";
import CarteNoteAvis from "../components/livreDetail/CarteNoteAvis";
import SectionAccordion from "../components/livreDetail/SectionAccordion";
import BoutonRetour from "../components/navigation/BoutonRetour";
import HeaderDetailLivre from "../components/livreDetail/HeaderDetailLivre";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formaterDate } from "../utils/formaterDate";
import { recupererCouleurDominante } from "../utils/couleurDominante";
import { StatutPossession } from "../utils/constantesStatutPosession";
import { useSQLiteContext } from "expo-sqlite";

type LivreDetailRouteProp = RouteProp<RootStackParamList, "LivreDetail">;

type LivreDetailScreenProps = {
  route: LivreDetailRouteProp;
};

const LigneInfo = ({ label, value }: { label: string; value: any }) => (
  <Text>
    • {label} : {value || "-"}
  </Text>
);

export default function LivreDetailScreen({ route }: LivreDetailScreenProps) {
  const { livreId } = route.params;
  const [livre, setLivre] = useState<Livre | null>(null);
  const [loading, setLoading] = useState(true);
  const [couleurFond, setCouleurFond] = useState("#A0A0A0");
  const insets = useSafeAreaInsets();
  const db = useSQLiteContext();

  useEffect(() => {
    const chargerLivre = async () => {
      const data = await getLivreParId(db, livreId);
      setLivre(data);
      setLoading(false);
    };

    chargerLivre();
  }, [livreId]);

  useEffect(() => {
    const chargerCouleur = async () => {
      const couleur = await recupererCouleurDominante(livre.couverture);
      setCouleurFond(couleur);
    };

    chargerCouleur();
  }, [livre]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!livre) {
    return (
      <View>
        <Text>Livre introuvable</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: couleurFond }}>
      <BoutonRetour />

      <ScrollView>
        <HeaderDetailLivre couverture={livre.couverture} />

        <View
          style={{
            backgroundColor: "#F3EBE2",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            marginTop: -100,
            paddingTop: 120,
            gap: 20,
          }}
        >
          <BlocInfosPrincipales livre={livre} />

          <CarteNoteAvis livre={livre} />

          <View style={{ marginBottom: insets.bottom }}>
            <SectionAccordion titre="Résumé">
              <Text>{livre.resume || "Aucun résumé disponible."}</Text>
            </SectionAccordion>

            <SectionAccordion titre="Informations générales">
              <LigneInfo label="Éditeur" value={livre.edition} />
              <LigneInfo
                label="Date de publication"
                value={formaterDate(livre.date_publication)}
              />
              <LigneInfo label="ISBN" value={livre.isbn} />
              <LigneInfo label="Type" value={livre.type} />
            </SectionAccordion>

            <SectionAccordion titre="Informations de lecture">
              <LigneInfo
                label="Date d'enregistrement"
                value={formaterDate(livre.date_ajout)}
              />
              <LigneInfo
                label="Date de début de lecture"
                value={formaterDate(livre.date_debut_lecture)}
              />
              <LigneInfo
                label="Date de fin de lecture"
                value={formaterDate(livre.date_fin_lecture)}
              />
            </SectionAccordion>

            {livre.statut_possession === StatutPossession.achete && (
              <SectionAccordion titre="Informations d’achat">
                <LigneInfo label="Prix" value={livre.prix || "-" + " €"} />
              </SectionAccordion>
            )}

            {livre.statut_possession === StatutPossession.emprunte && (
              <SectionAccordion titre="Informations d’emprunt">
                <LigneInfo label="Prêté par" value={livre.preteur} />
                <LigneInfo
                  label="Date d'emprunt"
                  value={formaterDate(livre.date_pret)}
                />
              </SectionAccordion>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
