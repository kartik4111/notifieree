import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';

import AppText from './AppText';

const Error = ({ error }) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.error}>{error}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f2dede",
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 10,
    padding: 10,
    width: "100%"
  },
  error: {
    color: colors.error,
    fontSize: 15
  }
});

export default Error;