export const TypeLivre = {
  broche: "broché",
  poche: "poche",
  numerique: "numérique",
  audio: "audio",
} as const;

export type TypeLivre = (typeof TypeLivre)[keyof typeof TypeLivre];
