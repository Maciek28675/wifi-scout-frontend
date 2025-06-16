import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from 'expo-router'
import { Colors } from "@/constants/Colors";
import { useTranslation } from 'react-i18next';

export default function Login () {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('utils.under_construction')}</Text>
            <Pressable
                onPress={() => router.replace("/(logged-in)/(tabs)")}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{t('auth.to_home')}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
    },
    button: {
        height: 'auto',
        width: 'auto',
        backgroundColor: Colors.light.gradientLeft,
        borderRadius: 12,
        borderCurve: 'continuous',
        paddingHorizontal: 24,
        paddingVertical: 12,
        marginTop: 16
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#FFF',
    },

    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#B22D2D',
        
    }
})