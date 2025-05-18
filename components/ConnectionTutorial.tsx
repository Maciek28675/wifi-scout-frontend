import { StyleSheet, View, Text, Modal, Pressable, ScrollView, Animated } from "react-native";
import { XCircleIcon, ShieldCheckIcon, WifiIcon } from 'react-native-heroicons/solid';
import { Colors } from '@/constants/Colors';
import { useEffect, useRef } from 'react';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const ConnectionTutorial: React.FC<Props> = ({ isVisible = false, onClose }) => {
    const slideAnim = useRef(new Animated.Value(0)).current; // Animation value for sliding

    useEffect(() => {
        if (isVisible) {
        // Slide up when modal is visible
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
        } else {
        // Slide down when modal is hidden
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        }
    }, [isVisible]);

    return (
        <Modal animationType="fade" transparent visible={isVisible}>
            <View style={styles.modalContainer}>
                <Animated.View
                style={[
                    styles.modalContent,
                    {
                    transform: [
                        {
                        translateY: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1000, 0], // Slide from bottom (1000) to top (0)
                        }),
                        },
                    ],
                    },
                ]}
                >
                    <View style={styles.modalHeader}>
                        <Text style={styles.moadlHeaderText}>Jak się połączyć?</Text>
                        <Pressable onPress={onClose}>
                        <XCircleIcon size={40} color={Colors.light.gradientLeft} />
                        </Pressable>
                    </View>
                    <ScrollView style={styles.modalListContainer}>
                        <View style={styles.modalListHeaderContainer}>
                            <ShieldCheckIcon size={24} color={Colors.light.gradientLeft} />
                            <Text style={styles.modalListHeaderText}>VPN</Text>
                        </View>
                            <Text>1. Otwórz aplikację GlobalProtect</Text>
                            <Text>2. Zaloguj się danymi, których używasz do systemu USOS</Text>
                            <Text>3. Następny krok</Text>
                        <View style={styles.modalListHeaderContainer}>
                            <WifiIcon size={24} color={Colors.light.gradientLeft} />
                            <Text style={styles.modalListHeaderText}>Eduroam</Text>
                        </View>
                            <Text>1. Otwórz ustawienia</Text>
                            <Text>2. Znajdź eduroam na liście dostępnych sieci</Text>
                            <Text>3. Zaloguj się danymi AD</Text>
                            <Text>4. Następny krok</Text>
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#00000080',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  modalContent: {
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    width: '100%',
    height: '70%',
    backgroundColor: '#FFF',
  },
  modalHeader: {
    flexDirection: 'row',
    margin: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moadlHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  modalListContainer: {
    marginHorizontal: 16,
  },
  modalListHeaderText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalListHeaderContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});

export default ConnectionTutorial;