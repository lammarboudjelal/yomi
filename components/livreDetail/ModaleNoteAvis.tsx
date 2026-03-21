import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import CustomTextInput from "../formulaire/fields/CustomTextInput";
import CustomRanking from "../formulaire/fields/CustomRanking";
import { Livre } from "../../models/Livre";
import { ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  visible: boolean;
  livre: Livre;
  onClose: () => void;
  onSave: (note: number, avis: string) => Promise<void>;
};

export default function ModaleNoteAvis({
  visible,
  livre,
  onClose,
  onSave,
}: Props) {
  const [note, setNote] = useState(0);
  const [avis, setAvis] = useState("");
  const [loading, setLoading] = useState(false);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      setNote(livre.note || 0);
      setAvis(livre.avis || "");
    }
  }, [visible, livre]);

  const resetFields = () => {
    setNote(livre.note || 0);
    setAvis(livre.avis || "");
  };

  const handleSave = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await onSave(note, avis);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const isModified = note !== (livre.note || 0) || avis !== (livre.avis || "");

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom,
          gap: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            paddingVertical: 20,
            borderBottomWidth: 2,
            borderColor: "#DBC2A9",
          }}
        >
          Modifier note et avis
        </Text>

        <CustomRanking label="Note" note={note} editable onChange={setNote} />

        <CustomTextInput
          label="Avis"
          valeur={avis}
          onChange={setAvis}
          multiline
        />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            onPress={handleClose}
            style={{
              flex: 1,
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#705C5C",
            }}
          >
            <Text>Annuler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!isModified || loading}
            onPress={handleSave}
            style={{
              flex: 1,
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
              backgroundColor: !isModified ? "#C4C4C4" : "#705C5C",
            }}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{ color: "white", fontWeight: 600 }}>
                Enregistrer
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
