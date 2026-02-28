import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Livre } from "../../models/Livre";
import ChampTexte from "./champs/ChampTexte";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChampNombre from "./champs/ChampNombre";
import ChampNoteEtoiles from "./champs/ChampNoteEtoiles";
import { TypeLivre } from "../../utils/constantesTypeLivre";
import { EtatLecture } from "../../utils/constantesLecture";
import ChampSelect from "./champs/ChampSelect";
import { StatutPossession } from "../../utils/constantesStatutPosession";
import ChampRadioStatut from "./champs/ChampRadioStatut";
import ChampListeDynamique from "./champs/ChampListeDynamique";
import ChampDate from "./champs/ChampDate";

type Props = {
  mode: "ajout" | "modification";
  livreInitial?: Livre;
};

export default function FormulaireLivre({ mode, livreInitial }: Props) {
  const insets = useSafeAreaInsets();

  const [titre, setTitre] = useState(livreInitial?.titre ?? "");
  const [isbn, setIsbn] = useState(livreInitial?.isbn ?? "");
  const [nombrePages, setNombrePages] = useState(
    livreInitial?.nombre_pages?.toString() ?? "",
  );
  const [auteurs, setAuteurs] = useState<string[]>(livreInitial?.auteurs ?? []);
  const [genres, setGenres] = useState<string[]>(livreInitial?.genres ?? []);
  const [edition, setEdition] = useState(livreInitial?.edition ?? "");
  const [datePublication, setDatePublication] = useState(
    livreInitial?.date_publication ?? "",
  );
  const [typeLivre, setTypeLivre] = useState(
    livreInitial?.type ?? TypeLivre.broche,
  );
  const [resume, setResume] = useState(livreInitial?.resume ?? "");
  const [statut, setStatut] = useState<StatutPossession>(
    livreInitial?.statut_possession ?? "acheté",
  );
  const [prix, setPrix] = useState(livreInitial?.prix?.toString() ?? "");
  const [datePret, setDatePret] = useState(livreInitial?.date_pret ?? "");
  const [preteur, setPreteur] = useState(livreInitial?.preteur ?? "");
  const [etatLecture, setEtatLecture] = useState<EtatLecture>(
    livreInitial?.etat_lecture ?? EtatLecture.aLire,
  );
  const [dateDebutLecture, setDateDebutLecture] = useState(
    livreInitial?.date_debut_lecture ?? "",
  );
  const [dateFinLecture, setDateFinLecture] = useState(
    livreInitial?.date_fin_lecture ?? "",
  );
  const [note, setNote] = useState(livreInitial?.note ?? 0);
  const [avis, setAvis] = useState(livreInitial?.avis ?? "");

  const optionsEtatLecture = Object.values(EtatLecture).map((val) => ({
    label: val,
    value: val,
  }));
  const optionsTypeLivre = Object.values(TypeLivre).map((val) => ({
    label: val,
    value: val,
  }));

  const renderSectionTitre = (titre: string) => (
    <Text style={{ fontWeight: "600", fontSize: 16 }}>{titre}</Text>
  );

  const renderSectionInformationsDeBase = () => (
    <View style={{ gap: 15 }}>
      {renderSectionTitre("Informations de base")}

      <ChampTexte
        label="Titre *"
        valeur={titre}
        placeholder="Titre"
        onChange={setTitre}
      />

      <ChampTexte
        label="ISBN"
        valeur={isbn ?? ""}
        placeholder="ISBN"
        onChange={setIsbn}
      />

      <ChampNombre
        label="Nombre de pages"
        valeur={nombrePages}
        placeholder="0"
        onChange={setNombrePages}
      />
    </View>
  );

  const renderSectionAuteurs = () => (
    <ChampListeDynamique
      label="Auteur(s)"
      valeurs={auteurs}
      onChange={setAuteurs}
    />
  );

  const renderSectionGenres = () => (
    <ChampListeDynamique
      label="Genre(s)"
      valeurs={genres}
      onChange={setGenres}
    />
  );

  const renderSectionInformationsDePublication = () => (
    <View style={{ gap: 15 }}>
      {renderSectionTitre("Informations de publication")}

      <ChampTexte
        label="Édition"
        valeur={edition}
        placeholder="Édition"
        onChange={setEdition}
      />

      <ChampDate
        label="Date de publication"
        valeur={datePublication}
        onChange={setDatePublication}
      />

      <ChampSelect
        label="Type"
        valeur={typeLivre}
        options={optionsTypeLivre}
        onChange={setTypeLivre}
      />
    </View>
  );

  const renderSectionResume = () => (
    <View style={{ gap: 15 }}>
      {renderSectionTitre("Résumé")}

      <ChampTexte
        valeur={resume}
        placeholder="Résumé"
        multiline
        onChange={setResume}
      />
    </View>
  );

  const renderSectionInformationsAchatEmprunt = () => (
    <View style={{ gap: 15 }}>
      {renderSectionTitre("Informations d'achat/d'emprunt")}

      <ChampRadioStatut valeur={statut} onChange={setStatut} />

      {statut === "acheté" && (
        <ChampNombre
          label="Prix d'achat"
          valeur={prix}
          placeholder="0"
          onChange={setPrix}
        />
      )}

      {statut === "emprunté" && (
        <>
          <ChampTexte
            label="Prêteur"
            valeur={preteur}
            placeholder="Nom du prêteur"
            onChange={setPreteur}
          />

          <ChampDate
            label="Date d'emprunt"
            valeur={datePret}
            onChange={setDatePret}
          />
        </>
      )}
    </View>
  );

  const renderSectionInformationsDeLecture = () => (
    <View style={{ gap: 15 }}>
      {renderSectionTitre("Informations de lecture")}

      <ChampSelect
        label="État de lecture"
        valeur={etatLecture}
        options={optionsEtatLecture}
        onChange={(val) => setEtatLecture(val as EtatLecture)}
      />

      <ChampDate
        label="Date de début de lecture"
        valeur={dateDebutLecture}
        onChange={setDateDebutLecture}
      />

      <ChampDate
        label="Date de fin de lecture"
        valeur={dateFinLecture}
        onChange={setDateFinLecture}
      />

      <ChampNoteEtoiles label="Note" note={note} editable onChange={setNote} />

      <ChampTexte
        label="Avis"
        valeur={avis}
        placeholder="Avis"
        multiline
        onChange={setAvis}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          marginTop: insets.top + 80,
          paddingBottom: 200,
          gap: 30,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {mode === "ajout" ? "Ajouter un livre" : "Modifier un livre"}
        </Text>

        {renderSectionInformationsDeBase()}
        {renderSectionAuteurs()}
        {renderSectionGenres()}
        {renderSectionInformationsDePublication()}
        {renderSectionResume()}
        {renderSectionInformationsAchatEmprunt()}
        {renderSectionInformationsDeLecture()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
