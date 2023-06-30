import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  Platform,
  Pressable,
} from 'react-native';
import Contacts from 'react-native-contacts';

import baseUrl from 'services/Urls';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import CommunicationModal from 'modals/CommunicationModal';
import {modalStatus} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import defaultUserIcon from 'assets/allImage/DefaultImage.imageset/defaultUserIcon.png';

import {useIsFocused} from '@react-navigation/native';

const UserDetail = ({navigation, route}) => {
  const isFocussed = useIsFocused();
  const {
    designation,
    companyEmail,
    image,
    cellNumber,
    employeeName,
    managerInfoDto,
  } = route.params || {};

  const dispatch = useDispatch();
  const [empDetail, setClickData] = useState({});
  const {isShowModal} = useSelector(state => state.home);

  const [showContactModal, setShowContactModal] = useState(false);

  const addToContacts = () => {
    const [firstName, lastName] = employeeName.split(' ');

    const newContact = {
      givenName: firstName,
      familyName: lastName,
      phoneNumbers: [{label: 'mobile', number: cellNumber}],
      emailAddresses: [{label: 'work', email: companyEmail}],
    };

    Contacts.openContactForm(newContact);
  };

  const dialCall = () => {
    setClickData({
      medium: cellNumber,
      nameOfEmployee: employeeName,
      text: 'Call',
    });
    dispatch(modalStatus(true));
  };

  const whtsappEmployee = () => {
    setClickData({
      medium: cellNumber,
      nameOfEmployee: employeeName,
      text: 'Send WhatsApp to',
    });
    dispatch(modalStatus(true));
  };

  const sendMail = () => {
    setClickData({
      medium: companyEmail,
      nameOfEmployee: employeeName,
      text: 'Send Mail to',
    });
    dispatch(modalStatus(true));
  };

  const snedMessage = async () => {
    setClickData({
      medium: cellNumber,
      nameOfEmployee: employeeName,
      text: 'Send SMS to',
    });
    dispatch(modalStatus(true));
  };

  return (
    <View>
      {/* {isShowModal ? <CommunicationModal empDetail={empDetail} /> : null} */}

      <View
        style={{
          backgroundColor: Colors.lighterBlue,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingHorizontal: wp(2),
          paddingVertical: hp(1.5),
        }}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={MonthImages.backArrowS}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 2,
            // justifyContent: 'center',
            paddingTop: hp(0.5),
          }}>
          <Text
            style={{
              color: Colors.white,
              marginRight: wp(2),
              fontSize: 18,
              fontWeight: '500',
            }}>
            Employee Detail
          </Text>
        </View>
      </View>

      <View
        style={{
          height: hp(30),
          backgroundColor: Colors.lighterBlue,
          paddingHorizontal: wp(30),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* {image ? (
          <Image
            source={{uri: `${baseUrl}${image}`}}
            style={{
              height: hp(14),
              width: hp(14),
              borderRadius: 55,
            }}
          />
        ) : null} */}
        {image ? (
          // <Image
          //   source={{uri: `${baseUrl}${image}`}}
          //   style={{
          //     height: hp(14),
          //     width: hp(14),
          //     borderRadius: 55,
          //   }}
          // />
          <Image
            resizeMode="stretch"
            // source={{uri: `${baseUrl}${image}`}}
            source={{uri: `data:image/jpeg;base64,${image}`}}
            style={{
              height: 120,
              width: 120,
              borderRadius: 60,
            }}
          />
        ) : (
          <Image
            source={defaultUserIcon}
            style={{
              height: hp(14),
              width: hp(14),
              borderRadius: 55,
            }}
          />
        )}
      </View>
      <View
        style={{
          backgroundColor: Colors.white,
          borderBottomWidth: 1,
          borderColor: Colors.grey,
          paddingVertical: hp(2),
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 'bold',
            color: Colors.lightBlue,
          }}>
          {employeeName}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            color: Colors.grey,
          }}>
          {designation}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: hp(1),
          }}>
          <Image source={MonthImages.userPS} style={{height: 30, width: 30}} />
          <Text
            style={{
              paddingTop: hp(1),
              marginLeft: wp(2),
              color: Colors.lightBlue,
            }}>
            {managerInfoDto?.employeeName}
          </Text>
        </View>
        <Pressable onPress={addToContacts}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: Colors.lightBlue,
              fontWeight: 'bold',
            }}>
            + Add To Contacts
          </Text>
        </Pressable>
        {isShowModal && isFocussed ? (
          <CommunicationModal empDetail={empDetail} />
        ) : null}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingVertical: hp(1),
          }}>
          <TouchableOpacity onPress={sendMail}>
            <Image
              style={{height: 70, width: 70}}
              source={MonthImages.empMailS}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={dialCall}>
            <Image
              style={{height: 70, width: 70}}
              source={MonthImages.empCallS}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={snedMessage}>
            <Image
              style={{height: 70, width: 70}}
              source={MonthImages.empMsg}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={whtsappEmployee}>
            <Image style={{height: 70, width: 70}} source={MonthImages.empWa} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: Colors.white,
          paddingVertical: hp(4),
          paddingHorizontal: wp(4),
        }}>
        <View style={{flexDirection: 'row', paddingVertical: hp(1)}}>
          <Image source={MonthImages.callEmp} style={{height: 25, width: 25}} />
          <Text style={{marginLeft: wp(2), marginTop: hp(0.5), opacity: 0.8}}>
            {cellNumber}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={MonthImages.mailEmp} style={{height: 25, width: 25}} />
          <Text
            style={{
              marginLeft: wp(2),
              marginTop: hp(0.5),
              opacity: 0.6,
              fontWeight: 'bold',
            }}>
            {companyEmail}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default UserDetail;
