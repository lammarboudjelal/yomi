export const EtatLecture = {
  enCours: "en cours",
  aLire: "à lire",
  lu: "lu",
  abandonne: "abandonné",
} as const;

export const CouleursEtatLecture = {
  [EtatLecture.enCours]: {
    background: "#F5D7B7",
    text: "#B56917",
    border: "#B56917",
  },
  [EtatLecture.aLire]: {
    background: "#BDE3EF",
    text: "#2C92B5",
    border: "#2C92B5",
  },
  [EtatLecture.lu]: {
    background: "#E3E9C3",
    text: "#778731",
    border: "#778731",
  },
  [EtatLecture.abandonne]: {
    background: "#D6D6D6",
    text: "#666666",
    border: "#666666",
  },
};

export type EtatLecture = (typeof EtatLecture)[keyof typeof EtatLecture];
