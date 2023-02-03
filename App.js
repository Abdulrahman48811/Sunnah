import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Screens/HomeScreen";
import List from "./Screens/List";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import HadithList from "./Screens/HadithByCategory";
import HadithInfo from "./Screens/HadithInfo";
import NamesOfA from "./Screens/NAMES";
import Ionicons from "react-native-vector-icons/Ionicons";
// import Ionicons from "@expo/vector-icons/Ionicons";
import Favorites from "./Screens/Favorites";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  const tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const MyStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom"
          options={{ headerShown: false }}
          component={BottomTab}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="List"
          options={{ headerShown: false }}
          component={List}
        />
        <Stack.Screen
          name="HadithByCategory"
          options={{ headerShown: false }}
          component={HadithList}
        />
         <Stack.Screen
          name="HadithInfo"
          options={{ headerShown: false }}
          component={HadithInfo}
        />
        <Stack.Screen
        name="Favorites" 
        options={{headerShown:false}}
        component={HadithInfo}/>
        <Stack.Screen
        name="NamesOfA" 
        options={{headerShown:false}}
        component={NamesOfA}/>
       
      </Stack.Navigator>
    );
  };
  const BottomTab = () => {
    return (
      <tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#19A399" },
          headerShown: false,
        }}
      >
        <tab.Screen
          name="Home"
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#00FFEC" },
            tabBarIcon: () => <Ionicons name="home" color="#00FFEC"  size={26}/>,
          }}
          component={HomeScreen}
        />
        <tab.Screen
          name="List"
          options={{
            tabBarLabel: "List",

            tabBarLabelStyle: { color: "#00FFEC" },
            tabBarIcon: () => <Ionicons name="bookmarks" color="#00FFEC" size={26}/>,
          }}
          component={List}
        />
        <tab.Screen
          name="Favorites"
          options={{
            tabBarLabel: "Favorites",
            tabBarLabelStyle: { color: "#00FFEC" },
            tabBarIcon: () => (
              <Ionicons name="heart" color="#00FFEC" size={26}/>
            ),
          }}
          component={Favorites}
        />
      </tab.Navigator>
    );
  };

  //testing github
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}