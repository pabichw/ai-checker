import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchHistoryScreen } from '../screens/SearchHistory/SearchHistoryScreen';
import { SearchDetailsScreen } from '../screens/SearchDetails/SearchDetailsScreen';

const HistoryStack = createNativeStackNavigator();

export const HistoryStackNavigator = () => {
  return (
    <HistoryStack.Navigator screenOptions={{ headerTitleStyle: { fontWeight: 'bold' } }}>
      <HistoryStack.Screen name="SearchHistory" options={{ title: 'History' }} component={SearchHistoryScreen} />
      <HistoryStack.Screen name="SearchDetails" options={{ title: 'Search Details' }} component={SearchDetailsScreen} />
    </HistoryStack.Navigator>
  );
};
