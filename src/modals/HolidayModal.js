import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  Linking,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import CustomModal from 'components/CustomModal';
const HolidayModal = ({HolidaysData, holidaysShowModal}) => {
  const {
    nameOfHolidays,
    dateOfHolidays,
    daysOfHoliday,
    description,
    imageOfHoliday,
    id,
    holidaysSetShowModal,
    // holidaysShowModal,
  } = HolidaysData;

  console.log('first time:-------', holidaysShowModal);
  return (
    <>
      {holidaysShowModal ? (
        <TouchableWithoutFeedback
          onPress={() => {
            holidaysSetShowModal(false);
          }}>
          <Modal
            animationType="slide"
            transparent={true}
            closeOnClick={true}
            isVisible={holidaysShowModal}
            onBackdropPress={() => {
              holidaysSetShowModal(false);
            }}
            onBackButtonPress={() => {
              // console.log('PRESSED');
              holidaysSetShowModal(false);
            }}
            // onRequestClose={() => {
            //   Alert.alert('Modal has been closed.');
            //   setShowModal(false);
            // }}
          >
            <View
              style={{
                height: '34.5%',
                width: '90%',
                justifyContent: 'center',
                position: 'relative',
                alignItems: 'center',
                backgroundColor: 'white',
                alignSelf: 'center',
                marginBottom: 200,
                // shadowOpacity: 0.5,
                borderRadius: 5,
              }}>
              <ImageBackground
                source={imageOfHoliday}
                resizeMode="contain"
                style={{
                  height: '100%',
                  width: '100%',
                  // backgroundColor: 'green',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 2,
                    width: wp(32),
                    height: hp(12),
                    marginTop: hp(20),
                    marginLeft: wp(4),
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: Colors.darkBlue}}>{dateOfHolidays}</Text>
                  <Text style={{color: Colors.darkBlue}}>{daysOfHoliday}</Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: wp(6),
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: hp(3),
                    borderBottomEndRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: 'blue',
                      fontWeight: 'bold',
                      fontSize: 20,
                      marginBottom: hp(1),
                    }}>
                    {nameOfHolidays}
                  </Text>
                  <Text style={{opacity: 0.6, fontSize: 16}}>
                    {description}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
};
export default HolidayModal;
