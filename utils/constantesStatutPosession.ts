export const STATUT_POSSESSION = {
  ACHETE: "acheté",
  EMPRUNTE: "emprunté",
} as const;

export type StatutPossession =
  (typeof STATUT_POSSESSION)[keyof typeof STATUT_POSSESSION];
