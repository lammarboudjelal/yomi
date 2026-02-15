import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, View, Text } from "react-native";
import { RootStackParamList } from "../navigation/types";
import { useEffect, useState } from "react";
import { Livre } from "../models/Livre";
import { ouvrirBaseDeDonnees } from "../data/database";
import { getTousLesLivres } from "../services/livreService";

type BibliothequeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Bibliotheque"
>;

type Props = {
  navigation: BibliothequeNavigationProp;
};

export default function BibliothequeScreen({ navigation }: Props) {
  const [livres, setLivres] = useState<Livre[]>([]);

  useEffect(() => {
    const chargerLivres = async () => {
      const db = await ouvrirBaseDeDonnees();
      const data = await getTousLesLivres(db);
      setLivres(data);
    };

    chargerLivres();
  }, []);

  return (
    <View>
      {livres.map((livre) => (
        <View key={livre.id}>
          <Button
            title={livre.titre}
            onPress={() =>
              navigation.navigate("LivreDetail", { livreId: livre.id })
            }
          />
        </View>
      ))}

      {livres.length === 0 && <Text>Aucun livre trouvé</Text>}
    </View>
  );
}
