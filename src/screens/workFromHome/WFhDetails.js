import {useIsFocused} from '@react-navigation/native';
import CustomHeader from 'navigation/CustomHeader';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import ResourceProfileDetails from 'reusableComponents/ResourceProfileDetails';
import WorkFromHomeList from 'reusableComponents/WorkFromHomeList';

const WFHDetails = ({route, navigation}) => {
  const {
    designation,
    employeeName,
    image,
    managerInfoDto,
    name: employeeId,
    cellNumber,
    companyEmail,
  } = route.params;

  const {isShowModal: isShowModal, employeeProfileLoading: isLoading} =
    useSelector(state => state.home);

  const isFocussed = useIsFocused();
  const workFromHomeLeaveApplyScreenOpen = 'workFromHomeLeaveApplyScreenOpen';
  const workFromHomeLeaveDetailsScreen = 'workFromHomeLeaveDetailsScreen';

  return (
    <>
      <CustomHeader
        showDrawerMenu={false}
        title={'WFH Details'}
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
      />
      {isShowModal && isFocussed ? (
        <CommunicationModal empDetail={empDetail} />
      ) : null}
      <View style={{flex: 1}}>
        <ResourceProfileDetails
          empDetails={{
            employeeName,
            image,
            companyEmail,
            cellNumber,
            designation,
            managerInfoDto,
          }}
        />

        <WorkFromHomeList
          workFromHomeLeaveApplyScreenOpen={workFromHomeLeaveApplyScreenOpen}
          workFromHomeLeaveDetailsScreen={workFromHomeLeaveDetailsScreen}
          employeeId={employeeId}
          isFromWFHDetails={true}
          fromResource={true}
        />
      </View>
    </>
  );
};

export default WFHDetails;
