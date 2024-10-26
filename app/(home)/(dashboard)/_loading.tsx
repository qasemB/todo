import React, { useEffect } from "react";
import { Animated, View } from "react-native";

const Loading = () => {
    const fadeAnim = new Animated.Value(0.3);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0.3,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {[...Array(5)].map((_, index) => (
                <Animated.View key={index} style={[
                    {
                        backgroundColor: '#e0e0e0',
                        marginBottom: 10,
                        height: 40,
                        borderRadius: 10,
                        opacity: fadeAnim,
                    },
                ]}>
                </Animated.View>
            ))}
        </View>
    );
};

export default Loading;