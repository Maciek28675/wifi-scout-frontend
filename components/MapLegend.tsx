import { StyleSheet, View, Text, Modal, Pressable, ScrollView, Animated } from "react-native";
import { XCircleIcon } from 'react-native-heroicons/solid';
import { Colors } from '@/constants/Colors';
import { useEffect, useRef } from 'react';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const MapLegend: React.FC<Props> = ({ isVisible = false, onClose }) => {
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
                        <Text style={styles.moadlHeaderText}>Obiekty na mapie</Text>
                        <Pressable onPress={onClose}>
                        <XCircleIcon size={48} color={Colors.light.gradientLeft} />
                        </Pressable>
                    </View>
                    <ScrollView style={styles.modalListContainer}>
                        <View style={styles.modalTextContainer}>
                            <Text style={styles.circleDescriptionHeader}>Kolorowe koła:</Text>
                            <View style={{marginBottom: 16, marginTop: 8}}>
                                <Text>Każde koło to strefa o podobnych parametrach sieci. Średnica każdego z nich to 5 metrów.</Text>
                            </View>
                            <View style={{gap: 8}}>
                                <View style={styles.circleDescription}>
                                    <View style={styles.circle}/>
                                    <Text>Strefa o dobrych parametrach</Text>
                                </View>
                                <View style={styles.circleDescription}>
                                    <View style={[styles.circle, {backgroundColor: Colors.light.indicatorMid}]}/>
                                    <Text>Strefa o średnich parametrach</Text>
                                </View>
                                <View style={styles.circleDescription}>
                                    <View style={[styles.circle, {backgroundColor: Colors.light.indicatorBad}]}/>
                                    <Text>Strefa o słabych parametrach</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.modalTextContainer}>
                            <Text style={styles.lineDescription}>Kolorem <Text style={[styles.lineDescription, {color: '#9c1313'}]}>bordowym </Text>oznaczono obszar kampusu grunwaldzkiego.</Text>
                        </View>
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
    gap: 16
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

  lineDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'justify'
  },
  modalTextContainer: {
    marginBottom: 16
  },

  circleDescriptionHeader: {
    fontSize: 16,
    fontWeight: '600'
  },
  circle: {
    borderRadius: 60,
    backgroundColor: Colors.light.indicatorGood,
    width: 24,
    height: 24
  },
  circleDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  }
});

export default MapLegend;