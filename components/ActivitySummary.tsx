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

const ActivitySummary: React.FC<props> = ({activity}) => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [date, setDate] = useState<Date>()

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
                        Wykryto dobre połączenie
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
                    <Text style={styles.activityDetailsText}>{date?.toLocaleDateString()} {date?.toLocaleTimeString()}</Text>
                    <Text style={styles.activityDetailsText}>Pobieranie: {activity.download_speed} Mbps</Text>
                    <Text style={styles.activityDetailsText}>Wysyłanie: {activity.upload_speed} Mbps</Text>
                    <Text style={styles.activityDetailsText}>Ping: {activity.ping} Ms</Text>
                    <View style={styles.mapWrapper}>
                        <MapView style={styles.map}>
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
    activityDetailsText: {
        fontSize: 13,
        textAlign: 'justify'
    },
    mapWrapper: {
        width: '100%',
        height: 200,
        marginTop: 16,
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 18,
        borderCurve: 'circular'
    }
})

export default ActivitySummary;