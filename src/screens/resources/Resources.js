import ResourcesList from 'reusableComponents/ResourcesList';
import {ResourcesDetailsScreen} from 'navigation/Route';

const Resources = () => {
  return <ResourcesList navigateToScreen={ResourcesDetailsScreen} />;
};

export default Resources;
