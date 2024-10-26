import React from 'react';
import { Image, StyleSheet, View } from "react-native";
const img = require("@/assets/images/icon.png")

import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const FullLoading = () => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.5);

    React.useEffect(() => {
        scale.value = withRepeat(
            withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
        opacity.value = withRepeat(
            withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    return (
        <View style={styles.container}>
            <Animated.Image source={img} style={[styles.image, animatedStyle]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff', // Add a background color if needed
    },
    image: {
        width: 70,
        height: 70,
    },
});

export default FullLoading;