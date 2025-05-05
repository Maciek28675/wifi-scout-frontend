import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors'
import { LinearGradient } from "expo-linear-gradient";
import { HomeIcon, UserIcon, UserGroupIcon } from 'react-native-heroicons/outline'
import { HomeIcon as HomeIconSolid } from 'react-native-heroicons/solid'
import { UserGroupIcon as UserGroupIconSolid} from "react-native-heroicons/solid";


export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#F5F5F5',
                },
                tabBarActiveTintColor: Colors.light.backgroundPrimary,
                tabBarInactiveTintColor: Colors.light.backgroundPrimary,
                tabBarBackground: () => (
                    <LinearGradient 
                        colors={[Colors.light.gradientLeft, Colors.light.gradientRight]}
                        start={[0, 0]}
                        end={[1, 0]}
                        style={{flex: 1}}
                    />
                ),
            }}
        >
            <Tabs.Screen name="index" options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color, focused}) => 
                    focused ? (
                        <HomeIconSolid color={color} size={24}/>
                    ) : (
                        <HomeIcon color={color} size={24}/>
                    )
            }}/>
            <Tabs.Screen name="map"/>
            <Tabs.Screen name="forum" options={{
                title: 'Forum',
                headerShown: false,
                tabBarIcon: ({color, focused}) => 
                    focused ? (
                        <UserGroupIconSolid color={color} size={24}/>
                    ) : (
                        <UserGroupIcon color={color} size={24}/>
                    )
            }}/>
            <Tabs.Screen name="settings"/>
        </Tabs>
    )
}