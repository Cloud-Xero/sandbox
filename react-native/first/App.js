import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screen/HomeScreen";
import { ArticleScreen } from "./screen/ArticleScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ClipScreen } from "./screen/ClipScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen name="Article" component={ArticleScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="ClipTab"
          component={ClipScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
