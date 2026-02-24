export const StatutPossession = {
  achete: "acheté",
  emprunte: "emprunté",
} as const;

export type StatutPossession =
  (typeof StatutPossession)[keyof typeof StatutPossession];
