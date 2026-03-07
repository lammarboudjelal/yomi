import { View } from "react-native";
import BoutonRetour from "../components/navigation/BoutonRetour";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import FormulaireLivre from "../components/formulaire/FormulaireLivre";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FormulaireLivreScreenProps = {
  route: RouteProp<RootStackParamList, "FormulaireLivre">;
};

export default function FormulaireLivreScreen({
  route,
}: FormulaireLivreScreenProps) {
  const { mode, livreInitial } = route.params;
  const insets = useSafeAreaInsets();

  console.log(livreInitial);

  return (
    <View style={{ marginBottom: insets.bottom }}>
      <BoutonRetour />

      <FormulaireLivre mode={mode} livreInitial={livreInitial ?? undefined} />
    </View>
  );
}
