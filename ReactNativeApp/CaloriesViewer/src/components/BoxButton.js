import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    height: 36,
    backgroundColor: '#EDEDED',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const BoxButton = (props) => {
  const { title, onPress } = props;

  let bgColor = '#EDEDED';

  if (title == '保存') {
    bgColor = '#FFC68D';
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default BoxButton;
