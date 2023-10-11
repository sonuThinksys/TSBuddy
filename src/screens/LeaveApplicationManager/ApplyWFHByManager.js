import React from 'react';
import ApplyWFH from 'screens/applyWFH.js/ApplyWFH';

const ApplyWFHByManager = props => {
  return <ApplyWFH fromApproverEnd={true} {...props} />;
};

export default ApplyWFHByManager;
