import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
  withDelay,
} from 'react-native-reanimated';
import { borderRadius, colors } from '../config/styles';
import { TreeGlow } from './TreeGlow';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationFinish?: () => void;
  shouldFadeOut?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationFinish, shouldFadeOut = false }) => {
  const containerOpacity = useSharedValue(1);
  const logoOpacity = useSharedValue(1);
  const logoScale = useSharedValue(1);

  useEffect(() => {
    // Fade in logo very quickly
    logoOpacity.value = withTiming(1, {
      duration: 150,
      easing: Easing.out(Easing.ease)
    });

    // with delay
    logoScale.value = withDelay(2000, 
      withTiming(5.2, {
        duration: 3000,
        easing: Easing.out(Easing.ease)
      })
    );
  }, []);

  useEffect(() => {
    if (shouldFadeOut) {
      containerOpacity.value = withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.ease)
      }, (finished) => {
        'worklet';
        if (finished && onAnimationFinish) {
          runOnJS(onAnimationFinish)();
        }
      });
    }
  }, [shouldFadeOut, onAnimationFinish]);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{scale: logoScale.value}],
  }));

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <View style={styles.contentContainer}>
        <TreeGlow glowColor={colors.primary} style={styles.glow} />
        <Animated.Image
          source={require('../assets/splash-icon.webp')}
          style={[styles.logo, logoAnimatedStyle]}
        />
        <Text style={styles.title}>AI Checker</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: borderRadius.lg,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transform: [{translateX: -95}, {translateY: -95}, {scale: 1.5}]
  }
});
