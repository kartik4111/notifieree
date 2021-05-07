import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/Styles";
import colors from "../config/colors";

const AppTextInput = ({ icon, width, ...otherProps }) => {
  return (
    <View style={[styles.container, width]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={[defaultStyles.text, styles.input]}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 15,
    padding: 10,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1
  }
});

export default AppTextInput;