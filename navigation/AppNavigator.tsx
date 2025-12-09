import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabNavigator } from './BottomTabNavigator';
import { OnboardingScreen, ONBOARDING_COMPLETED_KEY } from '../screens/Onboarding/OnboardingScreen';
import { View } from 'react-native';
import { styles } from '../styles/App.styles';
import { colors } from '../config/styles';

const Stack = createNativeStackNavigator();

const MainAppScreen = () => (
  <View style={styles.container}>
    <BottomTabNavigator />
  </View>
);

export const AppNavigator = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
      setIsOnboardingComplete(value === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsOnboardingComplete(false);
    }
  };

  const handleOnboardingComplete = () => {
    setIsOnboardingComplete(true);
  };

  if (isOnboardingComplete === null) {
    return null;
  }

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.background,
          text: colors.text,
          border: colors.border,
          notification: colors.primary,
        },
        fonts: {
          regular: 'Inter_400Regular',
          medium: 'Inter_500Medium',
          bold: 'Inter_700Bold',
          heavy: 'Inter_900Black',
        }
      }}
    >
      <Stack.Navigator
        initialRouteName={isOnboardingComplete ? "MainApp" : "Onboarding"}
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 200,
        }}
      >
        <Stack.Screen
          name="Onboarding"
          children={() => <OnboardingScreen onComplete={handleOnboardingComplete} />}
        />
        <Stack.Screen name="MainApp" component={MainAppScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};