import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ouvrirBaseDeDonnees } from "./data/database";
import { migrerBaseSiNecessaire } from "./data/schema";
import { insererDonneesDeTestSiVide } from "./data/seed";
import BibliothequeScreen from "./screens/BibliothequeScreen";
import LivreDetailScreen from "./screens/LivreDetailScreen";
import { RootStackParamList } from "./navigation/types";
import { navigationTheme } from "./theme/theme";
import { Routes } from "./navigation/routes";
import AjouterLivreScreen from "./screens/AjouterLivreScreen";

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
      <Stack.Navigator
        id="RootStack"
        initialRouteName="Bibliotheque"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={Routes.bibliotheque}
          component={BibliothequeScreen}
        />
        <Stack.Screen name={Routes.livreDetail} component={LivreDetailScreen} />
        <Stack.Screen
          name={Routes.ajouterLivre}
          component={AjouterLivreScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
