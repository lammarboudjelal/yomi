import { SQLiteDatabase } from "expo-sqlite";
import { Livre } from "../models/Livre";

const obtenirOuCreerGenre = async (db: SQLiteDatabase, nom: string) => {
  const genreExistant = await db.getFirstAsync<{ id: number }>(
    `SELECT id FROM genre WHERE nom = ?`,
    nom,
  );

  if (genreExistant) return genreExistant.id;

  const insert = await db.runAsync(`INSERT INTO genre (nom) VALUES (?)`, nom);

  return insert.lastInsertRowId;
};

const obtenirOuCreerAuteur = async (db: SQLiteDatabase, nomination: string) => {
  const auteurExistant = await db.getFirstAsync<{ id: number }>(
    `SELECT id FROM auteur WHERE nomination = ?`,
    nomination,
  );

  if (auteurExistant) return auteurExistant.id;

  const insert = await db.runAsync(
    `INSERT INTO auteur (nomination) VALUES (?)`,
    nomination,
  );

  return insert.lastInsertRowId;
};

export const insererDonneesDeTestSiVide = async (db: SQLiteDatabase) => {
  const result = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM livre`,
  );

  if ((result?.count ?? 0) > 0) return;

  const livres: Livre[] = [
    {
      id: 1,
      titre: "Tant que le café est encore chaud",
      isbn: "9782226458506",
      resume:
        "Chez Funiculi Funicula, le café change le coeur des hommes.\nA Tokyo se trouve un petit établissement au sujet duquel circulent mille légendes. On raconte notamment qu'en y dégustant un délicieux café, on peut retourner dans le passé. Mais ce voyage comporte des règles : il ne changera pas le présent et dure tant que le café est encore chaud.\nQuatre femmes vont vivre cette singulière expérience et comprendre que le présent importe davantage que le passé et ses regrets. Comme le café, il faut en savourer chaque gorgée.",
      nombre_pages: 240,
      edition: "Albin Michel",
      date_publication: "2021-09-29",
      couverture: null,
      type: "broché",
      etat_lecture: "à lire",
      note: 0,
      avis: null,
      date_debut_lecture: null,
      date_fin_lecture: null,
      statut_possession: "emprunté",
      prix: null,
      genres: ["littérature japonaise", "fiction", "feel good"],
      auteurs: ["Toshikazu Kawaguchi"],
      date_ajout: null,
    },
    {
      id: 2,
      titre: "La boulangerie de minuit",
      isbn: "9782381227092",
      resume:
        "Cette boulangerie est à nulle autre pareille : elle n'ouvre ses portes qu'à la nuit tombée. On dit même que les pâtisseries y sont magiques... Une heure avant minuit, la vitrine de la boulangerie s'illumine dans une rue de Tokyo. Le fumet qui s'en dégage a pour certains l'odeur de l'enfance, pour d'autres, celle d'un premier baiser ou d'une amitié perdue. À l'intérieur, Yosuke, le propriétaire des lieux et Kanjiro, le boulanger, ont pour mission de réconforter les âmes en peine. Une seule bouchée d'un pain magique ou d'un macaron du clair de lune suffisent à remonter dans le temps ou à revivre un souvenir heureux. Un jour, la vie tranquille de cette boutique est chamboulée par l'arrivée surprise de la petite soeur de la défunte femme de Yosuke. Après avoir réconforté tant d'âmes, c'est peut-être au tour de la sienne d'être guérie ? Aussi savoureux qu'une bonne pâtisserie, aussi réconfortant qu'un petit pain chaud, La Boulangerie de minuit a déjà conquis plus d'un million de lecteurs dans le monde.",
      nombre_pages: 239,
      edition: "KIBUN",
      date_publication: "2025-06-04",
      couverture: "la-boulangerie-de-minuit.jpg",
      type: "broché",
      etat_lecture: "en cours",
      note: 0,
      avis: null,
      date_debut_lecture: "2026-02-14",
      date_fin_lecture: null,
      statut_possession: "acheté",
      prix: 16.95,
      genres: ["feel good", "littérature japonaise", "fiction"],
      auteurs: ["Noriko Onuma"],
      date_ajout: null,
    },
    {
      id: 3,
      titre: "Le grand magasin des rêves",
      isbn: "9782809716481",
      resume:
        "Il existe une ville où l’on ne peut se rendre que dans son sommeil. L’endroit le plus populaire de cette ville est le Grand Magasin des  Rêves, qui semble un immense paquebot tout miroitant de lumières et haut de quatre étages où l’on propose et vend tous les rêves imaginables : rêves d’enfance, de voyage, de nourriture délicieuse, mais aussi cauchemars, songes prémonitoires ou consolateurs. La jeune Penny vient juste de réussir son entretien d’embauche, elle commence son travail à la réception du rez-de-chaussée, et c’est avec elle que nous allons découvrir l’univers chatoyant du Grand Magasin des Rêves, où, chaque nuit, une foule de dormeurs humains et animaux viennent choisir les rêves qu’ils désirent vivre.\n\nUn roman pétillant comme un diabolo  menthe pour les adultes qui ont gardé le goût de l’enfance, et un succès prodigieux en Corée avec plus d’1 million de lecteurs qui ont aimé rêver en plein jour.",
      nombre_pages: 306,
      edition: "Éditions Picquier",
      date_publication: "2024-01-05",
      couverture: "le-grand-magasin-des-reves.jpg",
      type: "broché",
      etat_lecture: "lu",
      note: 4,
      avis: "Parfaite lecture pour l’hiver. L’autrice aborde le thème des rêves de façon très douce et on s’identifie assez facilement dans plusieurs parties de l’histoire.",
      date_debut_lecture: "2026-01-04",
      date_fin_lecture: "2026-01-10",
      statut_possession: "acheté",
      prix: 22,
      genres: ["fantastique", "fiction", "littérature coréenne"],
      auteurs: ["Mi-ye Lee"],
      date_ajout: null,
    },
    {
      id: 4,
      titre: "Un printemps au goût de mochi",
      isbn: "9782386010644",
      resume:
        "Il semblerait que, dans la petite gare de Nohara, se trouve une librairie où l'on dénicherait à coup sûr le livre qu'il nous faut. Lorsque Fumiya entend cette rumeur, il part à la recherche de l'ouvrage  qu'il cherche depuis des années. À son arrivée, il tombe sur les trois  employées de la librairie : Makino, la patronne, Waku, le propriétaire  et Sugawa, le libraire. \nDe prime abord, le jeune homme ne semble pas convaincu par ce lieu réputé extraordinaire, et ce malgré le coin café, des libraires pleinement investis et un mystérieux sous-sol. Mais Fumiya ne sait pas encore que, lorsqu'on entre dans La Librairie du Vendredi, les problèmes semblent disparaître comme par magie.",
      nombre_pages: 336,
      edition: "Le Bruit Du Monde",
      date_publication: "2025-10-02",
      couverture: "un-printemps-au-gout-de-mochi.jpg",
      type: "broché",
      etat_lecture: "à lire",
      note: 0,
      avis: null,
      date_debut_lecture: null,
      date_fin_lecture: null,
      statut_possession: "acheté",
      prix: 19.9,
      genres: ["littérature japonaise", "feel good", "fiction"],
      auteurs: ["Sawako Natori"],
      date_ajout: null,
    },
    {
      id: 5,
      titre: "Le grand magasin des rêves 2",
      isbn: "9782809717167",
      resume:
        "Cela fait un an que Penny a franchi pour la première fois les portes du Grand Magasin des Rêves, cet univers fabuleux où les dormeurs viennent chaque nuit choisir les rêves qu’ils désirent vivre. Dans le « quartier des compagnies », les producteurs inventent sans relâche des rêves qui ressembleraient à une forêt tropicale, qui auraient l’odeur du riz cuit ou encore la couleur du bleu de la nuit : rêves primés ou rêves en solde, rêves de souvenirs, rêves de sieste ; ils sont tous de véritables créations artistiques. Penny découvre aussi le Service des Réclamations auquel s’adressent les rêveurs insatisfaits car certains ont cessé tout bonnement de se rendre au Grand Magasin des Rêves. Comment expliquer que certains dormeurs ne reviennent jamais ? Penny va lever le voile sur les aspirations secrètes des rêveurs en quête d’expériences immersives fabuleuses et surtout de sens à leur vie. Car s’il est vrai que le rêve permet de s’évader, il permet aussi de s’émanciper. Il réconcilie le dormeur avec lui-même en lui permettant de retrouver sa propre voix, parfois de manière imprévue. Et donne au lecteur la liberté de rêver.",
      nombre_pages: 344,
      edition: "Éditions Picquier",
      date_publication: "2025-08-22",
      couverture: "le-grand-magasin-des-reves-2.jpg",
      type: "broché",
      etat_lecture: "abandonné",
      note: 2,
      avis: "Moins captivant que le premier. Je pense que c'est un livre qu'il faut plutôt lire quand on a le temps et assez vite, donc je le reprendrai quand ça sera le cas pour moi.",
      date_debut_lecture: "2026-02-01",
      date_fin_lecture: "2026-02-05",
      statut_possession: "acheté",
      prix: 22,
      genres: ["fantastique", "fiction", "littérature coréenne"],
      auteurs: ["Mi-ye Lee"],
      date_ajout: null,
    },
    {
      id: 6,
      titre: "La chirurgienne",
      isbn: "9782290422885",
      resume:
        "Anne Wiley a tout pour elle : un mariage heureux, une belle maison et surtout une brillante carrière de chirurgienne cardiaque qui a fait la renommée de l'hôpital où elle exerce. En dix ans, elle n'a jamais perdu personne sur sa table d'opération. Jusqu'au jour où le coeur de son patient refuse de redémarrer. Et lorsque Anne reconnaît le visage de l'homme allongé devant elle, sa main se fige. Quelques petites secondes d'hésitation... fatales. Pourquoi cette chirurgienne irréprochable a-t-elle interrompu son geste ? Pour Paula Fuselier, avocate tenace du bureau du procureur d'État, quelque chose cloche. Et si cette mort, pourtant anodine, dissimulait en réalité un terrible secret ?",
      nombre_pages: 352,
      edition: "J'ai lu",
      date_publication: "2025-04-09",
      couverture: "la-chirurgienne.jpg",
      type: "poche",
      etat_lecture: "lu",
      note: 3,
      avis: "Thriller efficace.",
      date_debut_lecture: "2026-03-01",
      date_fin_lecture: "2026-03-08",
      statut_possession: "acheté",
      prix: 8.8,
      genres: ["thriller", "policier"],
      auteurs: ["Leslie Wolfe"],
      date_ajout: null,
    },
    {
      id: 7,
      titre: "Galette au miel",
      isbn: "9782714404527",
      resume:
        "Superbement illustrée, une histoire tout en délicatesse et mélancolie en forme d'hommage pudique du maître Murakami aux victimes du séisme de Kobe, et à ceux que leurs failles intérieures font parfois vaciller.\n\n–; Je crois que c'est parce qu'elle a trop regardé les informations. Les images du tremblement de terre de Kobe sont sans doute trop impressionnantes pour une petite fille de quatre ans. Depuis le séisme, elle se réveille toutes les nuits. Elle dit que c'est un vilain monsieur qu'elle ne connaît pas qui vient la réveiller. Elle l'appelle le \"Bonhomme Tremblement de Terre\".\n\nQuand la femme dont il est secrètement amoureux lui révèle que sa petite fille est en proie à un cauchemar récurrent, Junpei, auteur de nouvelles, invente l'histoire d'un ours mélomane capable d'apaiser toutes les peines... ",
      nombre_pages: 104,
      edition: "Belfond",
      date_publication: "2024-11-07",
      couverture: "galette-au-miel.jpg",
      type: "broché",
      etat_lecture: "en cours",
      note: 0,
      avis: null,
      date_debut_lecture: "2026-02-14",
      statut_possession: "acheté",
      prix: 19,
      date_fin_lecture: null,
      genres: ["fiction", "littérature japonaise"],
      auteurs: ["Haruki Murakami"],
      date_ajout: null,
    },
  ];

  for (const livre of livres) {
    const resultInsert = await db.runAsync(
      `INSERT INTO livre
      (titre, isbn, resume, nombre_pages, edition, date_publication, 
       couverture, type, etat_lecture, note, avis, date_debut_lecture, 
       date_fin_lecture, statut_possession, prix)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      livre.prix,
    );

    const livreId = resultInsert.lastInsertRowId;

    for (const auteurNomination of livre.auteurs) {
      const auteurId = await obtenirOuCreerAuteur(db, auteurNomination);
      await db.runAsync(
        `INSERT INTO livre_auteur (livre_id, auteur_id) VALUES (?, ?)`,
        livreId,
        auteurId,
      );
    }

    for (const genreNom of livre.genres) {
      const genreId = await obtenirOuCreerGenre(db, genreNom);

      await db.runAsync(
        `INSERT INTO livre_genre (livre_id, genre_id) VALUES (?, ?)`,
        livreId,
        genreId,
      );
    }
  }

  console.log("Données ajoutées avec succès");
};
