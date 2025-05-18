import {View, Text, StyleSheet, ActivityIndicator } from 'react-native' 
import { Colors } from "@/constants/Colors";

interface props {
    data: number,
    label: string,
    color: string,
    loading: boolean
}

const NetworkInfo: React.FC<props> = ({data, label, color, loading}) => {
    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size={'small'} color={Colors.light.gradientRight}/>
            ) : (
                <Text style={[styles.dataText, {color: color}]}>
                    {data.toString()}
                </Text>
            )}
            
            <Text style={styles.labelText}>
                {label}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderCurve: 'circular',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1 / 3,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 4
        },
        paddingVertical: 16,
        gap: 8
    },
    dataText: {
        fontSize: 16,
        fontWeight: '700'
    },
    labelText: {
        fontSize: 14,
        color: '#B2B2B2'
    }
})

export default NetworkInfo