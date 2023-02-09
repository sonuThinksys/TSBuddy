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
  ImageBackground,
  Dimensions,
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
const BirthdayAnniV = ({modalData, showModal}) => {
  // const [isShowModal, setIsShowModal] = useState(false);
  const {id, text, setShowModal} = modalData;
  console.log('text:=====================', showModal, text);

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
              // console.log('PRESSED');
              setShowModal(false);
            }}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setShowModal(false);
            }}>
            <ImageBackground
              style={styles.backgroundImage}
              source={MonthImages.EventImage}
              resizeMode="contain">
              <Text
                style={{
                  top: hp(9),
                  fontWeight: 'bold',
                  fontSize: 38,
                  color: 'green',
                }}>
                30
              </Text>
              <Text style={{top: hp(8.5), color: 'green'}}>jan 2023</Text>
              <View style={styles.textView}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Birthday: {text}
                </Text>
              </View>
              <View style={{paddingTop: hp(3), paddingBottom: hp(2)}}>
                <Image
                  source={MonthImages.BirthdayImage}
                  resizeMode="contain"
                  style={{height: 150, width: 150}}
                />
              </View>
              <Text style={{fontSize: 16}}>Happy Birthday! Devansh Sharma</Text>
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
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
    borderRadius: 5,
  },
});
export default BirthdayAnniV;
