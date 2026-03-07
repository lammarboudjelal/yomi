import { Modal, View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ActionItem = {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  destructive?: boolean;
};

type ModaleProps = {
  visible: boolean;
  title?: string;
  actions: ActionItem[];
  onClose: () => void;
};

export default function Modale({
  visible,
  title,
  actions,
  onClose,
}: ModaleProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
        onPress={onClose}
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
            paddingBottom: insets.bottom + 40,
          }}
        >
          {title && (
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                textAlign: "center",
                paddingVertical: 20,
                borderBottomWidth: 2,
                borderColor: "#DBC2A9",
              }}
            >
              {title}
            </Text>
          )}

          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onClose();
                action.onPress();
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                borderBottomWidth: 1,
                borderColor: "#DBC2A9",
                paddingVertical: 20,
              }}
            >
              {action.icon}
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
