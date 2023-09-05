import {View, Text, Pressable, Alert} from 'react-native';
import React from 'react';
import CustomHeader from 'navigation/CustomHeader';
import styles from './ApplicationDetailsLayoutStyle';
import {useDispatch, useSelector} from 'react-redux';
import {updateLeaveStatus} from 'redux/homeSlice';
import {Colors} from 'colors/Colors';
import {widthPercentageToDP} from 'utils/Responsive';

const ApplicationDetailsLayout = ({route, navigation}) => {
  const card = (leftText, rightText, index) => {
    return (
      <View key={index} style={styles.card}>
        <View>
          <Text style={styles.cardLeftText}>{leftText}</Text>
        </View>
        <View style={styles.cardRightTextContainer}>
          <Text>{rightText}</Text>
        </View>
      </View>
    );
  };

  const {
    employeeId,
    firstName,
    middleName,
    lastName,
    leaveApplicationId,
    fromDate,
    toDate,
    halfDay,
    leaveType,
    totalLeaveDays,
    status,
    description,
    currentLeaveBalance,
    postingDate,
    fiscalYear,
    leaveApproverFirstName,
    leaveApproverMiddleName,
    leaveApproverLastName,
  } = route.params.item;

  const dispatch = useDispatch();
  const {userToken: token} = useSelector(state => state.auth);

  const empFullName =
    firstName && middleName && lastName
      ? `${firstName} ${middleName} ${lastName}`
      : firstName && lastName
      ? `${firstName} ${lastName}`
      : firstName && middleName
      ? `${firstName} ${middleName}`
      : firstName;

  const approverFullName =
    leaveApproverFirstName && leaveApproverMiddleName && leaveApproverLastName
      ? `${leaveApproverFirstName} ${leaveApproverMiddleName} ${leaveApproverLastName}`
      : leaveApproverFirstName && leaveApproverLastName
      ? `${leaveApproverFirstName} ${leaveApproverLastName}`
      : leaveApproverFirstName && leaveApproverMiddleName
      ? `${leaveApproverFirstName} ${leaveApproverMiddleName}`
      : leaveApproverFirstName;

  const applyingDate = `${new Date(postingDate).getDate()}-${new Date(
    postingDate,
  ).toLocaleString('default', {month: 'short'})}-${new Date(
    fromDate,
  ).getFullYear()}`;

  const rangeOfdate = (fromDate, toDate) =>
    `${new Date(fromDate).getDate()}-${new Date(fromDate).toLocaleString(
      'default',
      {month: 'short'},
    )}-${new Date(fromDate).getFullYear()} to ${new Date(
      toDate,
    ).getDate()}-${new Date(toDate).toLocaleString('default', {
      month: 'short',
    })}-${new Date(toDate).getFullYear()}`;

  const details = [
    ['Employee Name', empFullName],
    ['Leave Approver', approverFullName],
    ['Leave Type', leaveType],
    ['Leave Time Period', rangeOfdate(fromDate, toDate)],
    ['Leave Status', status],
    ['Number Of Leaves', totalLeaveDays],
    ['Leave Balance', currentLeaveBalance || 'N/A'],
    ['Applying Date', applyingDate || '04/05/2023'],
    ['Reason', description || 'N/A'],
  ];

  const finalizeLeave = async status => {
    const empId = employeeId;
    const response =
      token &&
      (await dispatch(
        updateLeaveStatus({
          token,
          body: {
            employeeId: empId,
            leaveApplicationId: leaveApplicationId,
            status: status,
            leaveType: leaveType,
          },
        }),
      ));

    if (response?.error) {
      // alert(response?.error?.message);
      Alert.alert('Failed', `Leave ${status} failed!`, [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } else {
      Alert.alert('Success', `Leave ${status} successfully!`, [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  return (
    <>
      <CustomHeader
        showDrawerMenu={false}
        title="Leave Application Details"
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
      />
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {totalLeaveDays} {leaveType} {status}
          </Text>
        </View>
        <View>
          {details?.map((item, index) => card(item[0], item[1], index))}
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={
            ([styles.resourceButton],
            {
              backgroundColor: Colors.reddishTint,
              padding: 14,
              width: widthPercentageToDP(30),
              alignItems: 'center',
              borderRadius: 15,
            })
          }
          onPress={finalizeLeave.bind(null, 'Rejected')}>
          <Text style={styles.applyText}>Reject</Text>
        </Pressable>
        <Pressable
          style={
            ([styles.resourceButton],
            {
              backgroundColor: Colors.lovelyGreen,
              width: widthPercentageToDP(30),
              alignItems: 'center',
              padding: 14,
              borderRadius: 15,
            })
          }
          onPress={finalizeLeave.bind(null, 'Approved')}>
          <Text style={styles.applyText}>Approve</Text>
        </Pressable>
      </View>
    </>
  );
};

export default ApplicationDetailsLayout;
