import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import Icon from "./Icon";

const Card = ({ text, totalCards, iconName, iconColor, size, onPress }) => {
  const dimension = (Dimensions.get("window").width - 70) / totalCards;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { height: dimension, width: dimension }]}>
        {iconName && <Icon name={iconName} color={iconColor} size={size} onPress={onPress} />} 
        <AppText style={styles.iconText} numberOfLines={1}>{text}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.medium,
    justifyContent: "center",
    margin: 5,
  },

  iconText: {
    color: colors.dark,
    fontSize: 20,
    opacity: 0.7,
    textAlign: "center",
    width: "80%"
  }
});

export default Card;