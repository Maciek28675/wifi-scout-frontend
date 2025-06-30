import { View, Text, StyleSheet, SafeAreaView, Animated, Platform} from "react-native";
import MapView, { Circle, LatLng, Marker, Polygon } from "react-native-maps";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import {useState, useCallback, useEffect, useRef} from 'react';
import {Colors} from '@/constants/Colors'
import AnimatedButton from "@/components/AnimatedButton";
import { clearActivities } from "@/utils/activities";
import MapLegend from "@/components/MapLegend";
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';


interface measurementPoint {
    center: LatLng,
    id: number,
    color: string
}
 export default function Home() {

    // Animation scale declarations
    const scaleLegend = useRef(new Animated.Value(1)).current;
    const scaleUpdate = useRef(new Animated.Value(1)).current;

    const currentNumberOfCircles = useRef<number>(0)

    const [refresh, setRefresh] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [circles, setCircles] = useState<Array<measurementPoint>>([])
    

    const [region, setRegion] = useState({
        latitude: 51.11226468489964,
        longitude: 17.06031190697346,
        latitudeDelta: 0.02,
        longitudeDelta: 0.015,
    });

    const loadMapData = async () => {

        console.log('loadMapData called')

        try {
            
            const url = `${process.env.EXPO_PUBLIC_BACKEND_API_BASE}/measurements/`
            const response = await fetch(url, {method: 'GET'})

            if (!response.ok) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                
                Toast.show({
                    type: "error",
                    text1: 'Błąd podczas zapisu testu',
                    text2: 'Spróbuj ponownie'
                })

                return;
            }

            const result = await response.json()

            const mappedData: measurementPoint[] = result.map((item: any) => ({
                center: {
                    latitude: item.latitude,
                    longitude: item.longitude
                },
                id: item.id,
                color: item.color + '80'
            }));

            setCircles(mappedData);

        } catch (error) {
            console.log('error when fetching measurements: ' + error)
        }
    };

    useEffect(() => {
        loadMapData();
    }, []);

    const onRefresh = () => {
        loadMapData();
    }
    const openModal = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const circlesNew: Array<measurementPoint> = []
    
    const campusBorder: Array<LatLng> = [
        {latitude: 51.10954815964552, longitude: 17.053442314944117},
        {latitude: 51.11116757916416, longitude: 17.060131714221423},
        {latitude: 51.10826305707343, longitude: 17.069286185409084},
        {latitude: 51.1071461177954, longitude: 17.067968688274853},
        {latitude: 51.106678175047165, longitude: 17.065518437329594},
        {latitude: 51.10670656210059, longitude: 17.057539289326748},
        {latitude: 51.10731190287938, longitude: 17.055216253752405},
    ]

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.optionsContainer}>
                <Text style={styles.headerText}>Mapa Eduroam</Text>
                <View style={styles.buttonsContainer}>
                    <AnimatedButton scale={scaleLegend} onPress={openModal} buttonStyles={styles.legendButtonContainer}>
                        <Text style={styles.legendButtonText}>Legenda</Text>
                    </AnimatedButton>
                    <AnimatedButton scale={scaleUpdate} onPress={onRefresh} buttonStyles={styles.updateButtonContainer}>
                        <Text style={styles.updateButtonText}>Odśwież</Text>
                    </AnimatedButton>
                </View>
            </View>
            <View style={styles.mapContainer}>
                <MapView style={styles.map}
                    region={region}
                    cameraZoomRange={{minCenterCoordinateDistance: 200, maxCenterCoordinateDistance: 4000}}
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                >
                    {circles.map((item) => (
                        <Circle key={item.id} center={item.center} radius={5} strokeColor="transparent" fillColor={item.color}/>
                    ))}

                    <Polygon
                        coordinates={campusBorder}
                        strokeWidth={4}
                        strokeColor='#9c1313'
                        fillColor="transparent"
                    />
                </MapView>
            </View>
            <MapLegend isVisible={modalVisible} onClose={closeModal}/>
        </SafeAreaView>
    )
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    mapContainer: {
        flex: 1,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    optionsContainer: {
        marginVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#dbdbdb',
        paddingBottom: 8,
        marginHorizontal: 16
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700'
    },

    legendButtonContainer: {
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
    updateButtonContainer: {
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
    legendButtonText: {
        color: Colors.light.gradientLeft,
        fontSize: 16,
        fontWeight: '600'
    },
    updateButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600'
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 16,
        marginBottom: 8
    }
})