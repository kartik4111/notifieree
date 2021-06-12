import React from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import DepartmentScreen from "../screens/DepartmentScreen";
import FileScreen from "../screens/FileScreen";
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
    <Stack.Screen name="File" component={FileScreen} />
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Departments" component={DepartmentScreen} />
  </Stack.Navigator>
);

export default AppNavigator;