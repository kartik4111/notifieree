import React, { useContext } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import AppText from "./AppText";
import Icon from "./Icon";
import colors from "../config/colors";
import ColorSchemeContext from "../context/colorScheme";

const ListItem = ({
  title,
  subtitle,
  backgroundColor,
  onPress = null,
  renderRightActions,
  icon,
  iconText,
  iconColor,
  iconSize = 28,
  opacity = 1,
  chevron = false,
}) => {
  const { colorScheme } = useContext(ColorSchemeContext);

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight
        underlayColor={colors[colorScheme].background}
        onPress={onPress}
      >
        <View style={[styles.container, { opacity }]}>
          <View style={styles.innerContainer}>
            {icon && (
              <Icon
                name={icon}
                color={iconColor}
                size={iconSize}
                backgroundColor={backgroundColor}
              />
            )}
            {iconText && (
              <Icon
                text={iconText}
                color={iconColor}
                size={iconSize}
                backgroundColor={backgroundColor}
              />
            )}
            <View style={styles.detailsContainer}>
              {title && (
                <AppText
                  style={[styles.title, { color: colors[colorScheme].text }]}
                >
                  {title}
                </AppText>
              )}
              {subtitle && (
                <AppText
                  style={[styles.subtitle, { color: colors[colorScheme].text }]}
                  numberOfLines={1}
                >
                  {subtitle}
                </AppText>
              )}
            </View>
          </View>
          {chevron && <Icon name="chevron-right" size={iconSize} style />}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 20,
  },
  innerContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
  },
  subtitle: {
    opacity: 0.6,
    fontSize: 14,
  },
  title: {
    fontSize: 22,
    opacity: 0.8,
  },
});

export default ListItem;
