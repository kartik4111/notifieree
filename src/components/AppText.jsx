import React, { useContext } from "react";
import { Text } from "react-native";
import colors from "../config/colors";

import defaultStyles from "../config/Styles";
import ColorSchemeContext from "../context/colorScheme";

const AppText = ({ children, style, ...otherProps }) => {
  const { colorScheme } = useContext(ColorSchemeContext);
  const color = colors[colorScheme].text;

  return <Text style={[defaultStyles.text, { color }, style]} {...otherProps}>{children}</Text>;
};

export default AppText;