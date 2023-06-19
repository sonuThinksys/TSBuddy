import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styles from './AttendenceTabStyle';
import AttendenceTabLayout from './AttendenceTabLayout';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetDailyAttendanceByEmpId} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import {Colors} from 'colors/Colors';
import Loader from 'component/LoadingScreen/LoadingScreen';

const AttendenceTab = ({employeeID, employeeName}) => {
  const dispatch = useDispatch();
  const {userToken: token} = useSelector(state => state.auth);

  const [attendenceArray, setAttendenceArray] = useState([]);
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

      const outputAttendance = getDailyAttaindance.payload;
      setAttendenceArray(outputAttendance);

      // const {dailyAttendance, employeeAttendance} =
      //   (getDailyAttaindance?.payload &&
      //     getDailyAttaindance?.payload?.length &&
      //     getDailyAttaindance?.payload[0]) ||
      //   {};

      // setAttendenceArray(dailyAttendance);
      // setEmployeeAttendance(employeeAttendance);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.mainContainer}>
      {attendenceArray?.length > 0
        ? attendenceArray?.map(attendenceData => {
            return (
              <AttendenceTabLayout
                key={attendenceData.attendanceDate}
                data={attendenceData}
                employeeName={employeeName}
              />
            );
          })
        : null}
    </ScrollView>
  );
};

export default AttendenceTab;
