import { View, Text } from "react-native";
import { Livre } from "../../models/Livre";
import EtatLectureEditable from "./EtatLectureEditable";
import { EtatLecture } from "../../utils/constantesLecture";

type BlocInfosPrincipalesProps = {
  livre: Livre;
  onChangeEtatLecture: (etat: EtatLecture) => void;
};

export default function BlocInfosPrincipales({
  livre,
  onChangeEtatLecture,
}: BlocInfosPrincipalesProps) {
  return (
    <View style={{ alignItems: "center", gap: 20, paddingHorizontal: 20 }}>
      {/* Titre et auteur(s) */}
      <View style={{ alignItems: "center", gap: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "600", textAlign: "center" }}>
          {livre.titre}
        </Text>

        {livre.auteurs && livre.auteurs.length > 0 && (
          <Text style={{ textTransform: "capitalize" }}>
            {livre.auteurs.join(", ")}
          </Text>
        )}
      </View>

      {/* Genres */}
      {livre.genres && livre.genres.length > 0 && (
        <Text
          style={{
            textAlign: "center",
            textTransform: "capitalize",
            width: "100%",
          }}
        >
          {livre.genres.join(", ")}
        </Text>
      )}

      {/* Bloc infos */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Pages */}
        <View style={{ alignItems: "center", width: "30%" }}>
          <Text>{livre.nombre_pages || "-"} pages</Text>
        </View>

        {/* Trait */}
        <View
          style={{
            width: 2,
            height: "100%",
            backgroundColor: "#7B6565",
          }}
        />

        {/* Etat */}
        <View style={{ alignItems: "center", width: "40%" }}>
          <EtatLectureEditable
            valeur={livre.etat_lecture}
            onChange={onChangeEtatLecture}
          />
        </View>

        {/* Trait */}
        <View
          style={{
            width: 2,
            height: "100%",
            backgroundColor: "#7B6565",
          }}
        />

        {/* Statut */}
        <View style={{ alignItems: "center", width: "30%" }}>
          <Text style={{ textTransform: "capitalize" }}>
            {livre.statut_possession}
          </Text>
        </View>
      </View>
    </View>
  );
}
