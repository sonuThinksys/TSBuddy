import React from 'react';
import ApplyLeave from 'screens/leaves/ApplyLeave';

const ApplyLeaveByManager = props => {
  return <ApplyLeave fromApproverEnd={true} {...props} />;
};

export default ApplyLeaveByManager;
