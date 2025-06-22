import {View, Text, StyleSheet, ActivityIndicator } from 'react-native' 
import { Colors } from "@/constants/Colors";

interface props {
    data: number,
    label: string,
    color: string,
    loading: boolean
    cardColor?: string;
    textColor?: string;

}

const NetworkInfo: React.FC<props> = ({data, label, color, loading, cardColor = "#FFF", textColor = "#000"}) => {
    return (
        <View style={[styles.container, { backgroundColor: cardColor }]}>
            {loading ? (
                <ActivityIndicator size={'small'} color={color}/>
            ) : (
                <Text style={[styles.dataText, {color: color}]}>
                    {data.toString()}
                </Text>
            )}
            
            <Text style={[styles.labelText, { color: textColor }]}>
                {label}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderCurve: 'continuous',
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
        elevation: 2,
        paddingVertical: 16,
        gap: 8
    },
    dataText: {
        fontSize: 16,
        fontWeight: '700'
    },
    labelText: {
        fontSize: 13,
        color: '#B2B2B2',
        textAlign: 'center'
    }
})

export default NetworkInfo