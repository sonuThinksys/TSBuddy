import {Colors} from 'colors/Colors';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

export default StyleSheet.create({
  totalTimeAndBtnCont: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: hp(2),
  },
  textTotalWork: {
    color: 'black',
    fontSize: 13,
    fontWeight: '400',
  },
  textTimer: {
    color: Colors.green,
    fontWeight: '600',
    fontSize: 25,
  },
  checkInOutBtn: {
    width: wp(28),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.parrotGreen,
    marginTop: hp(1),
  },
  textInputCont: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(10),
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: wp(70),
    borderRightWidth: 0,
    paddingLeft: 15,
  },
  addCommentBtn: {
    borderWidth: 1.5,
    height: hp(7),
    width: wp(14),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: Colors.purple,
  },
  btnText: {
    color: Colors.purple,
    fontSize: 16,
    fontWeight: '700',
  },
  todayDate: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: '700',
    marginTop: hp(5),
  },
  lateByText: {
    color: Colors.yellowishOrange,
    fontSize: 15,
    fontWeight: '400',
  },
  checkInoutTimeCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
});
