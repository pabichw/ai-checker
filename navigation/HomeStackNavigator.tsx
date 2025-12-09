import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import TutorialScreen from '../screens/Tutorial/TutorialScreen';
import FAQScreen from '../screens/FAQ/FAQScreen';

const HomeStack = createNativeStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerTitleStyle: { fontWeight: 'bold' } }}>
      <HomeStack.Screen name="Scanner" component={HomeScreen} />
      <HomeStack.Screen name="Tutorial" component={TutorialScreen} options={{ title: 'Photo Tips' }} />
      <HomeStack.Screen name="FAQ" component={FAQScreen} options={{ title: 'FAQ' }} />
    </HomeStack.Navigator>
  );
};