import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface UseFadeInOptions {
  delay?: number;
  duration?: number;
  initYPos?: number;
  visible?: boolean;
  resetOnHide?: boolean;
}

export const useFadeIn = (options: UseFadeInOptions = {}) => {
    const { delay = 0, duration = 1000, initYPos = 15, visible = true, resetOnHide = false } = options;

    const opacityAnimRef = useRef(new Animated.Value(visible ? 0 : (resetOnHide ? 0 : 1)));
    const transYAnimRef = useRef(new Animated.Value(visible ? initYPos : (resetOnHide ? 0 : initYPos)));

    useEffect(() => {
        if (visible) {
            opacityAnimRef.current.setValue(0);
            transYAnimRef.current.setValue(initYPos);
            
            Animated.timing(opacityAnimRef.current, {
                toValue: 1,
                duration,
                delay,
                useNativeDriver: true,
            }).start();

            Animated.timing(transYAnimRef.current, {
                toValue: 0,
                duration,
                delay,
                useNativeDriver: true,
            }).start();
        } else if (resetOnHide) {
            opacityAnimRef.current.setValue(0);
            transYAnimRef.current.setValue(initYPos);
        }
    }, [visible, duration, delay, resetOnHide]);

    return {
        opacity: opacityAnimRef.current,
        transform: [{ translateY: transYAnimRef.current }]
    }
}