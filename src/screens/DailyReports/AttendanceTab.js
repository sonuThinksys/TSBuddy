import React from 'react';
import StatusBoxes from './StatusBoxes';
import AllEmployeesList from './AllEmployeesList';

const AttendanceTab = ({
  isLoadingAllEmployees,
  isLoadingDashboard,
  employeeStatusData,
  allEmployees,
}) => {
  return (
    <>
      <StatusBoxes
        isLoadingDashboard={isLoadingDashboard}
        employeeStatusData={employeeStatusData}
      />

      <AllEmployeesList
        allEmployees={allEmployees}
        isLoadingAllEmployees={isLoadingAllEmployees}
      />
    </>
  );
};

export default AttendanceTab;
