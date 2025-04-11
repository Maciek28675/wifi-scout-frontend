import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import MapScreen from '../screens/map';
import ForumScreen from '../screens/forum';
import SettingsScreen from '../screens/settings';
import { View, StyleSheet } from 'react-native';

export type RootStackParamList = {
  home: undefined;
  map: undefined;
  forum: undefined;
  settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () =>{
  return (
    <Stack.Navigator 
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="map" component={MapScreen} />
      <Stack.Screen name="forum" component={ForumScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default MainNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});