import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { firebase } from "../api/client";
import notificationApi from "../api/notifications";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Loader from "../components/Loader";
import Screen from "../components/Screen";
import colors from "../config/colors";
import useAuth from "../hooks/useAuth";

const NotificationScreen = ({ navigation }) => {
  const { user, setUser } = useAuth();
  const [notifications, setNotifications] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const keyExtractor = useCallback((item) => item.nid, []);

  const loadNotifications = useCallback(async () => {
    setLoading(true);

    firebase.firestore().collection("users").doc(user.id).get()
      .then(doc => setUser({ id: doc.id, ...doc.data() }))
      .catch(error=> console.error(error));

    if (user.depts && user.depts.length) {
      const notifications = await notificationApi.get(user.collegeId, user.depts);    
      notifications ? setNotifications(notifications) : setNotifications();
    }

    setLoading(false);
  }, []);

  const renderItem = useCallback(({item}) => (
    <ListItem title={item.title} subtitle={item.body} icon={item.icon} backgroundColor={item.iconColor} iconColor={colors.light} onPress={() => navigation.navigate("NotificationDetail", item)} chevron />
  ), []);  

  if (loading) return <Loader /> 

  return (
    <Screen style={{ alignItems: "center" }}>
      {notifications && (
        <FlatList
          style={{ width: "100%" }}
          showsVerticalScrollIndicator ={false}
          data={notifications}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={loading}
          onRefresh={loadNotifications}
        />
      )}
      {!notifications && (
        <View style={styles.empty}>
          <AppText style={styles.emptyText}>No notifications</AppText>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  emptyText: {
    color: colors.medium,
    textAlign: "center"
  }
});

export default NotificationScreen;
