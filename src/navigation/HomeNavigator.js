import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import colors from "../config/colors";
import HomeScreen from "../screens/HomeScreen";
import FileScreen from "../screens/FileScreen";
import NotificationScreen from "../screens/NotificationScreen";
import NotificationDetailScreen from "../screens/NotificationDetailScreen";

const Stack = createStackNavigator();

const HomeNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerStyle: { elevation: 0 },
      headerTitleStyle: { fontSize: 22 },
    }}
  >
    <Stack.Screen
      name="Notifieree"
      component={HomeScreen}
      options={{
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              color={colors.light}
              size={25}
            />
          </TouchableOpacity>
        ),
        headerRightContainerStyle: { marginTop: 7, marginRight: 15 },
      }}
    />
    <Stack.Screen name="Notifications" component={NotificationScreen} />
    <Stack.Screen
      name="NotificationDetail"
      options={{ headerTitle: null }}
      component={NotificationDetailScreen}
    />
    <Stack.Screen
      name="File"
      options={{ headerTitle: null }}
      component={FileScreen}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
