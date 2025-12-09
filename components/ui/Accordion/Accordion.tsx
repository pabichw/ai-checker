import React, { useState, useRef, useEffect } from 'react';
import { View, Text,  StyleProp, ViewStyle, TextStyle, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { styles } from './Accordion.style';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
    passedStyles?: {
        container?: StyleProp<ViewStyle>,
        header?: StyleProp<ViewStyle>,
        title?: StyleProp<TextStyle>,
        icon?: StyleProp<TextStyle>,
        content?: StyleProp<ViewStyle>,
    }
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, defaultExpanded = false, passedStyles }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const rotateAnim = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(rotateAnim, {
            toValue: expanded ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [expanded]);

    const toggleExpanded = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View style={[styles.container, passedStyles?.container]}>
            <TouchableOpacity
                style={[styles.header, passedStyles?.header]}
                onPress={toggleExpanded}
                activeOpacity={0.7}
            >
                <Text style={[styles.title, passedStyles?.title]}>{title}</Text>
                <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                    <Text style={[styles.icon, passedStyles?.icon]}>▼</Text>
                </Animated.View>
            </TouchableOpacity>
            {expanded && (
                <View style={[styles.content, passedStyles?.content]}>
                    {children}
                </View>
            )}
        </View>
    );
};
