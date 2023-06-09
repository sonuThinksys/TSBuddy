import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
import {guestLeavesScreenData} from 'guestData';
import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getResourcesEmployeesLeaves} from 'redux/homeSlice';
import {heightPercentageToDP, widthPercentageToDP} from 'utils/Responsive';

const WfhTab = ({employeeID, employeeName}) => {
  const [isRefresh, setRefresh] = useState(false);
  const [resurcesEmployeeLeaves, setResourcesEmployeesLeaves] = useState([]);
  const [openCount, setOpenCount] = useState(0);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const leavesData = await dispatch(
          getResourcesEmployeesLeaves({token, empID: employeeID}),
        );
        let count = 0;
        leavesData.payload.employeeWfh.forEach(element => {
          if (element.status == 'Open') {
            count++;
          }
        });

        setOpenCount(count);

        // let sortedLeavesData = leavesData.payload.employeeWfh.sort((a, b) => {
        //   return a.fromDate - b.fromDate;
        // });

        // sortedLeavesData.reverse();

        setResourcesEmployeesLeaves(leavesData.payload.employeeWfh);
        if (leavesData?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: leavesData?.error?.message,
            buttonText: 'Close',
            dispatch,
          });
        }
      })();
    }
  }, [isFocused]);

  const updateData = async () => {
    try {
      setRefresh(true);
      const allLeaves = await dispatch(getResourcesEmployeesLeaves({token}));
    } catch (err) {
    } finally {
      setRefresh(false);
    }
  };

  const renderItem = ({item}) => {
    // if (filteredSelectedDate) {
    //   const shouldRender =
    //     filteredSelectedDate?.getTime() >= new Date(item?.fromDate).getTime();
    //   if (!shouldRender) return null;
    // }

    return (
      <TouchableOpacity
        onPress={() => {
          item.status !== 'Open'
            ? navigation.navigate('resourceLeaveDetailsScreen', item)
            : navigation.navigate('resourceLeaveDetailsScreenOpen', {
                ...item,
                fromResource: true,
                employeeID,
              });
        }}>
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
              paddingHorizontal: widthPercentageToDP(2),
              paddingVertical: heightPercentageToDP(1),
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

  return resurcesEmployeeLeaves.length > 0 ? (
    <FlatList
      refreshing={isRefresh}
      onRefresh={updateData}
      data={isGuestLogin ? guestLeavesScreenData : resurcesEmployeeLeaves}
      renderItem={renderItem}
      keyExtractor={(_, index) => index}
    />
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontFamily: FontFamily.RobotoBold, fontSize: 16}}>
        Work from home Not Found.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listOfLeaves: {
    height: heightPercentageToDP(65),
    marginBottom: 5,
  },
  flateListView: {
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical: heightPercentageToDP(0.5),
    marginHorizontal: widthPercentageToDP(2),
    backgroundColor: Colors.lightcyan,
    shadowOpacity: 0.1,
  },
  secondView: {
    flex: 2,
    backgroundColor: Colors.lightcyan,
    paddingHorizontal: widthPercentageToDP(2),
    paddingVertical: heightPercentageToDP(1),
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default WfhTab;
