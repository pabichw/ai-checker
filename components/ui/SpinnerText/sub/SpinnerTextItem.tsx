import { useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { style } from "../SpinnerText.style";

export default function SpinnerTextItem({ text, isActive, reservedWidth = 90, style: containerStyle, textStyle }: { text: string, isActive: boolean, reservedWidth?: number, style?: StyleProp<ViewStyle>, textStyle?: StyleProp<TextStyle> }) {
    const INIT_Y_POS = 30;
    
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(INIT_Y_POS)).current;

    useEffect(() => {
        if (isActive) {
            // Reset to bottom position first, then slide up to center
            translateYAnim.setValue(INIT_Y_POS);
            
            Animated.parallel([
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.quad)
                }),
                Animated.timing(translateYAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.quad)
                })
            ]).start();
        } else {
            // Slide up and fade out
            Animated.parallel([
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.quad)
                }),
                Animated.timing(translateYAnim, {
                    toValue: -INIT_Y_POS,
                    duration: 500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.quad)
                })
            ]).start();
        }
    }, [isActive]);


    return (
        <View style={[{ width: reservedWidth }, style.container, containerStyle]}>
            <Animated.View 
                style={[
                    { opacity: opacityAnim },
                    { transform: [{ translateY: translateYAnim }] }
                ]}
            >
                <Text style={[style.text, textStyle]}>
                    {text}
                </Text>
            </Animated.View>
        </View>
    )
}