import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';

const RecentLeaves = () => {
  const data = [
    {
      NumberOfLeaves: '7.0 Days',
      dataOfLeave: '25 Dec 2022',
      statusOfLeave: 'Dissmissed',
      id: 1,
    },
    {
      NumberOfLeaves: '7.0 Days',
      dataOfLeave: '25 Dec 2022',
      statusOfLeave: 'Approved',
      id: 2,
    },
    {
      NumberOfLeaves: '7.0 Days',
      dataOfLeave: '25 Dec 2022',
      statusOfLeave: 'Approved',
      id: 3,
    },
  ];
  return (
    <View>
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          Recent Applied Leaves
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        style={{marginHorizontal: 4}}
      />
    </View>
  );
};
const renderItem = ({item}) => {
  return (
    <View style={styles.imageView}>
      <Image
        resizeMode="contain"
        source={
          item?.statusOfLeave === 'Dissmissed'
            ? MonthImages.absentEmpl
            : MonthImages.presentEmpS
        }
        style={{height: 25, width: 25, marginTop: hp(1.8)}}
      />
      <Text style={{marginTop: hp(2.4), marginLeft: wp(2)}}>
        {item?.NumberOfLeaves}
      </Text>
      <View style={styles.itemView}>
        <TouchableOpacity>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
            {item?.dataOfLeave}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    backgroundColor: '#C3F8FF',
    marginTop: hp(1),
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: hp(0.6),
    shadowOpacity: 0.1,
  },
  itemView: {
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(6),
    backgroundColor: 'pink',
    marginLeft: wp(40),
    borderRadius: 5,
    marginVertical: hp(0.5),
    backgroundColor: '#0E5E6F',
  },
});
export default RecentLeaves;
