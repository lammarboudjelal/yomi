export const EtatsLecture = {
  enCours: "en cours",
  aLire: "à lire",
  lu: "lu",
  abandonne: "abandonné",
} as const;

export const CouleursEtatLecture = {
  [EtatsLecture.enCours]: {
    background: "#F5D7B7",
    text: "#B56917",
    border: "#B56917",
  },
  [EtatsLecture.aLire]: {
    background: "#BDE3EF",
    text: "#2C92B5",
    border: "#2C92B5",
  },
  [EtatsLecture.lu]: {
    background: "#E3E9C3",
    text: "#778731",
    border: "#778731",
  },
  [EtatsLecture.abandonne]: {
    background: "#D6D6D6",
    text: "#666666",
    border: "#666666",
  },
};

export type EtatLecture = (typeof EtatsLecture)[keyof typeof EtatsLecture];
