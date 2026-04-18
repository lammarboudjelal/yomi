import { EtatLecture } from "../models/EtatLecture";
import { LivreFormulaire } from "../models/Livre";
import { StatutPossession } from "../models/StatutPosession";
import { TypeLivre } from "../models/TypeLivre";

/**
 * Convertit une date Google Books (YYYY-MM-DD) en format français (DD/MM/YYYY).
 *
 * Gère les cas incomplets :
 * - YYYY → 01/01/YYYY
 * - YYYY-MM → 01/MM/YYYY
 */
function formatDateFrancais(date?: string): string {
  if (!date) return "";

  const parties = date.split("-");

  if (parties.length === 3) {
    const [annee, mois, jour] = parties;
    return `${jour}/${mois}/${annee}`;
  }

  if (parties.length === 2) {
    const [annee, mois] = parties;
    return `01/${mois}/${annee}`;
  }

  if (parties.length === 1) {
    return `01/01/${parties[0]}`;
  }

  return "";
}

/**
 * Transforme un objet Google Books API en objet LirvreFormulaire utilisable dans l'app.
 *
 * Permet de gérer les valeurs manquants, adapter les noms de
 * champs, et pré-remplir avec des valeurs par défaut.
 */
export function mapGoogleBookToLivre(item: any): LivreFormulaire {
  const info = item.volumeInfo;

  return {
    titre: info.title ?? "",
    auteurs: info.authors ?? [],
    edition: info.publisher ?? "",
    date_publication: formatDateFrancais(info.publishedDate),
    resume: info.description ?? "",
    isbn:
      info.industryIdentifiers?.find((i: any) => i.type === "ISBN_13")
        ?.identifier ?? "",
    nombre_pages: info.pageCount,
    genres: info.categories ?? [],
    couverture:
      info.imageLinks?.thumbnail?.replace("http://", "https://") ?? "",

    type: TypeLivre.broche,

    etat_lecture: EtatLecture.aLire,

    date_debut_lecture: "",
    date_fin_lecture: "",
    note: 0,
    avis: "",

    statut_possession: StatutPossession.achete,
    prix: 0,
    date_pret: "",
    preteur: "",
  };
}
