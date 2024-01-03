import {View, Text, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from 'navigation/CustomHeader';
import styles from './ApplicationDetailsLayoutStyle';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateAttRegularizeStatus,
  updateLeaveAllocationRequest,
  updateLeaveStatus,
} from 'redux/homeSlice';
import {Colors} from 'colors/Colors';
import {widthPercentageToDP as wp} from 'utils/Responsive';
import Loader from 'component/loader/Loader';
import jwt_decode from 'jwt-decode';
import {getCurrentFiscalYear} from 'utils/utils';

const ApplicationDetailsLayout = ({route, navigation}) => {
  const isLeaveAllocationRequest = route.params.isLeaveAllocationRequest;
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
    allocationDate,
    leaveAllocationId,
  } = route.params.item;
  const isAllocationOpen = route.params.item.status.toLowerCase() === 'open';

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
  const {emailId, role, id: managerId} = jwt_decode(token);

  let designation;
  if (role.includes('HR Manager')) {
    designation = 'HR';
  } else if (role.includes('Head Of Department')) {
    designation = 'HOD';
  } else if (role.includes('Leave Approver')) {
    designation = 'RM';
  }

  console.log('designation:', designation);
  const [isLoading, setIsLoading] = useState(false);

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

  const applyingDate = `${new Date(
    isLeaveAllocationRequest ? allocationDate : postingDate,
  ).getDate()}-${new Date(
    isLeaveAllocationRequest ? allocationDate : postingDate,
  ).toLocaleString('default', {
    month: 'short',
  })}-${new Date(
    isLeaveAllocationRequest ? allocationDate : postingDate,
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
    !isLeaveAllocationRequest && ['Leave Approver', approverFullName],
    ['Leave Type', leaveType],
    !isLeaveAllocationRequest && [
      'Leave Time Period',
      rangeOfdate(fromDate, toDate),
    ],
    ['Leave Status', status],
    ['Number Of Leaves', totalLeaveDays],
    ['Leave Balance', currentLeaveBalance || 'N/A'],
    ['Applying Date', applyingDate || 'N/A'],
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
    try {
      setIsLoading(true);
      let response;
      if (isLeaveAllocationRequest) {
        response =
          token &&
          (await dispatch(
            updateLeaveAllocationRequest({
              token,
              body: {
                leaveAllocationId,
                employeeId,
                daysRequested: totalLeaveDays,
                status: finalStatus,
                leaveType: leaveType,
                approvalType: designation,
                approverId: managerId,
                approvalDate: allocationDate,
                fiscalYear: getCurrentFiscalYear(),
                totalLeavesAllocated: role.includes('HR Manager')
                  ? totalLeaveDays
                  : 0,
                currentLeaveBalance: role.includes('HR Manager')
                  ? totalLeaveDays
                  : 0,
                postingDate: allocationDate,
              },
            }),
          ));
      } else {
        response =
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
      }

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
    } catch (err) {
      console.log('errUpdating:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegularisation = async finalStatus => {
    try {
      setIsLoading(true);
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
    } catch (err) {
      console.log('errUpdating:', err);
    } finally {
      setIsLoading(false);
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
            {details?.map((item, index) => {
              if (item) {
                return card(item[0], item[1], index);
              }
            })}
          </View>
        ) : (
          <View>
            {regulariseDetails?.map((item, index) =>
              card(item[0], item[1], index),
            )}
          </View>
        )}
      </View>
      {!isRegularisation &&
        (isAllocationOpen ? (
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
        ) : null)}

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
      {isLoading ? <Loader /> : null}
    </>
  );
};

export default ApplicationDetailsLayout;
