import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NoteEtoiles from "../shared/NoteEtoiles";
import EtiquetteEtatLecture from "../shared/EtiquetteEtatLecture";
import { FontAwesome5 } from "@expo/vector-icons";
import CouvertureLivre from "../shared/CouvertureLivre";
import { Livre } from "../../models/Livre";

type BoutonCarteLivreProps = {
  livre: Livre;
};

export default function BoutonCarteLivre({ livre }: BoutonCarteLivreProps) {
  const navigation = useNavigation<any>();

  const iconeStatut =
    livre.statut_possession === "acheté" ? "shopping-basket" : "exchange-alt";

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("LivreDetail", { livreId: livre.id })}
      style={{
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        flexDirection: "row",
        gap: 10,

        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,

        marginBottom: 16,
      }}
    >
      {/* Image */}
      <CouvertureLivre couverture={livre.couverture} />

      <View
        style={{
          flex: 1,
          flexDirection: "column",
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
              flexDirection: "column",
              gap: 5,
              marginRight: 10,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 700 }} numberOfLines={1}>
              {livre.titre}
            </Text>

            <Text style={{ fontSize: 12 }} numberOfLines={1}>
              {livre.auteurs?.join(", ")}
            </Text>
          </View>

          {/* État de lecture */}
          <EtiquetteEtatLecture etat={livre.etat_lecture} />
        </View>

        {/* Genre(s) */}
        <Text
          style={{ fontSize: 12, textTransform: "capitalize" }}
          numberOfLines={1}
        >
          {livre.genres?.join(", ")}
        </Text>

        {/* Note et statut (achat ou emprunt) */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <NoteEtoiles note={livre.note || 0} />

          <FontAwesome5 name={iconeStatut as any} size={20} color="#C2C2C2" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
