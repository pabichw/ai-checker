import * as Haptics from 'expo-haptics';
import { useSettings } from '../context/SettingsContext';

export const useHaptic = () => {
  const { settings } = useSettings();

  const impactAsync = (style: Haptics.ImpactFeedbackStyle) => {
    if (settings.hapticsEnabled) {
      Haptics.impactAsync(style);
    }
  };

  const selectionAsync = () => {
    if (settings.hapticsEnabled) {
      Haptics.selectionAsync();
    }
  };

  const notificationAsync = (type: Haptics.NotificationFeedbackType) => {
    if (settings.hapticsEnabled) {
      Haptics.notificationAsync(type);
    }
  };

  return {
    impactAsync,
    selectionAsync,
    notificationAsync,
    ImpactFeedbackStyle: Haptics.ImpactFeedbackStyle,
    NotificationFeedbackType: Haptics.NotificationFeedbackType,
  };
};
