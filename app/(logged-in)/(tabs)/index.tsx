// External
import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Linking, Platform, Animated, ScrollView, FlatList} from "react-native";
import Toast from 'react-native-toast-message';
import {useNetworkState} from 'expo-network';
import {ArrowPathIcon} from 'react-native-heroicons/outline';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import * as Network from 'expo-network';

// Constants
import { Colors } from "@/constants/Colors";

// Internal components
import ConnectionTutorial from "@/components/ConnectionTutorial"
import NetworkInfo from "@/components/NetworkInfo";
import AnimatedButton from "@/components/AnimatedButton";
import MessageModal from "@/components/MessageModal";
import ActivitySummary from "@/components/ActivitySummary"

// Utility functions
import testDownload from "@/utils/testDownload";
import testUpload from "@/utils/testUpload";
import testPing from "@/utils/testPing";
import { addActivity, getActivities, getActivitiesLength, Activity } from "@/utils/activities";

interface Measurement {
    latitude: number,
    longitude: number,
    height?: number | null,
    download_speed: number,
    upload_speed: number,
    ping: number
}

export default function Home() {

    const isTestRefreshed = useRef(false);

    // Listen for network related changes
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

    const [activities, setActivities] = useState<Activity[]>([]);


    // Animation scale declarations
    const scaleInfo = useRef(new Animated.Value(1)).current;
    const scaleConnect = useRef(new Animated.Value(1)).current;
    const scaleScan = useRef(new Animated.Value(1)).current;
    const scaleRefresh = useRef(new Animated.Value(1)).current;


    // Ask for location permission first time only
    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            return;
        }) ();
    }, [])

    // Get ip address on first render
    useEffect(() => {
        (async () => {
            const ip = await Network.getIpAddressAsync();
            setCurrentIP(ip)
            return;
        }) ();
    }, [])


    // Listen for network state changes
    // useEffect(() => {
    //         const subscription = Network.addNetworkStateListener(({type}) => {
    //         console.log('network changed')
    //     });

    //     return () => {
    //         subscription.remove(); // cleanup on unmount
    //     };
    // }, []);

    // TODO: Open modal only when changing from wifi to cellular
    // maybe use ref for previous state
    Network.addNetworkStateListener(({type}) => {
        if(type === Network.NetworkStateType.CELLULAR) {
            openMessage();
        }
    });

    const testNetworkParameters = async () => {

        isTestRefreshed.current = false;

        const { status} = await Location.getForegroundPermissionsAsync();

        if (status !== Location.PermissionStatus.GRANTED) {
            const { status: newStatus } = await Location.requestForegroundPermissionsAsync();

            if (newStatus !== Location.PermissionStatus.GRANTED) {
                alert("You need to allow location permissions");
                return;
            }
        }

        const ip = await Network.getIpAddressAsync()

        if(isTestRefreshed.current) return;

        setIsTestLoading(true)

        // Download
        setIsDownloadLoading(true)
        console.log(`download started (Device ${ip})`)
        const download = await testDownload(1, 5)
        setIsDownloadLoading(false)
        if(isTestRefreshed.current) return;
        setDownloadSpeed(download)

        // Upload
        setIsUploadLoading(true)
        console.log(`upload started (Device ${ip})`)
        const upload = await testUpload(1, 5)
        setIsUploadLoading(false)
        if(isTestRefreshed.current) return;
        setUploadSpeed(upload)

        // Ping
        setIsPingLoading(true)
        console.log(`ping started (Device ${ip})`)
        const ping = await testPing(10)
        setIsPingLoading(false)
        if(isTestRefreshed.current) return;
        setPing(ping)

        setIsTestLoading(false)

        console.log(`Test result (Device: ${ip}) Download: ${download} Upload: ${upload} Ping: ${ping}`)

        if(isTestRefreshed.current) return;

        // Send result to backend
        let currentLocation = await Location.getCurrentPositionAsync({});
        const coordinates = currentLocation.coords

        const requestBody: Measurement = {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            height: coordinates.altitude,
            download_speed: download,
            upload_speed: upload,
            ping: ping
        }

        const url = `${process.env.EXPO_PUBLIC_BACKEND_API_BASE}/measurements/`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })

        if(response.ok) {
            Toast.show({
                type: "success",
                text1: "Test sieci zakończony!",
                text2: "wynik widoczny na mapie i w aktywności"
            })
        }

        const result = await response.json()
        const newActivity: Activity = {
            latitude: result.latitude,
            longitude: result.longitude,
            height: result.height,
            download_speed: download,
            upload_speed: upload,
            ping: ping,
            color: Colors.light.indicatorGood,
            building: 'Kampus Grunwaldzki', // TODO: Add fetch for building name based on localization,
            timestamp: result.timestamp
        }

        addActivity(newActivity)

        const activities = await getActivities();
        const sortedActivities = activities.sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setActivities(sortedActivities)

        console.log(`Backend response: ${JSON.stringify(result)}`)
    }

    // Modal related methods
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

    // TODO: Fix refresh. Add abort to fetch calls
    const onRefreshClick = () => {

        if (!isTestLoading){
            Toast.show({
                type: "error",
                text1: "Nie można odświeżyć!",
                text2: "Test nie został uruchomiony."
            })
        }
        else {
            isTestRefreshed.current = true;

            setIsTestLoading(false)

            setIsDownloadLoading(false)
            setIsUploadLoading(false)
            setIsPingLoading(false)

            setDownloadSpeed(0)
            setUploadSpeed(0)
            setPing(0)

            Toast.show({
                type: "info",
                text1: "Test sieci przerwany!",
                text2: "Uruchom ponownie klikając Szybki Skan"
            })
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>WiFi Scout</Text>
                <AnimatedButton scale={scaleRefresh} onPress={onRefreshClick} buttonStyles={{backgroundColor: Colors.light.gradientLeft, padding: 8, borderRadius: 24}}>
                    <ArrowPathIcon size={24} color={'#FFF'}/>
                </AnimatedButton>
            </View>

            <View style={styles.speedTestResultContainer}>
                <NetworkInfo data={downloadSpeed} label="Pobieranie (Mbps)" color={Colors.light.gradientRight} loading={isDownloadLoading}/>
                <NetworkInfo data={uploadSpeed} label="Wysyłanie (Mbps)" color={Colors.light.gradientRight} loading={isUploadLoading}/>
                <NetworkInfo data={ping} label="Opóźnienie (ms)" color={Colors.light.gradientRight} loading={isPingLoading}/>
            </View>

            <View style={styles.networkInfoButtonsContainer}>
                <AnimatedButton scale={scaleInfo} onPress={openMessage} buttonStyles={styles.wifiNameButtonContainer}>
                    <Text style={styles.wifiNameButtonText}>{networkState.type}</Text>
                </AnimatedButton>
                <AnimatedButton scale={scaleConnect} onPress={openModal} buttonStyles={styles.connectButtonContainer}>
                    <Text style={styles.connectButtonText}>Połącz się</Text>
                </AnimatedButton>
            </View>

            <View style={styles.lastActivitiesHeaderContainer}>
                <Text style={styles.lastActivitiesHeaderText}>Ostatnie Aktywności</Text>
            </View>
            
            {/* #TODO: Fix shadow */ }
            <FlatList
                data={activities}
                keyExtractor={(item) => item.timestamp.toString()}
                renderItem={({item}) => (
                    <ActivitySummary activity={item}/>
                )}
                style={styles.lastActivitiesContainer}
            />

            <View style={styles.actionButtonsContainer}>
                <AnimatedButton scale={scaleScan} onPress={testNetworkParameters} disabled={isTestLoading} buttonStyles={styles.quickScanButtonContainer}>
                    {isTestLoading ? (
                            <Text style={styles.quickScanButtonText}>W trakcie...</Text>
                        ): (
                            <Text style={styles.quickScanButtonText}>Szybki Skan</Text>
                    )}
                </AnimatedButton>
            </View>
            
            {/* Pop-ups */}
            <MessageModal 
                isVisible={messageVisible} 
                onClose={closeMessage} 
                messageType="error"
                headerText="Brak połączenia z WiFi!"
                mainText="Połączenie z wifi jest wymagane do działania aplikacji."
                secondaryText='Kliknij przycisk "Połącz się" na ekranie głównym, żeby zobaczyć instrukcję połączenia z eduroam'
            />
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
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 24,
        flexDirection: 'row',

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
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 16,
        marginHorizontal: 16
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

    refreshButtonContainer: {

    },
    refreshButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },

    lastActivitiesContainer: {
        borderRadius: 12,
        borderCurve: 'continuous',
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginBottom: 32,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 24,
        shadowOffset: {
            width: 0,
            height: 20
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
