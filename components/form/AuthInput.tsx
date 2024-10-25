import { ReactNode } from "react";
import { Control, FieldValue, FieldValues, useController } from "react-hook-form";
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native";

type AuthInputType<T, N extends string> = {
    style?: StyleProp<ViewStyle>,
    icon?: ReactNode,
    placeholder?: string,
    keyboardType?: KeyboardTypeOptions | undefined,
    control: T
    name: N
    secureTextEntry?: boolean | undefined
}

const AuthInput = <T extends Control<FieldValues | any> | undefined, N extends string>(
    {
        style,
        icon,
        placeholder,
        keyboardType,
        control,
        name,
        secureTextEntry
    }: AuthInputType<T, N>
) => {
    const { field } = useController({
        name,
        control,
        defaultValue: "" as any
    })
    return (
        <View style={style}>
            <TextInput
                value={field.value}
                onChangeText={field.onChange}
                keyboardType={keyboardType}
                style={styles.input}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
            {icon}
        </View>
    );
};

export default AuthInput;

const styles = StyleSheet.create({
    input: {
        flex: 1,
        direction: "rtl",
        textAlign: "right",
        paddingRight: 10,
        paddingVertical: 5,
        fontFamily: "irsans",
        fontSize: 15,
        letterSpacing: 4
    },
})