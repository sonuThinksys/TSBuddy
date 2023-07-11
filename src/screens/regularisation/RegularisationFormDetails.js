import {View, Text} from 'react-native';
import styles from '../leaves/LeavesDetailsStyles';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getEmployeeRegularizationRequest, modalStatus} from 'redux/homeSlice';
import jwt_decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import ResourceProfileDetails from 'reusableComponents/ResourceProfileDetails';
import RegularisationList from 'reusableComponents/RegularisationList';
import CustomHeader from 'navigation/CustomHeader';
import {useIsFocused} from '@react-navigation/native';
import CommunicationModal from 'modals/CommunicationModal';

const RegularisationFormDetails = ({navigation, route}) => {
  const [empDetail, setClickData] = useState({});
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );
  const {isShowModal: isShowModal, employeeProfileLoading: isLoading} =
    useSelector(state => state.home);

  const isFocussed = useIsFocused();

  const dispatch = useDispatch();

  const {
    designation,
    image,
    employeeName,
    managerInfoDto,
    name,
    cellNumber,
    companyEmail,
  } = route.params;
  const empId = name.split('/')[1];

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
      nameOfEmployee: isGuestLogin ? 'guest manager' : employeeName,
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
        title="Regularizations"
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
      />
      {isShowModal && isFocussed ? (
        <CommunicationModal empDetail={empDetail} />
      ) : null}
      <ResourceProfileDetails
        empDetails={{
          employeeName,
          image,
          companyEmail,
          cellNumber,
          designation,
          managerInfoDto,
        }}
        dialCall={dialCall}
        sendMail={sendMail}
        sendMessage={sendMessage}
        sendWhatsApp={sendWhatsAppMessage}
      />
      <RegularisationList
        employeeID={empId}
        navigateTo={'regularisationTabDetailsScreen'}
        employeeName={employeeName}
      />
    </>
  );
};

export default RegularisationFormDetails;
