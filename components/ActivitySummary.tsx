import { StyleSheet, View, Text, Pressable, Animated, StyleProp, ViewStyle, TextStyle } from "react-native";
import {MapPinIcon} from 'react-native-heroicons/outline';
import { useState } from "react";
import * as React from 'react';
import { Colors } from "@/constants/Colors";
import { Activity } from "@/utils/activities";
import MessageModal from "./MessageModal";
import MessageModalChildren from "./MessageModalChildren";

interface props {
    activity: Activity
}

const ActivitySummary: React.FC<props> = ({activity}) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const onClick = () => {
        setIsModalVisible(true)
    }
    const onClose = () => {
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
                <Text style={styles.activityDetailsText}>Test</Text>
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
    }
})

export default ActivitySummary;