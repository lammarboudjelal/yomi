import { SQLiteDatabase } from "expo-sqlite";

const DATABASE_VERSION = 1;

export const migrerBaseSiNecessaire = async (db: SQLiteDatabase) => {
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  );

  const versionActuelle = result?.user_version ?? 0;

  if (versionActuelle >= DATABASE_VERSION) {
    return;
  }

  if (versionActuelle === 0) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS livre (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titre TEXT NOT NULL,

        isbn TEXT,
        resume TEXT,
        nombre_pages INTEGER,
        edition TEXT,
        date_publication TEXT,
        couverture TEXT,

        type TEXT CHECK(type IN ('broche', 'poche', 'numerique', 'audio')),

        etat_lecture TEXT NOT NULL
          DEFAULT 'a_lire'
          CHECK(etat_lecture IN ('a_lire', 'en_cours', 'lu', 'abandonne')),

        note INTEGER
          DEFAULT 0
          CHECK(note BETWEEN 0 AND 5),

        avis TEXT,

        statut_possession TEXT
          CHECK(statut_possession IN ('achete', 'emprunte')),

        date_debut_lecture TEXT,
        date_fin_lecture TEXT,

        prix REAL,
        date_pret TEXT,
        preteur TEXT,

        date_ajout TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS auteur (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomination TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS genre (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS livre_auteur (
        livre_id INTEGER NOT NULL,
        auteur_id INTEGER NOT NULL,
        PRIMARY KEY (livre_id, auteur_id),
        FOREIGN KEY (livre_id) REFERENCES livre(id) ON DELETE CASCADE,
        FOREIGN KEY (auteur_id) REFERENCES auteur(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS livre_genre (
        livre_id INTEGER NOT NULL,
        genre_id INTEGER NOT NULL,
        PRIMARY KEY (livre_id, genre_id),
        FOREIGN KEY (livre_id) REFERENCES livre(id) ON DELETE CASCADE,
        FOREIGN KEY (genre_id) REFERENCES genre(id) ON DELETE CASCADE
      );
    `);
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};
