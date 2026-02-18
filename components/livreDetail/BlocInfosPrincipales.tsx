import { View, Text } from "react-native";
import EtiquetteEtatLecture from "../shared/EtiquetteEtatLecture";

type Props = {
  livre: any;
};

export default function BlocInfosPrincipales({ livre }: Props) {
  return (
    <View style={{ alignItems: "center", gap: 20, paddingHorizontal: 20 }}>
      {/* Titre et auteur(s) */}
      <View style={{ alignItems: "center", gap: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "600", textAlign: "center" }}>
          {livre.titre}
        </Text>

        <Text>{livre.auteurs?.join(", ")}</Text>
      </View>

      {/* Genres */}
      <Text
        style={{
          textAlign: "center",
          textTransform: "capitalize",
          width: "100%",
        }}
      >
        {livre.genres?.join(", ")}
      </Text>

      {/* Bloc infos pages, état de lecture et statut possession */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Pages */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>{livre.nombre_pages || "-"} pages</Text>
        </View>

        {/* Trait */}
        <View
          style={{
            width: 2,
            height: "100%",
            backgroundColor: "#7B6565",
            position: "absolute",
            left: "33.33%",
          }}
        />

        {/* Etat */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <EtiquetteEtatLecture etat={livre.etat_lecture} />
        </View>

        {/* Trait */}
        <View
          style={{
            width: 2,
            height: "100%",
            backgroundColor: "#7B6565",
            position: "absolute",
            left: "66.66%",
          }}
        />

        {/* Statut */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ textTransform: "capitalize" }}>
            {livre.statut_possession}
          </Text>
        </View>
      </View>
    </View>
  );
}
