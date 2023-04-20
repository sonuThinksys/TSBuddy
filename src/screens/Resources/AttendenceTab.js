import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import styles from './AttendenceTabStyle';
import AttendenceTabLayout from './AttendenceTabLayout';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetDailyAttendanceByEmpId} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import {Colors} from 'colors/Colors';

const AttendenceTab = ({employeeID}) => {
  const dispatch = useDispatch();
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  const [dailyAttiandance, setDailyAttiandance] = useState([]);
  const [employeeAttendance, setEmployeeAttendance] = useState();
  const [loading, setLoading] = useState(false);

  let year = new Date().getFullYear();
  let month = new Date().getMonth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const getDailyAttaindance = await dispatch(
        GetDailyAttendanceByEmpId({token, employeeID, month, year}),
      );
      setLoading(false);

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
      {dailyAttiandance.length > 0
        ? dailyAttiandance?.map(attendenceData => {
            return (
              <AttendenceTabLayout
                key={attendenceData.attendanceDate}
                data={attendenceData}
                employeeAttendance={employeeAttendance}
              />
            );
          })
        : null}

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={Colors.black} />
        </View>
      ) : null}
    </ScrollView>
  );
};

export default AttendenceTab;
