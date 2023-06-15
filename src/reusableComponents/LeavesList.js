import React, {memo, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

import {Colors} from 'colors/Colors';

import styles from '../screens/leaves/LeaveStyles';
import {
  getLeaveApprovers,
  getLeaveDetails,
  getResourcesEmployeesLeaves,
} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {LeaveDetailsScreen, LeaveApplyScreen} from 'navigation/Route';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {FontFamily, FontSize} from 'constants/fonts';
import {openLeavesCount} from 'utils/utils';
import Loader from 'component/LoadingScreen/LoadingScreen';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';

const LeavesList = props => {
  const {
    fromResource,
    getLeaveCount,
    fromOpenLeave,
    resourceEmployeeID,
    employeeId,
  } = props;

  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  const dispatch = useDispatch();
  const isFocussed = useIsFocused();
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const [filterCalenderOpen, setFilterCalenderOpen] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [filteredSelectedDate, setFilteredSelectedDate] = useState(null);
  const [openLeaves, setOpenLeaves] = useState({earnedOpen: 0, rhOpen: 0});
  const [loading, setLoading] = useState(false);
  const [resurcesEmployeeLeaves, setResourcesEmployeesLeaves] = useState([]);

  useEffect(() => {
    if (isFocussed && flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [isFocussed]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const leavesData = await dispatch(
        getResourcesEmployeesLeaves({
          token,
          empID: fromResource ? resourceEmployeeID : employeeId,
        }),
      );
      console.log('leavesData', leavesData.payload);
      setLoading(false);
      let count = 0;
      leavesData?.payload?.employeeLeaves?.forEach(element => {
        if (element.status == 'Open') {
          count++;
          console.log('in');
        }
      });
      fromResource && getLeaveCount(count);
      setResourcesEmployeesLeaves(leavesData?.payload?.employeeLeaves);

      if (leavesData?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: leavesData?.error?.message,
          buttonText: 'Close',
          dispatch,
        });
      }
    })();
  }, []);

  const renderItem = ({item}) => {
    if (filteredSelectedDate) {
      const shouldRender =
        filteredSelectedDate?.getTime() >= new Date(item?.fromDate).getTime();

      if (!shouldRender) return null;
    }

    const handleNavigation = () => {
      if (item.status == 'Open') {
        navigation.navigate(LeaveApplyScreen, {
          ...item,
          fromOpenLeave,
          fromResource,
        });
      } else {
        navigation.navigate(LeaveDetailsScreen, item);
      }
    };

    return (
      <TouchableOpacity onPress={() => handleNavigation()}>
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

  const renderNoLeaves = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            fontFamily: FontFamily.RobotoMedium,
            fontSize: 17,
            color: Colors.dune,
          }}>
          No Leaves Applied.
        </Text>
      </View>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <SafeAreaView
        style={{
          marginTop: hp(1.6),
          flex: 1,
          backgroundColor: Colors.whitishBlue,
        }}>
        {isGuestLogin ? (
          renderNoLeaves()
        ) : resurcesEmployeeLeaves?.length > 0 ? (
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            data={resurcesEmployeeLeaves}
            renderItem={renderItem}
            keyExtractor={(_, index) => index}
          />
        ) : (
          renderNoLeaves()
        )}
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
          style={{position: 'absolute', bottom: hp(3), right: wp(5)}}>
          <Image
            source={MonthImages.filterIcon2x}
            style={{height: 55, width: 55, borderRadius: 25}}
          />
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default memo(LeavesList);
