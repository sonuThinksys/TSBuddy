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
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {authLoginStatus} from 'Auth/LoginSlice';
import {modalStatus} from 'redux/dataSlice';
const CommunicationModal = ({empDetail}) => {
  const dispatch = useDispatch();
  const isShowModal = useSelector(state => state.dataReducer.isShowModal);
  console.log(
    'empDetail:==============================================',
    empDetail,
  );

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
            fontSize: 18,
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            paddingHorizontal: wp(5),
            paddingVertical: hp(1),
          }}>
          Call {empDetail.nameOfEmployee}
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
          <Text style={{margin: wp(1)}}> {empDetail.email}</Text>
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
          <TouchableWithoutFeedback
            onPress={() => {
              Linking.openURL(`${empDetail.email}`);
            }}>
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
