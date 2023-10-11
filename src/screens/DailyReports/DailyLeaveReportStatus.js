import React from 'react';
import {View} from 'react-native';
import styles from './DailyReportsStyles';
import AttendanceStatusBox from './AttendanceStatusBox';

const DailyLeaveReportStatus = ({leavesCount}) => {
  const calculatePercentage = (valueToCalc, baseValue) =>
    ((valueToCalc / baseValue) * 100).toFixed(2);
  return (
    <View style={styles.statusBoxesContainer}>
      <AttendanceStatusBox
        title="All Leaves"
        percentage="100%"
        count={leavesCount.all >= 0 ? leavesCount.all : 'N/A'}
      />
      <AttendanceStatusBox
        title="Open Leaves"
        percentage={calculatePercentage(leavesCount.open, leavesCount.all)}
        count={leavesCount.open >= 0 ? leavesCount.open : 'N/A'}
      />
      <AttendanceStatusBox
        title="Approved Leaves"
        percentage={calculatePercentage(leavesCount.approve, leavesCount.all)}
        count={leavesCount.approve >= 0 ? leavesCount.approve : 'N/A'}
      />
      <AttendanceStatusBox
        title="Rejected Leaves"
        percentage={calculatePercentage(leavesCount.reject, leavesCount.all)}
        count={leavesCount.reject >= 0 ? leavesCount.reject : 'N/A'}
      />
      <AttendanceStatusBox
        title="Dismissed Leaves"
        percentage={calculatePercentage(leavesCount.dismiss, leavesCount.all)}
        count={leavesCount.dismiss >= 0 ? leavesCount.dismiss : 'N/A'}
      />
    </View>
  );
};

export default DailyLeaveReportStatus;
