import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserLoginScreen from "./app/screen/auth/UserLoginScreen";
import ShopTab from "./app/screen/shop/ShopTab";
import RegistrationScreen from "./app/screen/auth/RegistrationScreen";
import QrCodeScreen from "./app/screen/auth/QrCodeScreen";
import ProgramEhlel from "./app/screen/Zaawar/ProgramEhlel";
import SendPasswordResetEmailScreen from "./app/screen/auth/SendPasswordResetEmailScreen";
import UserPanelTab from "./app/screen/UserPanelTab";
import { store } from "./app/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#5ACBF6" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="Нэвтрэх"
          component={UserLoginScreen}
          options={{ title: "Нэвтрэх" }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: "Registration", headerBackVisible: false }}
        />
        <Stack.Screen
          name="SendPasswordResetEmail"
          component={SendPasswordResetEmailScreen}
          options={{ title: "Нууц үг сэргээх" }}
        />
        <Stack.Screen
          name="ShopTab"
          component={ShopTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserPanelTab"
          component={UserPanelTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QrCodeScreen"
          component={QrCodeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProgramEhlel"
          component={ProgramEhlel}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
