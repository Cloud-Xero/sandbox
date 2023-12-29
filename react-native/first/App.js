import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screen/HomeScreen";
import { ArticleScreen } from "./screen/ArticleScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen name="Article" component={ArticleScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
