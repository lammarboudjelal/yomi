import { View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  couverture?: string | null;
  width?: number;
  height?: number;
};

const imagesLocales: Record<string, any> = {
  "galette-au-miel.jpg": require("../assets/cover/galette-au-miel.jpg"),
  "la-boulangerie-de-minuit.jpg": require("../assets/cover/la-boulangerie-de-minuit.jpg"),
  "la-chirurgienne.jpg": require("../assets/cover/la-chirurgienne.jpg"),
  "le-grand-magasin-des-reves.jpg": require("../assets/cover/le-grand-magasin-des-reves.jpg"),
  "le-grand-magasin-des-reves-2.jpg": require("../assets/cover/le-grand-magasin-des-reves-2.jpg"),
  "un-printemps-au-gout-de-mochi.jpg": require("../assets/cover/un-printemps-au-gout-de-mochi.jpg"),
};

export default function CouvertureLivre({
  couverture,
  width = 70,
  height = 100,
}: Props) {
  const getSource = () => {
    if (!couverture) return null;

    // Image ajoutée depuis la galerie
    if (couverture.startsWith("file://")) {
      return { uri: couverture };
    }

    // Image locale de test
    if (imagesLocales[couverture]) {
      return imagesLocales[couverture];
    }

    return null;
  };

  const source = getSource();

  if (source) {
    return (
      <Image
        source={source}
        style={{
          width: width,
          height: height,
          borderRadius: 5,
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: width,
        height: height,
        borderRadius: 5,
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialIcons name="image-not-supported" size={28} color="#9E9E9E" />
    </View>
  );
}
