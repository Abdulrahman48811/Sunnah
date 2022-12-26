import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/HomeScreen';
import List from './Screens/List';
import { Icon } from 'react-native-elements';


export default function App() {
  const tab = createBottomTabNavigator();

  const BottomTab = () => {
    return (

      <tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: 'black' },
          headerShown: false,



        }} >
        <tab.Screen name='Home' options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: { color: 'white' },
          tabBarIcon: () => (
            <Icon name='home' color='white' size={40} />
          )
        }} component={HomeScreen} />
        <tab.Screen name='List'

          options={
            {
              tabBarLabel: 'List',
              
              tabBarLabelStyle: { color: 'white' },
              tabBarIcon: () => (
                <Icon name='book' color='blue' size={40} />
              )

            }}
          component={List} />
        <tab.Screen name='Favorites'

          options={
            {
              tabBarLabel: 'Favorites',
              tabBarLabelStyle: { color: 'white' },
              tabBarIcon: () => (
                <Icon name='heart' type='font-awesome' color='red' size={40} />
              )

            }}
          component={List} />
      </tab.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>


  );
}

