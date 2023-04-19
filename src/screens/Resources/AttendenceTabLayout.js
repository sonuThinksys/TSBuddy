import {Image, Pressable, Text, View} from 'react-native';
import styles from './AttendenceTabLayoutStyles';
import {useNavigation} from '@react-navigation/native';
import OfficeIcon from 'assets/Icons/office.png';

const AttendenceTabLayout = ({data, employeeAttendance = []}) => {
  const attendenceDate = data?.attendanceDate;
  const inTime = data?.inTime;
  const outTime = data?.outTime;
  const totalHours = data?.totalHours;
  const effectiveHours = data?.totalEffectiveHours;
  const status = data?.status;
  const navigation = useNavigation();

  const attDate = attendenceDate?.split('T')[0];
  const intime = inTime?.split('T')[1];
  const outtime = outTime?.split('T')[1];
  const totalHrs = totalHours?.toFixed(2);
  const effectHrs = effectiveHours?.toFixed(2);

  const fiscalYear =
    employeeAttendance.length && employeeAttendance[0]?.fiscalYear;
  const employeeName =
    employeeAttendance.length && employeeAttendance[0]?.employeeName;

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('attaindanceDetailsScreen', {
          attDate,
          intime,
          outtime,
          totalHrs,
          effectHrs,
          status,
          employeeName,
          fiscalYear,
        });
        console.log('Pressed!');
      }}
      style={styles.mainContainer}>
      <View style={styles.left}>
        <Image
          source={OfficeIcon}
          style={{width: 40, height: 40, borderRadius: 10}}
        />
      </View>
      <View style={styles.right}>
        <View style={styles.dateCont}>
          <Text style={styles.dateText}>{attDate}</Text>
        </View>
        <View style={styles.inOutTimeCont}>
          <View style={styles.inOutSubCont}>
            <Text style={styles.timeHeading}>In Time : </Text>
            <Text style={styles.time}>{intime}</Text>
          </View>
          <View style={styles.inOutSubCont}>
            <Text style={styles.timeHeading}>Out Time : </Text>
            <Text style={styles.time}>{outtime}</Text>
          </View>
        </View>
        <View style={styles.totalEffHours}>
          <View style={styles.totalHoursSubCont}>
            <Text style={styles.hourHeading}>Total Hour : </Text>
            <Text style={styles.time}>{totalHrs}</Text>
          </View>
          <View style={styles.totalHoursSubCont}>
            <Text style={styles.hourHeading}>Effec. Hour : </Text>
            <Text style={styles.time}>{effectHrs}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default AttendenceTabLayout;
