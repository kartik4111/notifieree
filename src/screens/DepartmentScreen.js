import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

import { firebase } from "../api/client";
import deptApi from "../api/depts";
import utilsApi from "../api/utils";
import AppText from '../components/AppText';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import Loader from '../components/Loader';
import Screen from '../components/Screen';
import colors from '../config/colors';
import useAuth from '../hooks/useAuth';

const DepartmentScreen = (props) => {
  const { user, setUser } = useAuth();
  const [allDepts, setAllDepts] = useState();
  const [depts, setDepts] = useState();
  const [loading, setLoading] = useState(true);
  const [pendingDepts, setPendingDepts] = useState();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    loadData();
  }, [modal]);

  const loadData = async () => {
    setLoading(true);

    const allDepts = await deptApi.getAll(user.collegeId);
    firebase.firestore().collection("users").doc(user.id).get()
      .then(doc => setUser({ id: doc.id, ...doc.data() }))
      .catch(error => console.log(error));

    if (user.depts && user.depts.length) {
      setAllDepts(allDepts.filter(dept => !user.depts.includes(dept.id)));
      setDepts(allDepts.filter(dept => user.depts.includes(dept.id)));
    }
    else {
    setAllDepts(allDepts);
    setDepts();
    }
    
    const pendingDepts = await deptApi.getPending(user.id);
    if (pendingDepts)
      setPendingDepts(allDepts.filter(dept => pendingDepts.includes(dept.id)));
    else setPendingDepts();

    setLoading(false);
  };

  const keyExtractor = useCallback((item) => item.id, []);  

  const renderAllDepts = useCallback(({ item }) => {
    return (
      <ListItem title={item.name} backgroundColor={item.iconColor} icon={item.icon} iconColor={colors.light} iconSize={30} onPress={() => sendRequest(item.id)} />
    );
  }, []); 
  
  const renderDepts = useCallback(({ item }) => {
    return (
      <ListItem title={item.name} backgroundColor={item.iconColor} icon={item.icon} iconColor={colors.light} iconSize={30} />
    );
  }, []);
  
  const renderPendingDepts = useCallback(({ item }) => {
    return (
      <ListItem title={item.name} backgroundColor={item.iconColor} icon={item.icon} iconColor={colors.light} iconSize={30} opacity={0.5} />
    );
  }, []);

  const sendRequest = async (id) => {
    let flag = 0;
    if (depts) 
      depts.forEach(dept => {
        if (dept.id === id) flag = 1;
      });

    if (!flag) await utilsApi.sendRequest(user.id, { "deptId": id });
    setModal(false);
  };

  if (loading) return <Loader />

  return (
    <Screen>
      {!depts && !pendingDepts && (
        <View style={styles.empty}>
          <AppText style={styles.emptyText}>You haven't set up depts yet</AppText>
        </View>
      )}   
      <Modal visible={modal} animationType="slide">
        <Screen style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => setModal(false)}>
            <AppText style={{ color: colors.primary }}>Close</AppText>
          </TouchableOpacity>
          <ListItemSeparator />
          <FlatList
            style={{ width: "100%"}}
            data={allDepts}
            keyExtractor={keyExtractor}
            renderItem={renderAllDepts}
          />
        </Screen>
      </Modal>
      {depts && (
        <>
          <AppText>Departments</AppText>
          <FlatList
            style={{ width: "100%"}}
            data={depts}
            keyExtractor={keyExtractor}
            renderItem={renderDepts}
          /> 
        </>
      )}
      {pendingDepts && (
        <>
          <AppText>Pending Departments</AppText>
          <FlatList
            style={{ width: "100%"}}
            data={pendingDepts}
            keyExtractor={keyExtractor}
            renderItem={renderPendingDepts}
          /> 
        </>
      )}
      <Icon name="plus" style={styles.add} color={colors.light} backgroundColor={colors.primary} size={30} onPress={() => setModal(true)} />
    </Screen>
  );    
};

const styles = StyleSheet.create({
  add: {
    bottom: 20,
    position: "absolute",
    right: 20
  },
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

export default DepartmentScreen;
