import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/HomeScreen';

export default function App() {
  return (
     <NavigationContainer>
      <HomeScreen />
     </NavigationContainer> 
  );
}

