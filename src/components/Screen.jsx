import React, { useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import colors from "../config/colors";
import ColorSchemeContext from "../context/colorScheme";

const Screen = ({ children, style }) => {
  let backgroundColor;
  const colorSchemeValues = useContext(ColorSchemeContext);
  colorSchemeValues ? 
    backgroundColor = colors[colorSchemeValues.colorScheme].background
    :
    backgroundColor = colors.light.background;

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor }, style]}>
      {children}
      <StatusBar style="light" backgroundColor={colors.primary} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20
  }
});

export default Screen;
