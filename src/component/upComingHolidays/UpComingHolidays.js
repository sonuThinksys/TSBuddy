import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';

const UpComingHolidays = () => {
  const data = [
    {
      nameOfLeaves: 'Republic Day',
      dataOfLeave: '26 Jan 2023',
      id: "1",
    },
    {
      nameOfLeaves: 'Holi',
      dataOfLeave: '08 Mar 2023',
      id: "2",
    },
    {
      nameOfLeaves: 'Independence Day',
      dataOfLeave: '15 Aug 2023',
      id: "3",
    },
    {
      nameOfLeaves: 'Diwali',
      dataOfLeave: '15 Oct 2023',
      id: "4",
    },
  ];
  return (
    <View>
      <View
        style={{
          paddingVertical: hp(1),
          paddingHorizontal: wp(3),
          backgroundColor: '#C3F8FF',
          marginTop: hp(1),
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          Upcoming Holidays
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{marginRight: wp(1)}}
      />
    </View>
  );
};
const renderItem = ({item}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: hp(0.6),
        shadowOpacity: 0.1,
        paddingLeft: wp(1),
      }}>
      <Image
        resizeMode="contain"
        source={
          item.nameOfLeaves === 'Republic Day'
            ? MonthImages.republicDay
            : item.nameOfLeaves === 'Holi'
            ? MonthImages.holi
            : item.nameOfLeaves === 'Independence Day'
            ? MonthImages.independenceDay
            : item.nameOfLeaves === 'Diwali'
            ? MonthImages.diwali
            : MonthImages.gandhiJayantiS
        }
        style={{height: 40, width: 40, marginTop: hp(1.8), flex: 1}}
      />
      <Text style={{marginTop: hp(2.4), flex: 5, marginLeft: wp(1)}}>
        {item.nameOfLeaves}
      </Text>
      <View style={{flex: 3}}>
        <View
          style={{
            paddingVertical: hp(1.6),
            paddingHorizontal: wp(5),
            backgroundColor: 'pink',
            width: wp(40),
            borderRadius: 5,
            marginVertical: hp(0.5),
            backgroundColor: '#0E5E6F',
          }}>
          <TouchableOpacity>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
              {item.dataOfLeave}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default UpComingHolidays;
