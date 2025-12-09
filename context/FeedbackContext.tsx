import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface FeedbackContextValue {
  showFeedback: () => void;
  hideFeedback: () => void;
  isFeedbackVisible: boolean;
  lastFeedBackTimestamp: number | null;
}

const FEEDBACK_TIMESTAMP_KEY = '@feedback_timestamp';

const FeedbackContext = createContext<FeedbackContextValue | undefined>(undefined);

interface FeedbackProviderProps {
  children: React.ReactNode;
}

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({ children }) => {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [lastFeedBackTimestamp, setLastFeedBackTimestamp] = useState<number | null>(null);

  useEffect(() => {
    const loadTimestamp = async () => {
      try {
        const timestamp = await AsyncStorage.getItem(FEEDBACK_TIMESTAMP_KEY);
        if (timestamp) {
          setLastFeedBackTimestamp(Number(timestamp));
          console.log('Last feedback timestamp:', timestamp);
        }
      } catch (error) {
        console.error('Error loading feedback timestamp:', error);
      }
    };
    
    loadTimestamp();
  }, []);

  const showFeedback = useCallback(() => {
    setIsFeedbackVisible(true);
    setTimestamp();
  }, []);

  const hideFeedback = useCallback(() => {
    setIsFeedbackVisible(false);
  }, []);

  const setTimestamp = useCallback(() => {
    const now = Date.now();
    setLastFeedBackTimestamp(now);
    AsyncStorage.setItem(FEEDBACK_TIMESTAMP_KEY, now.toString());
  }, []);

  const value: FeedbackContextValue = {
    lastFeedBackTimestamp,
    showFeedback,
    hideFeedback,
    isFeedbackVisible,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = (): FeedbackContextValue => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
