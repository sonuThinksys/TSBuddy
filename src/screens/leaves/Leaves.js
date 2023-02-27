import React, {useEffect} from 'react';
import {View, Text, FlatList, Pressable, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import styles from './LeaveStyles';
import {getLeaveDetails} from 'redux/dataSlice';
import {useDispatch, useSelector} from 'react-redux';

const Leaves = ({navigation}) => {
  const token = useSelector(state => state.auth.userToken);
  const leavesData = useSelector(state => state.dataReducer.leavesData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaveDetails({token}));
  }, []);

  const applyForLeave = () => {
    navigation.navigate('ApplyLeave');
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('leaveDetails', item)}>
        <View style={styles.flateListView}>
          <View
            style={{
              flex: 1,
              backgroundColor:
                item.status === 'Rejected' || item.status === 'Dismissed'
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
              {item.totalLeaveDays}{' '}
              {item.leaveType
                .split(' ')
                .map(word => word.charAt(0).toUpperCase())
                .join('')}
            </Text>
            <Text style={{textAlign: 'center'}}>({item.status})</Text>
          </View>
          <View style={styles.secondView}>
            <Text style={{fontWeight: 'bold', opacity: 0.7, fontSize: 16}}>
              {item.leaveApplicationId}
            </Text>
            <Text style={{opacity: 0.6}}>
              {`${new Date(item.fromDate).getDate()} ${new Date(
                item.fromDate,
              ).toLocaleString('default', {month: 'short'})} ${new Date(
                item.fromDate,
              ).getFullYear()}`}
              {' - '}
              {`${new Date(item.toDate).getDate()} ${new Date(
                item.toDate,
              ).toLocaleString('default', {month: 'short'})} ${new Date(
                item.toDate,
              ).getFullYear()}`}
            </Text>
            <Text style={{opacity: 0.8}}>{item.currentStatus}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
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
      <FlatList
        data={leavesData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
      />
    </View>
  );
};

export default Leaves;
