import { View, Text, StyleSheet} from "react-native";
import MapView, { LatLng, Marker, Polygon } from "react-native-maps";
import {useState} from 'react';

 export default function Home() {

    const [region, setRegion] = useState({
        latitude: 51.11226468489964,
        longitude: 17.06031190697346,
        latitudeDelta: 0.02,
        longitudeDelta: 0.015,
      });
    
    const polygonCoordinates: Array<LatLng> = [
        {latitude: 51.10914573034624, longitude: 17.057690214817374},
        {latitude: 51.109239504214884, longitude: 17.058009558991756},
        {latitude: 51.108192317071946, longitude: 17.058752034197195},
        {latitude: 51.108106895295045, longitude: 17.05844067362715},
    ]
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                region={region}
                cameraZoomRange={{minCenterCoordinateDistance: 200, maxCenterCoordinateDistance: 4000}}
                showsMyLocationButton={true}
            >
                <Polygon coordinates={polygonCoordinates} fillColor="#db424280" strokeColor="#b33434" strokeWidth={2}></Polygon>
            </MapView>
        </View>
    )
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    }
})