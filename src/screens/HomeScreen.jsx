import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Card from "../components/Card";
import colors from "../config/colors";
import AppText from "../components/AppText";
import useAuth from "../hooks/useAuth";
import Screen from "../components/Screen";

const services = [
  {
    title: "Classes",
    icon: {
      name: "library",
      color: colors.medium,
    },
    onPress: () => {}
  },
  {
    title: "Library",
    icon: {
      name: "library",
      color: colors.medium,
    },
    onPress: () => {}
  },
  {
    title: "Coming soon...",
    icon: {
      name: "library",
      color: colors.medium,
    },
    onPress: () => {}
  },
  {
    title: "Coming soon...",
    icon: {
      name: "library",
      color: colors.medium,
    },
    onPress: () => {}
  },
  {
    title: "Coming soon...",
    icon: {
      name: "library",
      color: colors.medium,
    },
    onPress: () => {}
  },
  {
    title: "Coming soon...",
    icon: {
      name: "library",
      color: colors.medium,
    },
    onPress: () => {}
  },
];

const HomeScreen = () => {
  const {user} = useAuth();
  
  return (
    <Screen style={styles.container}>
      <View>
        <AppText style={styles.welcomeText}>Welcome</AppText>
        <AppText style={styles.userText}>{user.name}</AppText>
      </View>
      <View>
        <AppText style={[styles.welcomeText, { marginBottom: 10 }]}>
          Services
        </AppText>
        <FlatList
          data={services}
          numColumns={3}
          keyExtractor={(service) => service.title}
          renderItem={({ item }) => (
            <Card
              text={item.title}
              totalCards={3}
              iconName={item.icon.name} 
              iconColor={item.icon.color} 
              size={35}
              onPress={item.onPress}
            />
          )}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around"
  },
  welcomeText: {
    color: colors.dark,
    opacity: 0.5,
    fontSize: 28,
  },
  userText: {
    color: colors.dark,
    opacity: 0.7,
    fontSize: 54,
  },
});

export default HomeScreen;
