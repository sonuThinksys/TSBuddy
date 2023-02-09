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
  StyleSheet,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {authLoginStatus} from 'Auth/LoginSlice';
import {modalStatus} from 'redux/dataSlice';
import {Colors} from 'colors/Colors';
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
              console.log('WhatsApp Opened');
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
      <View style={styles.container}>
        <Text style={styles.text1}>
          {empDetail.text} {empDetail.nameOfEmployee}
        </Text>
        <View style={styles.imageView}>
          <Image
            source={MonthImages.checkedS}
            style={{height: 25, width: 25}}
          />
          <Text style={{margin: wp(1)}}> {empDetail.medium}</Text>
        </View>

        <View style={styles.container2}>
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(modalStatus(false));
            }}>
            <View style={styles.container3}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>No</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={connectThrouMedium}>
            <View style={styles.container4}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Yes</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0073cf',
    marginHorizontal: wp(6),
    justifyContent: 'center',
    borderRadius: 10,
    shadowOpacity: 0.2,
    paddingVertical: hp(2),
  },
  text1: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
  },
  imageView: {
    paddingVertical: hp(1),
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: wp(4),
  },
  container2: {
    paddingTop: hp(1),
    borderRadius: 5,
    shadowOpacity: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container3: {
    backgroundColor: 'red',
    paddingVertical: hp(1),
    paddingHorizontal: wp(8),
    borderRadius: 5,
  },
  container4: {
    backgroundColor: 'green',
    paddingVertical: hp(1),
    paddingHorizontal: wp(8),
    borderRadius: 5,
  },
});
export default CommunicationModal;
