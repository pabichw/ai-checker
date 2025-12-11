import React from 'react';
import { View, Text, Image, ScrollView, Linking, Alert } from 'react-native';
import { AnimatedScreen } from '../../components/AnimatedScreen';
import { SearchHistoryItem } from '../../types/search';
import { styles } from './SearchDetailsScreen.style';
import { formatMoney } from '../../utils/money';
import Button from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { searchHistoryService } from '../../services/searchHistoryService';
import RecognitionResultView from '../../components/RecognitionResultView/RecognitionResultView';

interface SearchDetailsScreenProps {
  route: {
    params: {
      item: SearchHistoryItem;
    };
  };
}

export const SearchDetailsScreen: React.FC<SearchDetailsScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Search',
      'Are you sure you want to delete this search from history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await searchHistoryService.deleteSearch(item.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <AnimatedScreen>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {item.imageUri && <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUri }} style={styles.image} />
        </View>}

        <View style={styles.detailsCard}>
          {item.result.name && <Text style={styles.title}>{item.result.name}</Text>}
          {item.textContent && <Text style={styles.textContent}>{item.textContent}</Text>}
          <View style={styles.mainSection}>
            <RecognitionResultView result={{ ai_indicator: item.result.ai_indicator }} />
          </View>

          <View style={styles.metaSection}>
            <Text style={styles.metaLabel}>Searched on</Text>
            <Text style={styles.metaValue}>{formatDate(item.timestamp)}</Text>
          </View>

          <View style={styles.actions}>
            <Button type="faded" onPress={handleDelete}>
              Delete from History
            </Button>
          </View>
        </View>
      </ScrollView>
    </AnimatedScreen>
  );
};
