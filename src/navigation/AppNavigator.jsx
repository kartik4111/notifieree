import React from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import DepartmentScreen from "../screens/DepartmentScreen";
import InageScreen from "../screens/ImageScreen";
import NotificationScreen from "../screens/NotificationScreen";
import NotificationDetailScreen from "../screens/NotificationDetailScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="Notifications"
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerStyle: { elevation: 0 },
      headerTitle: null
    }}
  >
    <Stack.Screen name="Notifications" component={NotificationScreen} />
    <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} />
    <Stack.Screen name="Image" component={InageScreen} />
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Departments" component={DepartmentScreen} />
  </Stack.Navigator>
);

export default AppNavigator;