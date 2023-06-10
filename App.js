import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ToastProvider } from "react-native-toast-notifications";

import ChatRoom from "./components/chat-room";
import Settings from "./components/settings";
import LoginForm from "./components/auth/login-form";
import RegisterForm from "./components/auth/register-form";
import TopNews from "./components/top-news";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="Register" component={RegisterForm} />
          <Stack.Screen name="Top" component={TopNews} />
          <Stack.Screen name="Chat" component={ChatRoom} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}
