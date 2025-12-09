import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './FAQFilter.style';

interface FAQFilterProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const FAQFilter: React.FC<FAQFilterProps> = ({
    searchQuery,
    onSearchChange,
}) => {
    return (
        <View style={styles.container}>
            {/* Search Input */}
            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search questions..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={onSearchChange}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => onSearchChange('')}>
                        <Text style={styles.clearIcon}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};
