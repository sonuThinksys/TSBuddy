import {View, Text, FlatList, Pressable} from 'react-native';
import styles from './ApplicationListLayoutStyle';
import React, {useCallback, useState} from 'react';

import ApprovedIcon from 'assets/newDashboardIcons/circle-check.svg';
import RejectedIcon from 'assets/newDashboardIcons/ban.svg';
import PendingIcon from 'assets/newDashboardIcons/circle-minus.svg';
import {Colors} from 'colors/Colors';
import {useNavigation} from '@react-navigation/native';
import {LEAVE_ALLOCATION, OPEN} from 'utils/string';

const DISMISSED = 'Dismissed';
const REJECTED = 'Rejected';
const APPROVED = 'Approved';

const ApplicationListLayout = ({
  data,
  isRegularisation,
  loadMoreData,
  getLeavesForManager,
  selectedType,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigation = useNavigation();

  const particularTypeStatus = status => {
    return status?.toLowerCase() === APPROVED.toLowerCase()
      ? styles.textGreen
      : status?.toLowerCase() === DISMISSED.toLowerCase() ||
        status?.toLowerCase() === REJECTED.toLowerCase()
      ? styles.textBrown
      : styles.textGold;
  };

  const keyExtractor = useCallback(item => Math.random() * Math.random(), []);
  const renderListOfAppliedRequests = ({item}) => {
    const options = {month: 'short', day: '2-digit', year: 'numeric'};

    // const formattedStartDate = new Date(item?.fromDate)?.toLocaleDateString(
    //   'en-US',
    //   options,
    // );

    // const formattedEndDate = new Date(item?.toDate)?.toLocaleDateString(
    //   'en-US',
    //   options,
    // );

    const appliedDate = new Date(item?.postingDate)?.toLocaleDateString(
      'en-US',
      options,
    );

    const regulariseAttendanceDate = new Date(
      item?.attendanceDate,
    )?.toLocaleDateString('en-US', options);

    const empFullName = `${item.firstName ? item.firstName + ' ' : ''}${
      item.middleName ? item.middleName + ' ' : ''
    }${item.lastName ? item.lastName : ''}`;

    const isLeaveAllocation = selectedType === LEAVE_ALLOCATION;
    const hrStatus = item.hrApproval;
    const hodStatus = item.hodApproval;
    const rmStatus = item.rmApproval;

    const leaveAllocationIsDismissed =
      hrStatus?.toLowerCase() === DISMISSED?.toLowerCase() ||
      hrStatus?.toLowerCase() === REJECTED?.toLowerCase() ||
      hodStatus?.toLowerCase() === DISMISSED?.toLowerCase() ||
      hodStatus?.toLowerCase() === REJECTED?.toLowerCase() ||
      rmStatus?.toLowerCase() === DISMISSED?.toLowerCase() ||
      rmStatus?.toLowerCase() === REJECTED?.toLowerCase();

    const leaveAllocationIsApproved =
      hrStatus?.toLowerCase() === APPROVED.toLowerCase() &&
      hodStatus?.toLowerCase() === APPROVED.toLowerCase() &&
      rmStatus.toLowerCase() === APPROVED.toLowerCase();

    return (
      <Pressable
        style={styles.listItemMainContainer}
        onPress={() => {
          if (isLeaveAllocation) {
            return;
          }
          navigation.navigate('applicationDetailsScreen', {
            item,
            isRegularisation,
          });
        }}>
        <View style={styles.request} key={item.leaveApplicationId}>
          <View style={styles.appliedRequestsLeft}>
            <View style={styles.leave}>
              <Text style={styles.totalDaysText}>
                {item?.totalLeaveDays < 9 &&
                Number.isInteger(item?.totalLeaveDays)
                  ? '0'
                  : null}
                {item?.totalLeaveDays}
              </Text>
              {!isRegularisation ? (
                <Text style={styles.daysText}>
                  {item?.totalLeaveDays === 1 ? 'Day' : 'Days'}
                </Text>
              ) : (
                <Text style={styles.empId}>Emp/{item?.employeeId}</Text>
              )}
            </View>
            <View style={styles.datesContainer}>
              {!isRegularisation ? (
                <Text style={styles.dates}>{empFullName}</Text>
              ) : (
                <Text>{empFullName}</Text>
              )}
              <View style={styles.reguCont}>
                <Text style={styles.reguText}>
                  {isRegularisation
                    ? 'Attendance Date'
                    : isLeaveAllocation
                    ? 'Leave Type:'
                    : 'Applied on:'}{' '}
                </Text>
                <Text style={styles.reguTitleText}>
                  {isRegularisation
                    ? regulariseAttendanceDate
                    : isLeaveAllocation
                    ? item.leaveType
                    : `${appliedDate}`}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.statusContainer}>
            {item.status?.toLowerCase() === 'open' ||
            (!leaveAllocationIsApproved && !leaveAllocationIsDismissed) ? (
              <View style={styles.iconContainer}>
                <PendingIcon
                  fill={Colors.gold}
                  height={20}
                  width={20}
                  marginBottom={4}
                />
                <Text style={styles.statusText}>Open</Text>
              </View>
            ) : item.status?.toLowerCase() === 'dismissed' ||
              item.status?.toLowerCase() === 'rejected' ||
              leaveAllocationIsDismissed ? (
              <View style={styles.iconContainer}>
                <RejectedIcon
                  fill={Colors.darkBrown}
                  height={20}
                  width={20}
                  marginBottom={4}
                />
                <Text style={styles.statusText2}>
                  {leaveAllocationIsDismissed ? DISMISSED : item.status}
                </Text>
              </View>
            ) : (
              <View style={styles.iconContainer}>
                <ApprovedIcon
                  fill={Colors.darkLovelyGreen}
                  height={20}
                  width={20}
                  marginBottom={4}
                />
                <Text style={styles.statusText3}>
                  {item.status || 'Approved'}
                </Text>
              </View>
            )}
          </View>
        </View>
        {isLeaveAllocation ? (
          <View style={styles.leaveAllocationStatusContainer}>
            <View style={styles.leaveAllocationStatusSingle}>
              <Text style={styles.leaveAllocationStatusTitle}>RM Status: </Text>
              <Text
                style={[
                  styles.leaveAllocationStatus,
                  particularTypeStatus(rmStatus),
                ]}>
                {rmStatus || OPEN}
              </Text>
            </View>

            <View style={styles.leaveAllocationStatusSingle}>
              <Text style={styles.leaveAllocationStatusTitle}>
                HOD Status:{' '}
              </Text>
              <Text
                style={[
                  styles.leaveAllocationStatus,
                  particularTypeStatus(hodStatus),
                ]}>
                {hodStatus || OPEN}
              </Text>
            </View>

            <View style={styles.leaveAllocationStatusSingle}>
              <Text style={styles.leaveAllocationStatusTitle}>HR Status: </Text>
              <Text
                style={[
                  styles.leaveAllocationStatus,
                  particularTypeStatus(hrStatus),
                ]}>
                {hrStatus || OPEN}
              </Text>
            </View>
          </View>
        ) : null}
      </Pressable>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {data?.length > 0 && (
        <View style={styles.flatlistContainer}>
          {
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={renderListOfAppliedRequests}
              keyExtractor={keyExtractor}
              onEndReached={loadMoreData} // Load more data when end is reached
              onEndReachedThreshold={0.1}
              style={styles.flatlist}
              refreshing={isRefreshing}
              onRefresh={() => {
                setIsRefreshing(true);
                getLeavesForManager(selectedType, true);
                setIsRefreshing(false);
              }}
            />
          }
        </View>
      )}

      {data?.length === 0 && (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataFoundText}>No data found!</Text>
        </View>
      )}
    </View>
  );
};

export default ApplicationListLayout;
