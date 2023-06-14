import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
      {isShowModal && isFocussed ? (
        <CommunicationModal empDetail={empDetail} />
      ) : null}
      <SafeAreaView style={{flex: 1}}>
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
        />
      </SafeAreaView>
    </>
  );
};

export default WFHDetails;
