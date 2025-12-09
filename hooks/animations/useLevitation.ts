import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

interface UseLevitationOptions {
  duration?: number;
  distance?: number;
}

export const useLevitation = (options: UseLevitationOptions = {}) => {
  const { duration = 3000, distance = 30 } = options;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [duration, animatedValue]);

  const animatedStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [distance, 0],
        }),
      },
    ],
  };

  return animatedStyle;
};
