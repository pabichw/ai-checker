import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const NOTIFICATION_PREFERENCE_KEY = '@meditation_notification_enabled';
const STORAGE_KEY = '@meditation_sessions';
const NOTIFICATION_IDENTIFIER = 'daily-meditation-reminder';

// Configure notification handler - checks if meditation was completed before showing
Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    // Check if this is the daily reminder notification
    if (notification.request.content.data?.type === 'daily-reminder') {
      // Check if today's meditation was completed
      const completed = await notificationService.checkIfTodayCompleted();

      // Only show notification if meditation was NOT completed
      if (completed) {
        return {
          shouldShowAlert: false,
          shouldPlaySound: false,
          shouldSetBadge: false,
        };
      }
    }

    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

interface MeditationSession {
  date: string;
}

export const notificationService = {
  async requestPermissions(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  },

  async checkIfTodayCompleted(): Promise<boolean> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (!data) return false;

      const sessions: MeditationSession[] = JSON.parse(data);
      const today = new Date().toISOString().split('T')[0];
      return sessions.some(session => session.date === today);
    } catch (error) {
      console.error('Error checking completion:', error);
      return false;
    }
  },

  async scheduleEndOfDayNotification(): Promise<void> {
    // Cancel any existing scheduled notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🧘 Meditation Reminder',
        body: "You haven't completed your meditation today. Take a moment to practice mindfulness.",
        sound: true,
        data: { type: 'daily-reminder' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour: 20,
        minute: 0,
        repeats: true,
      },
      identifier: NOTIFICATION_IDENTIFIER,
    });
  },

  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },

  async isNotificationEnabled(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(NOTIFICATION_PREFERENCE_KEY);
      return value === 'true';
    } catch (error) {
      console.error('Error reading notification preference:', error);
      return false;
    }
  },

  async setNotificationEnabled(enabled: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(NOTIFICATION_PREFERENCE_KEY, enabled.toString());

      if (enabled) {
        const hasPermission = await this.requestPermissions();
        if (hasPermission) {
          await this.scheduleEndOfDayNotification();
        } else {
          // If permission denied, disable the preference
          await AsyncStorage.setItem(NOTIFICATION_PREFERENCE_KEY, 'false');
          throw new Error('Notification permission denied');
        }
      } else {
        await this.cancelAllNotifications();
      }
    } catch (error) {
      console.error('Error setting notification preference:', error);
      throw error;
    }
  },
};
