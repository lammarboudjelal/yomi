import { View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { imagesLocales } from "../../utils/imagesLocales";

type Props = {
  couverture?: string | null;
  width?: number;
  height?: number;
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
