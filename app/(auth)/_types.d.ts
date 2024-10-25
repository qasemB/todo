import { ReactNode } from "react"
import { Control } from "react-hook-form"
import { KeyboardTypeOptions, StyleProp, ViewStyle } from "react-native"

export type LoginFormType = {
    phone: string
    password: string
}
export type RegisterFormType = LoginFormType & {
    conPass: string
}
export type AuthInputType<T, N> = {
    style?: StyleProp<ViewStyle>,
    icon?: ReactNode,
    placeholder?: string,
    keyboardType?: KeyboardTypeOptions | undefined,
    control: Control<T, any>
    name: keyof N
    secureTextEntry?: boolean | undefined
}