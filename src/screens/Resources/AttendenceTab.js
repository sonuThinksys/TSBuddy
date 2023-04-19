import {Text, View, ScrollView} from 'react-native';
import styles from './AttendenceTabStyle';
import AttendenceTabLayout from './AttendenceTabLayout';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetDailyAttendanceByEmpId} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';

const AttendenceTab = ({employeeID}) => {
  const attendenceData = [
    {
      date: '11 Apr 2023',
      inTime: '10:20:05',
      outTime: '19:10:56',
      totalHours: '10:20:43',
      effectiveHours: '10:20:43',
      employeeName: 'Roshan Jambhulkar',
      status: 'Present',
    },
    {
      date: '10 Apr 2023',
      inTime: '09:20:05',
      outTime: '18:41:06',
      totalHours: '10:20:43',
      effectiveHours: '10:20:43',
      employeeName: 'Tarun Ahirwar',
      status: 'Present',
    },
    {
      date: '09 Apr 2023',
      inTime: '10:20:05',
      outTime: ':19:10:56',
      totalHours: '10:20:43',
      effectiveHours: '10:20:43',
      employeeName: 'Siddesh Patil',
      status: 'Present',
    },
    {
      date: '08 Apr 2023',
      inTime: '10:20:05',
      outTime: '19:10:56',
      totalHours: '10:20:43',
      effectiveHours: '10:20:43',
      employeeName: 'Arun Kapur',
      status: 'Present',
    },
    {
      date: '07 Apr 2023',
      inTime: '10:20:05',
      outTime: '19:10:56',
      totalHours: '10:20:43',
      effectiveHours: '10:20:43',
      employeeName: 'Utkarsh Gupta',
      status: 'Present',
    },
  ];

  const dispatch = useDispatch();
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  const [dailyAttiandance, setDailyAttiandance] = useState();
  const [employeeAttendance, setEmployeeAttendance] = useState();

  let year = new Date().getFullYear();
  let month = new Date().getMonth();

  useEffect(() => {
    (async () => {
      const getDailyAttaindance = await dispatch(
        GetDailyAttendanceByEmpId({token, employeeID, month, year}),
      );

      setDailyAttiandance(getDailyAttaindance.payload[0].dailyAttendance);
      setEmployeeAttendance(getDailyAttaindance.payload[0].employeeAttendance);

      // console.log(
      //   'getdailyAttendance =====',
      //   getDailyAttaindance.payload[0].dailyAttendance,
      // );

      if (getDailyAttaindance?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: getDailyAttaindance?.error?.message,
          buttonText: 'Close',
          dispatch,
        });
      }
    })();
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      {dailyAttiandance?.map(attendenceData => (
        <AttendenceTabLayout
          key={dailyAttiandance?.employeeAttendance?.employee}
          data={attendenceData}
          employeeAttendance={employeeAttendance}
        />
      ))}
    </ScrollView>
  );
};

export default AttendenceTab;
