import {View, Text, FlatList, Pressable} from 'react-native';
import styles from './ApplicationListLayoutStyle';
import React, {useCallback, useState} from 'react';

import ApprovedIcon from 'assets/newDashboardIcons/circle-check.svg';
import RejectedIcon from 'assets/newDashboardIcons/ban.svg';
import PendingIcon from 'assets/newDashboardIcons/circle-minus.svg';
import {Colors} from 'colors/Colors';
import Loader from 'component/LoadingScreen/LoadingScreen';
import {useNavigation} from '@react-navigation/native';

const ApplicationListLayout = ({
  data,
  loading,
  isRegularisation,
  loadMoreData,
  getLeavesForManager,
  selectedType,
}) => {
  console.log('dataaa:', data);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigation = useNavigation();
  const keyExtractor = useCallback(item => Math.random() * Math.random(), []);
  const renderListOfAppliedRequests = ({item}) => {
    const options = {month: 'short', day: '2-digit', year: 'numeric'};

    const formattedStartDate = new Date(item?.fromDate)?.toLocaleDateString(
      'en-US',
      options,
    );

    const formattedEndDate = new Date(item?.toDate)?.toLocaleDateString(
      'en-US',
      options,
    );

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

    return (
      <Pressable
        onPress={() => {
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
                <Text style={styles.dates}>
                  {formattedStartDate} - {formattedEndDate}
                </Text>
              ) : (
                <Text>{empFullName}</Text>
              )}
              <View style={styles.reguCont}>
                <Text style={styles.reguText}>
                  {!isRegularisation ? 'Applied on: ' : 'Attendance Date '}
                </Text>
                <Text style={styles.reguTitleText}>
                  {!isRegularisation ? appliedDate : regulariseAttendanceDate}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.statusContainer}>
            {item.status?.toLowerCase() === 'open' ? (
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
              item.status?.toLowerCase() === 'rejected' ? (
              <View style={styles.iconContainer}>
                <RejectedIcon
                  fill={Colors.darkBrown}
                  height={20}
                  width={20}
                  marginBottom={4}
                />
                <Text style={styles.statusText2}>{item.status}</Text>
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
      </Pressable>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {data?.length > 0 && (
        <View style={styles.flatlistContainer}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <Loader />
            </View>
          ) : (
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
          )}
        </View>
      )}

      {data?.length === 0 && !loading && (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataFoundText}>No data found!</Text>
        </View>
      )}
    </View>
  );
};

export default ApplicationListLayout;
