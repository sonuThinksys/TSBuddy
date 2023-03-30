import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import CommunicationModal from 'modals/CommunicationModal';
import {modalStatus} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
const UserDetail = ({navigation, route}) => {
  const {
    designation,
    companyEmail,
    image,
    cellNumber,
    employeeName,
    managerInfoDto,
  } = route.params;
  const dispatch = useDispatch();
  const [empDetail, setClickData] = useState({});
  const {isShowModal} = useSelector(state => state.home);

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
          backgroundColor: Colors.darkBlue,
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
              style={{height: 25, width: 25}}
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
          backgroundColor: Colors.lightBlue,
          justifyContent: 'center',
          paddingHorizontal: wp(30),
        }}>
        <Image
          source={{ri: `${baseUrl}${image}`}}
          style={{
            height: hp(14),
            width: hp(14),
            borderRadius: 55,
          }}
        />
      </View>
      <View
        style={{
          height: hp(28),
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
            {managerInfoDto}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: Colors.lightBlue,
            fontWeight: 'bold',
          }}>
          + Add To Contacts
        </Text>
        {isShowModal ? <CommunicationModal empDetail={empDetail} /> : null}
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
          height: hp(26),
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
