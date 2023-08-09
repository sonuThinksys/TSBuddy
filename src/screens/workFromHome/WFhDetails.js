import {useIsFocused} from '@react-navigation/native';
import CommunicationModal from 'modals/CommunicationModal';
import CustomHeader from 'navigation/CustomHeader';
import {useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {modalStatus} from 'redux/homeSlice';
import ResourceProfileDetails from 'reusableComponents/ResourceProfileDetails';
import WorkFromHomeList from 'reusableComponents/WorkFromHomeList';

const WFHDetails = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {
    designation,
    employeeName,
    firstName,
    lastName,
    middleName,
    image,
    managerInfoDto,
    employeeId,
    cellNumber,
    companyEmail,
  } = route.params;

  const empFullName =
    firstName && lastName
      ? `${firstName}  ${lastName}`
      : firstName && middleName
      ? `${firstName} ${middleName}`
      : firstName;

  const {isGuestLogin: isGuestLogin} = useSelector(state => state.auth);

  const [empDetail, setClickData] = useState({});

  const {isShowModal: isShowModal, employeeProfileLoading: isLoading} =
    useSelector(state => state.home);

  const isFocussed = useIsFocused();
  const workFromHomeLeaveApplyScreenOpen = 'workFromHomeLeaveApplyScreenOpen';
  const workFromHomeLeaveDetailsScreen = 'workFromHomeLeaveDetailsScreen';

  const dialCall = () => {
    setClickData({
      medium: isGuestLogin ? '9801296234' : cellNumber,
      nameOfEmployee: isGuestLogin ? 'guest' : empFullName,
      text: 'Call',
    });
    dispatch(modalStatus(true));
  };

  const sendMail = () => {
    setClickData({
      medium: isGuestLogin ? 'guest@thinksys.com' : companyEmail,
      nameOfEmployee: isGuestLogin ? 'guest' : empFullName,
      text: 'Send Mail to',
    });
    dispatch(modalStatus(true));
  };

  const sendMessage = async () => {
    setClickData({
      medium: isGuestLogin ? '9801296234' : cellNumber,
      nameOfEmployee: isGuestLogin ? 'guest' : empFullName,
      text: 'Send SMS to',
    });
    dispatch(modalStatus(true));
  };

  const sendWhatsAppMessage = async () => {
    setClickData({
      medium: isGuestLogin ? '9801296234' : cellNumber,
      nameOfEmployee: isGuestLogin ? 'guest' : empFullName,
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
          dialCall={dialCall}
          sendMail={sendMail}
          sendMessage={sendMessage}
          sendWhatsApp={sendWhatsAppMessage}
          empDetails={{
            employeeName,
            empFullName,
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
          resourceEmployeeID={employeeId}
          // fromResource={true}
        />
      </View>
    </>
  );
};

export default WFHDetails;
