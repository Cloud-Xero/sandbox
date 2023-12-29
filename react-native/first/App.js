import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screen/HomeScreen";
import { ArticleScreen } from "./screen/ArticleScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ClipScreen } from "./screen/ClipScreen";
import { FontAwesome } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "./store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOption = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    if (route.name === "HomeTab") {
      return <FontAwesome name="home" size={size} color={color} />;
    } else if (route.name === "ClipTab") {
      return <FontAwesome name="bookmark" size={size} color={color} />;
    }
  },
});

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
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOption}>
          <Tab.Screen
            name="HomeTab"
            component={HomeStack}
            options={{ headerShown: false, title: "Home" }}
          />
          <Tab.Screen
            name="ClipTab"
            component={ClipScreen}
            options={{ headerShown: false, title: "Clip" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
