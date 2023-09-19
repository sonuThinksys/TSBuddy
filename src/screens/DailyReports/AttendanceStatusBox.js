import React from 'react';
import {Text, View} from 'react-native';
import styles from './DailyReportsStyles';

const AttendanceStatusBox = ({title, count, percentage}) => {
  return (
    <View style={styles.attendanceStatusContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.statusTitleText}>{title}</Text>
      </View>
      <View style={styles.statusBottomContainer}>
        <Text style={styles.countText}>{count}</Text>
        <View style={styles.percentageContainer}>
          <Text style={styles.percentageColor}>{percentage}</Text>
        </View>
      </View>
    </View>
  );
};

export default AttendanceStatusBox;
