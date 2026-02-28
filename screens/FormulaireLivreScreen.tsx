import { View } from "react-native";
import BoutonRetour from "../components/navigation/BoutonRetour";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { useState } from "react";
import { Livre } from "../models/Livre";
import FormulaireLivre from "../components/formulaire/FormulaireLivre";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FormulaireLivreScreenProps = {
  route: RouteProp<RootStackParamList, "FormulaireLivre">;
};

export default function FormulaireLivreScreen({
  route,
}: FormulaireLivreScreenProps) {
  const { mode, livreId } = route.params;
  const [livreInitial, setLivreInitial] = useState<Livre | null>(null);
  const insets = useSafeAreaInsets();

  return (
    <View style={{ marginBottom: insets.bottom }}>
      <BoutonRetour />

      <FormulaireLivre mode={mode} livreInitial={livreInitial ?? undefined} />
    </View>
  );
}
