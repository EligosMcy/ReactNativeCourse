import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, text }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,

    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: "purple",
  },
});

export default CustomButton;
