import { View } from "react-native";
import CouvertureLivre from "../shared/CouvertureLivre";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { recupererCouleurDominante } from "../../utils/couleurDominante";

type Props = {
  couverture?: string | null;
};

export default function HeaderDetailLivre({ couverture }: Props) {
  const insets = useSafeAreaInsets();
  const [couleurFond, setCouleurFond] = useState("#A0A0A0");

  useEffect(() => {
    const chargerCouleur = async () => {
      const couleur = await recupererCouleurDominante(couverture);
      setCouleurFond(couleur);
    };

    chargerCouleur();
  }, [couverture]);

  return (
    <View
      style={{
        height: 200,
        backgroundColor: couleurFond,
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
