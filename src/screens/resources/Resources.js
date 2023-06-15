import ResourcesList from 'reusableComponents/ResourcesList';
import {ResourcesDetailsScreen} from 'navigation/Route';

const Resources = () => {
  console.log('Resources');
  return <ResourcesList navigateToScreen={ResourcesDetailsScreen} />;
};

export default Resources;
