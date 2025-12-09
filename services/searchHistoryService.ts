import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchHistoryItem } from '../types/search';

export const SEARCH_HISTORY_KEY = '@price_check_search_history';

class SearchHistoryService {
    async getHistory(): Promise<SearchHistoryItem[]> {
        try {
            const data = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
            if (!data) {
                return [];
            }
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading search history:', error);
            return [];
        }
    }

    async addSearch(item: SearchHistoryItem): Promise<void> {
        try {
            const history = await this.getHistory();
            const updatedHistory = [item, ...history];
            await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
        } catch (error) {
            console.error('Error saving search to history:', error);
            throw error;
        }
    }

    async deleteSearch(id: string): Promise<void> {
        try {
            const history = await this.getHistory();
            const updatedHistory = history.filter(item => item.id !== id);
            await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
        } catch (error) {
            console.error('Error deleting search from history:', error);
            throw error;
        }
    }

    async clearHistory(): Promise<void> {
        try {
            await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
        } catch (error) {
            console.error('Error clearing search history:', error);
            throw error;
        }
    }
}

export const searchHistoryService = new SearchHistoryService();
