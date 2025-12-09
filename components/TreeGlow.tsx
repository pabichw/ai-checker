import { useEffect, useRef, useState } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import Svg, { Defs, RadialGradient as SvgRadialGradient, Stop, Circle } from 'react-native-svg';
import { interpolateColor } from '../utils/gradient';
import styles from './TreeGlow.style';

interface TreeGlowProps {
  glowColor: string;
  style?: StyleProp<ViewStyle>;
  levelUpTriggered?: number | null;
  onLevelUpComplete?: () => void;
}

export const TreeGlow: React.FC<TreeGlowProps> = ({ glowColor, style, levelUpTriggered, onLevelUpComplete }) => {
  const [previousGlowColor, setPreviousGlowColor] = useState(glowColor);
  const [animatedGlowColor, setAnimatedGlowColor] = useState(glowColor);
  const [currentOpacity, setCurrentOpacity] = useState(0.2);

  // Animated color value using RN Animated
  const colorProgress = useRef(new Animated.Value(0)).current;

  // Level up animation values
  const opacityAnim = useRef(new Animated.Value(0.2)).current;

  // Animate color change when glow color updates
  useEffect(() => {
    if (previousGlowColor !== glowColor) {
      colorProgress.setValue(0);
      const startColor = previousGlowColor;
      const endColor = glowColor;

      Animated.timing(colorProgress, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start();

      // Manually update color during animation
      const listener = colorProgress.addListener(({ value }) => {
        const interpolated = interpolateColor(startColor, endColor, value);
        setAnimatedGlowColor(interpolated);
      });

      return () => {
        colorProgress.removeListener(listener);
      };
    }
  }, [glowColor, previousGlowColor, colorProgress]);

  // Update previous color when animation completes
  useEffect(() => {
    if (previousGlowColor !== glowColor) {
      const timer = setTimeout(() => {
        setPreviousGlowColor(glowColor);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [glowColor, previousGlowColor]);

  // Level up animation effect
  useEffect(() => {
    if (!Number.isNaN(levelUpTriggered)) {
      // Reset animation values
      opacityAnim.setValue(0.2);

      // Temporarily change to gold color
      // setAnimatedGlowColor('#FFD700'); // Gold color

      // Listen to opacity changes and update state
      const opacityListener = opacityAnim.addListener(({ value }) => {
        setCurrentOpacity(value);
      });

      // Animate scale and opacity
      Animated.sequence([
        // Expand and brighten
        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 0.5,
            duration: 600,
            useNativeDriver: false,
          }),
        ]),
        // Contract back and fade
        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 0.2,
            duration: 600,
            useNativeDriver: false,
          }),
        ]),
      ]).start(() => {
        // Animation complete, restore original color
        setAnimatedGlowColor(glowColor);
        setCurrentOpacity(0.2);
        opacityAnim.removeListener(opacityListener);
        if (onLevelUpComplete) {
          onLevelUpComplete();
        }
      });

      return () => {
        opacityAnim.removeListener(opacityListener);
      };
    }
  }, [levelUpTriggered]);

  return (
    <Svg height="400" width="400" style={[styles.container, style]}>
      <Defs>
        <SvgRadialGradient id="treeGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <Stop offset="0%" stopColor={animatedGlowColor} stopOpacity={currentOpacity} />
          <Stop offset="100%" stopColor={animatedGlowColor} stopOpacity="0" />
        </SvgRadialGradient>
      </Defs>
      <Circle cx="200" cy="200" r="200" fill="url(#treeGlow)" />
    </Svg>
  );
};
