import { SQLiteDatabase } from "expo-sqlite";
import { Livre } from "../models/Livre";

export const getTousLesLivres = async (
  db: SQLiteDatabase,
): Promise<Livre[]> => {
  const livres = await db.getAllAsync<any>(`
    SELECT * FROM livre
    ORDER BY date_debut_lecture DESC
  `);

  const livresComplets: Livre[] = [];

  for (const livre of livres) {
    const auteurs = await db.getAllAsync<{ nomination: string }>(
      `
      SELECT a.nomination
      FROM auteur a
      JOIN livre_auteur la ON la.auteur_id = a.id
      WHERE la.livre_id = ?
      `,
      livre.id,
    );

    const genres = await db.getAllAsync<{ nom: string }>(
      `
      SELECT g.nom
      FROM genre g
      JOIN livre_genre lg ON lg.genre_id = g.id
      WHERE lg.livre_id = ?
      `,
      livre.id,
    );

    livresComplets.push({
      ...livre,
      auteurs: auteurs.map((a) => a.nomination),
      genres: genres.map((g) => g.nom),
    });
  }

  return livresComplets;
};
