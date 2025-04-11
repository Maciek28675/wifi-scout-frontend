import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router'; 

export default function TabsLayout() {
  return (
      <Tabs
        screenOptions={{
          headerShown: false, 
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: 'Home',
            title: 'Home',
            headerLeft: () => <></>,
            tabBarIcon: () => (
              <Ionicons name="home" size={24} color={'white'} />
            ),
            tabBarLabel: 'Home',
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: 'Map',
            title: 'Map',
            tabBarIcon: () => (
              <Ionicons name="map" size={24} color={'white'} />
            ),
            tabBarLabel: 'Map',
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: 'Forum',
            title: 'Forum',
            tabBarIcon: () => (
              <Ionicons name="people" size={24} color={'white'} />
            ),
            tabBarLabel: 'Forum',
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: 'Settings',
            title: 'Settings',
            tabBarIcon: () => (
              <Ionicons name="settings" size={24} color={'white'} />
            ),
            tabBarLabel: 'Settings',
          }}
        />
      </Tabs>
  );
};