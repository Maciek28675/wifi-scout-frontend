import { useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, Linking, Platform, Animated} from "react-native";
import Toast from 'react-native-toast-message';

import { Colors } from "@/constants/Colors";

import ConnectionTutorial from "@/components/ConnectionTutorial"
import NetworkInfo from "@/components/NetworkInfo";

import testDownload from "@/utils/testDownload";
import testUpload from "@/utils/testUpload";
import testPing from "@/utils/testPing";

 export default function Home() {
    // State declarations
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
    const [uploadSpeed, setUploadSpeed] = useState<number>(0);
    const [ping, setPing] = useState<number>(0);

    const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false);
    const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);
    const [isPingLoading, setIsPingLoading] = useState<boolean>(false);

    const [isTestLoading, setIsTestLoading] = useState<boolean>(false);

    // Animation scale declarations
    const scaleInfo = useRef(new Animated.Value(1)).current;
    const scaleConnect = useRef(new Animated.Value(1)).current;
    const scaleScan = useRef(new Animated.Value(1)).current;


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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>WiFi Scout</Text>
            </View>
            <View style={styles.networkDataContainer}>
                <NetworkInfo data={downloadSpeed} label="Pobieranie (Mbps)" color="#67B22D" loading={isDownloadLoading}/>
                <NetworkInfo data={uploadSpeed} label="Wysyłanie (Mbps)" color="#B22D2D" loading={isUploadLoading}/>
                <NetworkInfo data={ping} label="Opóźnienie (ms)" color="#E4A316" loading={isPingLoading}/>
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
                <Pressable 
                    style={styles.quickScanButtonContainer} 
                    onPress={testNetworkParameters} 
                    onPressIn={() => onPressIn(scaleScan)} 
                    onPressOut={() => onPressOut(scaleScan)}
                    disabled={isTestLoading}
                >
                    <Animated.View style={[styles.buttonAnimationWrapper, {transform: [{scale: scaleScan}]}]}>
                        {isTestLoading ? (
                            <Text style={styles.quickScanButtonText}>W trakcie...</Text>
                        ): (
                            <Text style={styles.quickScanButtonText}>Szybki Skan</Text>
                        )}
                    </Animated.View>
                </Pressable>
            </View>
            <ConnectionTutorial isVisible={modalVisible} onClose={closeModal}/>
            <Toast/>
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
