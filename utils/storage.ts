// storage.ts
// Utility for persisting tracks and user preferences using AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for different data types
const SETTINGS_KEY = 'user_settings';
// In the future, add more keys for preferences

export async function saveSettings(settings: any): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
    throw e;
  }
}

export async function loadSettings(): Promise<any> {
  try {
    const json = await AsyncStorage.getItem(SETTINGS_KEY);
    return json ? JSON.parse(json) : {};
  } catch (e) {
    console.error('Failed to load settings', e);
    return {};
  }
}
