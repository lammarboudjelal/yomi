import { Text, View } from "react-native";
import { CouleursEtatLecture, EtatLecture } from "../../models/EtatLecture";
import { MaterialIcons } from "@expo/vector-icons";

type EtiquetteEtatLectureProps = {
  etat: EtatLecture;
  editable?: boolean;
  isOpen?: boolean;
};

export default function EtiquetteEtatLecture({
  etat,
  editable = false,
  isOpen = false,
}: EtiquetteEtatLectureProps) {
  const couleurs =
    CouleursEtatLecture[etat as keyof typeof CouleursEtatLecture] ||
    CouleursEtatLecture[EtatLecture.abandonne];

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: editable ? "space-between" : "center",
        gap: 4,
        backgroundColor: couleurs.background,
        borderColor: couleurs.border,
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 6,
        paddingVertical: 4,

        ...(editable && {
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 3,
          elevation: 2,
          width: "80%",
        }),
      }}
    >
      <Text
        style={{
          color: couleurs.text,
          fontWeight: "bold",
          fontSize: 12,
        }}
      >
        {etat}
      </Text>

      {editable && (
        <MaterialIcons
          name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={16}
          color={couleurs.text}
        />
      )}
    </View>
  );
}
