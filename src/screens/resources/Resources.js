import ResourcesList from 'reusableComponents/ResourcesList';
import {ResourcesDetailsScreen} from 'navigation/Route';
import CustomHeader from 'navigation/CustomHeader';

const Resources = ({navigation}) => {
  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Resources"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      <ResourcesList navigateToScreen={ResourcesDetailsScreen} />
    </>
  );
};

export default Resources;
