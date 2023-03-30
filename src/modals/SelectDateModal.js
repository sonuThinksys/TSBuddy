import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  Pressable,
  Linking,
  StyleSheet,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import Modal from 'react-native-modal';
import {Colors} from 'colors/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {modalStatus} from 'redux/homeSlice';
import Ripple from 'react-native-material-ripple';
import {dateOfModal} from 'redux/homeSlice';
const SelectDateModal = ({modalData}) => {
  const {openModal, setOpenModal, satrtDate1, endDate1} = modalData;
  console.log('satrtDate1:---------------------------', satrtDate1);
  const dispatch = useDispatch();
  const [select, setSelected] = useState(false);
  const [secondSleceted, setSecondSlected] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // let date = new Date().getDate();
  // const name = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];
  // const d = new Date();
  // let month = name[d.getMonth()];
  // let year = new Date().getFullYear();
  // setStartDate(date + '/' + month + '/' + year);
  // setEndDate(date + '/' + month + '/' + year);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      closeOnClick={true}
      visible={openModal}
      backdropOpacity={0.3}
      onBackdropPress={() => {
        setOpenModal(false);
      }}
      onBackButtonPress={() => {
        setOpenModal(false);
      }}>
      <View style={styles.container}>
        <Text style={styles.SelectText}>Select Start Date</Text>
        <View style={styles.container2}>
          <TouchableOpacity
            onPress={() => {
              dispatch(dateOfModal(satrtDate1));
              setSelected(true);
              setSecondSlected(false);
            }}>
            <View style={styles.container3}>
              <Ripple
                rippleColor={Colors.red}
                rippleOpacity={0.5}
                rippleDuration={400}
                rippleSize={500}
                rippleCentered={true}
                rippleContainerBorderRadius={20}
                onPress={() => {
                  setSelected(true);
                  setSecondSlected(false);
                }}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: select ? Colors.red : Colors.grey,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: wp(1),
                  }}>
                  {select ? <View style={styles.container4}></View> : null}
                </View>
              </Ripple>
              <TextInput value={satrtDate1} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(dateOfModal(satrtDate1));
              setSecondSlected(true);
              setSelected(false);
            }}>
            <View style={styles.reppleView}>
              <Ripple
                rippleColor={Colors.red}
                rippleOpacity={0.5}
                rippleDuration={400}
                rippleSize={500}
                rippleCentered={true}
                rippleContainerBorderRadius={20}
                onPress={() => {
                  setSecondSlected(true);
                  setSelected(false);
                }}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: secondSleceted ? Colors.red : Colors.grey,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: wp(1),
                  }}>
                  {secondSleceted ? (
                    <View
                      style={{
                        backgroundColor: Colors.red,
                        height: 10,
                        width: 10,
                        borderRadius: 10,
                      }}></View>
                  ) : null}
                </View>
              </Ripple>

              <TextInput value={endDate1} />
            </View>
          </TouchableOpacity>
          <Text style={{color: Colors.grey, fontSize: 13}}>
            **Monthly lunch can only be started from 1st or 16th of any month
          </Text>
        </View>

        <View style={styles.okView}>
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(dateOfModal(satrtDate1));
              setOpenModal(false);
            }}>
            <View style={{paddingVertical: hp(1), paddingHorizontal: wp(8)}}>
              <Text
                style={{color: Colors.white, fontWeight: 'bold', fontSize: 18}}>
                OK
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.green,
    marginHorizontal: wp(6),
    justifyContent: 'center',
    borderRadius: 10,
    shadowOpacity: 0.2,
    paddingVertical: hp(2),
  },
  SelectText: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
  },
  container2: {
    paddingVertical: hp(1),
    backgroundColor: Colors.white,
    paddingHorizontal: wp(4),
  },
  container3: {
    paddingVertical: hp(1),
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingHorizontal: wp(4),
  },
  container4: {
    backgroundColor: Colors.red,
    height: 10,
    width: 10,
    borderRadius: 10,
  },
  reppleView: {
    paddingVertical: hp(1),
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingHorizontal: wp(4),
  },
  okView: {
    paddingTop: hp(1),
    borderRadius: 5,
    shadowOpacity: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default SelectDateModal;
