import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Livre } from "../../models/Livre";
import CustomTextInput from "./fields/CustomTextInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomNumberInput from "./fields/CustomNumberInput";
import CustomRanking from "./fields/CustomRanking";
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
import { useForm, Controller } from "react-hook-form";
import { isValidDate } from "../../utils/validationDate";
import { ModeFormulaire } from "../../utils/modeFormulaire";
import { toastError, toastSuccess } from "../../utils/toast";
import {
  getDefaultValues,
  optionsEtatLecture,
  optionsTypeLivre,
} from "../../utils/formulaireLivreHelpers";
import { styles } from "../../theme/styles";
import { Routes } from "../../navigation/routes";

function SectionTitre({ titre }: { titre: string }) {
  return <Text style={styles.h4}>{titre}</Text>;
}

type FormulaireLivreProps = {
  mode: ModeFormulaire;
  livreInitial?: Livre;
};

export default function FormulaireLivre({
  mode,
  livreInitial,
}: FormulaireLivreProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const db = useSQLiteContext();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Livre>({
    mode: "onChange",
    defaultValues: getDefaultValues(livreInitial),
  });

  const statutPossession = watch("statut_possession");

  const onSubmit = async (data: Livre) => {
    Keyboard.dismiss();

    try {
      if (mode === ModeFormulaire.ajouter && !livreInitial?.id) {
        const livreId = await insertLivre(db, data);
        toastSuccess(
          "Livre ajouté",
          `${data.titre} a été ajouté à votre bibliothèque.`,
        );
        navigation.replace(Routes.livreDetail, { livreId: livreId });
      } else {
        await updateLivre(db, { ...data, id: livreInitial!.id });
        toastSuccess(
          "Livre modifié",
          `Les informations de ${data.titre} ont été modifiées.`,
        );
        navigation.goBack();
      }
    } catch (error) {
      toastError("Une erreur est survenue.");
    }
  };

  const sectionInformationsDeBase = (
    <View style={{ gap: 15 }}>
      <SectionTitre titre="Informations de base" />

      <Controller
        control={control}
        name="titre"
        rules={{ required: "Le titre est obligatoire." }}
        render={({ field: { onChange, value } }) => (
          <CustomTextInput
            label="Titre *"
            valeur={value}
            placeholder="Titre"
            onChange={onChange}
            erreur={errors.titre?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="isbn"
        render={({ field: { onChange, value } }) => (
          <CustomTextInput
            label="ISBN"
            valeur={value ?? ""}
            placeholder="ISBN"
            onChange={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="nombre_pages"
        render={({ field: { onChange, value } }) => (
          <CustomNumberInput
            label="Nombre de pages"
            valeur={value ? value.toString() : ""}
            placeholder="0"
            onChange={(text) => onChange(Number(text))}
          />
        )}
      />
    </View>
  );

  const sectionInformationsDePublication = (
    <View style={{ gap: 15 }}>
      <SectionTitre titre="Informations de publication" />

      <Controller
        control={control}
        name="edition"
        render={({ field: { onChange, value } }) => (
          <CustomTextInput
            label="Édition"
            valeur={value ?? ""}
            onChange={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="date_publication"
        rules={{
          validate: (value) =>
            isValidDate(value ?? "") || "Veuillez saisir une date valide.",
        }}
        render={({ field: { onChange, value } }) => (
          <CustomDateField
            label="Date de publication"
            valeur={value ?? ""}
            onChange={onChange}
            erreur={errors.date_publication?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, value } }) => (
          <CustomSelect
            label="Type"
            valeur={value}
            options={optionsTypeLivre}
            onChange={onChange}
          />
        )}
      />
    </View>
  );

  const sectionResume = (
    <View style={{ gap: 15 }}>
      <SectionTitre titre="Résumé" />

      <Controller
        control={control}
        name="resume"
        render={({ field: { onChange, value } }) => (
          <CustomTextInput
            valeur={value ?? ""}
            placeholder="Résumé"
            multiline
            onChange={onChange}
          />
        )}
      />
    </View>
  );

  const sectionInformationsAchatEmprunt = (
    <View style={{ gap: 15 }}>
      <SectionTitre titre="Informations d'achat/d'emprunt" />

      <Controller
        control={control}
        name="statut_possession"
        render={({ field: { onChange, value } }) => (
          <CustomRadioStatus valeur={value} onChange={onChange} />
        )}
      />

      {statutPossession === StatutPossession.achete && (
        <Controller
          control={control}
          name="prix"
          render={({ field: { onChange, value } }) => (
            <CustomNumberInput
              label="Prix d'achat"
              valeur={value ? value.toString() : ""}
              placeholder="0"
              onChange={(text) => onChange(Number(text))}
            />
          )}
        />
      )}

      {statutPossession === StatutPossession.emprunte && (
        <>
          <Controller
            control={control}
            name="preteur"
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                label="Prêteur"
                valeur={value ?? ""}
                onChange={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="date_pret"
            rules={{
              validate: (value) =>
                isValidDate(value ?? "") || "Veuillez saisir une date valide.",
            }}
            render={({ field: { onChange, value } }) => (
              <CustomDateField
                label="Date d'emprunt"
                valeur={value ?? ""}
                onChange={onChange}
                erreur={errors.date_pret?.message}
              />
            )}
          />
        </>
      )}
    </View>
  );

  const sectionInformationsDeLecture = (
    <View style={{ gap: 15 }}>
      <SectionTitre titre="Informations de lecture" />

      <Controller
        control={control}
        name="etat_lecture"
        render={({ field: { onChange, value } }) => (
          <CustomSelect
            label="État de lecture"
            valeur={value}
            options={optionsEtatLecture}
            onChange={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="date_debut_lecture"
        rules={{
          validate: (value) =>
            isValidDate(value ?? "") || "Veuillez saisir une date valide.",
        }}
        render={({ field: { onChange, value } }) => (
          <CustomDateField
            label="Date de début de lecture"
            valeur={value ?? ""}
            onChange={onChange}
            erreur={errors.date_debut_lecture?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="date_fin_lecture"
        rules={{
          validate: (value) =>
            isValidDate(value ?? "") || "Veuillez saisir une date valide.",
        }}
        render={({ field: { onChange, value } }) => (
          <CustomDateField
            label="Date de fin de lecture"
            valeur={value ?? ""}
            onChange={onChange}
            erreur={errors.date_fin_lecture?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="note"
        render={({ field: { onChange, value } }) => (
          <CustomRanking
            label="Note"
            editable
            note={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="avis"
        render={({ field: { onChange, value } }) => (
          <CustomTextInput
            label="Avis"
            valeur={value ?? ""}
            placeholder="Avis"
            multiline
            onChange={onChange}
          />
        )}
      />
    </View>
  );

  return (
    <>
      <BoutonEnregistrer onPress={handleSubmit(onSubmit)} />

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
          <Text style={styles.h2}>{mode} un livre</Text>

          <Controller
            control={control}
            name="couverture"
            render={({ field: { onChange, value } }) => (
              <CustomImagePicker
                label="Couverture"
                valeur={value ?? ""}
                onChange={onChange}
              />
            )}
          />

          {sectionInformationsDeBase}

          <Controller
            control={control}
            name="auteurs"
            render={({ field: { onChange, value } }) => (
              <MultipleValueTextField
                label="Auteur(s)"
                valeurs={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="genres"
            render={({ field: { onChange, value } }) => (
              <MultipleValueTextField
                label="Genre(s)"
                valeurs={value}
                onChange={onChange}
              />
            )}
          />

          {sectionInformationsDePublication}
          {sectionResume}
          {sectionInformationsAchatEmprunt}
          {sectionInformationsDeLecture}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
