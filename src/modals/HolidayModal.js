import React, {useEffect, useState} from 'react';
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
  StyleSheet,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {getholidayDataIWithImage} from 'redux/dataSlice';
import {Colors} from 'colors/Colors';
import CustomModal from 'components/CustomModal';
const HolidayModal = ({HolidaysData, holidaysShowModal}) => {
  const {description, holidayDate, newDateFormate, holidaysSetShowModal} =
    HolidaysData;
  const [image, setImage] = useState('');
  const [definition, setDefinition] = useState('');
  const [days, setDays] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getholidayDataIWithImage());
  }, []);

  const holidayDataIWithImage = useSelector(
    state => state.dataReducer.holidayDataIWithImage,
  );

  let daysArray = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = new Date(holidayDate).getDay();
  let dayName = daysArray[day];

  useEffect(() => {
    holidayDataIWithImage &&
      holidayDataIWithImage.length &&
      holidayDataIWithImage.map(el => {
        if (el.nameOfHolidays === description) {
          setImage(el.imageOfHoliday);
          setDefinition(el.descriptions);
        }
      });
  }, [holidayDataIWithImage]);

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
              holidaysSetShowModal(false);
            }}
            // onRequestClose={() => {
            //   Alert.alert('Modal has been closed.');
            //   setShowModal(false);
            // }}
          >
            <View style={styles.container}>
              <ImageBackground
                source={image}
                resizeMode="contain"
                style={{height: '100%', width: '100%'}}>
                <View style={styles.secondContainer}>
                  <Text style={{color: Colors.darkBlue}}>{newDateFormate}</Text>
                  <Text style={{color: Colors.darkBlue}}>{dayName}</Text>
                </View>
                <View style={styles.thirdView}>
                  <Text style={styles.textline}>{description}</Text>
                  <Text style={{opacity: 0.6, fontSize: 16}}>{definition}</Text>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '34.5%',
    width: '90%',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: 200,
    borderRadius: 5,
  },
  secondContainer: {
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
  },
  thirdView: {
    backgroundColor: 'white',
    paddingHorizontal: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(3),
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
  },
  textline: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: hp(1),
  },
});
export default HolidayModal;
