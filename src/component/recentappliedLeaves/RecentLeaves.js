import React, {useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useDispatch, useSelector} from 'react-redux';
import {guestLeavesData} from 'guestData';
import styles from './RecentLeavesStyles';
import {FontFamily} from 'constants/fonts';
import {Colors} from 'colors/Colors';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import ApprovedIcon from 'assets/newDashboardIcons/circle-check.svg';
import RejectedIcon from 'assets/newDashboardIcons/ban.svg';
import PendingIcon from 'assets/newDashboardIcons/circle-minus.svg';
import {widthPercentageToDP as wp} from 'utils/Responsive';
// import ShowAlert from 'customComponents/CustomError';
// import {ERROR} from 'constants/strings';

const RecentLeaves = ({navigation}) => {
  const {isGuestLogin: isGuestLogin, userToken: token} = useSelector(
    state => state.auth,
  );

  const {
    leaveMenuDetails: {recentAppliedLeaves},
  } = useSelector(state => state.home);
  const recent3AppliedLeaves = recentAppliedLeaves?.slice(-3)?.reverse();

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   (async () => {
  //     const leaves = await dispatch(getLeaveDetails({token, employeeID}));

  //     if (leaves?.error) {
  //       ShowAlert({
  //         messageHeader: ERROR,
  //         messageSubHeader: leaves?.error?.message,
  //         buttonText: 'Close',
  //         dispatch,
  //         navigation,
  //       });
  //     }
  //   })();
  // }, [employeeID, token]);

  // =================================================================================

  return (
    <View style={{paddingHorizontal: 18, paddingBottom: wp(6)}}>
      <View style={styles.container}>
        <Text style={styles.recentText}>Leaves Applied</Text>
      </View>
      {isGuestLogin ? (
        <FlatList
          data={guestLeavesData}
          // data={isGuestLogin ? guestLeavesData : recent3AppliedLeaves}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      ) : recent3AppliedLeaves?.length > 0 ? (
        <FlatList
          data={recent3AppliedLeaves}
          // data={isGuestLogin ? guestLeavesData : recent3AppliedLeaves}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          // style={{marginHorizontal: 4}}
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: FontFamily.RobotoMedium,
              fontSize: 16,
              color: Colors.lightBlue,
              marginVertical: 4,
            }}>
            Recent Leaves not found.
          </Text>
        </View>
      )}
    </View>
  );
};
const renderItem = ({item, index}) => {
  return (
    <View key={index} style={styles.imageView}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.daysContainer}>
          <Text style={styles.daysText}>
            {item?.totalLeaveDays > 9
              ? item?.totalLeaveDays > 9
              : `0${item?.totalLeaveDays}`}
          </Text>
          <Text>{item?.totalLeaveDays > 1 ? 'Days' : 'Day'}</Text>
        </View>
        <View style={styles.typeDateContainer}>
          <Text style={styles.leaveTypeText}>Work From Home</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CalenderIcon height={11} width={11} marginRight={8} />
            <Text style={styles.dateText}>
              {`${new Date(item.fromDate).toLocaleString('default', {
                month: 'short',
              })} ${new Date(item.fromDate).getDate()}, ${new Date(
                item.fromDate,
              ).getFullYear()}`}
              {'  '}
              to{'  '}
              {`${new Date(item.fromDate).toLocaleString('default', {
                month: 'short',
              })} ${new Date(item.fromDate).getDate()}, ${new Date(
                item.fromDate,
              ).getFullYear()}`}
            </Text>
          </View>
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <PendingIcon
          fill={Colors.gold}
          height={20}
          width={20}
          marginBottom={4}
        />
        <Text style={{fontSize: 12, color: Colors.gold}}>{item.status}</Text>
      </View>
      {/* <Image
        resizeMode="contain"
        source={
          item.status !== 'Approved'
            ? MonthImages.absentEmpl
            : MonthImages.presentEmpS
        }
        style={styles.image}
      /> */}

      {/* <Text style={{flex: 0.6}}>
        {item.totalLeaveDays} {item.totalLeaveDays === 1 ? 'Day' : 'Days'}
      </Text>
      <View style={styles.itemView}>
        <Text style={styles.dateText}>
          {`${new Date(item.fromDate).getDate()} ${new Date(
            item.fromDate,
          ).toLocaleString('default', {month: 'short'})} ${new Date(
            item.fromDate,
          ).getFullYear()}`}
        </Text>
      </View> */}
    </View>
  );
};

export default RecentLeaves;
