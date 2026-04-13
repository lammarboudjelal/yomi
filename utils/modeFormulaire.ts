export const ModeFormulaire = {
  ajouter: "Ajouter",
  modifier: "Modifier",
} as const;

export type ModeFormulaire =
  (typeof ModeFormulaire)[keyof typeof ModeFormulaire];
