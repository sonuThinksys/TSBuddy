import {View, Text, FlatList, Pressable} from 'react-native';
import styles from './ApplicationListLayoutStyle';
import React, {useCallback} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import ApprovedIcon from 'assets/newDashboardIcons/circle-check.svg';
import RejectedIcon from 'assets/newDashboardIcons/ban.svg';
import PendingIcon from 'assets/newDashboardIcons/circle-minus.svg';
import {FontFamily} from 'constants/fonts';
import {Colors} from 'colors/Colors';
import Loader from 'component/LoadingScreen/LoadingScreen';

const ApplicationListLayout = ({
  data,
  loading,
  navigation,
  isRegularisation,
}) => {
  console.log('navigation', navigation);
  const keyExtractor = useCallback(item => Math.random() * Math.random(), []);
  const renderListOfAppliedRequests = useCallback(
    ({item}) => {
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

      const empFullName =
        item.firstName && item.middleName && item.lastName
          ? `${item.firstName} ${item.middleName} ${item.lastName}`
          : item.firstName && item.lastName
          ? `${item.firstName} ${item.lastName}`
          : item.firstName && item.middleName
          ? `${item.firstName} ${item.middleName}`
          : item.firstName;

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
              <View
                style={{
                  alignItems: 'center',
                  marginRight: wp(1),
                }}>
                <Text
                  style={{fontSize: 25, fontFamily: FontFamily.RobotoLight}}>
                  {item?.totalLeaveDays < 9 ? '0' : null}
                  {item?.totalLeaveDays}
                </Text>
                {!isRegularisation ? (
                  <Text
                    style={{fontSize: 12, fontFamily: FontFamily.RobotoMedium}}>
                    {item?.totalLeaveDays === 1 ? 'Day' : 'Days'}
                  </Text>
                ) : (
                  <Text
                    style={{fontSize: 12, fontFamily: FontFamily.RobotoMedium}}>
                    Emp/{item?.employeeId}
                  </Text>
                )}
              </View>
              <View style={{marginLeft: 20, marginTop: 4}}>
                {!isRegularisation ? (
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: FontFamily.RobotoRegular,
                      color: Colors.dune,
                      marginBottom: hp(1),
                    }}>
                    {formattedStartDate} - {formattedEndDate}
                  </Text>
                ) : (
                  <Text>{empFullName}</Text>
                )}
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 11, color: Colors.lightGray1}}>
                    {!isRegularisation ? 'Applied on: ' : 'Attendance Date '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Colors.lightGray1,
                      fontFamily: FontFamily.RobotoMedium,
                    }}>
                    {!isRegularisation ? appliedDate : regulariseAttendanceDate}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {item.status?.toLowerCase() === 'open' ? (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <PendingIcon
                    fill={Colors.gold}
                    height={20}
                    width={20}
                    marginBottom={4}
                  />
                  <Text style={{fontSize: 12, color: Colors.gold}}>Open</Text>
                </View>
              ) : item.status?.toLowerCase() === 'dismissed' ||
                item.status?.toLowerCase() === 'rejected' ? (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <RejectedIcon
                    fill={Colors.darkBrown}
                    height={20}
                    width={20}
                    marginBottom={4}
                  />
                  <Text style={{fontSize: 12, color: Colors.darkBrown}}>
                    {item.status}
                  </Text>
                </View>
              ) : (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <ApprovedIcon
                    fill={Colors.darkLovelyGreen}
                    height={20}
                    width={20}
                    marginBottom={4}
                  />
                  <Text style={{fontSize: 12, color: Colors.darkLovelyGreen}}>
                    {item.status || 'Approved'}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Pressable>
      );
    },
    [data],
  );
  return (
    <View>
      {data?.length > 0 && (
        <View>
          {loading ? (
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Loader />
            </View>
          ) : (
            <FlatList
              style={{height: '95%'}}
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={renderListOfAppliedRequests}
              keyExtractor={keyExtractor}
            />
          )}
        </View>
      )}

      {data?.length == 0 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: FontFamily.RobotoMedium,
              fontSize: 16,
              color: Colors.lightBlue,
              marginVertical: 4,
            }}>
            No data found!
          </Text>
        </View>
      )}
    </View>
  );
};

export default ApplicationListLayout;
