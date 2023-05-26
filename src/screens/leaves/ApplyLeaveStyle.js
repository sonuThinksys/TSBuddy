import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  screenWidth,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },

  swiperContainer: {
    // flex: 0.22,
    height: hp(16),
  },
  formContainer: {
    paddingHorizontal: 10,
  },
  fromToContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.whitishGray,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginTop: 8,
  },
  calenderContainer: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 3,
    paddingHorizontal: 6,
    // alignItems: 'flex-end',
    paddingHorizontal: 5,
    paddingVertical: 5,
    height: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fromContainer: {
    width: '50%',
    paddingRight: 12,
  },
  toContainer: {
    width: '50%',
  },
  fromText: {
    fontWeight: '700',
    marginBottom: 5,
    marginLeft: 4,
    fontSize: 15,
  },
  toText: {
    fontWeight: '700',
    marginBottom: 5,
    marginLeft: 4,
    fontSize: 15,
  },
  reasonText: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 5,
    marginLeft: 4,
  },
  reasonContainer: {
    backgroundColor: Colors.whitishGray,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginTop: 8,
  },
  resourceReasonText: {
    backgroundColor: Colors.white,
    height: hp(8),
    fontSize: 20,
    textAlignVertical: 'top',
  },
  reasonTextInput: {
    backgroundColor: Colors.white,
    height: hp(8),
    fontSize: 16,
    textAlignVertical: 'top',
  },
  leaveApproverContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.whitishGray,
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    marginTop: 8,
  },
  leaveApproverText: {
    fontWeight: 'bold',
    marginRight: wp(12),
  },
  leaveApproverName: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Colors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: hp(2),
    // position: 'absolute',
    // bottom: 0,
  },
  resourceButtonContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.lightBlue,
    paddingHorizontal: 24,
    paddingVertical: 6,
    marginBottom: hp(2),
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: Colors.white,
    paddingHorizontal: 32,
    borderRadius: 5,
    paddingVertical: 6,
  },
  resourceButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    borderRadius: 5,
    paddingVertical: 6,
  },
  mainPart: {
    flex: 1,
    justifyContent: 'space-between',
  },
  applyText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 15,
  },
  sliderComp: {
    width: wp(48),
    marginRight: wp(2),
  },
  leaveCard: {
    width: screenWidth - wp(25),
    backgroundColor: Colors.white,
    borderRadius: 6,
    marginHorizontal: wp(4),
    marginVertical: 5,
    // paddingVertical:hp(2)
  },
  leaveTextContainer: {
    borderBottomWidth: 0.8,
    paddingBottom: hp(0.5),
  },
  leaveText: {
    textAlign: 'center',
    color: Colors.black,
    fontWeight: '700',
  },
  bottomPart: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  remainingContainer: {
    width: wp(11),
    height: wp(11),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.parrotGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(3),
  },
  remainingText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.parrotGreen,
  },
  verticalLine: {
    height: '85%',
    borderWidth: 0.4,
    borderColor: 'black',
  },
  leaveDetails: {
    // alignItems: 'center',
    alignContent: 'center',
    marginLeft: wp(3),
  },
  allocated: {
    flex: 1,
    justifyContent: 'center',
  },
  taken: {
    flex: 1,
  },
  allocatedText: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '600',
  },
  takenText: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '600',
  },
  platformStyle: {
    marginBottom: hp(5),
    marginHorizontal: '5%',
  },
  marginBottom: hp(2),
  dropDownContainerStyle: {borderColor: Colors.borderColor},
  searchContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    height: 40,
  },

  row: {
    padding: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  highlighted: {
    backgroundColor: 'lightgrey',
  },
  rowText: {
    fontSize: 16,
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
});
