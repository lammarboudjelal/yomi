import Toast from "react-native-toast-message";

export const toastSuccess = (message: string) => {
  Toast.show({
    type: "success",
    text1: message,
    position: "top",
    visibilityTime: 4000,
    swipeable: true,
  });
};

export const toastError = (message: string) => {
  Toast.show({
    type: "error",
    text1: message,
    position: "top",
    visibilityTime: 4000,
    swipeable: true,
  });
};
