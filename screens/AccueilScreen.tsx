import { FlatList, Text, View } from "react-native";
import BoutonAction from "../components/buttons/BoutonAction";
import { Routes } from "../navigation/routes";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors, styles } from "../theme/styles";
import CustomSafeAreaView from "../components/shared/CustomSafeAreaView";
import { useEffect, useState } from "react";
import { getLivresByEtatLecture } from "../services/livreService";
import { useSQLiteContext } from "expo-sqlite";
import { Livre } from "../models/Livre";
import BoutonCarteLivre from "../components/buttons/BoutonCarteLivre";
import BoutonMiniLivre from "../components/buttons/BoutonMiniLivre";

export default function AccueilScreen() {
  const navigation = useNavigation<any>();
  const db = useSQLiteContext();

  const [livresEnCours, setLivresEnCours] = useState<Livre[]>([]);
  const [livresALire, setLivresALire] = useState<Livre[]>([]);

  useEffect(() => {
    const chargerDonnees = async () => {
      const enCours = await getLivresByEtatLecture(db, "en cours");
      const aLire = await getLivresByEtatLecture(db, "à lire");

      setLivresEnCours(enCours);
      setLivresALire(aLire);
    };

    chargerDonnees();
  }, [db]);

  return (
    <CustomSafeAreaView>
      <Text style={styles.h1}>Bonjour :)</Text>

      <BoutonAction
        label="Ajouter un livre"
        icon={<Entypo name="add-to-list" size={24} color={colors.action} />}
        onPress={() => navigation.navigate(Routes.ajouterLivre)}
      />

      <View style={{ display: "flex", gap: 15 }}>
        <Text style={styles.h3}>Lecture du moment</Text>

        <FlatList
          data={livresEnCours}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BoutonCarteLivre livre={item} />}
        />
      </View>

      <View style={{ display: "flex", gap: 15 }}>
        <Text style={styles.h3}>Prochaines lectures</Text>

        <FlatList
          data={livresALire}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 20 }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BoutonMiniLivre livre={item} />}
        />
      </View>
    </CustomSafeAreaView>
  );
}
