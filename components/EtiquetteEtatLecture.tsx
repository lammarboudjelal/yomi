import { Text } from "react-native";

type Props = {
  etat: string;
};

export default function EtiquetteEtatLecture({ etat }: Props) {
  const getCouleurs = () => {
    switch (etat) {
      case "en cours":
        return { background: "#F5D7B7", text: "#B56917", border: "#B56917" };
      case "à lire":
        return { background: "#BDE3EF", text: "#2C92B5", border: "#2C92B5" };
      case "lu":
        return { background: "#E3E9C3", text: "#778731", border: "#778731" };
      default:
        return { background: "#D6D6D6", text: "#666666", border: "#666666" };
    }
  };

  const couleurs = getCouleurs();

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
