import WorkFromHomeList from 'reusableComponents/WorkFromHomeList';

const WfhTab = ({
  employeeID,
  employeeName,
  fromResource,
  resourceEmployeeID,
}) => {
  const workFromHomeLeaveApplyScreenOpen = 'workFromHomeLeaveApplyScreenOpen';
  const workFromHomeLeaveDetailsScreen = 'workFromHomeLeaveDetailsScreen';
  return (
    <WorkFromHomeList
      fromResource={fromResource}
      workFromHomeLeaveApplyScreenOpen={workFromHomeLeaveApplyScreenOpen}
      workFromHomeLeaveDetailsScreen={workFromHomeLeaveDetailsScreen}
      employeeId={employeeID}
      resourceEmployeeID={resourceEmployeeID}
    />
  );
};

export default WfhTab;
