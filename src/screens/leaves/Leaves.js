import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Pressable, SafeAreaView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {FontFamily, FontSize} from 'constants/fonts';
import LeavesList from 'reusableComponents/LeavesList';

const Leaves = ({navigation}) => {
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;
  const isFocussed = useIsFocused();
  const flatListRef = useRef(null);
  const [openLeaves, setOpenLeaves] = useState({earnedOpen: 0, rhOpen: 0});

  useEffect(() => {
    if (isFocussed && flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [isFocussed]);

  const applyForLeave = () => {
    navigation.navigate(LeaveApplyScreen, {
      openLeavesCount: openLeaves,
    });
  };

  return (
    <>
      <SafeAreaView
        style={{
          marginTop: hp(1.6),
          flex: 1,
          backgroundColor: Colors.whitishBlue,
        }}>
        <Pressable
          onPress={applyForLeave}
          style={{
            // paddingHorizontal: wp(5),
            paddingVertical: hp(1.5),
            borderWidth: 1,
            borderColor: Colors.black,
            marginHorizontal: wp(3),
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 5,
            backgroundColor: Colors.lightGray,
            marginBottom: hp(1),
            alignItems: 'center',
            paddingLeft: wp(2.5),
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              // paddingHorizontal: wp(2),
              borderColor: Colors.orangeColor,
              borderRadius: 20,
              borderWidth: 1,
              // justifyContent: 'flex-end',
              alignItems: 'center',
              width: 20,
              height: 20,
              // paddingVertical: hp(0.2),
            }}>
            <Text
              style={{
                textAlign: 'center',
                // fontSize: 20,
                fontWeight: 'bold',
                color: Colors.orangeColor,
              }}>
              +
            </Text>
          </View>

          <Text
            style={{
              // marginTop: hp(0.5),
              // marginLeft: wp(10),
              fontSize: FontSize.h12,
              fontFamily: FontFamily.RobotoMedium,
              color: Colors.purple,
              textAlign: 'center',
            }}>
            Make a new Leave Application
          </Text>
          <View />
        </Pressable>
        <LeavesList />
      </SafeAreaView>
    </>
  );
};

export default Leaves;
