import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavigation from '../components/bottomNavBar';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/MainNavigator';

type MapScreenProps = {
  navigation: NavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'map'>;
};

const MapScreen = ({ navigation }: MapScreenProps) => {  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Map Screen</Text>
        <Text>Under Construction</Text>
      </View>
      <BottomNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MapScreen;