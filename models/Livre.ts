export interface Livre {
  id: number;
  titre: string;
  isbn: string | null;
  resume: string | null;
  nombre_pages: number | null;
  edition: string | null;
  date_publication: string | null;
  couverture: string | null;
  type: string;
  etat_lecture: string;
  note: number;
  avis: string | null;
  date_debut_lecture: string | null;
  date_fin_lecture: string | null;
  statut_possession: string;
  prix: number | null;
  date_pret: string | null;
  preteur: string | null;
  date_ajout: string;
  auteurs: string[];
  genres: string[];
}
