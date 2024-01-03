import React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {modalStatus} from 'redux/homeSlice';

import ResourceProfileDetails from 'reusableComponents/ResourceProfileDetails';
import RegularisationList from 'reusableComponents/RegularisationList';
import CustomHeader from 'navigation/CustomHeader';
import {useIsFocused} from '@react-navigation/native';
import CommunicationModal from 'modals/CommunicationModal';

const RegularisationFormDetails = ({navigation, route}) => {
  const [empDetail, setClickData] = useState({});
  const {isGuestLogin: isGuestLogin} = useSelector(state => state.auth);
  const {isShowModal: isShowModal} = useSelector(state => state.home);

  const isFocussed = useIsFocused();

  const dispatch = useDispatch();

  const {
    designation,
    image,
    employeeName,
    managerInfoDto,
    employeeId,
    cellNumber,
    companyEmail,
    firstName,
    lastName,
  } = route.params;

  // const empId = name.split('/')[1];

  const empName =
    firstName && lastName ? `${firstName} ${lastName}` : firstName || 'NA';

  const dialCall = () => {
    setClickData({
      medium: isGuestLogin ? '9801296234' : cellNumber,
      nameOfEmployee: isGuestLogin ? 'guest' : empName,
      text: 'Call',
    });
    dispatch(modalStatus(true));
  };

  const sendMail = () => {
    setClickData({
      medium: isGuestLogin ? 'guest@thinksys.com' : companyEmail,
      nameOfEmployee: isGuestLogin ? 'guest' : empName,
      text: 'Send Mail to',
    });
    dispatch(modalStatus(true));
  };

  const sendMessage = async () => {
    setClickData({
      medium: isGuestLogin ? '9801296234' : cellNumber,
      nameOfEmployee: isGuestLogin ? 'guest manager' : empName,
      text: 'Send SMS to',
    });
    dispatch(modalStatus(true));
  };

  const sendWhatsAppMessage = async () => {
    setClickData({
      medium: isGuestLogin ? '9801296234' : cellNumber,
      nameOfEmployee: isGuestLogin ? 'guest' : empName,
      text: 'Send WhatsApp to',
    });
    dispatch(modalStatus(true));
  };

  const empFullName =
    firstName && lastName ? `${firstName}  ${lastName}` : firstName;

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
          empFullName,
          firstName,
          lastName,
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
        employeeID={employeeId}
        navigateTo={'regularisationTabDetailsScreen'}
        employeeName={empFullName}
      />
    </>
  );
};

export default RegularisationFormDetails;
