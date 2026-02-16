import { Text, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  pageActive: string;
};

export default function BarreNavigation({ pageActive }: Props) {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const pages = [
    { label: "Accueil", icon: "home", route: "Accueil" },
    { label: "Ajouter", icon: "add-to-list", route: "AjouterLivre" },
    { label: "Bibliothèque", icon: "book", route: "Bibliotheque" },
    { label: "Calendrier", icon: "calendar", route: "Calendrier" },
  ];

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: insets.bottom,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#F9F5F1",

        shadowColor: "black",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
      }}
    >
      {pages.map((page) => {
        const actif = pageActive === page.route;

        return (
          <TouchableOpacity
            key={page.route}
            onPress={() => navigation.navigate(page.route)}
            style={{ alignItems: "center" }}
          >
            <Entypo
              name={page.icon as any}
              size={26}
              color={actif ? "#271F16" : "#A38F8F"}
            />
            <Text
              style={{
                fontSize: 10,
                color: actif ? "#271F16" : "#A38F8F",
                marginTop: 4,
              }}
            >
              {page.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
