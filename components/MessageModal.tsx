import {Modal, View, Text, StyleSheet, Pressable} from 'react-native'
import {ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon, CheckCircleIcon} from 'react-native-heroicons/outline'
import { Colors } from '@/constants/Colors';

interface props {
    messageType: 'success' | 'warning' | 'info' | 'error',
    isVisible: boolean,
    onClose: () => void
}

const MessageModal: React.FC<props> = ({messageType, isVisible, onClose}) => {

    const indicator: {[key: string]: React.JSX.Element} = {
        'success': <CheckCircleIcon size={32}/>,
        'warning': <ExclamationTriangleIcon size={32} color='#E88923'/>,
        'info': <InformationCircleIcon size={32}/>,
        'error': <XCircleIcon size={32}/>
    }

    return (
        <Modal animationType='fade' transparent visible={isVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeaderContainer}>
                        {indicator[messageType]}
                        <Text style={styles.modalTitle}>Nie połączono z Eduroam</Text>
                    </View>
                    <View style={styles.modalMainContainer}>
                        <Text style={styles.modalMainText}>
                            Aktualny adres ip <Text style={[styles.modalMainText, {color: "#E88923"}]}>192.168.1.4 </Text> 
                            nie należy do sieci Eduroam, co uniemożliwia wykonanie
                            testu jakości połączenia.
                        </Text>
                        <Text style={styles.modalMainText}>
                             Sprawdź jak się połączyć klikając przycisk 
                             <Text style={[styles.modalMainText, {color: Colors.light.gradientLeft}]}> Połącz się </Text> na ekranie głównym.
                        </Text>
                    </View>
                    <View style={styles.modalFooterContainer}>
                        <Pressable onPress={onClose} style={styles.modalFooterButton}>
                            <Text style={styles.modalFooterButtonText}>Rozumiem</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#00000080',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
  },
  modalContent: {
    borderRadius: 18,
    borderCurve: 'continuous',
    width: 'auto',
    backgroundColor: '#FFF',
    marginHorizontal: 16 
  },
  modalHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 16,
    gap: 8,
    flexDirection: 'row',
    marginLeft: 16
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700'
  },
  modalMainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    gap: 8
  },
  modalMainText: {
    fontSize: 13,
    textAlign: 'justify'
  },
  modalFooterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16
  },
  modalFooterButton: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 2,
    borderColor: Colors.light.gradientLeft,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  modalFooterButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.gradientLeft
  }
})

export default MessageModal;