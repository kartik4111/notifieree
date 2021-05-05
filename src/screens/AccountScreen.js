import React from "react";
import { FlatList } from "react-native";
import { firebase } from "../api/client";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import useAuth from "../hooks/useAuth";
import cache from "../utils/cache";

const AccountScreen = ({ navigation }) => {
  const { user, setUser } = useAuth();
  
  const menuItems = [
    {
      title: "Departments",
      icon: {
        name: "domain",
        color: colors.medium,
      },
      onPress: () => navigation.navigate("Departments"),
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
      title: "Settings",
      icon: {
        name: "settings-outline",
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
        await firebase.firestore().collection("users").doc(user.id).update({ expoPushToken: '' });
        firebase.auth().signOut();
        setUser();
      }
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
      <FlatList
        showsVerticalScrollIndicator ={false}
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

export default AccountScreen;
