import {Modal, View, Text, StyleSheet, Pressable, Animated} from 'react-native'
import { useRef } from 'react';
import {ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon, CheckCircleIcon} from 'react-native-heroicons/outline'
import { Colors } from '@/constants/Colors';
import AnimatedButton from './AnimatedButton';

interface props {
    messageType: 'success' | 'warning' | 'info' | 'error',
    headerText: string,
    mainText: string,
    secondaryText? : string,
    isVisible: boolean,
    onClose: () => void
}

const MessageModal: React.FC<props> = ({messageType, headerText, mainText, secondaryText, isVisible, onClose}) => {

    const scaleUnderstood = useRef(new Animated.Value(1)).current;
  

    const indicator: {[key: string]: React.JSX.Element} = {
        'success': <CheckCircleIcon size={32} color={Colors.light.indicatorGood}/>,
        'warning': <ExclamationTriangleIcon size={32} color={Colors.light.indicatorMid}/>,
        'info': <InformationCircleIcon size={32} color={Colors.light.gradientLeft}/>,
        'error': <XCircleIcon size={32} color={Colors.light.indicatorBad}/>
    }

    return (
        <Modal animationType='fade' transparent visible={isVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeaderContainer}>
                        {indicator[messageType]}
                        <Text style={styles.modalTitle}>{headerText}</Text>
                    </View>
                    <View style={styles.modalMainContainer}>
                        <Text style={styles.modalMainText}>{mainText}</Text>
                        <Text style={styles.modalMainText}>{secondaryText}</Text>
                    </View>
                    <View style={styles.modalFooterContainer}>
                        <AnimatedButton onPress={onClose} scale={scaleUnderstood} buttonStyles={styles.modalFooterButton}>
                            <Text style={styles.modalFooterButtonText}>Rozumiem</Text>
                        </AnimatedButton>
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
    marginHorizontal: 16
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