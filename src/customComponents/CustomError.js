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
    isCurrentTokenExpired,
    callRenewToken,
  } = props || {};

  if (isCurrentTokenExpired) {
    callRenewToken();
    return;
  }
  if (
    isTokenExpired === false &&
    messageSubHeader.toLowerCase() === 'token-expired'
  ) {
    return null;
  }
  // if (messageSubHeader.toLowerCase() == 'token-expired') {
  //   Alert.alert('Login expired!', 'Please login again...!!', [
  //     {
  //       text: 'OK',
  //       onPress: () => {
  //         // dispatch && dispatch(logOut());
  //       },
  //     },
  //   ]);
  // }
  // else {
  if (onPress) {
    Alert.alert(messageHeader, messageSubHeader, [
      {
        text: 'OK',
        onPress: () => {
          return null;
          // dispatch && dispatch(logOut());
        },
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
  // }
};

export default ShowAlert;

export const renewCurrentToken = async ({
  dispatch,
  renewToken,
  refreshToken,
  data,
  apiCallAgain,
}) => {
  const isTokenRenewed = await dispatch(renewToken({token: refreshToken}));

  const newToken = isTokenRenewed?.payload?.token;
  if (newToken) {
    const newResult = await dispatch(
      apiCallAgain({
        token: newToken,
        ...data,
      }),
    );
    // console.log('newResult:', newResult);
    const newData = newResult.payload;
    console.log('new::::Data:', newData);
    return newData;
  } else {
    Alert.alert('Login expired.', 'Kindly login again!!', [
      {
        text: 'OK',
        onPress: () => {
          // dispatch && dispatch(logOut());
        },
      },
    ]);
  }
};
