import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Pressable, Image, SafeAreaView} from 'react-native';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from '../screens/leaves/LeaveStyles';
import {getLeaveDetails, getResourcesEmployeesLeaves} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {LeaveDetailsScreen, LeaveApplyScreen} from 'navigation/Route';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Loader from 'component/LoadingScreen/LoadingScreen';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import LeavesListItem from './LeavesListItem';
import {renderNoLeaves} from 'utils/utils';

const LeavesList = props => {
  const {
    fromResource,
    getLeaveCount,
    fromOpenLeave,
    resourceEmployeeID,
    employeeId,
    fromLeaveDetails,
  } = props;

  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  const dispatch = useDispatch();
  const isFocussed = useIsFocused();
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const [filterCalenderOpen, setFilterCalenderOpen] = useState(false);
  const [filteredSelectedDate, setFilteredSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employeeLeaves, setEmployeesLeaves] = useState([]);

  useEffect(() => {
    if (isFocussed && flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [isFocussed]);

  useEffect(() => {
    if (isFocussed && !isGuestLogin) {
      (async () => {
        try {
          setLoading(true);
          const leavesData = fromResource
            ? await dispatch(
                getResourcesEmployeesLeaves({
                  token,
                  empID: resourceEmployeeID,
                }),
              )
            : await dispatch(
                getLeaveDetails({
                  token,
                  empID: employeeId,
                }),
              );

          const sortLeaveData = !fromResource
            ? leavesData?.payload?.sort((a, b) => {
                return (
                  new Date(b.fromDate).getTime() -
                  new Date(a.fromDate).getTime()
                );
              })
            : leavesData?.payload?.employeeLeaves?.sort((a, b) => {
                return (
                  new Date(b.fromDate).getTime() -
                  new Date(a.fromDate).getTime()
                );
              });

          const openLeaves = {rhOpen: 0, earnedOpen: 0};

          // const empLeaves = leavesData?.payload;
          // const resourceLeaves = leavesData?.payload?.employeeLeaves;

          if (!fromResource) {
            for (const leave of sortLeaveData) {
              if (
                leave?.leaveType?.toLowerCase() === 'earned leave' &&
                leave.status.toLowerCase() === 'open'
              ) {
                const totalDays = leave?.totalLeaveDays;
                openLeaves.earnedOpen += totalDays;
              }
              if (
                leave?.leaveType?.toLowerCase() === 'restricted holiday' &&
                leave.status.toLowerCase() === 'open'
              ) {
                const totalDays = leave?.totalLeaveDays;
                openLeaves.rhOpen += totalDays;
              }
            }
          }

          fromLeaveDetails && fromLeaveDetails(openLeaves);
          // setEmployeesLeaves(fromResource ? resourceLeaves : empLeaves);
          setEmployeesLeaves(sortLeaveData);
          setLoading(false);
          let count = 0;
          leavesData?.payload?.employeeLeaves?.forEach(element => {
            if (element.status?.toLowerCase() === 'open') {
              count++;
            }
          });
          fromResource && getLeaveCount(count);

          if (leavesData?.error) {
            ShowAlert({
              messageHeader: ERROR,
              messageSubHeader: leavesData?.error?.message,
              buttonText: 'Close',
              dispatch,
            });
          }
        } catch (err) {
          console.log('errLeaves:', err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [
    token,
    isFocussed,
    dispatch,
    fromLeaveDetails,
    fromResource,
    isGuestLogin,
    getLeaveCount,
    resourceEmployeeID,
    employeeId,
  ]);

  const handleNavigation = item => {
    if (item.status === 'Open') {
      navigation.navigate(LeaveApplyScreen, {
        ...item,
        resourceEmployeeID,
        fromOpenLeave,
        fromResource,
      });
    } else {
      navigation.navigate(LeaveDetailsScreen, item);
    }
  };

  const renderItem = ({item}) => {
    if (filteredSelectedDate) {
      const shouldRender =
        filteredSelectedDate?.getTime() >= new Date(item?.fromDate).getTime();

      if (!shouldRender) {
        return null;
      }
    }
    return (
      <LeavesListItem
        item={item}
        onClickItemHandler={() => handleNavigation(item)}
      />
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <SafeAreaView style={styles.mainContainerExcludeHeader}>
        {isGuestLogin ? (
          renderNoLeaves({styles, message: 'No Leaves Applied.'})
        ) : employeeLeaves?.length > 0 ? (
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            data={employeeLeaves}
            renderItem={renderItem}
            keyExtractor={(_, index) => index}
          />
        ) : (
          renderNoLeaves({styles, message: 'No Leaves Applied.'})
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
          style={styles.filterButton}>
          <Image source={MonthImages.filterIcon2x} style={styles.filterIcon} />
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default LeavesList;
