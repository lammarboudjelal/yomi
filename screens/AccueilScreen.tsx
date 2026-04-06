import { Text, View } from "react-native";
import BoutonAction from "../components/buttons/BoutonAction";
import { Routes } from "../navigation/routes";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors, styles } from "../theme/styles";
import CustomSafeAreaView from "../components/shared/CustomSafeAreaView";

export default function AccueilScreen() {
  const navigation = useNavigation<any>();

  return (
    <CustomSafeAreaView>
      <Text style={styles.h1}>Accueil</Text>

      <BoutonAction
        label="Ajouter un livre"
        icon={<Entypo name="add-to-list" size={24} color={colors.action} />}
        onPress={() => navigation.navigate(Routes.ajouterLivre)}
      />
    </CustomSafeAreaView>
  );
}
