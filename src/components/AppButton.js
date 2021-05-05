import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

const AppButton = ({ title, backgroundColor, color, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style, {backgroundColor}]} onPress={onPress}>
      <Text style={[styles.text, {color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
    width: "100%",
  },
  text: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AppButton;