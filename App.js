import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Screens/HomeScreen";
import List from "./Screens/List";
import { Icon } from "react-native-elements";
import HadithList from "./Screens/HadithByCategory";

export default function App() {
  const tab = createBottomTabNavigator();

  const HadithList = ({navigation}) => {
 
    return (
  
    <HadithList/>
)
  }



  const BottomTab = () => {
    return (
      <tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#e3dce3" },
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
              <Icon name="heart" type="font-awesome" color="black" size={40} />
            ),
          }}
          component={List}
        />
      </tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
}
