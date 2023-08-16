import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import moment from 'moment';
import {authLoginStatus} from 'Auth/LoginSlice';
import {modalStatus} from 'redux/homeSlice';
import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
const BirthdayAnniV = ({modalData, showModal}) => {
  const {
    startsOn,
    dateOfJoining,
    name,
    description,
    setShowModal,
    isBirthday,
    dateOfBirth,
  } = modalData || {};

  const displayDate = new Date(
    isBirthday ? dateOfBirth : dateOfJoining,
  ).getDate();

  const displayMonth = new Date(
    isBirthday ? dateOfBirth : dateOfJoining,
  ).toLocaleString('default', {month: 'short'});

  const displayYear = new Date().getFullYear();

  const date = moment(description === null ? dateOfJoining : startsOn).format(
    'DD',
  );

  const Month = moment(description === null ? dateOfJoining : startsOn).format(
    ' MMM ',
  );

  const currentYear = new Date().getFullYear();

  return (
    <>
      {showModal ? (
        <TouchableWithoutFeedback
          onPress={() => {
            setShowModal(false);
          }}>
          <Modal
            animationType="slide"
            transparent={true}
            closeOnClick={true}
            isVisible={showModal}
            onBackdropPress={() => {
              setShowModal(false);
            }}
            onBackButtonPress={() => {
              setShowModal(false);
            }}
            onRequestClose={() => {
              setShowModal(false);
            }}>
            <ImageBackground
              style={styles.backgroundImage}
              source={MonthImages.EventImage}
              resizeMode="contain">
              <Text
                style={{
                  top: hp(9),
                  fontFamily: FontFamily.RobotoBold,
                  fontSize: FontSize.h22,
                  color: Colors.green,
                }}>
                {displayDate}
              </Text>
              <Text
                style={{
                  top: hp(8.5),
                  color: 'green',
                  fontFamily: FontFamily.RobotoBold,
                }}>
                {displayMonth} {displayYear}
              </Text>
              <View style={styles.textView}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: Colors.white,
                    fontWeight: 'bold',
                  }}>
                  {!isBirthday ? 'Work Aniversary' : 'Birthday'}: {name}
                  {description === null ? ` on ${date}${Month}` : null}
                </Text>
              </View>
              <View style={{paddingTop: hp(3), paddingBottom: hp(2)}}>
                <Image
                  source={
                    !isBirthday
                      ? MonthImages.workAnniversaryy
                      : MonthImages.BirthdayImage
                  }
                  resizeMode="contain"
                  style={{height: 150, width: 150}}
                />
              </View>
              <Text style={{fontSize: 16}}>
                {' '}
                {!isBirthday
                  ? `Congratulation: ${name}`
                  : `Happy Birthday! ${name}`}
              </Text>
            </ImageBackground>
          </Modal>
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
  },
  textView: {
    marginTop: hp(15),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    backgroundColor: Colors.customColor({opacity: 0.8, r: 51, g: 51, b: 51}),
    borderRadius: 5,
  },
});
export default BirthdayAnniV;
