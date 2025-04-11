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
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            tabBarLabel: 'Home',
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            headerTitle: 'Map',
            title: 'Map',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" size={size} color={color} />
            ),
            tabBarLabel: 'Map',
          }}
        />
        <Tabs.Screen
          name="forum"
          options={{
            headerTitle: 'Forum',
            title: 'Forum',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" size={size} color={color} />
            ),
            tabBarLabel: 'Forum',
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerTitle: 'Settings',
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
            tabBarLabel: 'Settings',
          }}
        />
      </Tabs>
  );
};