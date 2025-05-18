import { Colors } from "@/constants/Colors";
import ConnectionTutorial from "@/components/ConnectionTutorial"
import NetworkInfo from "@/components/NetworkInfo";
import { useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, Linking, Platform, Animated} from "react-native";

 export default function Home() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
    const [ping, setPing] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const testDownload = async (file_size_mb: Number) => {
        setIsLoading(true)
        const url = `http://192.168.1.3:8000/speedtest/download/${file_size_mb}`
        
        // Start timer
        const startTime = performance.now();

        const response = await fetch(url);
        const data = await response.arrayBuffer();
        const endTime = performance.now();

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const bytesReceived = data.byteLength;
        const durationSeconds = (endTime - startTime) / 1000;

        const speedBps = bytesReceived / durationSeconds;
        const speedMbps = (speedBps * 8) / (1024 * 1024);

        setIsLoading(false)
        setDownloadSpeed(Math.round(speedMbps));
    }
    
    const testPing = async () => {
        const url = "http://192.168.1.3:8000/speedtest/ping";

        const startTime = performance.now();
        const response = await fetch(url);
        const endTime = performance.now();

         if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const duration = endTime - startTime;

        setPing(duration);
    }

    const openSettings = async () => {
        try {
          const settingsUrl = Platform.select({
            ios: 'App-Prefs:',
            android: 'android.settings.SETTINGS',
            default: ''
          });
    
          const supported = await Linking.canOpenURL(settingsUrl);

          if (supported) {
            await Linking.openURL(settingsUrl);
          } else {
            console.error('Cannot open settings URL:', settingsUrl);
          }
        } catch (error) {
          console.error('Error opening settings:', error);
        }
      };

      const scaleInfo = useRef(new Animated.Value(1)).current;
      const scaleConnect = useRef(new Animated.Value(1)).current;
      const scaleScan = useRef(new Animated.Value(1)).current;

      const onPressIn = (scaleValue: Animated.Value) => {
        Animated.spring(scaleValue, {
          toValue: 0.95,
          useNativeDriver: true,
        }).start();
      }
    
      const onPressOut = (scaleValue: Animated.Value) => {
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      }

      const openModal = () => {
        setModalVisible(true)
      }

      const closeModal = () => {
        setModalVisible(false)
      }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>WiFi Scout</Text>
            </View>
            <View style={styles.networkDataContainer}>
                <NetworkInfo data={downloadSpeed} label="Pobieranie" color="#67B22D" loading={isLoading}/>
                <NetworkInfo data={221} label="Wysyłanie" color="#B22D2D" loading={isLoading}/>
                <NetworkInfo data={ping} label="Opóźnienie" color="#E4A316" loading={isLoading}/>
            </View>
            <View style={styles.networkInfoContainer}>
                <Pressable style={[styles.netInfoButtonContainer, {marginLeft: 16}]} onPressIn={() => onPressIn(scaleInfo)} onPressOut={() => onPressOut(scaleInfo)}>
                    <Animated.View style={[styles.buttonAnimationWrapper, {transform: [{scale: scaleInfo}]}]}>
                        <Text style={styles.netinfoButtonText}>Nazwa Sieci</Text>
                    </Animated.View>
                </Pressable>
                <Pressable style={[styles.connectButtonContainer, {marginRight: 16}]} onPress={openModal} onPressIn={() => onPressIn(scaleConnect)} onPressOut={() => onPressOut(scaleConnect)}>
                    <Animated.View style={[styles.buttonAnimationWrapper, {transform: [{scale: scaleConnect}]}]}>
                        <Text style={styles.connectButtonText}>Połącz się</Text>
                    </Animated.View>
                </Pressable>
            </View>
            <View style={styles.lastActivitiesHeaderContainer}>
                <Text style={styles.lastActivitiesHeaderText}>Ostatnie Aktywności</Text>
            </View>
            <View style={styles.lastActivitiesContainer}>

            </View>
            <View style={styles.actionButtonsContainer}>
                <Pressable style={styles.quickScanButtonContainer} onPress={() => testDownload(10)} onPressIn={() => onPressIn(scaleScan)} onPressOut={() => onPressOut(scaleScan)}>
                    <Animated.View style={[styles.buttonAnimationWrapper, {transform: [{scale: scaleScan}]}]}>
                        <Text style={styles.quickScanButtonText}>Szybki Skan</Text>
                    </Animated.View>
                </Pressable>
            </View>
            <ConnectionTutorial isVisible={modalVisible} onClose={closeModal}/>
        </SafeAreaView>
    )
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#F5F5F5'
    },

    headerWrapper: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 24
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        lineHeight: 28
    },
    networkDataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: 16,
        gap: 16,
        marginBottom: 24
    },
    networkInfoContainer: {
        alignItems: 'center',
        //justifyContent: 'space-between',
        flexDirection: 'row',
        gap: 16
    },
    connectButtonContainer: {
        flex: 1/2,
        backgroundColor: Colors.light.gradientLeft,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        borderCurve: 'circular',
        //margin: 16
    },
    netInfoButtonContainer: {
        flex: 1/2,
        backgroundColor: "#FFF",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        borderCurve: 'circular',
        //margin: 16
    },
    connectButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: 'bold'
    },
    netinfoButtonText: {
        color: Colors.light.gradientLeft,
        fontSize: 16,
        fontWeight: 'bold'
    },
    
    actionButtonsContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    quickScanButtonContainer: {
        backgroundColor: Colors.light.gradientLeft,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        margin: 16,
        borderCurve: 'circular',
        //margin: 16
    },
    quickScanButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: 'bold'
    },
    speedTestContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    buttonAnimationWrapper: {

    },
    lastActivitiesContainer: {
        borderRadius: 12,
        borderCurve: 'circular',
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginBottom: 32,
        flex: 1
    },
    lastActivitiesHeaderContainer: {
        alignItems: 'flex-start',
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 16

    },
    lastActivitiesHeaderText: {
        fontSize: 24,
        fontWeight: '700'
    }
})
