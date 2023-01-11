import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
const MenuDetails = () => {
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
          <TouchableOpacity>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {' '}
              + Lunch Request
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default MenuDetails;
