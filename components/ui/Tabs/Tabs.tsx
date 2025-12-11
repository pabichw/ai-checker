import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Animated, LayoutChangeEvent, Dimensions } from 'react-native';
import styles from './Tabs.style';

const { width: screenWidth } = Dimensions.get('window');

export interface Tab {
    key: string;
    label: string;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultTab?: string;
    onTabChange?: (tabKey: string) => void;
}

export default function Tabs({ tabs, defaultTab, onTabChange }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key);
    const [tabWidths, setTabWidths] = useState<number[]>([]);
    const [contentWidth, setContentWidth] = useState(screenWidth);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const contentSlideAnim = useRef(new Animated.Value(0)).current;

    const activeIndex = tabs.findIndex(tab => tab.key === activeTab);

    useEffect(() => {
        const targetPosition = tabWidths.slice(0, activeIndex).reduce((sum, width) => sum + width, 0);

        Animated.spring(slideAnim, {
            toValue: targetPosition,
            useNativeDriver: true,
            tension: 68,
            friction: 12,
        }).start();

        Animated.spring(contentSlideAnim, {
            toValue: -activeIndex * contentWidth,
            useNativeDriver: true,
            tension: 68,
            friction: 12,
        }).start();
    }, [activeIndex, tabWidths, contentWidth]);

    const handleTabPress = (tabKey: string) => {
        setActiveTab(tabKey);
        onTabChange?.(tabKey);
    };

    const handleTabLayout = (index: number) => (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setTabWidths(prev => {
            const newWidths = [...prev];
            newWidths[index] = width;
            return newWidths;
        });
    };

    const handleContentLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setContentWidth(width);
    };

    const indicatorWidth = tabWidths[activeIndex] || 0;

    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={tab.key}
                        style={styles.tab}
                        onPress={() => handleTabPress(tab.key)}
                        onLayout={handleTabLayout(index)}
                        activeOpacity={0.7}
                    >
                        <Text style={[
                            styles.tabLabel,
                            activeTab === tab.key && styles.tabLabelActive
                        ]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
                <Animated.View
                    style={[
                        styles.indicator,
                        {
                            width: indicatorWidth,
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                />
            </View>
            <View style={styles.contentContainer} onLayout={handleContentLayout}>
                <Animated.View
                    style={[
                        styles.contentSlider,
                        {
                            width: contentWidth * tabs.length,
                            transform: [{ translateX: contentSlideAnim }],
                        },
                    ]}
                >
                    {tabs.map(tab => (
                        <View key={tab.key} style={[styles.contentPanel, { width: contentWidth }]}>
                            {tab.content}
                        </View>
                    ))}
                </Animated.View>
            </View>
        </View>
    );
}
