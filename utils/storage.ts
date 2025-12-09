// storage.ts
// Utility for persisting tracks and user preferences using AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for different data types
const TRACKS_KEY = 'user_tracks';
const VOLUMES_KEY = 'user_volumes';
const SETTINGS_KEY = 'user_settings';
// In the future, add more keys for preferences

export async function saveTracks(tracks: any[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TRACKS_KEY, JSON.stringify(tracks));
  } catch (e) {
    console.error('Failed to save tracks', e);
    throw e;
  }
}

export async function loadTracks(): Promise<any[]> {
  try {
    const json = await AsyncStorage.getItem(TRACKS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to load tracks', e);
    return [];
  }
}

export async function saveVolumes(volumes: Record<number, number>): Promise<void> {
  try {
    await AsyncStorage.setItem(VOLUMES_KEY, JSON.stringify(volumes));
  } catch (e) {
    console.error('Failed to save volumes', e);
    throw e;
  }
}

export async function loadVolumes(): Promise<Record<number, number>> {
  try {
    const json = await AsyncStorage.getItem(VOLUMES_KEY);
    return json ? JSON.parse(json) : {};
  } catch (e) {
    console.error('Failed to load volumes', e);
    return {};
  }
}

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
