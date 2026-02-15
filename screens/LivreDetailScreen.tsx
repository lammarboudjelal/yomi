import { RouteProp } from "@react-navigation/native";
import { Text, View } from "react-native";
import { RootStackParamList } from "../navigation/types";

type LivreDetailRouteProp = RouteProp<RootStackParamList, "LivreDetail">;

type Props = {
  route: LivreDetailRouteProp;
};

export default function LivreDetailScreen({ route }: Props) {
  const { livreId } = route.params ?? {};

  return (
    <View>
      <Text>Détail du livre</Text>
      <Text>ID : {livreId}</Text>
    </View>
  );
}
