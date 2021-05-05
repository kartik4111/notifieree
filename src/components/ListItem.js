import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import AppText from "./AppText";
import Icon from "./Icon";
import colors from "../config/colors";

const ListItem = ({ title, subtitle, backgroundColor, onPress = null, renderRightActions, icon, iconText, iconColor, iconSize  = 30, opacity = 1, chevron = false }) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container, {opacity}]}>
          <View style={styles.innerContainer}>
            {icon && <Icon name={icon} color={iconColor} size={iconSize} backgroundColor={backgroundColor} />}
            {iconText && <Icon text={iconText} color={iconColor} size={iconSize} backgroundColor={backgroundColor} />}
            <View style={styles.detailsContainer}>
              {title && <AppText style={styles.title}>{title}</AppText>}
              {subtitle && <AppText style={styles.subtitle} numberOfLines={1}>{subtitle}</AppText>}
            </View>
          </View>
          {chevron && <Icon name="chevron-right" size={iconSize} />}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 20,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  subtitle: {
    color: colors.dark,
    opacity: 0.6,
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    color: colors.dark,
    opacity: 0.7,
  }
});

export default ListItem;
