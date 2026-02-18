import { SQLiteDatabase } from "expo-sqlite";
import { Livre } from "../models/Livre";

const BASE_SELECT = `
  SELECT
    l.*,
    a.nomination AS auteur_nomination,
    g.nom AS genre_nom
  FROM livre l
  LEFT JOIN livre_auteur la ON la.livre_id = l.id
  LEFT JOIN auteur a ON a.id = la.auteur_id
  LEFT JOIN livre_genre lg ON lg.livre_id = l.id
  LEFT JOIN genre g ON g.id = lg.genre_id
`;

function construireLivresDepuisLignes(lignes: any[]): Livre[] {
  const livres = new Map<number, Livre>();

  for (const ligne of lignes) {
    if (!livres.has(ligne.id)) {
      livres.set(ligne.id, {
        id: ligne.id,
        titre: ligne.titre,
        isbn: ligne.isbn,
        resume: ligne.resume,
        nombre_pages: ligne.nombre_pages,
        edition: ligne.edition,
        date_publication: ligne.date_publication,
        couverture: ligne.couverture,
        type: ligne.type,
        etat_lecture: ligne.etat_lecture,
        note: ligne.note,
        avis: ligne.avis,
        date_debut_lecture: ligne.date_debut_lecture,
        date_fin_lecture: ligne.date_fin_lecture,
        statut_possession: ligne.statut_possession,
        date_pret: ligne.date_pret,
        preteur: ligne.preteur,
        date_ajout: ligne.date_ajout,
        prix: ligne.prix,
        auteurs: [],
        genres: [],
      });
    }

    const livre = livres.get(ligne.id)!;

    if (
      ligne.auteur_nomination &&
      !livre.auteurs.includes(ligne.auteur_nomination)
    ) {
      livre.auteurs.push(ligne.auteur_nomination);
    }

    if (ligne.genre_nom && !livre.genres.includes(ligne.genre_nom)) {
      livre.genres.push(ligne.genre_nom);
    }
  }

  return Array.from(livres.values());
}

export const getTousLesLivres = async (
  db: SQLiteDatabase,
): Promise<Livre[]> => {
  const lignes = await db.getAllAsync<any>(`
    ${BASE_SELECT}
    ORDER BY 
      CASE l.etat_lecture
        WHEN 'en cours' THEN 1
        WHEN 'à lire' THEN 2
        WHEN 'abandonné' THEN 3
        WHEN 'lu' THEN 4
        ELSE 5
      END,
      l.date_ajout DESC
  `);

  return construireLivresDepuisLignes(lignes);
};

export const getLivreParId = async (
  db: SQLiteDatabase,
  id: number,
): Promise<Livre | null> => {
  const lignes = await db.getAllAsync<any>(
    `
    ${BASE_SELECT}
    WHERE l.id = ?
    `,
    id,
  );

  if (lignes.length === 0) return null;

  return construireLivresDepuisLignes(lignes)[0];
};
