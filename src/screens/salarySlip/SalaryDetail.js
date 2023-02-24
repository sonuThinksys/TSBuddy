import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/Responsive';
const SalaryDetail = ({navigation}) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.darkBlue,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingHorizontal: wp(2),
          paddingVertical: hp(1.5),
        }}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={MonthImages.backArrowS}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 2,
            // justifyContent: 'center',
            paddingTop: hp(0.5),
          }}>
          <Text
            style={{
              color: Colors.white,
              marginRight: wp(2),
              fontSize: 18,
              fontWeight: '500',
            }}>
            Salary Detail
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
});

export default SalaryDetail;
