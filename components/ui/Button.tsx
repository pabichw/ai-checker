import { Animated, Easing, StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { borderRadius, colors, spacing } from "../../config/styles";
import { useEffect, useRef, useState } from "react";
import { useHaptic } from "../../hooks/useHaptic";

interface Props {
    children: React.ReactNode;
    type?: 'primary' | 'secondary' | 'faded' | 'special';
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
    height?: number;
    icon?: React.ReactNode;
    onPress: () => void;
}

export default function Button({type = 'primary' , children, onPress, style, disabled, height = 50, icon}: Props) {
    const haptic = useHaptic();
    const [touchState, setTouchState] = useState<'idle' | 'pressedIn'>('idle'); 

    const top = useRef(new Animated.Value(-5)).current;
    const brightness = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        if (touchState === 'pressedIn') {
            Animated.timing(top, {
                toValue: -1,
                duration: 125,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(top, {
                toValue: -5,
                duration: 80,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }).start();
        }
    }, [touchState])

    useEffect(() => {
        Animated.timing(brightness, {
            toValue: disabled ? 0.5 : 1,
            duration: 125,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start();
    }, [disabled])

    return (
        <TouchableWithoutFeedback 
            onPressIn={() => {
                setTouchState('pressedIn');
                haptic.impactAsync(haptic.ImpactFeedbackStyle.Soft);
            }} 
            onPressOut={() => {
                setTouchState('idle');
                onPress();
            }} 
            disabled={disabled}
        >
            <Animated.View style={[styleSheet({height, type}).container, style, {opacity: brightness}]}>
                <Animated.View
                    style={[
                        styleSheet({height, type}).button, 
                        {transform: [{translateY: top}]}
                    ]}
                >
                    {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
                    <Text style={styleSheet({type}).children}>
                        {children}
                    </Text>
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}


export const styleSheet = ({type = 'primary', height}: { type?: 'primary' | 'secondary' | 'special', height?: number} = {}) => StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor:  COLORS(type).container,
        borderRadius: borderRadius.md,
        width: '100%',
        height
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: COLORS(type).button,
        paddingHorizontal: spacing.xs,
        borderRadius: borderRadius.md,
        inset: 0,
        zIndex: 10,
    },
    disabled: {
        opacity: 0.5,
    },
    children: {
        color: COLORS(type).text,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
}) 

const COLORS = (type: 'primary' | 'secondary' | 'faded' | 'special') => {
    switch (type) {
        case 'primary':
            return {
                text: colors.offwhite,
                container: colors.primaryDark,
                button: colors.primary,
            }
        case 'secondary':
            return {
                text: colors.offwhite,
                container: colors.secondaryDark,
                button: colors.secondary,
            }

        case 'faded':
            return {
                text: colors.text,
                container: 'rgba(180, 180, 180)',
                button: 'rgba(200, 200, 200)',
            };
            
        case 'special':
            return {
                text: colors.offwhite,
                container: colors.goldDark,
                button: colors.gold,
            }
    }
}