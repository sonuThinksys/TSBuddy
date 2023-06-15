import WorkFromHomeList from 'reusableComponents/WorkFromHomeList';

const WfhTab = ({employeeID, employeeName, getWfhCount}) => {
  console.log('employeeID, employeeName, ', employeeID, employeeName);
  const workFromHomeLeaveApplyScreenOpen = 'workFromHomeLeaveApplyScreenOpen';
  const workFromHomeLeaveDetailsScreen = 'workFromHomeLeaveDetailsScreen';
  return (
    <WorkFromHomeList
      workFromHomeLeaveApplyScreenOpen={workFromHomeLeaveApplyScreenOpen}
      workFromHomeLeaveDetailsScreen={workFromHomeLeaveDetailsScreen}
      employeeId={employeeID}
      getWfhCount={getWfhCount}
    />
  );
};

export default WfhTab;
