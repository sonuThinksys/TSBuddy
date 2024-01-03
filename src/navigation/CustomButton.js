import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import React from 'react';
import {Text} from 'react-native';
import {Pressable, StyleSheet} from 'react-native';

const CustomButton = ({title, onPress, styleButton, styleTitle}) => {
  return (
    <Pressable style={[styles.button, styleButton]} onPress={onPress}>
      <Text style={[styles.title, styleTitle]}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.purpleShade,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h16,
    color: Colors.purpleShade,
  },
  noBorder: {
    borderWidth: 0,
  },
});
