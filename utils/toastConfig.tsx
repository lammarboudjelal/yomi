import { View, Text, TouchableOpacity } from "react-native";
import Toast, { BaseToastProps } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

export const toastConfig = {
  success: ({ text1, text2 }: BaseToastProps) => (
    <View
      style={{
        width: "90%",
        backgroundColor: "white",
        borderLeftWidth: 5,
        borderLeftColor: "#55a630",
        borderRadius: 5,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
      }}
    >
      <Ionicons name="checkmark-circle" size={24} color="#55a630" />

      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontWeight: "600" }}>{text1}</Text>

        {text2 && <Text style={{ fontSize: 12 }}>{text2}</Text>}
      </View>

      <TouchableOpacity onPress={() => Toast.hide()}>
        <Ionicons name="close" size={20} />
      </TouchableOpacity>
    </View>
  ),

  error: ({ text1, text2 }: BaseToastProps) => (
    <View
      style={{
        width: "90%",
        backgroundColor: "white",
        borderLeftWidth: 5,
        borderLeftColor: "#bf0603",
        borderRadius: 5,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
      }}
    >
      <Ionicons name="alert-circle" size={24} color={"#bf0603"} />

      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontWeight: "600" }}>{text1}</Text>

        {text2 && <Text style={{ fontSize: 12 }}>{text2}</Text>}
      </View>

      <TouchableOpacity onPress={() => Toast.hide()}>
        <Ionicons name="close" size={20} />
      </TouchableOpacity>
    </View>
  ),
};
