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

  const dialCall = () => {
    setClickData({
      medium: isGuestLogin ? '9801296234' : cellNumber,
      nameOfEmployee: isGuestLogin ? 'guest' : employeeName,
      text: 'Call',
    });
    dispatch(modalStatus(true));
  };

  const sendMail = () => {
    setClickData({
      medium: isGuestLogin ? 'guest@thinksys.com' : companyEmail,
      nameOfEmployee: isGuestLogin ? 'guest' : employeeName,
      text: 'Send Mail to',
    });
    dispatch(modalStatus(true));
  };

  const sendMessage = async () => {
    setClickData({
      medium: isGuestLogin ? '9801296234' : cellNumber,
      nameOfEmployee: isGuestLogin ? 'guest' : employeeName,
      text: 'Send SMS to',
    });
    dispatch(modalStatus(true));
  };

  const sendWhatsAppMessage = async () => {
    setClickData({
      medium: isGuestLogin ? '9801296234' : cellNumber,
      nameOfEmployee: isGuestLogin ? 'guest' : employeeName,
      text: 'Send WhatsApp to',
    });
    dispatch(modalStatus(true));
  };

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
