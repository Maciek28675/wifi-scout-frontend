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
import MessageModalChildren from "@/components/MessageModalChildren";
import ActivitySummary from "@/components/ActivitySummary"

// Utility functions
import testDownload from "@/utils/testDownload";
import testUpload from "@/utils/testUpload";
import testPing from "@/utils/testPing";
import { addActivity, getActivities, getActivitiesLength, Activity } from "@/utils/activities";

import { useTranslation } from 'react-i18next';
interface Measurement {
    latitude: number,
    longitude: number,
    height?: number | null,
    download_speed: number,
    upload_speed: number,
    ping: number
}

export default function Home() {
    const { t } = useTranslation();

    // Listen for network related changes
    const networkState = useNetworkState();

    // State declarations
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [messageVisible, setMessageVisible] = useState<boolean>(false);
    const [actvityDetailsVisible, setActivityDetailsVisible] = useState<boolean>(false)

    const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
    const [uploadSpeed, setUploadSpeed] = useState<number>(0);
    const [ping, setPing] = useState<number>(0);

    const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false);
    const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);
    const [isPingLoading, setIsPingLoading] = useState<boolean>(false);
    
    const [isEduroamConnected, setIsEduroamConnected] = useState<boolean>(false);
    const [currentIP, setCurrentIP] = useState<string>("")
    const [networkInfo, setNetworkInfo] = useState<string>("")

    const [isTestLoading, setIsTestLoading] = useState<boolean>(false);

    const [activities, setActivities] = useState<Activity[]>([]);


    // Animation scale declarations
    const scaleInfo = useRef(new Animated.Value(1)).current;
    const scaleConnect = useRef(new Animated.Value(1)).current;
    const scaleScan = useRef(new Animated.Value(1)).current;
    const scaleRefresh = useRef(new Animated.Value(1)).current;

    // Refs
    const isTestRefreshed = useRef(false);
    const wasIPWarningShown = useRef(false);
    const networkType = useRef<Network.NetworkStateType | undefined>(networkState.type)

    // Ask for location permission first time only
    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            return;
        }) ();
    }, [])

    // Get ip address every 5 seconds
    useEffect(() => {
        const interval = setInterval(async () => {
            const ip = await Network.getIpAddressAsync();
            console.log(ip)
            setCurrentIP(ip);
            
            if(ip.startsWith('10.182')) {
                setNetworkInfo("Eduroam")
                setIsEduroamConnected(true)
                wasIPWarningShown.current = false
            }
            else {
                setNetworkInfo(t('network.not_connected'))
                setIsEduroamConnected(false)

                if (!wasIPWarningShown.current) {
                    openMessage();
                    wasIPWarningShown.current = true
                }
            }
            
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    
    // Get activities on first render
    useEffect(() => {
        (async () => {
            const activities = await getActivities();
            const sortedActivities = activities.sort(
                (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
            setActivities(sortedActivities)
            return;
        }) ();
    }, [])

    Network.addNetworkStateListener(({type}) => {
        console.log(type)
        if(type !== Network.NetworkStateType.WIFI) {
            openMessage();
        }
        
        networkType.current = type;
    });

    // Modal related methods
    const openModal = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        setModalVisible(true)
    }

    const closeModal = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        setModalVisible(false)
    }

    const openMessage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        setMessageVisible(true)
    }

    const closeMessage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        setMessageVisible(false)
    }

    const testNetworkParameters = async () => {

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

        if (!isEduroamConnected || networkState.type !== Network.NetworkStateType.WIFI) {
            Toast.show({
                type: 'error',
                text1: t('network.error_title'),
                text2: t('network.error_message')
            })
        }
        else {
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
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

                Toast.show({
                    type: "success",
                    text1: t('network.success_title'),
                    text2: t('network.success_message')
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
    }

    // TODO: Fix refresh. Add abort to fetch calls
    const onRefreshClick = () => {

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        if (!isTestLoading){
            Toast.show({
                type: "error",
                text1: t('network.refresh_error_title'),
                text2: t('network.refresh_error_message')
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
                text1: t('network.refresh_title'),
                text2: t('network.refresh_message')
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
                <NetworkInfo data={downloadSpeed} label={t('network.download_speed')} color={Colors.light.gradientRight} loading={isDownloadLoading}/>
                <NetworkInfo data={uploadSpeed} label={t('network.upload_speed')} color={Colors.light.gradientRight} loading={isUploadLoading}/>
                <NetworkInfo data={ping} label={t('network.ping')} color={Colors.light.gradientRight} loading={isPingLoading}/>
            </View>

            <View style={styles.networkInfoButtonsContainer}>
                <AnimatedButton scale={scaleInfo} onPress={openMessage} buttonStyles={styles.wifiNameButtonContainer}>
                    <Text
                        style={[ styles.wifiNameButtonText,
                            {
                            color:
                                networkState.type !== Network.NetworkStateType.WIFI
                                    ? Colors.light.indicatorBad
                                    : isEduroamConnected && networkState.type === Network.NetworkStateType.WIFI
                                    ? Colors.light.indicatorInfo
                                    : Colors.light.indicatorMid,
                            }]}
                    >
                        {networkInfo}
                    </Text>
                    
                </AnimatedButton>
                <AnimatedButton scale={scaleConnect} onPress={openModal} buttonStyles={styles.connectButtonContainer}>
                    <Text style={styles.connectButtonText}>{t('network.connect')}</Text>
                </AnimatedButton>
            </View>

            <View style={styles.lastActivitiesHeaderContainer}>
                <Text style={styles.lastActivitiesHeaderText}>
                    {t('network.last_activities')}
                </Text>
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
                            <Text style={styles.quickScanButtonText}>{t('network.testing')}</Text>
                        ): (
                            <Text style={styles.quickScanButtonText}>
                                {t('network.quick_test')}
                            </Text>
                    )}
                </AnimatedButton>
            </View>
            
            {/* Pop-ups */}
            
            { isEduroamConnected && 
                <MessageModal
                    isVisible={messageVisible}
                    onClose={closeMessage}
                    messageType="info"
                    headerText={t('network.connected_header')}
                    mainText={t('network.connected_message')}
                    secondaryText={t('network.connected_secondary', {ip: currentIP})}
                /> }

            { (!isEduroamConnected && networkState.type === Network.NetworkStateType.WIFI) && 
                <MessageModal
                    isVisible={messageVisible}
                    onClose={closeMessage}
                    messageType="warning"
                    headerText={t('network.not_connected_header')}
                    mainText= {t('network.not_connected_message')}
                    secondaryText= {t('network.connected_secondary', {ip: currentIP})}
                /> }
            
            { networkState.type !== Network.NetworkStateType.WIFI && <MessageModal
                isVisible={messageVisible}
                onClose={closeMessage}
                messageType="error"
                headerText={t('network.no_wifi_header')}
                mainText={ t('network.no_wifi_message') }
            /> }
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
    },
})
