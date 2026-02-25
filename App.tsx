import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ouvrirBaseDeDonnees } from "./data/database";
import { migrerBaseSiNecessaire } from "./data/schema";
import { insererDonneesDeTestSiVide } from "./data/seed";
import LivreDetailScreen from "./screens/LivreDetailScreen";
import { RootStackParamList } from "./navigation/types";
import { navigationTheme } from "./theme/theme";
import { Routes } from "./navigation/routes";
import BarreNavigation from "./components/navigation/BarreNavigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    const initialiser = async () => {
      const db = await ouvrirBaseDeDonnees();
      await migrerBaseSiNecessaire(db);
      await insererDonneesDeTestSiVide(db);
    };

    initialiser();
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator id="RootStack" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BarreNavigation} />
        <Stack.Screen name={Routes.livreDetail} component={LivreDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
