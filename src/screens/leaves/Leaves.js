import React from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

const Leaves = () => {
  const data = [
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: 1,
    },
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: 2,
    },

    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Dismissed',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: 3,
    },
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: 4,
    },
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: 5,
    },
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: 6,
    },

    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Dismissed',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: 7,
    },
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: 8,
    },
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: 9,
    },
  ];

  return (
    <View style={{paddingVertical: hp(2)}}>
      <View
        style={{
          paddingHorizontal: wp(5),
          paddingVertical: hp(1),
          borderWidth: 1,
          borderColor: 'black',
          marginHorizontal: wp(3),
          display: 'flex',
          flexDirection: 'row',
          borderRadius: 5,
          backgroundColor: 'gainsboro',
          marginBottom: hp(1),
        }}>
        <View
          style={{
            paddingHorizontal: wp(1.5),
            paddingVertical: hp(0.1),
            borderColor: '#FF7F50',
            borderRadius: 15,
            borderWidth: 2,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#FF7F50',
            }}>
            +
          </Text>
        </View>
        <Text
          style={{
            marginTop: hp(0.5),
            marginLeft: wp(10),
            fontSize: 16,
            fontWeight: 'bold',
            color: '#483D8B',
          }}>
          Make a new Leave Application
        </Text>
      </View>
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
        marginHorizontal: wp(2),
        backgroundColor: 'lightcyan',
        shadowOpacity: 0.1,
      }}>
      <View
        style={{
          flex: 1,
          //  backgroundColor: 'lightseagreen',
          backgroundColor:
            item.statusOfLeaves === 'Dismissed' ? '#FFB6C1' : 'lightseagreen',
          paddingHorizontal: wp(2),
          paddingVertical: hp(1),
          justifyContent: 'center',
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          shadowOpacity: 0.1,
        }}>
        <Text style={{textAlign: 'center', fontSize: 18}}>
          {item.daysOfLeaves} {item.typesOfLeaves}
        </Text>
        <Text style={{textAlign: 'center'}}>(`${item.statusOfLeaves}`)</Text>
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: 'lightcyan',
          paddingHorizontal: wp(2),
          paddingVertical: hp(1),
          justifyContent: 'center',
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}>
        <Text style={{fontWeight: 'bold'}}>{item.numberOfLeaves}</Text>
        <Text style={{opacity: 0.6}}>{item.rangeOfdate}</Text>
        <Text style={{opacity: 0.8}}>{item.currentStatus}</Text>
      </View>
    </View>
  );
};

export default Leaves;
