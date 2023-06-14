import RegularisationList from 'reusableComponents/RegularisationList';

const RegularisationTab = ({employeeID, employeeName}) => {
  const regularisationTabDetailsScreen = 'regularisationTabDetailsScreen';
  return (
    <RegularisationList
      employeeID={employeeID}
      navigateTo={regularisationTabDetailsScreen}
      employeeName={employeeName}
    />
  );
};

export default RegularisationTab;
