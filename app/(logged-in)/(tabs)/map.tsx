import { View, Text, StyleSheet} from "react-native";
import MapView, { Circle, LatLng, Marker, Polygon } from "react-native-maps";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import {useState, useCallback} from 'react';
import {Colors} from '@/constants/Colors'

interface measurementPoint {
    center: LatLng,
    id: number,
    color: string
}
 export default function Home() {

    const [region, setRegion] = useState({
        latitude: 51.11226468489964,
        longitude: 17.06031190697346,
        latitudeDelta: 0.02,
        longitudeDelta: 0.015,
      });
    
    const circlesNew: Array<measurementPoint> = []
    const circles: Array<LatLng> = [
        {latitude: 51.109885535541, longitude: 17.0578444319407},
        {latitude: 51.1097173305386, longitude: 17.0578838494119},
        {latitude: 51.1097651325801, longitude: 17.0578726474042},
        {latitude: 51.1098089065624, longitude: 17.0578623893383},
        {latitude: 51.1098853506747, longitude: 17.0578444750697},
        {latitude: 51.1098854354099, longitude: 17.0578444553189},
        {latitude: 51.1098855352586, longitude: 17.0578444320454},
        {latitude: 51.1096330111722, longitude: 17.0578671830646},
        {latitude: 51.1095966947083, longitude: 17.0578701091536},
        {latitude: 51.1098883228518, longitude: 17.0578436735299},
        {latitude: 51.1098883228836, longitude: 17.0578436736788},
        {latitude: 51.1098883228836, longitude: 17.057843673679},
        {latitude: 51.10959109281, longitude: 17.0578545026188},
        {latitude: 51.109584577362, longitude: 17.0594788525197},
        {latitude: 51.1095588302774, longitude: 17.0596020232794},
        {latitude: 51.1094628649113, longitude: 17.059839360476},
        {latitude: 51.1094529791358, longitude: 17.0598677933606},
        {latitude: 51.1094883636894, longitude: 17.0597442752731},
        {latitude: 51.109350619619, longitude: 17.0603557303135},
        {latitude: 51.109351097583, longitude: 17.060354412529},
        {latitude: 51.1091521684279, longitude: 17.0601689196453},
        {latitude: 51.1091522124498, longitude: 17.0601686768776},
        {latitude: 51.109038957072, longitude: 17.0607990550079},
        {latitude: 51.1089967089809, longitude: 17.0608881830883},
        {latitude: 51.1089384520859, longitude: 17.0610449937924},
        {latitude: 51.1089973392671, longitude: 17.0610121453639},
        {latitude: 51.1091319946945, longitude: 17.0602808208894},
        {latitude: 51.1090019890068, longitude: 17.060561592275},
        {latitude: 51.1093602648455, longitude: 17.0602896012248},
        {latitude: 51.1090022240724, longitude: 17.0605617160948},
        {latitude: 51.1093616655549, longitude: 17.0602892758806},
        {latitude: 51.1089423023871, longitude: 17.0603468271473},
        {latitude: 51.1091626818719, longitude: 17.0601624150932},
        {latitude: 51.1089404422863, longitude: 17.0603468178847},
        {latitude: 51.1089389612968, longitude: 17.0603468114075},
        {latitude: 51.1089370359911, longitude: 17.0603468030009},
        {latitude: 51.1089355116067, longitude: 17.0603467963469},
        {latitude: 51.108934080751, longitude: 17.0603467901011},
        {latitude: 51.1089327395323, longitude: 17.0603467842466},
        {latitude: 51.1089314784717, longitude: 17.0603467787421},
        {latitude: 51.1089584809773, longitude: 17.0610721471373},
        {latitude: 51.1093578980546, longitude: 17.0603138433468},
        {latitude: 51.1091194005418, longitude: 17.0599575028874},
        {latitude: 51.108969438725, longitude: 17.061107785183},
        {latitude: 51.1091403590717, longitude: 17.0601622642808},
        {latitude: 51.1091193895117, longitude: 17.0599576110198},
        {latitude: 51.1089934098821, longitude: 17.0611947436293},
        {latitude: 51.109119487618, longitude: 17.0599573664813},
        {latitude: 51.1091195131101, longitude: 17.0599573224194},
        {latitude: 51.1091194100519, longitude: 17.0599574999106},
        {latitude: 51.10911941, longitude: 17.0599574999999},
        {latitude: 51.10911941, longitude: 17.0599575},
        {latitude: 51.1089217376895, longitude: 17.0603796080257},
        {latitude: 51.1089279913138, longitude: 17.0603466828931},
        {latitude: 51.1089262335401, longitude: 17.0603465411448},
        {latitude: 51.1089239973027, longitude: 17.0603464908701},
        {latitude: 51.108923232623, longitude: 17.0603466797373},
        {latitude: 51.1089225830622, longitude: 17.0603467193153},
        {latitude: 51.1092328752649, longitude: 17.0600261757828},
        {latitude: 51.1093487219119, longitude: 17.0603600511319},
        {latitude: 51.1091320742608, longitude: 17.0603161454769},
        {latitude: 51.1088510933734, longitude: 17.0606137762884},
        {latitude: 51.1089680595385, longitude: 17.0605120249571},
        {latitude: 51.1090804343576, longitude: 17.0604707495479},
        {latitude: 51.1089658005544, longitude: 17.0603629817627},
        {latitude: 51.1089471385964, longitude: 17.0603563693096},
        {latitude: 51.1093485269801, longitude: 17.0603604567844},
        {latitude: 51.1092992237785, longitude: 17.0604371378205},
        {latitude: 51.1090747170493, longitude: 17.0604850164126},
        {latitude: 51.1089808286419, longitude: 17.0606970656773},
        {latitude: 51.109046079582, longitude: 17.060588334752},
        {latitude: 51.1090906596837, longitude: 17.0609302811057},
        {latitude: 51.1089782004491, longitude: 17.0611301374334},
        {latitude: 51.1091179827813, longitude: 17.0612816483112},
        {latitude: 51.1093785048832, longitude: 17.0608631805669},
        {latitude: 51.109125855746, longitude: 17.0605382190186},
        {latitude: 51.1088995692944, longitude: 17.0604197513313},
        {latitude: 51.1088386037707, longitude: 17.0602921356457},
        {latitude: 51.1086703226095, longitude: 17.0602246602744},
        {latitude: 51.1088764233756, longitude: 17.0601157698566},
    ]

    for(let i = 0; i<circles.length; i+=1) {
        circlesNew.push({
            center: circles[i],
            id: i,
            color: "#F5424280"
        })
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                region={region}
                cameraZoomRange={{minCenterCoordinateDistance: 200, maxCenterCoordinateDistance: 4000}}
                showsMyLocationButton={true}
                showsUserLocation={true}
            >
                {circlesNew.map((item) => (
                    <Circle key={item.id} center={item.center} radius={4} strokeColor="transparent" fillColor={item.color}/>
                ))}
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