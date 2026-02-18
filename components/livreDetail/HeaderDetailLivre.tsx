import { View } from "react-native";
import CouvertureLivre from "../shared/CouvertureLivre";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  couverture?: string | null;
};

export default function HeaderDetailLivre({ couverture }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        height: 200,
        backgroundColor: "#6C7BD0",
        alignItems: "center",
        justifyContent: "flex-end",
        position: "relative",
        marginTop: insets.top + 80,
      }}
    >
      <View style={{ zIndex: 10, elevation: 10 }}>
        <CouvertureLivre couverture={couverture} width={140} height={200} />
      </View>
    </View>
  );
}
