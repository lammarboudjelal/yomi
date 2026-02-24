import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import Collapsible from "react-native-collapsible";

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
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#DBC2A9",
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
            borderBottomColor: "#DBC2A9",
            gap: 10,
          }}
        >
          {children}
        </View>
      </Collapsible>
    </View>
  );
}
