import { Text, View, FlatList } from "react-native";
import { useCallback, useState } from "react";
import {
  getStatistiquesLecture,
  getTousLesLivres,
} from "../services/livreService";
import BoutonCarteLivre from "../components/buttons/BoutonCarteLivre";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { colors, styles } from "../theme/styles";
import CustomSafeAreaView from "../components/shared/CustomSafeAreaView";

const Statistique = ({ label, value }: { label: string; value: number }) => (
  <View style={{ gap: 5, alignItems: "center" }}>
    <Text style={{ fontWeight: 500, fontSize: 12, color: colors.action }}>
      {label}
    </Text>
    <Text style={{ fontWeight: 500, fontSize: 16 }}>{value}</Text>
  </View>
);

const Statistiques = ({
  nbTotal,
  nbALire,
  nbLu,
}: {
  nbTotal: number;
  nbALire: number;
  nbLu: number;
}) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-around",
      paddingBottom: 20,
    }}
  >
    <Statistique label="Total" value={nbTotal} />
    <Statistique label="À lire" value={nbALire} />
    <Statistique label="Lu" value={nbLu} />
  </View>
);

export default function BibliothequeScreen() {
  const [livres, setLivres] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    aLire: 0,
    lu: 0,
  });
  const db = useSQLiteContext();

  useFocusEffect(
    useCallback(() => {
      const chargerDonnees = async () => {
        const livresData = await getTousLesLivres(db);
        const statsData = await getStatistiquesLecture(db);

        setLivres(livresData);
        setStats(statsData);
      };

      chargerDonnees();
    }, []),
  );

  return (
    <CustomSafeAreaView>
      <Text style={styles.h1}>Bibliothèque</Text>

      <FlatList
        data={livres}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BoutonCarteLivre livre={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <Statistiques
            nbTotal={stats.total}
            nbALire={stats.aLire}
            nbLu={stats.lu}
          />
        }
      />
    </CustomSafeAreaView>
  );
}
