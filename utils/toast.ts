import Toast from "react-native-toast-message";

export const toastSuccess = (text1: string, text2?: string) => {
  Toast.show({
    type: "success",
    text1: text1,
    text2: text2,
    position: "top",
    visibilityTime: 5000,
    swipeable: true,
  });
};

export const toastError = (text1: string, text2?: string) => {
  Toast.show({
    type: "error",
    text1: text1,
    text2: text2,
    position: "top",
    visibilityTime: 5000,
    swipeable: true,
  });
};
