import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomSafeAreaViewProps extends ViewProps {}

export default function CustomSafeAreaView({
  ...props
}: CustomSafeAreaViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        gap: 20,
        paddingTop: insets.top + 10,
        paddingHorizontal: 20,
      }}
      {...props}
    />
  );
}
