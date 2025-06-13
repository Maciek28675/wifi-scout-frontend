// External
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
  SafeAreaView,
} from 'react-native';

// Constants
import { Colors } from '@/constants/Colors';

// Internal components
import { MoonIcon, SunIcon, GlobeAltIcon } from 'react-native-heroicons/outline';

export default function Settings() {
  const email = '272572@student.pwr.edu.pl';          
  const initials = email.slice(0, 2).toUpperCase();

  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<'pl' | 'en'>('pl');

  return (
    <SafeAreaView style={styles.container}>
      {/* User info */}
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View>
          <Text style={styles.name}>{email}</Text>
        </View>
      </View>

      {/* Nagłówek */}
      <Text style={styles.sectionHeaderText}>Ustawienia aplikacji</Text>

      {/* Motyw do wyboru */}
      <View style={styles.row}>
        {isDark ? <MoonIcon size={24} color={Colors.light.indicatorInfo}/> :
                  <SunIcon size={24} color={Colors.light.indicatorInfo}/> }
        <Text style={styles.rowLabel}>Tryb Nocny</Text>
        <Switch
          value={isDark}
          onValueChange={() => setIsDark(!isDark)}
          thumbColor={isDark ? Colors.light.gradientLeft : '#f4f3f4'}
          trackColor={{ false: '#767577', true: Colors.light.gradientRight }}
        />
      </View>

      {/* Język do wyboru */}
      <Pressable style={styles.row} onPress={() => setLang(lang === 'pl' ? 'en' : 'pl')}>
        <GlobeAltIcon size={24} color={Colors.light.indicatorInfo}/>
        <Text style={styles.rowLabel}>Język</Text>
        <Text style={styles.rowValue}>{lang === 'pl' ? 'Polski' : 'English'}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundPrimary,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.gradientLeft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  name:  { fontSize: 16, fontWeight: '600' },

  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#555',
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 12, // przesunięcie od lewej krawędzi
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  rowLabel: { flex: 1, marginLeft: 12, fontSize: 15, fontWeight: '500' },
  rowValue: { fontWeight: '600', color: Colors.light.indicatorInfo },
});
