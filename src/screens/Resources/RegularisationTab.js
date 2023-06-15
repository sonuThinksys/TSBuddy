import RegularisationList from 'reusableComponents/RegularisationList';

const RegularisationTab = ({employeeID, employeeName, getRegCount}) => {
  const regularisationTabDetailsScreen = 'regularisationTabDetailsScreen';
  return (
    <RegularisationList
      employeeID={employeeID}
      navigateTo={regularisationTabDetailsScreen}
      employeeName={employeeName}
      getRegCount={getRegCount}
    />
  );
};

export default RegularisationTab;
