import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  Image,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import SalarSlipModal from 'modals/SalarySlipModal';
import {authLoginStatus} from 'Auth/LoginSlice';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {getSalarySlipData} from 'redux/dataSlice';

const SalarySlip = ({navigation}) => {
  const dispatch = useDispatch();
  const isAuthLoggedIn = useSelector(state => state.auth.isAuthLoggedIn);
  console.log('isAuthLoggedIn:-------', isAuthLoggedIn);

  useEffect(() => {
    dispatch(getSalarySlipData());

    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      // dispatch();
      dispatch(authLoginStatus(false));
    });
    //  dispatch(authLoginStatus(false));
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const getData = () => {
    fetch('db.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        console.log('response:================', response);
        return response.json();
      })
      .then(function (myJson) {
        console.log('myjson-------------', myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const data = [
    {
      month: 'January',
      year: 2022,
      id: 1,
    },
    {
      month: 'February',
      year: 2022,
      id: 2,
    },
  ];

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
          <Image
            source={MonthImages.janImage}
            style={{height: 50, width: 50}}
          />
        </View>
      )}
    </View>
  );
};

export default SalarySlip;
