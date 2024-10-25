import FaText from "@/components/FaText";
import { Link, Stack, useRouter } from "expo-router";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { styles } from "../_login.styles"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useForm } from "react-hook-form";
import { RegisterFormType } from "../_types";
import { rgisterFormValidationSchema } from "../_schema";
import AuthInput from "@/components/form/AuthInput";
import { useAsyncMethod } from "@/hooks/asyncMethodsHook";
import { registerService } from "../_api";
const img = require("@/assets/images/icon.png")


const Login = () => {
    const router = useRouter()

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormType>({
        resolver: rgisterFormValidationSchema
    })

    const { isLoading, runMethod: handleSubmitForm } = useAsyncMethod(async (values: RegisterFormType) => {
        const res = await registerService(values)
        console.log(values);
        
        console.log(res.status);
        
        if (res.status === 201) {
            router.push("/login")
        }
    })
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ animation: "slide_from_right" }} />
            <View style={styles.formContainer}>
                <View style={styles.imaeContainer}>
                    <Image source={img} style={styles.image} />
                </View>
                <FaText style={{ textAlign: "right" }}>فرم ثبتنام</FaText>
                <View style={{ marginTop: 20 }}>
                    <AuthInput
                        icon={<Feather name="smartphone" size={24} color="gray" />}
                        style={styles.inputContainer}
                        placeholder="شماره تماس"
                        keyboardType="numeric"
                        control={control}
                        name="phone"
                    />
                    <FaText style={{ fontSize: 10, color: "tomato" }}>{errors.phone?.message}</FaText>
                </View>
                <View style={{ marginTop: 10 }}>
                    <AuthInput
                        icon={<MaterialIcons name="password" size={24} color="gray" />}
                        style={styles.inputContainer}
                        placeholder="رمز ورود"
                        control={control}
                        name="password"
                        secureTextEntry
                    />
                    <FaText style={{ fontSize: 10, color: "tomato" }}>{errors.password?.message}</FaText>
                </View>
                <View style={{ marginTop: 10 }}>
                    <AuthInput
                        icon={<MaterialIcons name="password" size={24} color="gray" />}
                        style={styles.inputContainer}
                        placeholder="تکرار رمز ورود"
                        control={control}
                        name="conPass"
                        secureTextEntry
                    />
                    <FaText style={{ fontSize: 10, color: "tomato" }}>{errors.conPass?.message}</FaText>
                </View>
                <Pressable style={styles.button} android_ripple={{ color: "white" }} onPress={handleSubmit(handleSubmitForm)}>
                    {isLoading ? <ActivityIndicator /> : (
                        <FaText style={styles.colorWhite}>ثبت نام</FaText>
                    )}
                </Pressable >
                <Link href={"/login"} style={{ marginTop: 20, color: "blue" }}>
                    <FaText>قبلا ثبت نام کرده ام</FaText>
                </Link>
            </View>

        </View>
    );
};

export default Login;

StyleSheet