// External
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
  SafeAreaView,
  Platform
} from 'react-native';
import "@/app/i18n";
import { useTranslation } from 'react-i18next';

// Constants
import { Colors } from '@/constants/Colors';

// Internal components
import { MoonIcon, SunIcon, GlobeAltIcon } from 'react-native-heroicons/outline';

export default function Settings() {

  const [isDark, setIsDark] = useState(false);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = () => {
    if (i18n.language.startsWith('pl')) {
      i18n.changeLanguage('en-US');
    } else {
      i18n.changeLanguage('pl-PL');
    }
  };

  const currentLangLabel = i18n.language.startsWith('pl') ? 'Polski' : 'English';


  return (
    <SafeAreaView style={styles.container}>

      {/* Nagłówek */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{t("settings.app_settings")}</Text>
      </View>

      {/* Motyw do wyboru */}
      <View style={styles.row}>
        {isDark ? <MoonIcon size={24} color={Colors.light.indicatorInfo}/> :
                  <SunIcon size={24} color={Colors.light.indicatorInfo}/> }
        <Text style={styles.rowLabel}>{t("settings.night_mode")}</Text>
        <Switch
          value={isDark}
          onValueChange={() => setIsDark(!isDark)}
          thumbColor={isDark ? Colors.light.gradientLeft : '#f4f3f4'}
          trackColor={{ false: '#cbcacc', true: '#cbcacc'}}
        />
      </View>

      {/* Język do wyboru */}
      <Pressable style={styles.row} onPress={handleLanguageChange}>
        <GlobeAltIcon size={24} color={Colors.light.indicatorInfo}/>
        <Text style={styles.rowLabel}>{t('settings.language')}</Text>
        <Text style={styles.rowValue}>{currentLangLabel}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 25 : 0
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
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
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

  sectionHeader: {
    marginVertical: 24,
  },
  sectionHeaderText: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 28
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
    elevation: 2,
  },
  rowLabel: { flex: 1, marginLeft: 12, fontSize: 16, fontWeight: '600' },
  rowValue: { fontSize: 14, fontWeight: '600', color: Colors.light.indicatorInfo },
});
