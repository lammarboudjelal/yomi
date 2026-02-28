import { Text } from "react-native";
import {
  CouleursEtatLecture,
  EtatLecture,
} from "../../utils/constantesLecture";

type EtiquetteEtatLectureProps = {
  etat: EtatLecture;
};

export default function EtiquetteEtatLecture({
  etat,
}: EtiquetteEtatLectureProps) {
  const couleurs =
    CouleursEtatLecture[etat as keyof typeof CouleursEtatLecture] ||
    CouleursEtatLecture[EtatLecture.abandonne];

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
