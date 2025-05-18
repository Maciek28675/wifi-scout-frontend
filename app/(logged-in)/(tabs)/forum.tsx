import { View, Text, StyleSheet} from "react-native";

 export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Under construction - Forum</Text>
        </View>
    )
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#B22D2D',
    }
})