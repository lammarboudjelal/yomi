import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ChampNoteEtoiles from "../formulaire/champs/ChampNoteEtoiles";
import EtiquetteEtatLecture from "../shared/EtiquetteEtatLecture";
import { FontAwesome5 } from "@expo/vector-icons";
import CouvertureLivre from "../shared/CouvertureLivre";
import { Livre } from "../../models/Livre";
import { Routes } from "../../navigation/routes";
import { StatutPossession } from "../../utils/constantesStatutPosession";

type BoutonCarteLivreProps = {
  livre: Livre;
};

export default function BoutonCarteLivre({ livre }: BoutonCarteLivreProps) {
  const navigation = useNavigation<any>();

  const iconeStatut =
    livre.statut_possession === StatutPossession.achete
      ? "shopping-basket"
      : "exchange-alt";

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.livreDetail, { livreId: livre.id })
      }
      style={{
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        flexDirection: "row",
        gap: 10,

        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,

        marginBottom: 16,
      }}
    >
      {/* Image */}
      <CouvertureLivre couverture={livre.couverture} />

      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Titre et auteur(s) */}
          <View
            style={{
              flex: 1,
              gap: 5,
              marginRight: 10,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 700 }} numberOfLines={1}>
              {livre.titre}
            </Text>

            {livre.auteurs && livre.auteurs.length > 0 && (
              <Text
                style={{ fontSize: 12, textTransform: "capitalize" }}
                numberOfLines={1}
              >
                {livre.auteurs.join(", ")}
              </Text>
            )}
          </View>

          {/* État de lecture */}
          <EtiquetteEtatLecture etat={livre.etat_lecture} />
        </View>

        {/* Genre(s) */}
        {livre.genres && livre.genres.length > 0 && (
          <Text
            style={{ fontSize: 12, textTransform: "capitalize" }}
            numberOfLines={1}
          >
            {livre.genres.join(", ")}
          </Text>
        )}

        {/* Note et statut (achat ou emprunt) */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ChampNoteEtoiles note={livre.note || 0} />

          <FontAwesome5 name={iconeStatut as any} size={20} color="#C2C2C2" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
