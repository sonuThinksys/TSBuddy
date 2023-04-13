import {Text, View} from 'react-native';
import styles from './AttendenceTabStyles';
import AttendenceTabLayout from './AttendenceTabLayout';

const AttendenceTab = () => {
  const attendenceData = [
    {
      date: '11 Apr 2023',
      inTime: '10:20:05',
      outTime: '19:10:56',
      totalHours: '10:20:43',
      effectiveHours: '10:20:43',
    },
    {
      date: '10 Apr 2023',
      inTime: '09:20:05',
      outTime: '18:41:06',
      totalHours: '10:20:43',
      effectiveHours: '10:20:43',
    },
    {
      date: '09 Apr 2023',
      inTime: '10:20:05',
      outTime: ':19:10:56',
      totalHours: '10:20:43',
      effectiveHours: '10:20:43',
    },
    {
      date: '08 Apr 2023',
      inTime: '10:20:05',
      outTime: '19:10:56',
      totalHours: '10:20:43',
      effectiveHours: '10:20:43',
    },
    {
      date: '07 Apr 2023',
      inTime: '10:20:05',
      outTime: '19:10:56',
      totalHours: '10:20:43',
      effectiveHours: '10:20:43',
    },
  ];

  return (
    <View style={styles.mainContainer}>
      {attendenceData.map(attendenceData => (
        <AttendenceTabLayout data={attendenceData} />
      ))}
      {/* <AttendenceTabLayout data={attendenceData[0]} />
      <AttendenceTabLayout />
      <AttendenceTabLayout />
      <AttendenceTabLayout />
      <AttendenceTabLayout />
      <AttendenceTabLayout /> */}
    </View>
  );
};

export default AttendenceTab;
