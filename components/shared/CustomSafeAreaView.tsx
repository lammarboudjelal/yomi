import { ScrollView, ScrollViewProps, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CustomSafeAreaViewProps = (ViewProps | ScrollViewProps) & {
  scrollable?: boolean;
};

export default function CustomSafeAreaView({
  scrollable = false,
  ...props
}: CustomSafeAreaViewProps) {
  const insets = useSafeAreaInsets();

  const baseStyle = {
    flexGrow: 1,
    gap: 20,
    paddingTop: insets.top + 10,
    paddingHorizontal: 20,
  };

  if (scrollable) {
    return (
      <ScrollView
        contentContainerStyle={baseStyle}
        {...(props as ScrollViewProps)}
      />
    );
  }

  return <View style={baseStyle} {...(props as ViewProps)} />;
}
