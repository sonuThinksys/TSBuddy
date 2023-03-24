import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {widthPercentageToDP as wp} from 'utils/Responsive';

const CustomModal = props => {
  let {children} = props;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp(8),
      }}>
      {children}
    </View>
  );
};
export default CustomModal;
