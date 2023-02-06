import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, FlatList} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import styles from './LeaveStyles';
const Leaves = () => {
  const data = [
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: '1',
    },
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: '2',
    },

    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Dismissed',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: '3',
    },
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: '4',
    },
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: '5',
    },
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: '6',
    },

    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Dismissed',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: '7',
    },
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: '8',
    },
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: '9',
    },
  ];

  return (
    <View style={{paddingVertical: hp(2)}}>
      <View style={styles.container}>
        <View style={styles.plusView}>
          <Text style={styles.plusText}>+</Text>
        </View>
        <Text style={styles.text1}>Make a new Leave Application</Text>
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
    <View style={styles.flateListView}>
      <View
        style={{
          flex: 1,
          backgroundColor:
            item.statusOfLeaves === 'Dismissed'
              ? Colors.pink
              : Colors.lightseagreen,
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
        <Text style={{textAlign: 'center'}}>({item.statusOfLeaves})</Text>
      </View>
      <View style={styles.secondView}>
        <Text style={{fontWeight: 'bold', opacity: 0.7, fontSize: 16}}>
          {item.numberOfLeaves}
        </Text>
        <Text style={{opacity: 0.6}}>{item.rangeOfdate}</Text>
        <Text style={{opacity: 0.8}}>{item.currentStatus}</Text>
      </View>
    </View>
  );
};

export default Leaves;
