import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { File, Paths } from "expo-file-system";
import { imagesLocales } from "../../../utils/imagesLocales";

type CustomImagePickerProps = {
  label?: string;
  valeur?: string;
  onChange: (uri: string | null) => void;
};

export default function CustomImagePicker({
  label,
  valeur,
  onChange,
}: CustomImagePickerProps) {
  const choisirImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission refusée pour accéder aux images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      aspect: [2, 3],
    });

    if (!result.canceled) {
      try {
        const uriTemporaire = result.assets[0].uri;

        const nomFichier = `couverture_${Date.now()}.jpg`;

        const fichierSource = new File(uriTemporaire);
        const fichierDestination = new File(Paths.document, nomFichier);

        fichierSource.copy(fichierDestination);

        onChange(fichierDestination.uri);
      } catch (error) {
        console.error("Erreur copie image :", error);
        Alert.alert("Erreur", "Impossible d'enregistrer l'image.");
      }
    }
  };

  return (
    <View style={{ gap: 10, alignSelf: "center" }}>
      {!valeur ? (
        <TouchableOpacity
          onPress={choisirImage}
          style={{
            borderWidth: 1,
            borderColor: "#DBC2A9",
            backgroundColor: "white",
            borderRadius: 5,
            height: 200,
            width: 140,
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <MaterialIcons name="add-a-photo" size={30} color="#705C5C" />
          <Text style={{ color: "#705C5C", textAlign: "center" }}>
            Ajouter une couverture
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{ alignItems: "center", gap: 10 }}>
          <Image
            source={imagesLocales[valeur] ?? { uri: valeur }}
            style={{
              width: 140,
              height: 200,
              borderRadius: 8,
              resizeMode: "cover",
            }}
          />

          <TouchableOpacity
            onPress={() => onChange(null)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <MaterialIcons name="delete" size={20} color="#bf0603" />

            <Text style={{ color: "#bf0603" }}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
