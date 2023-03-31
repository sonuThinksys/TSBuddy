import React, {useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {Colors} from 'colors/Colors';
import {getLeaveDetails} from 'redux/homeSlice';
import {guestLeavesData} from 'guestData';
import styles from './RecentLeavesStyles';

const RecentLeaves = () => {
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );
  var decoded = jwt_decode(token);
  const employeeID = decoded.Id;

  const {
    leaveMenuDetails: {recentAppliedLeaves},
  } = useSelector(state => state.home);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaveDetails({token, employeeID}));
  }, []);

  // =================================================================================

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.recentText}>Recent Applied Leaves</Text>
      </View>
      <FlatList
        data={isGuestLogin ? guestLeavesData : recentAppliedLeaves}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        style={{marginHorizontal: 4}}
      />
    </View>
  );
};
const renderItem = ({item, index}) => {
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