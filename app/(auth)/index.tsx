import { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Pressable, Animated } from "react-native";
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Text as SvgText } from 'react-native-svg';
import { Image } from 'expo-image'
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "@/app/i18n";
import { useTranslation } from 'react-i18next';

export default function Index() {
  
  const { t } = useTranslation();
  
  const scaleSignIn = useRef(new Animated.Value(1)).current;

  const nokiaFadeAnim = useRef(new Animated.Value(0)).current;
  const pwrFadeAnim = useRef(new Animated.Value(0)).current;

  const onPressIn = (scaleValue: Animated.Value) => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }

  const onPressOut = (scaleValue: Animated.Value) => {
    Animated.spring(scaleValue, {
      toValue: 1,
      //friction: 3,
      //tension: 40,
      useNativeDriver: true,
    }).start();
  }


  useEffect(() => {
    Animated.sequence([
      Animated.timing(nokiaFadeAnim, {
        toValue: 1,         
        duration: 500,      
        useNativeDriver: true,
      }),
      Animated.timing(pwrFadeAnim, {
        toValue: 1,         
        duration: 500,      
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Svg style={styles.heading}>
          <Defs>
            <SvgGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={Colors.light.gradientLeft} stopOpacity="1" />
              <Stop offset="1" stopColor={Colors.light.gradientRight} stopOpacity="1" />
            </SvgGradient>
          </Defs>
          <SvgText
            fill="url(#grad)"
            fontSize="56"
            fontFamily="Neotriad"
            x="50%"
            y="50%"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            WIFI SCOUT
          </SvgText>
        </Svg>
      </View>
      <View style={styles.logoContainer}>
        <Animated.View style={[styles.logoWrapper, { opacity: nokiaFadeAnim }]}>
          <Image
            source={require('../../assets/images/Nokia-Logo.png')}
            contentFit="contain"
            style={[styles.logoImage, {marginTop: 40}]}
          />
        </Animated.View>
        <Animated.View style={[styles.logoWrapper, {opacity: pwrFadeAnim}]}>
          <Image
            source={require('../../assets/images/logo-pwr.png')}
            contentFit="contain"
            style={[styles.logoImage, {marginBottom: 40}]}
          />
        </Animated.View>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={() => router.push("/(logged-in)/(tabs)")} onPressIn={() => onPressIn(scaleSignIn)} onPressOut={() => onPressOut(scaleSignIn)}>
          <Animated.View style={[styles.gradientButton, {transform: [{scale: scaleSignIn}]}]}>
            <LinearGradient 
              colors={[Colors.light.gradientLeft, Colors.light.gradientRight]}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>{t('auth.login')}</Text>
            </LinearGradient>
          </Animated.View>
          </Pressable>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },

  gradient: {
    height: '100%',
    width: '100%',
  },
  gradientButton: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center'
  },

  headingContainer: {
    flex: 1/3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5'
  },
  heading: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  headingText: {
    color: '#000000',
    fontSize: 64,
    fontFamily: 'Neotriad',
  },

  logoContainer: {
    flex: 1/3,
    justifyContent: 'center',
    //alignItems: 'center',
    //alignContent: 'space-between'
    //backgroundColor: Colors.light.gradientRight
  },
  logoWrapper: {
    flex: 1/2,
    justifyContent: 'center',
    alignItems: 'center',
    //margin: 16
  },
  logoImage: {
    width: '50%',
    height: '100%',
    //resizeMode: 'contain'
  },

  buttonsContainer: {
    flex: 1/3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5'
  },
  button: {
    flex: 1/4,
    width: '80%',
    margin: 8,
  },
  buttonText: {
    color: Colors.light.textPrimary,
    fontWeight: 'bold',
    fontSize: 24
  }
})
