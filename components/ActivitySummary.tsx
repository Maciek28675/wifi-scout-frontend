import { StyleSheet, View, Text, Pressable } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import {MapPinIcon} from 'react-native-heroicons/outline';
import { useState } from "react";
import * as React from 'react';
import { Colors } from "@/constants/Colors";
import { Activity } from "@/utils/activities";
import MessageModal from "./MessageModal";
import MessageModalChildren from "./MessageModalChildren";
import *  as Haptics from 'expo-haptics'
import { Link } from "expo-router";
import { router } from 'expo-router'

interface props {
    activity: Activity
}

interface Messages {
    [key: string]: string;
}

const ActivitySummary: React.FC<props> = ({activity}) => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [date, setDate] = useState<Date>()

    const region = {
        latitude: 51.10917857423356,
        longitude: 17.060385434296492,
        latitudeDelta: 0.005,
        longitudeDelta: 0.01,
    }

    const messages: Messages = {
        '#B22D2D': 'Słabe',
        '#E4A316': 'Średnie',
        '#67B22D': 'Dobre'
    }

    const onClick = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

        setDate(new Date(activity.timestamp))

        setIsModalVisible(true)
    }

    const onClose = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        setIsModalVisible(false)
    }

    return (
        <>
            <Pressable style={styles.container} onPress={onClick}>
                
                <View style={[styles.iconContainer, {backgroundColor: activity.color}]}>
                    <MapPinIcon size={32} color={'#FFF'}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        Wykryto {messages[activity.color]} połączenie
                    </Text>
                    <Text style={styles.subText}>
                        {activity.building}
                    </Text>
                </View>
            </Pressable>

            <MessageModalChildren 
                    isVisible={isModalVisible}
                    onClose={onClose}
                    messageType="info"
                    headerText="Szczegóły testu"
                >
                    <Text style={styles.activityDetailsDate}>{date?.toLocaleDateString()} {date?.toLocaleTimeString()}</Text>

                    <View style={styles.activityDetailsVulesContainer}>
                        <View style={styles.singleValueContainer}>
                            <Text style={styles.activityDetailsValue}>{activity.download_speed}</Text>
                            <Text style={styles.activityDetailsDescriptionText}>Pobieranie</Text>
                        </View>
                        <View style={styles.singleValueContainer}>
                            <Text style={styles.activityDetailsValue}>{activity.upload_speed}</Text>
                            <Text style={styles.activityDetailsDescriptionText}>Wysyłanie</Text>
                        </View>
                        <View style={styles.singleValueContainer}>
                            <Text style={styles.activityDetailsValue}>{activity.ping}</Text>
                            <Text style={styles.activityDetailsDescriptionText}>Ping</Text>
                        </View>
                    </View>

                    <View style={styles.mapWrapper}>
                        <MapView 
                            style={styles.map}
                            region={region}
                            showsUserLocation={true}
                            cameraZoomRange={{minCenterCoordinateDistance: 200, maxCenterCoordinateDistance: 1500}}

                        >
                            <Marker
                                coordinate={{
                                    latitude: activity.latitude,
                                    longitude: activity.longitude
                                }}
                            />
                        </MapView>
                    </View>
            </MessageModalChildren>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        marginHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1,
    },
    iconContainer: {
        padding: 8,
        borderRadius: 8,
        borderCurve: 'continuous',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {
        gap: 4,
        alignItems: 'flex-start',
        marginLeft: 16
    },
    mainText: {
        fontSize: 16
    },
    subText: {
        fontSize: 12,
        color: '#a3a3a3'
    },
    activityDetailsDate: {
        fontSize: 13,
        textAlign: 'justify',
        color: '#B2B2B2'
    },
    activityDetailsValue: {
        fontSize: 16,
        fontWeight: '600'
    },
    activityDetailsVulesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    singleValueContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1/3,
        paddingHorizontal: 8
    },
    activityDetailsDescriptionText: {
        fontSize: 13,
        color: '#B2B2B2'
    },  
    mapWrapper: {
        width: '100%',
        height: 200,
        marginTop: 16,
        borderRadius: 18,
        borderCurve: 'circular',
        overflow: 'hidden'
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 18,
        borderCurve: 'circular'
    }
})

export default ActivitySummary;