import { ComponentProps } from "react";
import FaTextInput from "../FaTextInput";
import { Control, Path, useController } from "react-hook-form";
import { StyleSheet } from "react-native";

type FormInputType<T extends Record<string, any>> = ComponentProps<typeof FaTextInput> & {
    control: Control<T>
    name: keyof T
}

const FormInput = <T extends Record<string, any>>({ control, name,placeholder,style, ...props }: FormInputType<T>) => {
    const { field } = useController({
        name : name as Path<T>,
        control,
        defaultValue: "" as any
    })
    return (
        <FaTextInput
            {...props}
            value={field.value}
            onChangeText={field.onChange}
            style={[styles.input, style]}
            placeholder={placeholder}
        />
    );
};

export default FormInput;


const styles = StyleSheet.create({
    input: { height: 40, borderWidth: 1, borderColor: "gray", borderRadius: 5, padding: 5, textAlign:"right" }
})