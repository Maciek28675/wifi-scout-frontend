// External
import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Linking, Platform, Animated} from "react-native";
import Toast from 'react-native-toast-message';
import {useNetworkState} from 'expo-network'
import * as Haptics from 'expo-haptics'
import * as Location from 'expo-location';

// Constants
import { Colors } from "@/constants/Colors";

// Internal components
import ConnectionTutorial from "@/components/ConnectionTutorial"
import NetworkInfo from "@/components/NetworkInfo";
import AnimatedButton from "@/components/AnimatedButton";
import MessageModal from "@/components/MessageModal";

// Utility functions
import testDownload from "@/utils/testDownload";
import testUpload from "@/utils/testUpload";
import testPing from "@/utils/testPing";


 export default function Home() {

    const networkState = useNetworkState();

    // State declarations
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [messageVisible, setMessageVisible] = useState<boolean>(false);

    const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
    const [uploadSpeed, setUploadSpeed] = useState<number>(0);
    const [ping, setPing] = useState<number>(0);

    const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false);
    const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);
    const [isPingLoading, setIsPingLoading] = useState<boolean>(false);
    
    const [isEduroamConnected, setIsEduroamConnected] = useState<boolean>(false);
    const [currentIP, setCurrentIP] = useState<string>("")

    const [isTestLoading, setIsTestLoading] = useState<boolean>(false);

    // Animation scale declarations
    const scaleInfo = useRef(new Animated.Value(1)).current;
    const scaleConnect = useRef(new Animated.Value(1)).current;
    const scaleScan = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestBackgroundPermissionsAsync();
            return;
        }) ();
    }, [])

    const testNetworkParameters = async () => {
        console.log(process.env.EXPO_PUBLIC_SPEED_TEST_API_BASE)
        setIsTestLoading(true)

        // Download
        setIsDownloadLoading(true)
        const download = await testDownload(10, 5)
        setIsDownloadLoading(false)
        setDownloadSpeed(download)

        // Upload
        setIsUploadLoading(true)
        const upload = await testUpload(10, 5)
        setIsUploadLoading(false)
        setUploadSpeed(upload)

        // Ping
        setIsPingLoading(true)
        const ping = await testPing(10)
        setIsPingLoading(false)
        setPing(ping)

        setIsTestLoading(false)

        Toast.show({
            type: "success",
            text1: "Test sieci zakończony!",
            text2: `Download: ${download} | Mbps Upload: ${upload} Mbps | Ping: ${ping} ms`

        })
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

      const openMessage = () => {
        setMessageVisible(true)
      }

      const closeMessage = () => {
        setMessageVisible(false)
      }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>WiFi Scout</Text>
            </View>

            <View style={styles.speedTestResultContainer}>
                <NetworkInfo data={downloadSpeed} label="Pobieranie (Mbps)" color={Colors.light.gradientRight} loading={isDownloadLoading}/>
                <NetworkInfo data={uploadSpeed} label="Wysyłanie (Mbps)" color={Colors.light.gradientRight} loading={isUploadLoading}/>
                <NetworkInfo data={ping} label="Opóźnienie (ms)" color={Colors.light.gradientRight} loading={isPingLoading}/>
            </View>

            <View style={styles.networkInfoButtonsContainer}>
                <AnimatedButton scale={scaleInfo} onPress={openMessage} buttonStyles={styles.wifiNameButtonContainer}>
                    <Text style={styles.wifiNameButtonText}>Nie połączono</Text>
                </AnimatedButton>
                <AnimatedButton scale={scaleConnect} onPress={openModal} buttonStyles={styles.connectButtonContainer}>
                    <Text style={styles.connectButtonText}>Połącz się</Text>
                </AnimatedButton>
            </View>

            <View style={styles.lastActivitiesHeaderContainer}>
                <Text style={styles.lastActivitiesHeaderText}>Ostatnie Aktywności</Text>
            </View>

            <View style={styles.lastActivitiesContainer}>

            </View>

            <View style={styles.actionButtonsContainer}>
                <AnimatedButton scale={scaleScan} onPress={testNetworkParameters} disabled={isTestLoading} buttonStyles={styles.quickScanButtonContainer}>
                    {isTestLoading ? (
                            <Text style={styles.quickScanButtonText}>W trakcie...</Text>
                        ): (
                            <Text style={styles.quickScanButtonText}>Szybki Skan</Text>
                    )}
                </AnimatedButton>
            </View>
            <MessageModal isVisible={messageVisible} onClose={closeMessage} messageType="warning"/>
            <ConnectionTutorial isVisible={modalVisible} onClose={closeModal}/>
            <Toast/>
        </SafeAreaView>
    )
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    speedTestResultContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: 16,
        gap: 16,
        marginBottom: 24
    },

    networkInfoButtonsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 16,
        marginHorizontal: 16
    },
    connectButtonContainer: {
        backgroundColor: Colors.light.gradientLeft,
        flex: 1/2,
        borderRadius: 12,
        borderCurve: 'continuous',
        paddingVertical: 16,
        shadowColor: '#0e588c',
        shadowOpacity: 0.4,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 4
        },
        elevation: 2,
    },
    wifiNameButtonContainer: {
        flex: 1/2,
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderCurve: 'continuous',
        paddingVertical: 16,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 4
        },
        elevation: 2,
    },
    connectButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: '600'
    },
    wifiNameButtonText: {
        color: "#B22D2D",
        fontSize: 16,
        fontWeight: '600'
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
        marginBottom: 32,
        borderCurve: 'continuous',
         shadowColor: '#0e588c',
        shadowOpacity: 0.4,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 3
        },
        elevation: 2,
    },

    quickScanButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: 'bold'
    },

    lastActivitiesContainer: {
        borderRadius: 12,
        borderCurve: 'continuous',
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginBottom: 32,
        flex: 1,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 4
        },
        elevation: 2,
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
