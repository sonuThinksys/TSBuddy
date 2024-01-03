import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.whitishBlue,
  },
  container: {
    backgroundColor: Colors.lighterBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    alignItems: 'center',
  },
  lunchTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: hp(0.5),
  },
  headerIcon: {height: 20, width: 20},
  text1: {
    color: Colors.white,
    // marginRight: wp(2),
    fontSize: 18,
    fontFamily: FontFamily.RobotoMedium,
  },
  secondView: {
    backgroundColor: Colors.white,
    top: hp(1),
    marginHorizontal: wp(4),
    marginVertical: wp(4),
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    display: 'flex',
    borderRadius: 12,
    marginBottom: hp(7),
    elevation: 1,
  },
  dropDownView: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
  },
  reqTypeText: {
    marginBottom: hp(1.6),
    fontSize: 18,
    color: Colors.black,
  },
  dropdownContainer: {
    zIndex: 9999,
  },
  dropdownContainerStyle: {
    height: 40,
  },
  dropdownStyle: {
    height: 10,
    borderRadius: 50,
    borderColor: Colors.grey,
    marginBottom: hp(3),
  },
  borderRadius5: {
    borderRadius: 5,
  },
  selectDropdownStyle: {
    backgroundColor: Colors.lightBlue,
    borderBottomWidth: 1,
  },
  dropdownLabelStyle: {
    fontSize: 13,
    textAlign: 'left',
    color: Colors.black,
    alignSelf: 'center',
  },
  thirdView: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    marginTop: hp(2),
  },
  datePickerLabel: {
    marginBottom: hp(1),
    fontSize: 18,
    color: Colors.black,
  },
  opacity60: {
    opacity: 0.6,
  },
  opacity50: {
    opacity: 0.5,
  },
  fourthView: {
    borderRadius: wp(25),
    borderWidth: 1,
    width: wp(40),
    // justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grey,
    flexDirection: 'row',
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(1.2),
    justifyContent: 'space-between',
  },
  fifthView: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    marginTop: hp(2),
  },
  sixthView: {
    borderRadius: wp(25),
    borderWidth: 1,
    width: wp(40),
    alignItems: 'center',
    borderColor: Colors.grey,
    flexDirection: 'row',
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(1.2),
    justifyContent: 'space-between',
  },
  submitView: {
    backgroundColor: Colors.darkBlue,
    paddingVertical: hp(1.5),
    width: wp(50),
    marginHorizontal: wp(20),
  },
  buttomView: {
    shadowOpacity: 0.1,
    // top: hp(2),
    marginHorizontal: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    // height: hp(52),
  },
  lunchRequestsContainer: {
    flexBasis: 300,
  },
  noRequestsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRequestsText: {
    fontSize: 16,
    fontFamily: FontFamily.RobotoLight,
    position: 'absolute',
    top: hp(10),
  },
  appliedView: {
    marginHorizontal: wp(4),
    // backgroundColor: Colors.lightGray,
    // paddingVertical: hp(1.5),
    // borderBottomWidth: 1,
  },
  appliedText: {
    color: Colors.lovelyPurple,
    fontWeight: 'bold',
    fontSize: 18,
  },
  monthlyRequestView: {
    marginTop: hp(1),
    shadowOpacity: 0.4,
    borderRadius: 2,
    backgroundColor: Colors.lightGray,
  },
  monthlyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  cancelView: {
    backgroundColor: Colors.red,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(1),
    borderRadius: 4,
  },
  buttomTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    paddingVertical: hp(3),
  },
  buttomText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.lightBlue,
    marginRight: wp(5),
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
    opacity: 0.5,
  },
  selectedDated: {
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
  },
  buttonCancel: {
    marginTop: 20,
    backgroundColor: Colors.grayishWhite,
    paddingHorizontal: wp(8.6),
    borderRadius: 200,
    paddingVertical: hp(1.4),
  },
  buttonCancelText: {
    color: Colors.black,
    textAlign: 'center',
    fontSize: 17,
  },
  buttonSubmit: {
    marginTop: 20,
    backgroundColor: Colors.lovelyPurple,
    paddingHorizontal: wp(9.2),
    borderRadius: 200,
    paddingVertical: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 17,
  },
  request: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  appliedRequestsLeft: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    flex: 1,
    marginRight: 10,

    marginLeft: 0,
  },
  requestDetails: {
    alignItems: 'center',
    marginRight: wp(4),
  },
  dayText: {
    fontSize: 25,
    fontFamily: FontFamily.RobotoLight,
  },
  requestTypeText: {
    fontSize: 12,
    fontFamily: FontFamily.RobotoMedium,
  },
  requestDateText: {
    fontSize: 15,
    fontFamily: FontFamily.RobotoRegular,
    color: Colors.dune,
    marginBottom: hp(1),
  },
  applyContainer: {
    flexDirection: 'row',
  },
  appliedOnText: {fontSize: 11, color: Colors.lightGray1},
  appliedDateText: {
    fontSize: 12,
    color: Colors.lightGray1,
    fontFamily: FontFamily.RobotoMedium,
  },
  typeRequestText: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: Colors.skin,
    color: Colors.darkSkin,
    fontSize: 12,
    fontFamily: FontFamily.RobotoLightItalic,
  },
  requestText: {
    fontSize: 11.5,
    // marginRight: 14,
  },
  requestType: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 40,
    color: Colors.dune,
  },
  requestTypeContainer: {
    backgroundColor: Colors.whitishPink,
    borderRadius: 8,
    marginRight: 16,
  },
  cancelButton: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelText: {
    color: Colors.white,
  },
  image: {
    width: 20,
    aspectRatio: 1,
  },
  datesContainer: {
    flexDirection: 'row',
    zIndex: -1,
  },
});
