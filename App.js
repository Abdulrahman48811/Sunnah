import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Screens/HomeScreen";
import List from "./Screens/List";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import HadithList from "./Screens/HadithByCategory";
import HadithInfo from "./Screens/HadithInfo";
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

      </Stack.Navigator>
    );
  };
  const BottomTab = () => {
    return (
      <tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#ddd8ed" },
          headerShown: false,
        }}
      >
        <tab.Screen
          name="Home"
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "black" },
            tabBarIcon: () => <Icon name="home" color="black" size={40} />,
          }}
          component={HomeScreen}
        />
        <tab.Screen
          name="List"
          options={{
            tabBarLabel: "List",

            tabBarLabelStyle: { color: "black" },
            tabBarIcon: () => <Icon name="book" color="black" size={40} />,
          }}
          component={List}
        />
        <tab.Screen
          name="Favorites"
          options={{
            tabBarLabel: "Favorites",
            tabBarLabelStyle: { color: "black" },
            tabBarIcon: () => (
              <Icon name="heart" type="font-awesome" color="black" size={30} />
            ),
          }}
          component={List}
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
