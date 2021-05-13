import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

const ListItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    alignSelf: "center",
    backgroundColor: colors.medium,
    height: 1,
    marginVertical: 10,
    width: "100%",
    opacity: 0.2
  },
});

export default ListItemSeparator;
