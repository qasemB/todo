import FaText from "@/components/FaText";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
const img = require("@/assets/images/icon.png")
import Feather from '@expo/vector-icons/Feather';
import { styles } from "../_login.styles"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useForm } from "react-hook-form";
import AuthInput from "@/components/form/AuthInput";
import { LoginFormType } from "../_types";
import { loginFormValidationSchema } from "../_schema";
import { loginService } from "../_api";
import { useAsyncMethod } from "@/hooks/asyncMethodsHook";
import { getStringData, storeStringData } from "@/utils/asyncStorage";
import axios from "axios";
import httpService from "@/services/_httpService";



const Login = () => {
    const router = useRouter()

    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormType>({
        resolver: loginFormValidationSchema
    })

    const { isLoading, runMethod: handleSubmitForm } = useAsyncMethod(async (values: LoginFormType) => {
        const res = await loginService(values)
        if (res.status === 200) {            
            const data = await res.data
            await storeStringData("loginToken", data.data)
            router.replace("/dashboard")
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.imaeContainer}>
                    <Image source={img} style={styles.image} />
                </View>
                <FaText style={{ textAlign: "right" }}>فرم ورود</FaText>
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
                <Pressable disabled={isLoading} style={styles.button} android_ripple={{ color: "white" }} onPress={handleSubmit(handleSubmitForm)}>
                    {isLoading ? <ActivityIndicator /> : (
                        <FaText style={styles.colorWhite}>ورود</FaText>
                    )}
                </Pressable >
                <Link href={"/register"} style={{ marginTop: 20, color: "blue" }}>
                    <FaText>ثبتنام نکرده ام</FaText>
                </Link>
            </View>
        </View>
    );
};

export default Login;