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

export default function HomeScreen(){
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>WiFi Scout</Text>
        </View>
        
        {/* Statystyki połączenia*/}
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
        
        {/* Łączenie z Eduroam*/}
        <View style={styles.networkCard}>
          <Text style={styles.networkName}>Eduroam 2.4</Text>
          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Połącz się</Text>
          </TouchableOpacity>
        </View>
        
        {/* Sekcja ostatnich aktywności */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ostatnia Aktywność</Text>
          
          {/* Mocny sygnał */}
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
          
          {/* Średni sygnał */}
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
          
          {/* Słaby sygnał*/}
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, {backgroundColor: '#E53935'}]}>
              <Ionicons name="wifi" size={20} color="white" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Wykryto słaby sygnał</Text>
              <Text style={styles.activitySubtitle}>C-16 Politechnika Wrocławska</Text>
            </View>
            <Text style={styles.activityTime}>21 min temu</Text>
          </View>
        </View>
        
        {/* Szybki wybór */}
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
    </SafeAreaView>
  );
}
