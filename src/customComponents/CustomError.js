import React from 'react';
import {Alert} from 'react-native';
import {ERROR} from 'constants/strings';
import {logOut} from 'Auth/LoginSlice';

const ShowAlert = props => {
  let {
    messageHeader = ERROR,
    messageSubHeader = '',
    buttonText = 'Close',
    onPress,
    dispatch,
    isTokenExpired,
  } = props || {};

  if (
    isTokenExpired === false &&
    messageSubHeader.toLowerCase() == 'token-expired'
  ) {
    return null;
  }
  if (messageSubHeader.toLowerCase() == 'token-expired') {
    Alert.alert('Login expired', 'Please login again!', [
      {
        text: 'OK',
        onPress: () => {
          dispatch && dispatch(logOut());
        },
      },
    ]);
  } else {
    if (onPress) {
      Alert.alert(messageHeader, messageSubHeader, [
        {
          text: buttonText,
          onPress,
        },
      ]);
    } else {
      Alert.alert(messageHeader, messageSubHeader, [
        {
          text: buttonText,
          onPress: () => null,
        },
      ]);
    }
  }
};

export default ShowAlert;
