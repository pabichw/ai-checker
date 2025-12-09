import React, { useRef } from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSettings } from '../context/SettingsContext';

interface AnimatedScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const AnimatedScreen: React.FC<AnimatedScreenProps> = ({ children, style }) => {
  const { settings } = useSettings()
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0);
      translateY.setValue(10);
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 550,
          useNativeDriver: true,
        }),
      ]).start();
    }, [fadeAnim, translateY])
  );

  return (
    <Animated.View 
      style={[
        styles.container,
        style,
        ...(settings.animationsReduced ? [] : [{
          opacity: fadeAnim,
          transform: [{ translateY }],
        }]),
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,      
  },
});