import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const AnimatedContainer: React.FC<{ children: React.ReactNode; isVisible: boolean }> = ({ children, isVisible }) => {
    const buttonScale = useSharedValue(0);
    const buttonOpacity = useSharedValue(0);

    useEffect(() => {
        if (isVisible) {
            buttonScale.value = withSpring(1);
            buttonOpacity.value = withTiming(1, { duration: 300 });
        } else {
            buttonScale.value = withSpring(0);
            buttonOpacity.value = withTiming(0, { duration: 300 });
        }
    }, [isVisible]);

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: buttonScale.value }],
            opacity: buttonOpacity.value,
        };
    });

    return (
        <Animated.View style={[
            { position: 'absolute', bottom: 20, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', padding: 20 },
            animatedButtonStyle
        ]}>
            {children}
        </Animated.View>
    );
};

export default AnimatedContainer