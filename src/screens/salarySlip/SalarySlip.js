import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, Modal, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import SalarSlipModal from 'modals/SalarySlipModal';
import {authLoginStatus} from 'Auth/LoginSlice';
const SalarySlip = ({navigation}) => {
  const dispatch = useDispatch();
  const isAuthLoggedIn = useSelector(state => state.auth.isAuthLoggedIn);
  console.log('isAuthLoggedIn:-------', isAuthLoggedIn);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      dispatch(authLoginStatus(false));
    });
    //  dispatch(authLoginStatus(false));
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <Text
        style={{
          paddingVertical: hp(1.5),
          backgroundColor: '#0073cf',
          color: 'white',
          paddingHorizontal: wp(5),
          fontWeight: '500',
          fontSize: 18,
        }}>
        Radhika Gupta
      </Text>
      {!isAuthLoggedIn ? (
        <SalarSlipModal />
      ) : (
        <View>
          <Text>fgf</Text>
        </View>
      )}
    </View>
  );
};

export default SalarySlip;
