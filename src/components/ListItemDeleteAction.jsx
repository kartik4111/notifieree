import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import colors from '../config/colors';
import Icon from './Icon';

const ListItemDeleteAction = ({ onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDelete}>
        <Icon name="trash-can" color={colors.light.text} size={30} />
      </TouchableOpacity>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.error,
    borderRadius: 5,
    justifyContent: "center",
    width: 70
  }
});

export default ListItemDeleteAction;