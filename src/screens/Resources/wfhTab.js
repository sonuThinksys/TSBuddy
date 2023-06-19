import WorkFromHomeList from 'reusableComponents/WorkFromHomeList';

const WfhTab = ({employeeID, employeeName}) => {
  const workFromHomeLeaveApplyScreenOpen = 'workFromHomeLeaveApplyScreenOpen';
  const workFromHomeLeaveDetailsScreen = 'workFromHomeLeaveDetailsScreen';
  return (
    <WorkFromHomeList
      workFromHomeLeaveApplyScreenOpen={workFromHomeLeaveApplyScreenOpen}
      workFromHomeLeaveDetailsScreen={workFromHomeLeaveDetailsScreen}
      employeeId={employeeID}
    />
  );
};

export default WfhTab;
