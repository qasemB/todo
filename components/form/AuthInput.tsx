import { AuthInputType } from "@/app/(auth)/_types";
import { useController } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";

const AuthInput = ({ style, icon, placeholder, keyboardType, control, name, secureTextEntry }: AuthInputType) => {
    const { field } = useController({
        name,
        control,
        defaultValue: ""
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