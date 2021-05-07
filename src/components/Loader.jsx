import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../config/colors';
import Screen from './Screen';

const Loader = () => {
  return (
    <Screen style={styles.loader}>
      <ActivityIndicator animating size={50} color={colors.primary} />    
    </Screen>
  );
};

const styles = StyleSheet.create({
  loader: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});

export default Loader;