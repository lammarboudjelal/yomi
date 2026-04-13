import { EtatLecture } from "../models/EtatLecture";
import { LivreFormulaire } from "../models/Livre";
import { StatutPossession } from "../models/StatutPosession";
import { TypeLivre } from "../models/TypeLivre";

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
