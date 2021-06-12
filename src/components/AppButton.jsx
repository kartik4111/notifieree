import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

const AppButton = ({
  title,
  backgroundColor,
  disabled = false,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, { backgroundColor, opacity: disabled ? 0.5 : undefined }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: colors.dark.text }]}>{title}</Text>
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
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AppButton;
