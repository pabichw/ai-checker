import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { AnimatedScreen } from '../../components/AnimatedScreen';
import { searchHistoryService } from '../../services/searchHistoryService';
import { SearchHistoryItem } from '../../types/search';
import { styles } from './SearchHistoryScreen.style';
import { formatMoney } from '../../utils/money';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export const SearchHistoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await searchHistoryService.getHistory();
      setHistory(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load search history');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const renderItem = ({ item }: { item: SearchHistoryItem }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => navigation.navigate('SearchDetails', { item })}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.result.name}
        </Text>
        <Text>
          {item.result.ai_indicator * 100}%
        </Text>
        <Text style={styles.itemDate}>{formatDate(item.timestamp)}</Text>
      </View>
      <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />

    </TouchableOpacity>
  );

  if (loading) {
    return (
      <AnimatedScreen>
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Loading...</Text>
        </View>
      </AnimatedScreen>
    );
  }

  if (history.length === 0) {
    return (
      <AnimatedScreen>
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No search history yet</Text>
          <Text style={styles.emptySubtext}>Your ai checkers will appear here</Text>
        </View>
      </AnimatedScreen>
    );
  }

  return (
    <AnimatedScreen>
      <View style={styles.container}>
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </AnimatedScreen>
  );
};
