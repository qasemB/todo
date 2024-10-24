import FaText from "@/components/FaText";
import { Link, Stack } from "expo-router";
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
const img = require("@/assets/images/icon.png")
import Feather from '@expo/vector-icons/Feather';
import { styles } from "../_login.styles"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Login = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ animation: "slide_from_right" }} />
            <View style={styles.formContainer}>
                <View style={styles.imaeContainer}>
                    <Image source={img} style={styles.image} />
                </View>
                <FaText style={{ textAlign: "right" }}>فرم ثبتنام</FaText>
                <View style={{ marginTop: 20 }}>
                    <View style={styles.inputContainer}>
                        <TextInput keyboardType="numeric" style={styles.input} placeholder="شماره تماس" />
                        <Feather name="smartphone" size={24} color="gray" />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.inputContainer}>
                        <TextInput keyboardType="numeric" style={styles.input} placeholder="رمز ورود" />
                        <MaterialIcons name="password" size={24} color="gray" />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.inputContainer}>
                        <TextInput keyboardType="numeric" style={styles.input} placeholder="تکرار زمز ورود" />
                        <MaterialIcons name="password" size={24} color="gray" />
                    </View>
                </View>
                <Pressable style={styles.button} android_ripple={{ color: "white" }}>
                    <FaText style={styles.colorWhite}>ثبت نام</FaText>
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