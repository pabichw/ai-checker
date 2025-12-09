import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { styles } from './SearchFilter.style';
import { useHaptic } from '../../hooks/useHaptic';

export type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high';

interface FilterOption {
    value: SortOption;
    label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
];

interface SearchFilterProps {
    selectedSort: SortOption;
    onSortChange: (sort: SortOption) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ selectedSort, onSortChange }) => {
    const haptic = useHaptic();
    const [expanded, setExpanded] = useState(false);
    const heightAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (expanded) {
            Animated.parallel([
                Animated.spring(heightAnim, {
                    toValue: 1,
                    useNativeDriver: false,
                    friction: 8,
                    tension: 40,
                }),
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.spring(heightAnim, {
                    toValue: 0,
                    useNativeDriver: false,
                    friction: 8,
                    tension: 40,
                }),
                Animated.timing(rotateAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [expanded]);

    const toggleExpanded = () => {
        haptic.impactAsync(haptic.ImpactFeedbackStyle.Light);
        setExpanded(!expanded);
    };

    const handleSelectOption = (option: SortOption) => {
        haptic.impactAsync(haptic.ImpactFeedbackStyle.Medium);
        onSortChange(option);
        setExpanded(false);
    };

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const maxHeight = heightAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, FILTER_OPTIONS.length * 50],
    });

    const selectedLabel = FILTER_OPTIONS.find(opt => opt.value === selectedSort)?.label || 'Sort by';

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={toggleExpanded}
                activeOpacity={0.7}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.headerIcon}>⚙</Text>
                    <Text style={styles.headerText}>{selectedLabel}</Text>
                </View>
                <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                    <Text style={styles.arrow}>▼</Text>
                </Animated.View>
            </TouchableOpacity>

            <Animated.View
                style={[
                    styles.optionsContainer,
                    {
                        maxHeight,
                        opacity: opacityAnim,
                    }
                ]}
            >
                {FILTER_OPTIONS.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={[
                            styles.option,
                            selectedSort === option.value && styles.selectedOption,
                        ]}
                        onPress={() => handleSelectOption(option.value)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                selectedSort === option.value && styles.selectedOptionText,
                            ]}
                        >
                            {option.label}
                        </Text>
                        {selectedSort === option.value && (
                            <Text style={styles.checkmark}>✓</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </Animated.View>
        </View>
    );
};
