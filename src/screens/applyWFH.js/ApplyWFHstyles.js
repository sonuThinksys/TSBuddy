import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.whitishBlue,
    flexDirection: 'column',
  },
  secondView: {
    backgroundColor: Colors.white,
    marginHorizontal: wp(4),
    marginVertical: hp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    borderRadius: 12,
    marginBottom: hp(1),
  },
  dropDownView: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
  },
  thirdView: {
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
  },
  fourthView: {
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

  fifthView: {
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
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
  buttomView: {
    height: windowHeight >= 700 ? hp(35) : hp(28),
    marginBottom: 20,
    shadowOpacity: 0.1,
    marginHorizontal: wp(2),
    paddingHorizontal: wp(2),
    flexGrow: 1,
  },
  appliedView: {
    marginHorizontal: wp(4),
  },
  wfhHistoryText: {
    color: Colors.lovelyPurple,
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttomText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.lightBlue,
    marginRight: wp(5),
  },
  selectedDated: {
    fontSize: 14,
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

    marginRight: 10,
    marginLeft: 0,
  },
  requestText: {
    fontSize: 11.5,
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
  reasonViewBox: {
    width: '100%',
    alignItems: 'center',
    zIndex: -1,
  },
  reasonInputBox: {
    paddingLeft: 15,
    fontSize: 17,
    borderWidth: 0.5,
    borderColor: Colors.lightGray1,
    borderRadius: 10,
    width: '95%',
    height: 110,
    marginTop: 20,
    textAlignVertical: 'top',
  },
});
