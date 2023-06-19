import RegularisationList from 'reusableComponents/RegularisationList';

const RegularisationTab = ({employeeID, employeeName}) => {
  const regularisationTabDetailsScreen = 'regularisationTabDetailsScreen';
  return (
    <RegularisationList
      fromRegularisation={true}
      employeeID={employeeID}
      navigateTo={regularisationTabDetailsScreen}
      employeeName={employeeName}
    />
  );
};

export default RegularisationTab;
