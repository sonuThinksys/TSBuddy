import CustomHeader from 'navigation/CustomHeader';
import ResourcesList from 'reusableComponents/ResourcesList';

const RegularisationScreen = ({navigation}) => {
  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Regularisation Resources"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      <ResourcesList navigateToScreen={'RegularisationForm'} />
    </>
  );
};

export default RegularisationScreen;
