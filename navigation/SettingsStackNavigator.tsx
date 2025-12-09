import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const SettingsStack = createNativeStackNavigator();

export const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerTitleStyle: { fontWeight: 'bold' } }}>
      <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} options={{ title: 'Settings' }} />
      <SettingsStack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </SettingsStack.Navigator>
  );
};
