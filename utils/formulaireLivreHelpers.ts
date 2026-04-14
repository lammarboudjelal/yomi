import { EtatLecture } from "../models/EtatLecture";
import { Livre } from "../models/Livre";
import { StatutPossession } from "../models/StatutPosession";
import { TypeLivre } from "../models/TypeLivre";

/**
 * Retourne les valeurs par défaut du formulaire d'ajout/modification d'un livre.
 *
 * Deux cas :
 * - Ajout (création) → valeurs initiales définies
 * - Modification → on pré-remplit avec le livre existant
 */
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

  // Mode édition → on reprend les valeurs existantes
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
