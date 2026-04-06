import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AccueilScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        gap: 20,
        paddingTop: insets.top + 10,
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>Accueil</Text>
    </View>
  );
}
