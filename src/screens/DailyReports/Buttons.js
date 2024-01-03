import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';

const Buttons = ({modalCloseHandler}) => {
  return (
    <View style={styles.buttonsContainer}>
      <Pressable onPress={modalCloseHandler} style={styles.button}>
        <Text style={[styles.buttonText, styles.buttonCancelText]}>Cancel</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.saveButton]}>
        <Text style={[styles.buttonText, styles.buttonSaveText]}>Save</Text>
      </Pressable>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.midGrey,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  saveButton: {
    backgroundColor: Colors.lovelyPurple,
  },
  buttonText: {
    fontFamily: FontFamily.RobotoMedium,
    letterSpacing: 0.6,
    fontSize: FontSize.h16,
  },
  buttonCancelText: {
    color: Colors.dune,
  },
  buttonSaveText: {
    color: Colors.white,
  },
});
