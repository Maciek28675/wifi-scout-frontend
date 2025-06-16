import { View, Platform, Pressable } from 'react-native';
import { router, Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors'
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeIcon, MapIcon, UsersIcon, Cog6ToothIcon , PlusCircleIcon} from 'react-native-heroicons/outline'
import { HomeIcon as HomeIconSolid, 
         MapIcon as MapIconSolid, 
         UsersIcon as UsersIconSolid,
         Cog6ToothIcon as Cog6ToothIconSolid, } from 'react-native-heroicons/solid'
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    return (
        <Tabs
            screenOptions={{
                //headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#F5F5F5',
                },
                tabBarActiveTintColor: Colors.light.backgroundPrimary,
                tabBarInactiveTintColor: Colors.light.backgroundPrimary,
                
                tabBarBackground: () => (
                    <View style={{ flex: 1, borderTopWidth: 2, borderTopColor: Colors.light.navbarBorder, overflow: 'hidden'}}>
                        <LinearGradient 
                            colors={[Colors.light.gradientLeft, Colors.light.gradientRight]}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={{flex: 1}}
                        />
                    </View>
                ),
                animation: 'shift',
                tabBarItemStyle: { paddingTop: 4 },
            }}
            
        >
            <Tabs.Screen name="index" options={{
                title: t('tabs.home'),
                headerShown: false,
                tabBarIcon: ({color, focused}) => 
                    focused ? (
                        <HomeIconSolid color={color} size={24}/>
                    ) : (
                        <HomeIcon color={color} size={24}/>
                    ),
                tabBarStyle: {height: 75},
                
            }}/>
            <Tabs.Screen name="map" options={{
                title: t('tabs.map'),
                //headerShown: false,
                tabBarIcon: ({color, focused}) => 
                    focused ? (
                        <MapIconSolid color={color} size={24}/>
                    ) : (
                        <MapIcon color={color} size={24}/>
                    ),
                tabBarStyle: {height: 75},
            }}/>
            <Tabs.Screen name="settings" options={{
                title: t('tabs.settings'),
                headerShown: false,
                tabBarIcon: ({color, focused}) => 
                    focused ? (
                        <Cog6ToothIconSolid color={color} size={24}/>
                    ) : (
                        <Cog6ToothIcon color={color} size={24}/>
                    ),
                tabBarStyle: {height: 75}

            }}/>
        </Tabs>
    )
}