import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import Collapsible from "react-native-collapsible";
import { colors } from "../../theme/styles";

type SectionAccordionProps = {
  titre: string;
  children: React.ReactNode;
};

export default function SectionAccordion({
  titre,
  children,
}: SectionAccordionProps) {
  const [ouvert, setOuvert] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setOuvert(!ouvert)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.fieldBorder,
          borderColor: "white",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontWeight: "600" }}>{titre}</Text>

        <MaterialIcons
          name={ouvert ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
        />
      </TouchableOpacity>

      <Collapsible collapsed={!ouvert}>
        <View
          style={{
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: "white",
            borderBottomWidth: 1,
            borderBottomColor: colors.fieldBorder,
            gap: 10,
          }}
        >
          {children}
        </View>
      </Collapsible>
    </View>
  );
}
