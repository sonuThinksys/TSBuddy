import CustomHeader from 'navigation/CustomHeader';
import ResourcesList from 'reusableComponents/ResourcesList';

const WorkFromHome = ({navigation}) => {
  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title={'Work From Home'}
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      <ResourcesList navigateToScreen={'WFHDetailsScreen'} />
    </>
  );
};

export default WorkFromHome;
