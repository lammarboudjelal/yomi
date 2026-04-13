import { Livre } from "../models/Livre";
import { ModeFormulaire } from "../utils/modeFormulaire";

export type RootStackParamList = {
  MainTabs: undefined;
  LivreDetail: { livreId: number };
  FormulaireLivre: {
    mode: ModeFormulaire;
    livreInitial?: Livre;
  };
};

export type RootTabParamList = {
  Bibliotheque: undefined;
  AjouterLivre: undefined;
  Accueil: undefined;
};
