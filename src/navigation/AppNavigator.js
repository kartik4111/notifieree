import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import HomeNavigator from "./HomeNavigator";
import colors from "../config/colors";

const Tab = createMaterialTopTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    tabBarPosition="bottom"
    tabBarOptions={{
      activeTintColor: colors.primary,
      iconStyle: {
        alignContent: "center",
        flex: 1,
        justifyContent: "center",
      },
      inactiveTintColor: colors.medium,
      showIcon: true,
      showLabel: false,
      tabStyle: { backgroundColor: colors.light },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={27} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={27} />
        ),
      }}
    />
  </Tab.Navigator>
);
export default AppNavigator;
