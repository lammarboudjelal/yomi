export type RootStackParamList = {
  MainTabs: undefined;
  LivreDetail: { livreId: number };
  FormulaireLivre: {
    mode: "ajout" | "modification";
    livreId?: number;
  };
};

export type RootTabParamList = {
  Bibliotheque: undefined;
  Ajouter: undefined;
};
