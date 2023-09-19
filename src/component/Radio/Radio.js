import React from 'react';
import {View} from 'react-native';
import styles from './RadioStyles';

const Radio = ({isActive}) => {
  return (
    <View
      style={[
        styles.mainContainer,
        !isActive && styles.borderGrey,
        !isActive && styles.backgroundWhite,
      ]}>
      {isActive && <View style={[styles.insideContainer]} />}
    </View>
  );
};

export default Radio;
