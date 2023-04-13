import {Image, Pressable, Text, View} from 'react-native';
import styles from './AttendenceTabLayoutStyles';
import OfficeIcon from 'assets/Icons/office.png';

const AttendenceTabLayout = ({data}) => {
  const attendenceDate = data?.date;
  const inTime = data?.inTime;
  const outTime = data?.outTime;
  const totalHours = data?.totalHours;
  const effectiveHours = data?.effectiveHours;

  return (
    <Pressable
      onPress={() => {
        console.log('Pressed!');
      }}
      style={styles.mainContainer}>
      <View style={styles.left}>
        <Image source={OfficeIcon} style={{width: 40, height: 40}} />
      </View>
      <View style={styles.right}>
        <View style={styles.dateCont}>
          <Text style={styles.dateText}>{attendenceDate}</Text>
        </View>
        <View style={styles.inOutTimeCont}>
          <View style={styles.inOutSubCont}>
            <Text style={styles.timeHeading}>In Time : </Text>
            <Text style={styles.time}>{inTime}</Text>
          </View>
          <View style={styles.inOutSubCont}>
            <Text style={styles.timeHeading}>Out Time : </Text>
            <Text style={styles.time}>{outTime}</Text>
          </View>
        </View>
        <View style={styles.totalEffHours}>
          <View style={styles.totalHoursSubCont}>
            <Text style={styles.hourHeading}>Total Hour : </Text>
            <Text style={styles.time}>{totalHours}</Text>
          </View>
          <View style={styles.totalHoursSubCont}>
            <Text style={styles.hourHeading}>Effec. Hour : </Text>
            <Text style={styles.time}>{effectiveHours}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default AttendenceTabLayout;
