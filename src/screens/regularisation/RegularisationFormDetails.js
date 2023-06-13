import {View, Text} from 'react-native';
import styles from '../leaves/LeavesDetailsStyles';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getEmployeeRegularizationRequest} from 'redux/homeSlice';
import jwt_decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';

const RegularisationFormDetails = ({navigation, route}) => {
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
    designation,
    image,
    employeeName,
    managerInfoDto,
    name,
    cellNumber,
    companyEmail,
  } = route.params;
  const empId = name.split('/')[1];

  const dispatch = useDispatch();

  const [regularisationRequests, setRegularisationRequests] = useState();

  const {userToken: token} = useSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      const getRegularisationRequests = await dispatch(
        getEmployeeRegularizationRequest({token, empId}),
      );
      console.log(
        'getRegularisationRequests.payload ',
        getRegularisationRequests.payload,
      );
      setRegularisationRequests(getRegularisationRequests.payload);
    })();
  }, []);

  //   const applyingDate = `${new Date(data.postingDate).getDate()}-${new Date(
  //     data.fromDate,
  //   ).toLocaleString('default', {month: 'short'})}-${new Date(
  //     data.fromDate,
  //   ).getFullYear()}`;

  //   const rangeOfdate = item =>
  //     `${new Date(item.fromDate).getDate()}-${new Date(
  //       item.fromDate,
  //     ).toLocaleString('default', {month: 'short'})}-${new Date(
  //       item.fromDate,
  //     ).getFullYear()} to ${new Date(item.toDate).getDate()}-${new Date(
  //       item.toDate,
  //     ).toLocaleString('default', {month: 'short'})}-${new Date(
  //       item.toDate,
  //     ).getFullYear()}`;

  // [{"approverId": null,
  //  "attendanceDate": "2023-06-07T00:00:00",
  //   "attendanceId": 6435,
  //    "attendanceType": "Full Day",
  //     "comment": "Missed Punch-Out",
  //      "creation": "2023-06-08T14:18:48+05:30",
  //      "employeeId": 10868,
  //       "halfDayInfo": null,
  //       "mode": "Office",
  //        "modified": "2023-06-08T14:18:48+05:30",
  //        "modifiedBy": null,
  //         "reasonId": 4,
  //          "regularizationId": 18,
  //           "status": "Open"},
  // //
  const details = [
    ['Employee Name', employeeName],
    ['Leave Approver', '-----'],
    ['Comment', regularisationRequests[0].comment],
    ['Mode', regularisationRequests[0].mode],
    ['Attendance Date', regularisationRequests[0].attendanceDate],
    ['Attendance Type', regularisationRequests[0].attendanceType],
    ['Status', regularisationRequests[0].status],
    ['Reason', regularisationRequests[0].reasonId],
  ];
  console.log('---regularisation---', regularisationRequests);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {/* {data.totalLeaveDays} {data.leaveType} {data.status} */}A B C
        </Text>
      </View>
      <View>{details.map((item, index) => card(item[0], item[1], index))}</View>
    </View>
  );
};

export default RegularisationFormDetails;
