import React from 'react';
import {View} from 'react-native';

import styles from './DailyReportsStyles';
import DailyLeaveReportStatus from './DailyLeaveReportStatus';
import AllLeavesList from './AllLeavesList';

const LeaveTabContent = ({
  isLoadingLeave,
  leavesCount,
  leaves,
  selectStartDate,
  selectEndDate,
}) => {
  return (
    <View style={styles.mainLeaveTabContainer}>
      <DailyLeaveReportStatus leavesCount={leavesCount} />
      <AllLeavesList
        leaves={leaves}
        selectStartDate={selectStartDate}
        selectEndDate={selectEndDate}
        isLoadingLeave={isLoadingLeave}
      />
    </View>
  );
};

export default LeaveTabContent;
