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
      typesOfLeaves: 'WFH',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAPP/63272',
      rangeOfdate: '26 Dec 2022 - 30 Dec 2022',
      currentStatus: '29 days ago',
      id: '11',
      reason: 'Went to home for christmas.',
      applyingDate: '28 Oct 2022',
    },
    {
      daysOfLeaves: 5,
      typesOfLeaves: 'WFH',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAPP/63272',
      rangeOfdate: '25 Oct 2022 - 29 Oct 2022',
      currentStatus: '3 months ago',
      id: '10',
      reason: 'Went to home to celebrate Diwali',
      applyingDate: '25 Oct 2022',
    },
    {
      daysOfLeaves: 15,
      typesOfLeaves: 'WFH',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAPP/63272',
      rangeOfdate: '15 Aug 2022 - 30 Aug 2022',
      currentStatus: '4 Months ago',
      id: '9',
      reason: 'Went for a tour.',
      applyingDate: '15 Aug 2022',
    },

    {
      daysOfLeaves: 9,
      typesOfLeaves: 'WFH',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAPP/34782',
      rangeOfdate: '10 July 2022 - 19 July 2022',
      currentStatus: '5 Months ago',
      id: '8',
      reason: "Went to home to celebrate my brother's birthday.",
      applyingDate: '12 July 2022',
    },

    {
      daysOfLeaves: 9,
      typesOfLeaves: 'WFH',
      statusOfLeaves: 'Dismissed',
      numberOfLeaves: 'LEAPP/24983',
      rangeOfdate: '10 July 2022 - 19 July 2022',
      currentStatus: '5 Months ago',
      id: '7',
      reason: 'celebrated my birthday at home.',
      applyingDate: '10 Jul 2022',
    },
    {
      daysOfLeaves: 24,
      typesOfLeaves: 'WFH',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAPP/24733',
      rangeOfdate: '3 June 2022 - 27 June 2022',
      currentStatus: '6 Months ago',
      id: '6',
      reason: 'Sunstroke',
      applyingDate: '16 June 2022',
    },
    {
      daysOfLeaves: 1,
      typesOfLeaves: 'RH',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAPP/47832',
      rangeOfdate: '15 May 2022 - 15 May 2022',
      currentStatus: '7 Months ago',
      id: '5',
      reason: 'too hot today.',
      applyingDate: '14 May 2022',
    },
    {
      daysOfLeaves: 7,
      typesOfLeaves: 'WFH',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAPP/1272',
      rangeOfdate: '3 Apr 2022 - 10 Apr 2022',
      currentStatus: '8 Months ago',
      id: '4',
      reason: "don't have money to travel.",
      applyingDate: '8 Apr 2022',
    },

    {
      daysOfLeaves: 3,
      typesOfLeaves: 'EL',
      statusOfLeaves: 'Dismissed',
      numberOfLeaves: 'LEAPP/6322',
      rangeOfdate: '1 Mar 2022 - 4 Mar 2022',
      currentStatus: '9 months ago',
      id: '3',
      reason: 'Went to home to celebrate Holi',
      applyingDate: '2 March 2022',
    },
    {
      daysOfLeaves: 6,
      typesOfLeaves: 'WFH',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAPP/3272',
      rangeOfdate: '11 Feb 2022 - 17 Feb 2022',
      currentStatus: '10 Months ago',
      id: '2',
      reason: 'Not feeling well.',
      applyingDate: '16 Feb 2022',
    },

    {
      daysOfLeaves: 16,
      typesOfLeaves: 'WFH',
      statusOfLeaves: 'Approved',
      numberOfLeaves: 'LEAPP/63274',
      rangeOfdate: '26 Jan 2022 - 30 Jan 2022',
      currentStatus: '11 Months ago',
      id: '1',
      reason: 'I am Ill now.',
      applyingDate: '28 Jan 2022',
    },
  ];

  const applyForLeave = () => {
    navigation.navigate('ApplyLeave');
  };

  return (
    <View style={{paddingVertical: hp(2)}}>
      <Pressable
        onPress={applyForLeave}
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
            paddingHorizontal: wp(2.5),
            borderColor: '#FF7F50',
            borderRadius: 50,
            borderWidth: 1,
            justifyContent: 'center',
            paddingBottom: 2.5,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 22,
              // fontWeight: 'bold',
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
      </Pressable>
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
