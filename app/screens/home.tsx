// In home.tsx
import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  ScrollView 
} from 'react-native';
import { 
  Ionicons, 
  Feather 
} from '@expo/vector-icons';
import styles from '../styles/homeStyles';
import BottomNavigation from '../components/bottomNavBar';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/MainNavigator';

type HomeScreenProps = {
  navigation: NavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'home'>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>WiFi Scout</Text>
        </View>
        
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, {color: '#4CAF50'}]}>157</Text>
            <Text style={styles.statLabel}>Pobieranie</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, {color: '#E53935'}]}>221</Text>
            <Text style={styles.statLabel}>Wysyłanie</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, {color: '#FFC107'}]}>38</Text>
            <Text style={styles.statLabel}>Opóźnienie</Text>
          </View>
        </View>
        
        {/* WiFi Network Card */}
        <View style={styles.networkCard}>
          <Text style={styles.networkName}>Eduroam 2.4</Text>
          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Połącz się</Text>
          </TouchableOpacity>
        </View>
        
        {/* Recent Activity Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ostatnia Aktywność</Text>
          
          {/* Activity Item - Strong Signal */}
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, {backgroundColor: '#4CAF50'}]}>
              <Ionicons name="wifi" size={20} color="white" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Wykryto silny sygnał</Text>
              <Text style={styles.activitySubtitle}>D-4 Politechnika Wrocławska</Text>
            </View>
            <Text style={styles.activityTime}>2 min temu</Text>
          </View>
          
          {/* Activity Item - Medium Signal */}
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, {backgroundColor: '#FFC107'}]}>
              <Ionicons name="wifi" size={20} color="white" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Wykryto średni sygnał</Text>
              <Text style={styles.activitySubtitle}>B-4 Politechnika Wrocławska</Text>
            </View>
            <Text style={styles.activityTime}>8 min temu</Text>
          </View>
          
          {/* Activity Item - Weak Signal */}
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, {backgroundColor: '#E53935'}]}>
              <Ionicons name="wifi" size={20} color="white" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Wykryto słaby sygnał</Text>
              <Text style={styles.activitySubtitle}>C-16 Politechnika Wrocławska</Text>
            </View>
            <Text style={styles.activityTime}>2 min temu</Text>
          </View>
        </View>
        
        {/* Quick Actions Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Szybkie Czynności</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.quickActionIcon}>
                <Feather name="search" size={24} color="white" />
              </View>
              <Text style={styles.quickActionText}>Szybki Skan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.quickActionIcon}>
                <Feather name="bar-chart-2" size={24} color="white" />
              </View>
              <Text style={styles.quickActionText}>Analiza Sygnału</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom navigation component */}
      <BottomNavigation navigation={navigation} />
    </SafeAreaView>
  );
}

export default HomeScreen;