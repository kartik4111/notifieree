import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Switch, View } from "react-native";
import { firebase } from "../api/client";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import ColorSchemeContext from "../context/colorScheme";
import useAuth from "../hooks/useAuth";
import cache from "../utils/cache";

const AccountScreen = ({ navigation }) => {
  const { user, setUser } = useAuth();
  const { colorScheme, setColorScheme } = useContext(ColorSchemeContext);
  const [isEnabled, setIsEnabled] = useState(false);

  const menuItems = [
    {
      title: "Departments",
      icon: {
        name: "domain",
        color: colors.medium,
      },
      onPress: () => navigation.replace("Departments"),
      chevron: true,
    },
    {
      title: "How To Use This App",
      icon: {
        name: "information-outline",
        color: colors.medium,
      },
    },
    {
      title: "Rate Us",
      icon: {
        name: "star",
        color: colors.medium,
      },
    },
    {
      title: "Privacy Policy",
      icon: {
        name: "lock-outline",
        color: colors.medium,
      },
    },
    {
      title: "Sign Out",
      icon: {
        name: "logout-variant",
        color: colors.medium,
      },
      onPress: async () => {
        cache.clear();
        firebase
          .firestore()
          .collection("students")
          .doc(user.id)
          .update({ expoPushToken: "" });
        firebase.auth().signOut();
        setColorScheme("light");
        setUser();
      },
    },
  ];

  return (
    <Screen>
      <ListItem
        title={user.name}
        subtitle={user.universityRollNo}
        iconSize={30}
        iconText={user.name[0]}
        iconColor={colors.primary}
      />
      <ListItemSeparator />
      <View>
        <ListItem title="Dark Mode" icon="brightness-3" />
        <Switch
          trackColor={{ false: colors.medium, true: colors.medium }}
          thumbColor={
            colorScheme === "dark" ? colors.primary : colors.light.background
          }
          style={styles.switch}
          value={colorScheme === "dark" ? true : false}
          onValueChange={() => {
            setColorScheme(colorScheme === "light" ? "dark" : "light");
            cache.store(
              "colorScheme",
              colorScheme === "light" ? "dark" : "light"
            );
          }}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={menuItems}
        keyExtractor={(menuItem) => menuItem.title}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            onPress={item.onPress}
            icon={item.icon.name}
            iconSize={30}
            chevron={item.chevron}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  switch: {
    right: 1,
    top: 17,
    position: "absolute",
  },
});

export default AccountScreen;
