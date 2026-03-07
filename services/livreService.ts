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

const getOrCreateAuteur = async (
  db: SQLiteDatabase,
  nomination: string,
): Promise<number> => {
  const normalise = nomination.trim().toLowerCase();

  const existant = await db.getFirstAsync<{ id: number }>(
    "SELECT id FROM auteur WHERE nomination = ?",
    normalise,
  );

  if (existant) return existant.id;

  const result = await db.runAsync(
    "INSERT INTO auteur (nomination) VALUES (?)",
    normalise,
  );

  return result.lastInsertRowId!;
};

const getOrCreateGenre = async (
  db: SQLiteDatabase,
  nom: string,
): Promise<number> => {
  const normalise = nom.trim().toLowerCase();

  const existant = await db.getFirstAsync<{ id: number }>(
    "SELECT id FROM genre WHERE nom = ?",
    normalise,
  );

  if (existant) return existant.id;

  const result = await db.runAsync(
    "INSERT INTO genre (nom) VALUES (?)",
    normalise,
  );

  return result.lastInsertRowId!;
};

async function lierAuteurs(
  db: SQLiteDatabase,
  livreId: number,
  auteurs: string[],
) {
  for (const auteurNom of auteurs) {
    const auteurId = await getOrCreateAuteur(db, auteurNom);

    await db.runAsync(
      "INSERT INTO livre_auteur (livre_id, auteur_id) VALUES (?, ?)",
      livreId,
      auteurId,
    );
  }
}

async function lierGenres(
  db: SQLiteDatabase,
  livreId: number,
  genres: string[],
) {
  for (const genreNom of genres) {
    const genreId = await getOrCreateGenre(db, genreNom);

    await db.runAsync(
      "INSERT INTO livre_genre (livre_id, genre_id) VALUES (?, ?)",
      livreId,
      genreId,
    );
  }
}

async function supprimerRelationsLivre(db: SQLiteDatabase, livreId: number) {
  await db.runAsync("DELETE FROM livre_auteur WHERE livre_id = ?", livreId);
  await db.runAsync("DELETE FROM livre_genre WHERE livre_id = ?", livreId);
}

export const insertLivre = async (
  db: SQLiteDatabase,
  livre: Livre,
): Promise<void> => {
  await db.withTransactionAsync(async () => {
    const result = await db.runAsync(
      `
      INSERT INTO livre (
        titre, isbn, resume, nombre_pages, edition,
        date_publication, couverture, type,
        etat_lecture, note, avis,
        date_debut_lecture, date_fin_lecture,
        statut_possession, date_pret, preteur,
        date_ajout, prix
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), ?)
      `,
      livre.titre,
      livre.isbn,
      livre.resume,
      livre.nombre_pages,
      livre.edition,
      livre.date_publication,
      livre.couverture,
      livre.type,
      livre.etat_lecture,
      livre.note,
      livre.avis,
      livre.date_debut_lecture,
      livre.date_fin_lecture,
      livre.statut_possession,
      livre.date_pret,
      livre.preteur,
      livre.prix,
    );

    const livreId = result.lastInsertRowId!;

    await lierAuteurs(db, livreId, livre.auteurs);
    await lierGenres(db, livreId, livre.genres);
  });
};

export const updateLivre = async (
  db: SQLiteDatabase,
  livre: Livre,
): Promise<void> => {
  if (!livre.id) throw new Error("ID du livre manquant pour update.");

  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `
      UPDATE livre SET
        titre = ?,
        isbn = ?,
        resume = ?,
        nombre_pages = ?,
        edition = ?,
        date_publication = ?,
        couverture = ?,
        type = ?,
        etat_lecture = ?,
        note = ?,
        avis = ?,
        date_debut_lecture = ?,
        date_fin_lecture = ?,
        statut_possession = ?,
        date_pret = ?,
        preteur = ?,
        prix = ?
      WHERE id = ?
      `,
      livre.titre,
      livre.isbn,
      livre.resume,
      livre.nombre_pages,
      livre.edition,
      livre.date_publication,
      livre.couverture,
      livre.type,
      livre.etat_lecture,
      livre.note,
      livre.avis,
      livre.date_debut_lecture,
      livre.date_fin_lecture,
      livre.statut_possession,
      livre.date_pret,
      livre.preteur,
      livre.prix,
      livre.id,
    );

    await supprimerRelationsLivre(db, livre.id);

    await lierAuteurs(db, livre.id, livre.auteurs);
    await lierGenres(db, livre.id, livre.genres);
  });
};

export const deleteLivre = async (
  db: SQLiteDatabase,
  livreId: number,
): Promise<void> => {
  await db.withTransactionAsync(async () => {
    await supprimerRelationsLivre(db, livreId);
    await db.runAsync("DELETE FROM livre WHERE id = ?", livreId);
  });
};
