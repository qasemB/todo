import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import FaText from '@/components/FaText';
const img = require("../assets/images/homeimg.png")
import Entypo from '@expo/vector-icons/Entypo';




const Home = () => {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <View style={styles.imageContainr}>
                <Image source={img} style={{ width: 400, height: 400 }} />
            </View>
            <Text style={styles.maintext}>My Todo Task</Text>
            <FaText style={{ fontSize: 15, paddingVertical: 20 }}>اپلیکیشنی متفاوت برای مدیریت تسک های من</FaText>
            <Pressable style={styles.button} android_ripple={{ color: "white"}} onPress={()=>router.push("/login")}>
                <Text></Text>
                <FaText style={styles.colorWhite}>بزن بریم</FaText>
                <Entypo name="arrow-with-circle-right" size={24} color="white" />
            </Pressable >
        </View>
    );
};

export default Home;


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1, 
        paddingBottom: 20,
        paddingHorizontal: 10
    },
    imageContainr: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        backgroundColor: "dodgerblue",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        borderRadius: 7,
        alignSelf: "stretch",
        marginTop: 30,
        shadowColor: "#000",
        elevation: 10
    },
    colorWhite: { color: "white" },
    maintext: { fontSize: 35, fontWeight: "bold" }
})