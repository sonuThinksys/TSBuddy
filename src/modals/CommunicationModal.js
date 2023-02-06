import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Pressable,
  Linking,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
// import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {authLoginStatus} from 'Auth/LoginSlice';
import {modalStatus} from 'redux/dataSlice';
const CommunicationModal = ({empDetail}) => {
  const dispatch = useDispatch();
  const isShowModal = useSelector(state => state.dataReducer.isShowModal);

  const connectThrouMedium = () => {
    if (empDetail.text == 'Call') {
      const url = `tel://:+${empDetail.medium}`;
      Linking.openURL(url);
    } else if (empDetail.text == 'Send Mail to') {
      Linking.openURL(`mailto:${empDetail.medium}`);
    } else if (empDetail.text == 'Send WhatsApp to') {
      let msg = 'type something';
      let phoneWithCountryCode = `91${empDetail.medium}`;

      let mobile =
        Platform.OS == 'ios'
          ? phoneWithCountryCode
          : '+' + phoneWithCountryCode;
      if (mobile) {
        if (msg) {
          let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
          Linking.openURL(url)
            .then(data => {
              // console.log('WhatsApp Opened');
            })
            .catch(() => {
              alert('Make sure WhatsApp installed on your device');
            });
        } else {
          alert('Please insert message to send');
        }
      } else {
        alert('Please insert mobile no');
      }
    } else if (empDetail.text == 'Send SMS to') {
      Linking.openURL(`smsto:${empDetail.medium}`);
    }
  };

  return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      closeOnClick={true}
      visible={isShowModal}
      onBackdropPress={() => {
        dispatch(modalStatus(false));
      }}
      onBackButtonPress={() => {
        // console.log('PRESSED');
        dispatch(modalStatus(false));
      }}
      // onRequestClose={() => {
      //   Alert.alert('Modal has been closed.');
      //   setModalVisible(!modalVisible);
      // }}
    >
      <View
        style={{
          backgroundColor: '#0073cf',
          marginHorizontal: wp(6),
          justifyContent: 'center',
          borderRadius: 10,
          shadowOpacity: 0.2,
          paddingVertical: hp(2),
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            paddingHorizontal: wp(5),
            paddingVertical: hp(1.5),
          }}>
          {empDetail.text} {empDetail.nameOfEmployee}
        </Text>
        {/* <Image source={Month} /> */}
        <View
          style={{
            paddingVertical: hp(1),
            backgroundColor: 'white',
            flexDirection: 'row',
            paddingHorizontal: wp(4),
          }}>
          <Image
            source={MonthImages.checkedS}
            style={{height: 25, width: 25}}
          />
          <Text style={{margin: wp(1)}}> {empDetail.medium}</Text>
        </View>

        <View
          style={{
            paddingTop: hp(1),
            borderRadius: 5,
            shadowOpacity: 0.4,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(modalStatus(false));
            }}>
            <View
              style={{
                backgroundColor: 'red',
                paddingVertical: hp(1),
                paddingHorizontal: wp(8),
                borderRadius: 5,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>No</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={connectThrouMedium}>
            <View
              style={{
                backgroundColor: 'green',
                paddingVertical: hp(1),
                paddingHorizontal: wp(8),
                borderRadius: 5,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Yes</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  );
};
export default CommunicationModal;
