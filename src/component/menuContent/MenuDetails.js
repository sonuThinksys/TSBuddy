import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import RequestLunch from 'screens/requestLunch/RequestLunch';
// import {SharedElement} from 'react-navigation-shared-element';
const MenuDetails = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingVertical: hp(1.4),
          backgroundColor: '#C3F8FF',
          paddingHorizontal: wp(2),
          opacity: 1,
        }}>
        <Text
          style={{fontWeight: 'bold', fontSize: 16, marginTop: hp(1), flex: 2}}>
          Today's Menu
        </Text>
        {/* <SharedElement id="enter" style={{flex: 1}}> */}
        <View
          style={{
            // marginLeft: wp(30),
            flex: 1,
            backgroundColor: '#3333FF',
            paddingVertical: hp(1.2),
            paddingHorizontal: wp(2),

            borderRadius: 4,
            opacity: 1,
          }}>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('RequestLunch', navigation);
            }}
            > */}
          <Pressable
            onPress={() => {
              navigation.navigate('RequestLunch', navigation);
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {' '}
              + Lunch Request
            </Text>
          </Pressable>

          {/* </TouchableOpacity> */}
        </View>
        {/* </SharedElement> */}
      </View>
    </View>
  );
};
export default MenuDetails;
