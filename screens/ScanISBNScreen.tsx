import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { rechercherLivres } from "../services/googleBooksService";
import { mapGoogleBookToLivre } from "../utils/googleBooksMapper";
import { Routes } from "../navigation/routes";
import { ModeFormulaire } from "../utils/modeFormulaire";
import BoutonRetour from "../components/navigation/BoutonRetour";
import { formatISBN13 } from "../utils/isbn";

export default function ScanISBNScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const [isScanned, setIsScanned] = useState(false);

  const navigation = useNavigation<any>();

  const isProcessing = useRef(false);

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (isProcessing.current) return;

    isProcessing.current = true;
    setIsScanned(true);

    try {
      // Le code-barres scanné est brut (ex. : "9782487606203"), mais
      // l'API ne traite que les ISBN-13 formaté (ex. : "978-2-487606-20-3").
      const isbn = formatISBN13(data);

      const items = await rechercherLivres(isbn);

      if (!items || items.length === 0) {
        Alert.alert("Erreur", "ISBN non reconnu");
        setIsScanned(false);
        isProcessing.current = false;
        return;
      }

      const livre = mapGoogleBookToLivre(items[0]);

      navigation.navigate(Routes.formulaireLivre, {
        mode: ModeFormulaire.ajouter,
        livreInitial: livre,
      });
    } catch (error: any) {
      if (error.message === "Network request failed")
        Alert.alert("Erreur", "Connexion requise pour récupérer les données");
      else Alert.alert("Erreur", "Erreur lors de la recherche");
      setIsScanned(false);
    }
  };

  if (!permission) {
    return <Text>Demande de permission...</Text>;
  }

  if (!permission.granted) {
    return <Text>Permission caméra refusée</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BoutonRetour />

      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={isScanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13"], // ISBN = EAN-13
        }}
      />

      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 250,
            height: 150,
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
}
