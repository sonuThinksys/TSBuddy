import React, {useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useDispatch, useSelector} from 'react-redux';
import {guestLeavesData} from 'guestData';
import styles from './RecentLeavesStyles';
import {FontFamily} from 'constants/fonts';
import {Colors} from 'colors/Colors';
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
    <View>
      <View style={styles.container}>
        <Text style={styles.recentText}>Recent Applied Leaves</Text>
      </View>
      {isGuestLogin ? (
        <FlatList
          data={guestLeavesData}
          // data={isGuestLogin ? guestLeavesData : recent3AppliedLeaves}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          style={{marginHorizontal: 4}}
        />
      ) : recent3AppliedLeaves?.length > 0 ? (
        <FlatList
          data={recent3AppliedLeaves}
          // data={isGuestLogin ? guestLeavesData : recent3AppliedLeaves}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          style={{marginHorizontal: 4}}
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
  console.log('item.status', item);
  return (
    <View key={index} style={styles.imageView}>
      <Image
        resizeMode="contain"
        source={
          item.status !== 'Approved'
            ? MonthImages.absentEmpl
            : MonthImages.presentEmpS
        }
        style={styles.image}
      />

      <Text style={{flex: 0.6}}>
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
      </View>
    </View>
  );
};

export default RecentLeaves;
