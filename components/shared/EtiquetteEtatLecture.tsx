import { Text } from "react-native";
import {
  COULEURS_ETAT_LECTURE,
  EtatLecture,
  ETATS_LECTURE,
} from "../../utils/constantesLecture";

type EtiquetteEtatLectureProps = {
  etat: EtatLecture;
};

export default function EtiquetteEtatLecture({
  etat,
}: EtiquetteEtatLectureProps) {
  const couleurs =
    COULEURS_ETAT_LECTURE[etat as keyof typeof COULEURS_ETAT_LECTURE] ||
    COULEURS_ETAT_LECTURE[ETATS_LECTURE.ABANDONNE];

  return (
    <Text
      style={{
        backgroundColor: couleurs.background,
        color: couleurs.text,
        borderColor: couleurs.border,
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderWidth: 2,
        borderRadius: 5,
        fontWeight: "bold",
        fontSize: 12,
      }}
    >
      {etat}
    </Text>
  );
}
