import { Livre } from "../models/Livre";

export type RootStackParamList = {
  MainTabs: undefined;
  LivreDetail: { livreId: number };
  FormulaireLivre: {
    mode: "ajout" | "modification";
    livreInitial?: Livre;
  };
};

export type RootTabParamList = {
  Bibliotheque: undefined;
  Ajouter: undefined;
};
