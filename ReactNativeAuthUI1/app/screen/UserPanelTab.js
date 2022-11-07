import { View, Text, Button } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "./DashboardScreen";
import SideBar from "./SideBar";
import ChangePasswordScreen from "./auth/ChangePasswordScreen";
import QrCodeScreen from "./auth/QrCodeScreen";
import ProgramEhlel from "./Zaawar/ProgramEhlel";
import Icon from "react-native-vector-icons/FontAwesome";

const Drawer = createDrawerNavigator();
const UserPanelTab = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideBar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: "#5ACBF6" },
        headerTintColor: "white",
      }}
    >
      <Drawer.Screen name="Эхлэх" component={DashboardScreen} />
      <Drawer.Screen
        name="Qr бүртгэх"
        component={QrCodeScreen}
        options={{ headerTitle: "Qr бараа бүртгэх" }}
      />
      <Drawer.Screen
        name="Нууц үг солих"
        component={ChangePasswordScreen}
        options={{ headerTitle: "Нууц үг солих" }}
      />
    </Drawer.Navigator>
  );
};

export default UserPanelTab;
