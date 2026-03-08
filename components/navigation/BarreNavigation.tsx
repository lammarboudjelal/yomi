import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../navigation/types";
import { Routes } from "../../navigation/routes";
import { Entypo } from "@expo/vector-icons";
import BibliothequeScreen from "../../screens/BibliothequeScreen";
import AjouterLivreScreen from "../../screens/AjouterLivreScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BarreNavigation() {
  return (
    <Tab.Navigator
      id="MainTabs"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#F9F5F1",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 80,
          paddingTop: 5,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 8,
        },
        tabBarActiveTintColor: "#271F16",
        tabBarInactiveTintColor: "#A38F8F",
        tabBarIcon: ({ color }) => {
          let iconName: any;

          if (route.name === Routes.bibliotheque) {
            iconName = "book";
          } else if (route.name === Routes.ajouterLivre) {
            iconName = "add-to-list";
          }

          return <Entypo name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tab.Screen name={Routes.ajouterLivre} component={AjouterLivreScreen} options={{
          tabBarLabel: "Ajouter",
        }} />

      <Tab.Screen
        name={Routes.bibliotheque}
        component={BibliothequeScreen}
        options={{
          tabBarLabel: "Bibliothèque",
        }}
      />
    </Tab.Navigator>
  );
}
