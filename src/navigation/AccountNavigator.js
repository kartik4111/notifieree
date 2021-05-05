import React from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import DepartmentScreen from "../screens/DepartmentScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
  screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerStyle: { elevation: 0 },
      headerTitleStyle: { fontSize: 22 }
    }}
  >
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Departments" component={DepartmentScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
