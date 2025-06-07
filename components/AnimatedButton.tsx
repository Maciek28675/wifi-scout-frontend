import { StyleSheet, View, Text, Pressable, Animated, StyleProp, ViewStyle, TextStyle } from "react-native";
import * as React from 'react';
import { Colors } from "@/constants/Colors";

interface props {
    scale: Animated.Value,
    onPress: () => void,
    buttonStyles?: StyleProp<ViewStyle>,
    disabled?: boolean
    children?: React.ReactNode,
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedButton: React.FC<props> = ({scale, onPress, buttonStyles, children, disabled}) => {

    const onPressIn = (scaleValue: Animated.Value) => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    }

    const onPressOut = (scaleValue: Animated.Value) => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }

    
    return (
            <AnimatedPressable 
                onPressIn={() => onPressIn(scale)} 
                onPressOut={() => onPressOut(scale)}
                onPress={onPress}
                style={[buttonStyles, styles.container, {transform: [{ scale }],}]}
                disabled={disabled}
            >
                {children}
            </AnimatedPressable>
    )
}

const styles = StyleSheet.create({
    animationWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default AnimatedButton;