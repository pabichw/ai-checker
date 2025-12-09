import React from 'react';
import { View, Text, Image, ScrollView, Linking, Alert } from 'react-native';
import { AnimatedScreen } from '../../components/AnimatedScreen';
import { SearchHistoryItem } from '../../types/search';
import { styles } from './SearchDetailsScreen.style';
import { formatMoney } from '../../utils/money';
import Button from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { searchHistoryService } from '../../services/searchHistoryService';

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
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUri }} style={styles.image} />
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.productName}>{item.result.name}</Text>

          <View style={styles.priceSection}>
            <View style={styles.mostLikelyPriceContainer}>
              <Text style={styles.mostLikelyLabel}>Est. Price</Text>
              <Text style={styles.mostLikelyPrice}>
                {formatMoney(item.result.price?.most_likely, item.result.price?.currency)}
              </Text>
            </View>
            <Text style={styles.priceLabel}>Price Range</Text>
            <View style={styles.priceRow}>
              <View style={styles.priceBox}>
                <Text style={styles.priceBoxLabel}>Min</Text>
                <Text style={styles.priceValue}>
                  {formatMoney(item.result.price?.min, item.result.price?.currency)}
                </Text>
              </View>
              <View style={styles.priceBox}>
                <Text style={styles.priceBoxLabel}>Max</Text>
                <Text style={styles.priceValue}>
                  {formatMoney(item.result.price?.max, item.result.price?.currency)}
                </Text>
              </View>
              <View style={styles.priceBox}>
                <Text style={styles.priceBoxLabel}>Confidence</Text>
                <Text style={[styles.priceValue, { color: `hsl(${item.result.confidence * 110}, 100%, 40%)` }]}>
                  {(item.result.confidence * 100).toFixed(0)}%
                </Text>
              </View>
            </View>
            {item.result?.locale && <Text style={styles.tip}>Note: Price estimate localized for your region.</Text>}
          </View>

          <View style={styles.metaSection}>
            <Text style={styles.metaLabel}>Searched on</Text>
            <Text style={styles.metaValue}>{formatDate(item.timestamp)}</Text>
          </View>


          <View style={styles.actions}>
            <Button type="secondary" onPress={() => Linking.openURL(item.result.amazon_link)}>
              Check on Amazon
            </Button>
            <Button  onPress={handleDelete}>
              Delete from History
            </Button>
          </View>
        </View>
      </ScrollView>
    </AnimatedScreen>
  );
};
