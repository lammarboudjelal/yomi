import { TouchableOpacity, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BoutonEnregistrerProps = {
  onPress: () => void;
};

export default function BoutonEnregistrer({ onPress }: BoutonEnregistrerProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          position: "absolute",
          zIndex: 100,
          right: 0,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: insets.top,
          borderTopLeftRadius: 40,
          borderBottomLeftRadius: 40,
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingVertical: 15,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 6,
        }}
      >
        <MaterialIcons name="check" size={24} color="black" />

        <Text style={{ fontWeight: "600", fontSize: 16 }}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
}
