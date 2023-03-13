import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {getLeaveDetails} from 'redux/dataSlice';
import {Colors} from 'colors/Colors';

const RecentLeaves = () => {
  // =================================================================================

  const token = useSelector(state => state.auth.userToken);
  var decoded = jwt_decode(token);
  const employeeID = decoded.Id;

  const leavesData = useSelector(state => state.dataReducer.leavesData);
  console.log('leavesData:', leavesData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaveDetails({token, employeeID}));
  }, []);

  // =================================================================================

  return (
    <View>
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          Recent Applied Leaves
        </Text>
      </View>
      <FlatList
        data={leavesData}
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
          item.status !== 'Approved'
            ? MonthImages.absentEmpl
            : MonthImages.presentEmpS
        }
        style={{height: 25, width: 25, marginTop: hp(1.8)}}
      />
      <Text style={{marginTop: hp(2.4), marginLeft: wp(2)}}>
        {item.totalLeaveDays} {item.totalLeaveDays === 1 ? 'Day' : 'Days'}
      </Text>
      <View style={styles.itemView}>
        {/* <TouchableOpacity> */}
        <Text style={{fontSize: 16, fontWeight: 'bold', color: Colors.white}}>
          {`${new Date(item.fromDate).getDate()} ${new Date(
            item.fromDate,
          ).toLocaleString('default', {month: 'short'})} ${new Date(
            item.fromDate,
          ).getFullYear()}`}
        </Text>
        {/* </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    backgroundColor: Colors.skyColor,
    marginTop: hp(1),
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginTop: hp(0.6),
    shadowOpacity: 0.1,
  },
  itemView: {
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(6),
    backgroundColor: Colors.pink,
    marginLeft: wp(40),
    borderRadius: 5,
    marginVertical: hp(0.5),
    backgroundColor: Colors.bluishGreen,
  },
});
export default RecentLeaves;
