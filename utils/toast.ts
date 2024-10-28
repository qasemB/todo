import Toast, { ToastType } from "react-native-toast-message";

export const showToast = (type?: ToastType | undefined, text1?: string, text2?: string) => {
    return Toast.show({
        type,
        text1,
        text2,
    });
}

export const successToast = (text1: string = "موفق", text2: string = "عملیات با موفقیت انجام شد") => {
    return showToast("success", text1, text2)
}

export const errorToast = (text1: string = "خطا", text2: string = "عملیات با خطا مواجه شد") => {
    return showToast("error", text1, text2)
}