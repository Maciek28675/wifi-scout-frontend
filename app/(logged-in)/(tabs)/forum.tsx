import { View, Text, StyleSheet} from "react-native";
import { useTranslation } from 'react-i18next';

 export default function Home() {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('utils.under_construction')}</Text>
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