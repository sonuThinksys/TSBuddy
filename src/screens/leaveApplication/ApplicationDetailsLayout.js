import {View, Text, Pressable, Alert} from 'react-native';
import React from 'react';
import CustomHeader from 'navigation/CustomHeader';
import styles from './ApplicationDetailsLayoutStyle';
import {useDispatch, useSelector} from 'react-redux';
import {updateAttRegularizeStatus, updateLeaveStatus} from 'redux/homeSlice';
import {Colors} from 'colors/Colors';
import {widthPercentageToDP as wp} from 'utils/Responsive';

const ApplicationDetailsLayout = ({route, navigation}) => {
  const {
    employeeId,
    firstName,
    middleName,
    lastName,
    leaveApplicationId,
    fromDate,
    toDate,
    leaveType,
    totalLeaveDays,
    status,
    description,
    currentLeaveBalance,
    postingDate,
    leaveApproverFirstName,
    leaveApproverMiddleName,
    leaveApproverLastName,
    attendanceId,
    attendanceDate,
    reasonId,
    attendanceType,
    comment,
    mode,
    regularizationId,
  } = route.params.item;

  const card = (leftText, rightText, index) => {
    return (
      <View key={index} style={styles.card}>
        <View>
          <Text style={styles.cardLeftText}>{leftText}</Text>
        </View>
        <View style={styles.cardRightTextContainer}>
          <Text style={{width: wp(60)}}>{rightText}</Text>
        </View>
      </View>
    );
  };

  const isRegularisation = route.params.isRegularisation || false;

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

  const attendanceDateFormated = `${new Date(
    attendanceDate,
  ).getDate()}-${new Date(attendanceDate).toLocaleString('default', {
    month: 'short',
  })}-${new Date(attendanceDate).getFullYear()}`;

  const rangeOfdate = (fromDateObj, toDateObj) =>
    `${new Date(fromDateObj).getDate()}-${new Date(fromDateObj).toLocaleString(
      'default',
      {month: 'short'},
    )}-${new Date(fromDateObj).getFullYear()} to ${new Date(
      toDateObj,
    ).getDate()}-${new Date(toDateObj).toLocaleString('default', {
      month: 'short',
    })}-${new Date(toDateObj).getFullYear()}`;

  const regularisationReasons = [
    'Not Carrying Access Card',
    'Access Card Not Working',
    'Missed Punch-In',
    'Missed Punch-Out',
  ];
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

  const regulariseDetails = [
    ['Employee Name', empFullName],
    ['Leave Approver', approverFullName],
    ['Attendance Id', attendanceId],
    ['Attendance Date', attendanceDateFormated],
    ['Reason', regularisationReasons[reasonId - 1]],
    ['Attendance Type', attendanceType],
    ['Mode', mode],
    ['Comment', comment],
  ];

  const finalizeLeave = async finalStatus => {
    const empId = employeeId;
    const response =
      token &&
      (await dispatch(
        updateLeaveStatus({
          token,
          body: {
            employeeId: empId,
            leaveApplicationId: leaveApplicationId,
            status: finalStatus,
            leaveType: leaveType,
          },
        }),
      ));

    if (response?.error) {
      // alert(response?.error?.message);
      Alert.alert('Failed', `Leave ${finalStatus} failed!`, [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } else {
      Alert.alert('Success', `Leave ${finalStatus} successfully!`, [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  const handleRegularisation = async finalStatus => {
    const updateAttRegularize = await dispatch(
      updateAttRegularizeStatus({
        token,
        body: {
          regularizationId: regularizationId,
          attendanceDate: attendanceDate,
          employeeId: employeeId,
          status: finalStatus,
          attendanceType: attendanceType,
        },
      }),
    );
    if (updateAttRegularize?.error) {
      alert(updateAttRegularize.error.message);
    } else {
      Alert.alert('Success', 'Updated successfully!', [
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
          {!isRegularisation ? (
            <Text style={styles.headerText}>
              {totalLeaveDays} {leaveType} {status}
            </Text>
          ) : (
            <Text style={styles.headerText}>Emp/{employeeId}</Text>
          )}
        </View>
        {!isRegularisation ? (
          <View>
            {details?.map((item, index) => card(item[0], item[1], index))}
          </View>
        ) : (
          <View>
            {regulariseDetails?.map((item, index) =>
              card(item[0], item[1], index),
            )}
          </View>
        )}
      </View>
      {!isRegularisation && (
        <View style={styles.btnContainer}>
          <Pressable
            style={
              ([styles.resourceButton],
              {
                backgroundColor: Colors.reddishTint,
                padding: 14,
                width: wp(30),
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
                width: wp(30),
                alignItems: 'center',
                padding: 14,
                borderRadius: 15,
              })
            }
            onPress={finalizeLeave.bind(null, 'Approved')}>
            <Text style={styles.applyText}>Approve</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.regularisationBtnContainer}>
        {isRegularisation && status === 'Approved' ? (
          <Pressable
            style={
              ([styles.resourceButton],
              {
                backgroundColor: Colors.reddishTint,
                padding: 14,
                width: wp(30),
                alignItems: 'center',
                borderRadius: 15,
              })
            }
            onPress={handleRegularisation.bind(null, 'Rejected')}>
            <Text style={styles.applyText}>Reject</Text>
          </Pressable>
        ) : isRegularisation && status === 'Rejected' ? (
          <Pressable
            style={
              ([styles.resourceButton],
              {
                backgroundColor: Colors.lovelyGreen,
                width: wp(30),
                alignItems: 'center',
                padding: 14,
                borderRadius: 15,
              })
            }
            onPress={handleRegularisation.bind(null, 'Approved')}>
            <Text style={styles.applyText}>Approve</Text>
          </Pressable>
        ) : isRegularisation && status.toLowerCase() === 'open' ? (
          <View style={styles.btnContainer}>
            <Pressable
              style={
                ([styles.resourceButton],
                {
                  backgroundColor: Colors.reddishTint,
                  padding: 14,
                  width: wp(30),
                  alignItems: 'center',
                  borderRadius: 15,
                  margin: 5,
                })
              }
              onPress={handleRegularisation.bind(null, 'Rejected')}>
              <Text style={styles.applyText}>Reject</Text>
            </Pressable>
            <Pressable
              style={
                ([styles.resourceButton],
                {
                  backgroundColor: Colors.lovelyGreen,
                  width: wp(30),
                  alignItems: 'center',
                  padding: 14,
                  borderRadius: 15,
                  margin: 5,
                })
              }
              onPress={handleRegularisation.bind(null, 'Approved')}>
              <Text style={styles.applyText}>Approve</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </>
  );
};

export default ApplicationDetailsLayout;
