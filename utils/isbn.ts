/**
 * Formate un ISBN (ou EAN-13) brut issu d'un scan de code-barres en forme lisible avec tirets.
 *
 * Un ISBN-13 est un identifiant normalisé utilisé pour les livres.
 * Il est généralement basé sur un code EAN-13 scanné en librairie.
 *
 * @param isbn ISBN (ou EAN-13) brut (ex. : "9782487606203")
 * @returns ISBN formaté avec tirets (ex. : "978-2-487606-20-3")
 */
export function formatISBN13(isbn: string): string {
  const clean = isbn.replace(/[^0-9X]/gi, "");

  if (clean.length !== 13) return isbn;

  // ISBN-13 = 5 parties et 13 chiffres : 
  // 1. Préfixe (3 chiffres, "978" étant réservé à la codification des livres)
  // 2. Zone géographique (1 chiffre, ex. : "2" pour la france)
  // 3. Identifiant éditeur
  // 4. Numéro d'ordre de l'ouvrage chez l'éditeur
  // 5. Chiffre de contrôle pouvant prendre les valeurs 0 à 9 ou X pour 10
  const isbnFormatted = `${clean.slice(0, 3)}-${clean.slice(3, 4)}-${clean.slice(4, 10)}-${clean.slice(10, 12)}-${clean.slice(12)}`;

  return isbnFormatted;
}
