import { getColors } from "react-native-image-colors";
import { Image } from "react-native";
import { imagesLocales } from "./imagesLocales";

const COULEUR_PAR_DEFAUT = "#A0A0A0";

async function normaliserSourceImage(
  couverture: string,
): Promise<string | null> {
  if (couverture.startsWith("file://")) {
    return couverture;
  }

  if (imagesLocales[couverture]) {
    const asset = Image.resolveAssetSource(imagesLocales[couverture]);
    return asset.uri;
  }

  return null;
}

function hexVersRgb(couleur: string) {
  const hex = couleur.replace("#", "");

  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}

function rgbVersHex(r: number, g: number, b: number) {
  return (
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  );
}

function ajusterCouleurPourFond(couleur: string): string {
  const { r, g, b } = hexVersRgb(couleur);

  const luminosite = 0.299 * r + 0.587 * g + 0.114 * b;

  const estSombre = luminosite < 150;

  const facteur = estSombre ? 0.3 : -0.2;

  const nouveauR = Math.min(255, Math.max(0, Math.floor(r + 255 * facteur)));
  const nouveauG = Math.min(255, Math.max(0, Math.floor(g + 255 * facteur)));
  const nouveauB = Math.min(255, Math.max(0, Math.floor(b + 255 * facteur)));

  return rgbVersHex(nouveauR, nouveauG, nouveauB);
}

export async function recupererCouleurDominante(
  couverture?: string,
): Promise<string> {
  if (!couverture) return COULEUR_PAR_DEFAUT;

  try {
    const uri = await normaliserSourceImage(couverture);

    if (!uri) return COULEUR_PAR_DEFAUT;

    const resultat = await getColors(uri, {
      fallback: COULEUR_PAR_DEFAUT,
      cache: true,
      key: uri,
    });

    const couleurBase =
      resultat.platform === "android"
        ? resultat.dominant || resultat.vibrant || resultat.average
        : resultat.platform === "ios"
          ? resultat.background || resultat.primary
          : COULEUR_PAR_DEFAUT;

    if (!couleurBase) return COULEUR_PAR_DEFAUT;

    return ajusterCouleurPourFond(couleurBase);
  } catch (erreur) {
    console.log("Erreur récupération couleur :", erreur);
    return COULEUR_PAR_DEFAUT;
  }
}
