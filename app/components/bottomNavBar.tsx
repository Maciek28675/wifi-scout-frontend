// filepath: c:\Users\nicwr\Documents\GitHub\wifi-scout-frontend\app\components\bottomNavBar.tsx
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/homeStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/MainNavigator';

type BottomNavProps = {
  navigation?: NavigationProp<RootStackParamList>;
};

const BottomNavigation = ({ navigation: propNavigation }: BottomNavProps) => {
  const hookNavigation = useNavigation<NavigationProp<RootStackParamList>>();
  const navigation = propNavigation || hookNavigation;

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('home')}
        activeOpacity={0.7}
      >
        <Ionicons name="home" size={24} color="white" />
        <Text style={styles.navText}>Główna</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('map')}
        activeOpacity={0.7}
      >
        <Ionicons name="map" size={24} color="white" />
        <Text style={styles.navText}>Mapa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('forum')}
        activeOpacity={0.7}
      >
        <Ionicons name="people" size={24} color="white" />
        <Text style={styles.navText}>Forum</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('settings')}
        activeOpacity={0.7}
      >
        <Ionicons name="settings" size={24} color="white" />
        <Text style={styles.navText}>Ustawienia</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;