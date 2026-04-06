import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { migrerBaseSiNecessaire } from "./data/schema";
import { insererDonneesDeTestSiVide } from "./data/seed";
import LivreDetailScreen from "./screens/LivreDetailScreen";
import { RootStackParamList } from "./navigation/types";
import { navigationTheme } from "./theme/navigationTheme";
import { Routes } from "./navigation/routes";
import BarreNavigation from "./components/navigation/BarreNavigation";
import FormulaireLivreScreen from "./screens/FormulaireLivreScreen";
import { SQLiteProvider } from "expo-sqlite";
import Toast from "react-native-toast-message";
import { toastConfig } from "./utils/toastConfig";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SQLiteProvider
      databaseName="yomi.db"
      onInit={async (db) => {
        await db.execAsync(`
          PRAGMA foreign_keys = ON;
          PRAGMA journal_mode = WAL;
          PRAGMA journal_size_limit = 2097152;
          PRAGMA synchronous = NORMAL;
          PRAGMA cache_size = -2000;
          `);
        await migrerBaseSiNecessaire(db);
        await insererDonneesDeTestSiVide(db);
      }}
    >
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator id="RootStack" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={BarreNavigation} />
          <Stack.Screen
            name={Routes.livreDetail}
            component={LivreDetailScreen}
          />
          <Stack.Screen
            name={Routes.formulaireLivre}
            component={FormulaireLivreScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <Toast config={toastConfig} />
    </SQLiteProvider>
  );
}
