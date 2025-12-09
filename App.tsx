import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PostHogProvider } from 'posthog-react-native'
import * as SplashScreen from 'expo-splash-screen';
import { SettingsProvider } from './context/SettingsContext';
import { FeedbackProvider } from './context/FeedbackContext';
import { PaywallProvider, usePaywall } from './context/PaywallContext';
import { composeProviders } from './utils/providers';
import { FeedbackDialog } from './components/FeedbackDialog';
import { useFeedback } from './context/FeedbackContext';
import { SplashScreen as CustomSplashScreen } from './components/SplashScreen';
import 'react-native-gesture-handler';
import { AppNavigator } from './navigation';
import { OnboardingProvider } from './context/OnboardingContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ONBOARDING_COMPLETED_KEY } from './screens/Onboarding/OnboardingScreen';
import { AppState, AppStateStatus } from 'react-native';

const AppProviders = composeProviders(
  ({children}) => process.env.EXPO_PUBLIC_POSTHOG_ENABLED === 'true' ? 
    <PostHogProvider 
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
      options={{
        host: "https://eu.i.posthog.com",
      }}
    >
      {children}
    </PostHogProvider>
    :
    <>{children}</>,
  SettingsProvider,
  FeedbackProvider,
  PaywallProvider,
  OnboardingProvider
);

const AppContent: React.FC = () => {
  const { isFeedbackVisible, hideFeedback } = useFeedback();
  const { showPaywall, isPro } = usePaywall();
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const foregroundSubscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
      // // Trigger paywall when app comes to foreground for non-pro users
      // console.log('appState', appState, 'nextAppState', nextAppState);
      // if (
      //   appState.match(/active/) &&
      //   (await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY)) === 'true' &&
      //   nextAppState === 'active' &&
      //   !isPro
      // ) {
      //   console.log('Showing paywall for non-pro user');
      //   showPaywall();
      // }

      // setAppState(nextAppState);
    });

    return () => {
      foregroundSubscription.remove();
    };
  }, [isPro, showPaywall]);

  return (
    <>
      <AppNavigator />
      <StatusBar />
      <FeedbackDialog visible={isFeedbackVisible} onClose={hideFeedback} />
    </>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Hide the native Expo splash screen immediately
        await SplashScreen.hideAsync();

        // Show custom splash for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Trigger fade out animation
        setShouldFadeOut(true);
      } catch (e) {
        console.error('Splash error:', e);
      }
    }

    prepare();
  }, []);

  const handleFadeComplete = () => {
    setShowSplash(false);
  };

  return (
    <GestureHandlerRootView>
      {showSplash ? (
        <CustomSplashScreen shouldFadeOut={shouldFadeOut} onAnimationFinish={handleFadeComplete} />
      ) : (
        <AppProviders>
          <AppContent />
        </AppProviders>
      )}
    </GestureHandlerRootView>
  );
}

export default App;
