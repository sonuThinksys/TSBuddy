import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import styles from './LeaveStyles';
import {getLeaveDetails} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {LeaveDetailsScreen, LeaveApplyScreen} from 'navigation/Route';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {guestLeavesScreenData} from 'guestData';
import Loader from 'component/loader/Loader';
const Leaves = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );
  var decoded = jwt_decode(token);
  const employeeID = decoded.Id;
  const dispatch = useDispatch();

  const [filterCalenderOpen, setFilterCalenderOpen] = useState(false);
  const [filteredSelectedDate, setFilteredSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(getLeaveDetails({token, employeeID}));
  }, []);

  const {
    leavesData,
    isLeaveDataLoading: {isLoading},
  } = useSelector(state => state.home);
  console.log('leavesData:--------------------------', leavesData);
  const applyForLeave = () => {
    navigation.navigate(LeaveApplyScreen);
  };

  const renderItem = ({item}) => {
    if (filteredSelectedDate) {
      const shouldRender =
        filteredSelectedDate?.getTime() >= new Date(item?.fromDate).getTime();

      if (!shouldRender) return null;
    }

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(LeaveDetailsScreen, item)}>
        <View style={styles.flateListView}>
          <View
            style={{
              flex: 1,
              backgroundColor:
                item.status === 'Rejected' || item.status === 'Dismissed'
                  ? Colors.grey
                  : item.status === 'Open'
                  ? Colors.darkPink
                  : Colors.parrotGreenLight,
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
    <>
      <View style={{paddingVertical: hp(2), flex: 1}}>
        <Pressable
          onPress={applyForLeave}
          style={{
            paddingHorizontal: wp(5),
            paddingVertical: hp(1),
            borderWidth: 1,
            borderColor: Colors.black,
            marginHorizontal: wp(3),
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 5,
            backgroundColor: Colors.lightGray,
            marginBottom: hp(1),
          }}>
          <View
            style={{
              paddingHorizontal: wp(2),
              borderColor: Colors.orangeColor,
              borderRadius: 40,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              // paddingVertical: hp(0.2),
            }}>
            <Text
              style={{
                // textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.orangeColor,
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
              color: Colors.purple,
            }}>
            Make a new Leave Application
          </Text>
        </Pressable>
        <FlatList
          data={isGuestLogin ? guestLeavesScreenData : leavesData}
          renderItem={renderItem}
          keyExtractor={(_, index) => index}
        />

        <DateTimePickerModal
          isVisible={filterCalenderOpen}
          mode="date"
          onConfirm={date => {
            setFilteredSelectedDate(date);
            setFilterCalenderOpen(false);
          }}
          onCancel={() => {
            setFilterCalenderOpen(false);
          }}
        />

        <Pressable
          onPress={() => {
            setFilterCalenderOpen(true);
          }}
          style={{position: 'absolute', bottom: hp(8), right: wp(8)}}>
          <Image
            source={MonthImages.filterIcon2x}
            style={{height: 32, width: 32}}
          />
        </Pressable>
      </View>
    </>
  );
};

export default Leaves;
