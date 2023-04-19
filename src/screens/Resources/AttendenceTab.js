import {Text, View, ScrollView} from 'react-native';
import styles from './AttendenceTabStyle';
import AttendenceTabLayout from './AttendenceTabLayout';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetDailyAttendanceByEmpId} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';

const AttendenceTab = ({employeeID}) => {
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

      const {dailyAttendance, employeeAttendance} =
        (getDailyAttaindance?.payload &&
          getDailyAttaindance?.payload.length &&
          getDailyAttaindance?.payload[0]) ||
        {};

      setDailyAttiandance(dailyAttendance);
      setEmployeeAttendance(employeeAttendance);

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
