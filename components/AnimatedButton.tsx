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

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    
    return (
        <Animated.View style={[styles.animationWrapper, buttonStyles, {transform: [{scale}]} ]}>
            <Pressable 
                onPressIn={() => onPressIn(scale)} 
                onPressOut={() => onPressOut(scale)}
                onPress={onPress}
                style={[styles.container]}
                disabled={disabled}
            >
                {children}
            </Pressable>
        </Animated.View>
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
        width: '100%',
    }
})

export default AnimatedButton;