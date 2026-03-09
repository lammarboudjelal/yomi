import { EtatLecture } from "../models/EtatLecture";
import { Livre } from "../models/Livre";
import { StatutPossession } from "../models/StatutPosession";
import { TypeLivre } from "../models/TypeLivre";

export function getDefaultValues(livreInitial?: Livre) {
  if (!livreInitial)
    return {
      auteurs: [],
      genres: [],
      type: TypeLivre.broche,
      statut_possession: StatutPossession.achete,
      etat_lecture: EtatLecture.aLire,
      note: 0,
    };

  return { ...livreInitial };
}

export const optionsEtatLecture = Object.values(EtatLecture).map((val) => ({
  label: val,
  value: val,
}));

export const optionsTypeLivre = Object.values(TypeLivre).map((val) => ({
  label: val,
  value: val,
}));
