import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Livre } from "../../models/Livre";
import CustomTextInput from "./fields/CustomTextInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomNumberInput from "./fields/CustomNumberInput";
import CustomRanking from "./fields/CustomRanking";
import { TypeLivre } from "../../models/TypeLivre";
import { EtatLecture } from "../../models/EtatLecture";
import CustomSelect from "./fields/CustomSelect";
import { StatutPossession } from "../../models/StatutPosession";
import CustomRadioStatus from "./fields/CustomRadioStatus";
import MultipleValueTextField from "./fields/MultipleValueTextField";
import CustomDateField from "./fields/CustomDateField";
import CustomImagePicker from "./fields/CustomImagePicker";
import { insertLivre, updateLivre } from "../../services/livreService";
import BoutonEnregistrer from "./BoutonEnregistrer";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

function SectionTitre({ titre }: { titre: string }) {
  return <Text style={{ fontWeight: "600", fontSize: 16 }}>{titre}</Text>;
}

type FormulaireLivreProps = {
  mode: "ajout" | "modification";
  livreInitial?: Livre;
};

export default function FormulaireLivre({
  mode,
  livreInitial,
}: FormulaireLivreProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const db = useSQLiteContext();

  const [couverture, setCouverture] = useState<string | null>(
    livreInitial?.couverture ?? null,
  );
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
    livreInitial?.statut_possession ?? StatutPossession.achete,
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

  const [erreurTitre, setErreurTitre] = useState<string | null>(null);

  const optionsEtatLecture = Object.values(EtatLecture).map((val) => ({
    label: val,
    value: val,
  }));
  const optionsTypeLivre = Object.values(TypeLivre).map((val) => ({
    label: val,
    value: val,
  }));

  const isFormValid = () => {
    if (!titre.trim()) {
      setErreurTitre("Le titre est obligatoire.");
      return false;
    }

    setErreurTitre(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    try {
      const livreFinal: Livre = {
        id: livreInitial?.id,
        titre,
        isbn,
        resume,
        nombre_pages: Number(nombrePages) || null,
        edition,
        date_publication: datePublication,
        couverture,
        type: typeLivre,
        etat_lecture: etatLecture,
        note,
        avis,
        date_debut_lecture: dateDebutLecture,
        date_fin_lecture: dateFinLecture,
        statut_possession: statut,
        date_pret: datePret,
        preteur,
        prix: Number(prix) || null,
        auteurs,
        genres,
        date_ajout: livreInitial?.date_ajout || null,
      };

      if (mode === "ajout") {
        await insertLivre(db, livreFinal);
      } else {
        await updateLivre(db, livreFinal);
      }

      Keyboard.dismiss();
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue lors de l'ajout.");
      console.error(error);
    }
  };

  const renderSectionInformationsDeBase = (
    <View style={{ gap: 15 }}>
      <SectionTitre titre="Informations de base" />

      <CustomTextInput
        label="Titre *"
        valeur={titre}
        placeholder="Titre"
        onChange={(texte) => {
          setTitre(texte);
          if (erreurTitre) setErreurTitre(null);
        }}
        erreur={erreurTitre}
      />

      <CustomTextInput
        label="ISBN"
        valeur={isbn ?? ""}
        placeholder="ISBN"
        onChange={setIsbn}
      />

      <CustomNumberInput
        label="Nombre de pages"
        valeur={nombrePages}
        placeholder="0"
        onChange={setNombrePages}
      />
    </View>
  );

  const renderSectionAuteurs = (
    <MultipleValueTextField
      label="Auteur(s)"
      valeurs={auteurs}
      onChange={setAuteurs}
    />
  );

  const renderSectionGenres = (
    <MultipleValueTextField
      label="Genre(s)"
      valeurs={genres}
      onChange={setGenres}
    />
  );

  const renderSectionInformationsDePublication = (
    <View style={{ gap: 15 }}>
      <SectionTitre titre="Informations de publication" />

      <CustomTextInput
        label="Édition"
        valeur={edition}
        placeholder="Édition"
        onChange={setEdition}
      />

      <CustomDateField
        label="Date de publication"
        valeur={datePublication}
        onChange={setDatePublication}
      />

      <CustomSelect
        label="Type"
        valeur={typeLivre}
        options={optionsTypeLivre}
        onChange={setTypeLivre}
      />
    </View>
  );

  const renderSectionResume = (
    <View style={{ gap: 15 }}>
      <SectionTitre titre="Résumé" />

      <CustomTextInput
        valeur={resume}
        placeholder="Résumé"
        multiline
        onChange={setResume}
      />
    </View>
  );

  const renderSectionInformationsAchatEmprunt = (
    <View style={{ gap: 15 }}>
      <SectionTitre titre="Informations d'achat/d'emprunt" />

      <CustomRadioStatus valeur={statut} onChange={setStatut} />

      {statut === "acheté" && (
        <CustomNumberInput
          label="Prix d'achat"
          valeur={prix}
          placeholder="0"
          onChange={setPrix}
        />
      )}

      {statut === "emprunté" && (
        <>
          <CustomTextInput
            label="Prêteur"
            valeur={preteur}
            placeholder="Nom du prêteur"
            onChange={setPreteur}
          />

          <CustomDateField
            label="Date d'emprunt"
            valeur={datePret}
            onChange={setDatePret}
          />
        </>
      )}
    </View>
  );

  const renderSectionInformationsDeLecture = (
    <View style={{ gap: 15 }}>
      <SectionTitre titre="Informations de lecture" />

      <CustomSelect
        label="État de lecture"
        valeur={etatLecture}
        options={optionsEtatLecture}
        onChange={(val) => setEtatLecture(val as EtatLecture)}
      />

      <CustomDateField
        label="Date de début de lecture"
        valeur={dateDebutLecture}
        onChange={setDateDebutLecture}
      />

      <CustomDateField
        label="Date de fin de lecture"
        valeur={dateFinLecture}
        onChange={setDateFinLecture}
      />

      <CustomRanking label="Note" note={note} editable onChange={setNote} />

      <CustomTextInput
        label="Avis"
        valeur={avis}
        placeholder="Avis"
        multiline
        onChange={setAvis}
      />
    </View>
  );

  return (
    <>
      <BoutonEnregistrer onPress={handleSubmit} />

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

          <CustomImagePicker
            label="Couverture"
            valeur={couverture}
            onChange={setCouverture}
          />

          {renderSectionInformationsDeBase}
          {renderSectionAuteurs}
          {renderSectionGenres}
          {renderSectionInformationsDePublication}
          {renderSectionResume}
          {renderSectionInformationsAchatEmprunt}
          {renderSectionInformationsDeLecture}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
