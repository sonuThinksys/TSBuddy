import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './DailyReportsStyles';
import AttendanceStatusBox from './AttendanceStatusBox';

const StatusBoxes = ({isLoadingDashboard, employeeStatusData}) => {
  return (
    <View style={styles.statusBoxesContainer}>
      {isLoadingDashboard ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
      <AttendanceStatusBox
        title="All Employees"
        percentage={(employeeStatusData?.percentageActive || 'N/A') + '%'}
        count={
          employeeStatusData.employeesActive > 0
            ? employeeStatusData.employeesActive
            : employeeStatusData.employeesActive === 0
            ? 0
            : 'N/A'
        }
      />
      <AttendanceStatusBox
        title="Employees In Office"
        percentage={
          (employeeStatusData?.percentageOffice?.toFixed(2) || 'N/A') + '%'
        }
        count={
          employeeStatusData.employeesOffice > 0
            ? employeeStatusData.employeesOffice
            : employeeStatusData.employeesOffice === 0
            ? 0
            : 'N/A'
        }
      />
      <AttendanceStatusBox
        title="Employees On WFH"
        percentage={
          (employeeStatusData?.percentageWFH?.toFixed(2) || 'N/A') + '%'
        }
        count={
          employeeStatusData.employeesWFH > 0
            ? employeeStatusData.employeesWFH
            : employeeStatusData.employeesWFH === 0
            ? 0
            : 'N/A'
        }
      />
      <AttendanceStatusBox
        title="Absent Employees"
        percentage={
          (employeeStatusData?.percentageAbsent?.toFixed(2) || 'N/A') + '%'
        }
        count={
          employeeStatusData.employeesAbsent > 0
            ? employeeStatusData.employeesAbsent
            : employeeStatusData.employeesAbsent === 0
            ? 0
            : 'N/A'
        }
      />
      <AttendanceStatusBox
        title="Employees On Leave"
        percentage={
          (employeeStatusData?.percentageLeave?.toFixed(2) || 'N/A') + '%'
        }
        count={
          employeeStatusData.employeesLeave > 0
            ? employeeStatusData.employeesLeave
            : employeeStatusData.employeesLeave === 0
            ? 0
            : 'N/A'
        }
      />
    </View>
  );
};

export default StatusBoxes;
