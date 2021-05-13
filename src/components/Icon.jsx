import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";

const Icon = ({ name, text, style, size = 28, backgroundColor, color = colors.medium, onPress }) => {
  return (
    <View style={[styles.container, style, backgroundColor ? 
      { backgroundColor, borderRadius: size, height: size * 2, width: size * 2 } 
    : 
      null 
    ]}>
      <TouchableOpacity onPress={onPress}>
        {name && <MaterialCommunityIcons name={name} color={color} size={size} />}
        {text && 
          <View style={[ styles.container, { borderColor: color, borderRadius: size, borderWidth: 1, height: 2 * size, width: 2 * size } ]}>
            <AppText style={{ color, fontSize: size }}>{text}</AppText>
          </View>
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Icon;