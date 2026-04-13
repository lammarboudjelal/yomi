import { View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { imagesLocales } from "../../utils/imagesLocales";
import { useState } from "react";

type CouvertureLivreProps = {
  couverture?: string | null;
  width?: number;
  height?: number;
  rounded?: boolean;
};

export default function CouvertureLivre({
  couverture,
  width = 70,
  height = 100,
  rounded = true,
}: CouvertureLivreProps) {
  const [erreurImage, setErreurImage] = useState(false);

  const getSource = () => {
    if (!couverture) return null;

    // Image ajoutée depuis la galerie ou en ligne
    if (couverture.startsWith("file://") || couverture.startsWith("https")) {
      return { uri: couverture };
    }

    // Image locale de test
    if (imagesLocales[couverture]) {
      return imagesLocales[couverture];
    }

    return null;
  };

  const source = getSource();

  if (source && !erreurImage) {
    return (
      <Image
        source={source}
        onError={() => setErreurImage(true)}
        style={{
          width: width,
          height: height,
          borderRadius: rounded ? 5 : 0,
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: width,
        height: height,
        borderRadius: rounded ? 5 : 0,
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialIcons name="image-not-supported" size={28} color="#9E9E9E" />
    </View>
  );
}
