import { ReactNode } from "react"
import { Control } from "react-hook-form"
import { KeyboardTypeOptions, StyleProp, ViewStyle } from "react-native"

export type LoginFormType = {
    phone: string
    password: string
}
export type AuthInputType = {
    style?: StyleProp<ViewStyle>,
    icon?: ReactNode,
    placeholder?: string,
    keyboardType?: KeyboardTypeOptions | undefined,
    control: Control<LoginFormType, any>
    name: keyof LoginFormType
    secureTextEntry?: boolean | undefined
}