export const ETATS_LECTURE = {
  EN_COURS: "en cours",
  A_LIRE: "à lire",
  LU: "lu",
  ABANDONNE: "abandonné",
} as const;

export const COULEURS_ETAT_LECTURE = {
  [ETATS_LECTURE.EN_COURS]: {
    background: "#F5D7B7",
    text: "#B56917",
    border: "#B56917",
  },
  [ETATS_LECTURE.A_LIRE]: {
    background: "#BDE3EF",
    text: "#2C92B5",
    border: "#2C92B5",
  },
  [ETATS_LECTURE.LU]: {
    background: "#E3E9C3",
    text: "#778731",
    border: "#778731",
  },
  [ETATS_LECTURE.ABANDONNE]: {
    background: "#D6D6D6",
    text: "#666666",
    border: "#666666",
  },
};

export type EtatLecture = (typeof ETATS_LECTURE)[keyof typeof ETATS_LECTURE];
