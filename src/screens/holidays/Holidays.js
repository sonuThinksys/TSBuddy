import React from 'react';
import {View, TouchableOpacity, FlatList, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
const Holidays = () => {
  const data = [
    {
      dateOfLeaves: '01 Jan 2023',
      typesOfHoliday: 'New Year',
      id: 1,
    },
    {
      dateOfLeaves: '26 Jan 2023',
      typesOfHoliday: 'Republic Day',
      id: 2,
    },
    {
      dateOfLeaves: '08 Mar 2023',
      typesOfHoliday: 'Holi',
      id: 3,
    },
  ];
  return (
    <View style={{paddingVertical: hp(2)}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
        // paddingVertical: hp(0.5),
        // paddingHorizontal: wp(2),
        borderRadius: 5,
        // borderWidth: 1,
        marginVertical: hp(0.5),
        marginHorizontal: wp(1),
        backgroundColor: 'lightcyan',
        shadowOpacity: 0.1,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'midnightblue',
          //  backgroundColor: item.statusOfLeaves === 'Dismissed' ? '#FFB6C1' : 'lightseagreen',
          paddingHorizontal: wp(2),
          paddingVertical: hp(1),
          justifyContent: 'center',
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          shadowOpacity: 0.1,
        }}>
        <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>
          {item.dateOfLeaves}
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: 'white',
          paddingHorizontal: wp(2),
          paddingVertical: hp(1),
          justifyContent: 'center',
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}>
        <Text style={{fontWeight: 'bold'}}>{item.typesOfHoliday}</Text>
      </View>
    </View>
  );
};

export default Holidays;
