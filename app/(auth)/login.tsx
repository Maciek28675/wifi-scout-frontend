import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from 'expo-router'
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";

export default function Login () {
    const { login } = useAuth();
    const handleLogin = async () => {
        const response = await fetch('/api/login'); // przykład, zamienic na hook login
        const userData = await response.json();
        
        login(userData.userId);
        router.push('../(logged-in)/(tabs)');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Under construction - Login Form</Text>
            <Pressable
                onPress={() => router.replace("/(logged-in)/(tabs)")}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Go Home</Text>
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