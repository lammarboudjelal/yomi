import { useNavigation } from "@react-navigation/native";
import { Livre } from "../../models/Livre";
import { TouchableOpacity, View } from "react-native";
import { Routes } from "../../navigation/routes";
import CouvertureLivre from "../shared/CouvertureLivre";

const BOOK_WIDTH = 100;
const BOOK_HEIGHT = 130;
const SPINE_WIDTH = 14;

const COLORS = {
  primary: "#815936",
  paper: "#DBC0A9",
};

type BoutonMiniLivreProps = {
  livre: Livre;
};

export default function BoutonMiniLivre({ livre }: BoutonMiniLivreProps) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.livreDetail, { livreId: livre.id })
      }
    >
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            overflow: "hidden",
            borderTopLeftRadius: 8,
            borderTopWidth: 1, 
            borderRightWidth: 1,
            borderColor: COLORS.primary,
          }}
        >
          <View
            style={{ width: SPINE_WIDTH, backgroundColor: COLORS.primary }}
          />

          <CouvertureLivre
            couverture={livre.couverture}
            width={BOOK_WIDTH - SPINE_WIDTH}
            height={BOOK_HEIGHT}
            rounded={false}
          />
        </View>

        <View
          style={{
            height: 8,
            backgroundColor: COLORS.primary,
            borderBottomRightRadius: 4,
          }}
        />

        <View
          style={{
            backgroundColor: COLORS.primary,
            paddingLeft: 10,
            width: BOOK_WIDTH - 5,
          }}
        >
          <View
            style={{
              height: 12,
              backgroundColor: COLORS.paper,
              borderBottomLeftRadius: 4,
              borderTopLeftRadius: 4,
            }}
          />
        </View>

        <View
          style={{
            height: 8,
            backgroundColor: COLORS.primary,
            borderBottomRightRadius: 4,
            borderTopRightRadius: 4,
            borderBottomLeftRadius: 8,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
