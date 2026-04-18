import { getColors } from "react-native-image-colors";
import { Image } from "react-native";
import { imagesLocales } from "./imagesLocales";

const couleurParDefaut = "#A0A0A0"; // couleur utilisée si aucune couleur ne peut être extraite

/**
 * Normalise une source d'image pour obtenir une URI exploitable.
 * Utile pour les images locales de test.
 * @param couverture Clé ou URI de l'image
 * @returns URI de l'image ou null si invalide
 */
async function normaliserSourceImage(
  couverture: string,
): Promise<string | null> {
  if (!couverture) {
    return null;
  }

  if (imagesLocales[couverture]) {
    const asset = Image.resolveAssetSource(imagesLocales[couverture]);
    return asset.uri;
  }

  return couverture;
}

/**
 * Convertit une couleur hexadécimale en object RGB.
 */
function hexVersRgb(couleur: string) {
  const hex = couleur.replace("#", "");

  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}

/**
 * Convertit des valeurs RGB en couleur hexadécimale.
 */
function rgbVersHex(r: number, g: number, b: number): string {
  return (
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  );
}

/**
 * Ajuste une couleur pour qu'elle soit adaptée en fond d'écran.
 * Si la couleur est sombre, elle est éclaircit, et inversement.
 *
 * Cela permet d'éviter les fonds sombres illisibles ou trop clairs
 * et sans contraste par rapport à la couverture du livre.
 *
 * Exemple de traitement :
 * 1. Couleur HEX initiale : #262F74
 * 2. Conversion RGB : R→38, G→47, B→116
 * 3. Luminosité : 52.175 → est sombre
 * 4. Ajustement RGB : nouveauR→114, nouveauG→123, nouveauB→192
 * 5. Nouvelle couleur HEX : #727bc0
 *
 * @param couleur Couleur HEX de base
 * @returns {string} Couleur HEX ajustée
 */
function ajusterCouleurPourFond(couleur: string): string {
  const { r, g, b } = hexVersRgb(couleur);

  // Calcul de la luminosité perçue (formule standard luminance)
  const luminosite = 0.299 * r + 0.587 * g + 0.114 * b;

  const estSombre = luminosite < 150;

  // Facteur d'ajustement :
  // - +0.3 = éclaircir : éclaircissement fort
  // -0.2 = assombrir : assombrissement plus léger pour éviter de rendre la couleur trop fade
  const facteur = estSombre ? 0.3 : -0.2;

  const nouveauR = Math.min(255, Math.max(0, Math.floor(r + 255 * facteur)));
  const nouveauG = Math.min(255, Math.max(0, Math.floor(g + 255 * facteur)));
  const nouveauB = Math.min(255, Math.max(0, Math.floor(b + 255 * facteur)));

  return rgbVersHex(nouveauR, nouveauG, nouveauB);
}

/**
 * Récupère la couleur dominante d'une image de couverture.
 *
 * Étapes :
 * 1. Normalisation de la source (URI)
 * 2. Extraction des couleurs via react-native-image-colors
 * 3. Sélection d'une couleur pertinente selon la plateforme
 * 4. Ajustement pour utilisation en fond
 *
 * @param couverture URI ou clé locale de l'image
 * @returns {Promise<string>} Couleur HEX utilisable en fond
 */
export async function recupererCouleurDominante(
  couverture?: string,
): Promise<string> {
  if (!couverture) return couleurParDefaut;

  try {
    const uri = await normaliserSourceImage(couverture);

    if (!uri) return couleurParDefaut;

    const resultat = await getColors(uri, {
      fallback: couleurParDefaut,
      cache: true,
      key: uri,
    });

    const couleurBase =
      resultat.platform === "android"
        ? resultat.dominant || resultat.vibrant || resultat.average
        : resultat.platform === "ios"
          ? resultat.background || resultat.primary
          : couleurParDefaut;

    if (!couleurBase) return couleurParDefaut;

    return ajusterCouleurPourFond(couleurBase);
  } catch (erreur) {
    console.log("Erreur récupération couleur :", erreur);
    return couleurParDefaut;
  }
}
