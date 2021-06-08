import React, { useEffect, useRef, useState } from "react";
import { LogBox, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
LogBox.ignoreLogs(["Setting a timer"]);

import { firebase } from "./src/api/client";
import AuthContext from "./src/auth/context";
import ColorSchemeContext from "./src/context/colorScheme";
import NavigationTheme from "./src/navigation/NavigationTheme";
import AppNavigator from "./src/navigation/AppNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import Loader from "./src/components/Loader";
import cache from "./src/utils/cache";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [colorScheme, setColorScheme] = useState("light");

  useEffect(() => {
    restoreColorScheme();
    restoreUser();
  }, []);

  const restoreColorScheme = async () => {
    const colorScheme = await cache.get("colorScheme");
    colorScheme && setColorScheme(colorScheme);
  };

  const restoreUser = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        const expoPushToken = await cache.get("ExpoPushToken");
        if (!expoPushToken) uploadExpoToken(user.uid);
        firebase
          .firestore()
          .collection("students")
          .doc(user.uid)
          .get()
          .then((doc) => {
            setUser({ id: doc.id, ...doc.data() });
            setLoading(false);
          })
          .catch((error) => console.log(error));
      } else setLoading(false);
    });
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const uploadExpoToken = (uid) => {
    registerForPushNotificationsAsync().then((token) => {
      firebase
        .firestore()
        .collection("students")
        .doc(uid)
        .update({ expoPushToken: token });
      cache.store("ExpoPushToken", token);
    });
  };

  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
        <NavigationContainer theme={NavigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </ColorSchemeContext.Provider>
    </AuthContext.Provider>
  );
}
