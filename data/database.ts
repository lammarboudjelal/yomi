import * as SQLite from "expo-sqlite";

export const ouvrirBaseDeDonnees = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("yomi.db");

    await db.execAsync(`
      PRAGMA foreign_keys = ON;
      PRAGMA journal_mode = WAL;
      PRAGMA journal_size_limit = 2097152;
      PRAGMA synchronous = NORMAL;
      PRAGMA cache_size = -2000;
    `);

    return db;
  } catch (error) {
    console.error("Erreur ouverture base :", error);
    throw error;
  }
};
