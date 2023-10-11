import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    borderRadius: 13,
    paddingTop: 16,
    marginVertical: 14,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 24,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 60,
    marginRight: 14,
  },
  profileImageContainer: {},
  checkInDetails: {
    backgroundColor: Colors.grayishWhite,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  addressAndTypeOfMode: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  empDetailsMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  departmentContainer: {
    flexDirection: 'row',
  },
  employeeDepartmentMainContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  namesContainer: {
    // width: '75%',
    flex: 1,
  },
  employeeNameText: {
    marginBottom: 8,
    fontSize: FontSize.h19,
    fontFamily: FontFamily.RobotoRegular,
  },
  RMNameText: {
    fontSize: FontSize.h13,
    fontFamily: FontFamily.RobotoRegular,
  },
  lightDune: {
    color: Colors.lightDune,
  },
  dune: {
    color: Colors.dune,
  },
  empIdText: {
    fontSize: FontSize.h12,
  },
  darkDune: {
    color: Colors.darkDune,
  },
  checkInSubDetails: {
    flexDirection: 'row',
  },
  checkInText: {
    fontSize: FontSize.h13,
  },
  checkIn: {
    fontSize: FontSize.h12,
  },
  attendanceType: {
    fontSize: FontSize.h13,
  },
  addressText: {
    fontFamily: FontFamily.RobotoRegular,
    fontSize: FontSize.h13,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {marginRight: 8},
  allDays: {
    marginVertical: 14,
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  daysContainer: {
    flexDirection: 'row',
  },
  workingText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h15,
  },
  dayContainer: {
    // padding: 5,
    height: wp(5),
    width: wp(5),
    marginRight: 5,
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  purpleBackground: {
    backgroundColor: Colors.lightPurple,
  },
  greenBackground: {
    backgroundColor: Colors.whitishGreen,
  },
  greyBackground: {
    backgroundColor: Colors.grayishWhite,
  },
  purpleColor: {
    color: Colors.lovelyPurple,
  },
  greenColor: {
    color: Colors.darkParrot,
  },
  greyColor: {
    color: Colors.lightGray1,
  },
  dayText: {
    fontFamily: FontFamily.RobotoBold,
    fontSize: FontSize.h13,
  },
  allDaysLeft: {
    flexDirection: 'row',
  },
  expandedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '84%',
  },
  headerContainer: {
    backgroundColor: Colors.grayishWhite,
  },
  extraContainer: {
    width: '16%',
  },
  infoIcon: {
    height: 16,
    width: 16,
    tintColor: Colors.lightDune,
  },
  expandedMainContainer: {},
  expandedHeaderText: {
    fontSize: FontSize.h13,
    fontFamily: FontFamily.RobotoMedium,
  },
  expandedRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  expandedRowLeft: {
    flexDirection: 'row',
    width: '84%',
    justifyContent: 'space-between',
  },
  headerTableTitle: {
    flex: 1,
  },
  tableRowElementContainer: {
    flex: 1,
  },
  expendedRowText: {
    color: Colors.lightDune,
  },
  expandedRowIconsContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalChildContainer: {
    width: '100%',
    // height: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    paddingVertical: 16,
    // paddingHorizontal: 10,
  },
  modalHeaderNameText: {
    color: Colors.lovelyPurple,
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h17,
    letterSpacing: 0.8,
  },
  nameContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  modeContainer: {
    backgroundColor: Colors.whitishBlue,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  briefCaseIcon: {
    marginRight: 5,
  },
  modeText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h15,
    letterSpacing: 0.6,
  },
  checkBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  checkBoxModeText: {
    fontSize: FontSize.h16,
    color: Colors.dune,
    marginRight: 8,
  },
  mode: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  datesContainer: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    zIndex: -1,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  dateTitleText: {
    marginBottom: hp(1),
    fontSize: 18,
    color: Colors.black,
  },
  fromDateContainer: {
    paddingVertical: hp(1),
    marginTop: 10,
    width: '47%',
  },
  fromDateSelect: {
    borderRadius: wp(25),
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.grey,
    flexDirection: 'row',
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(1.2),
    justifyContent: 'space-between',
  },
  fromDatePlaceholder: {
    fontSize: 14,
  },
  toDateMainContainer: {
    paddingVertical: hp(1),
    marginTop: 10,
    width: '47%',
  },
  toDateTitleText: {
    fontSize: 18,
    color: Colors.black,
    marginBottom: hp(1),
  },
  toDateSelect: {
    borderRadius: wp(25),
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.grey,
    flexDirection: 'row',
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(1.2),
    justifyContent: 'space-between',
  },
  toDatePlaceholder: {
    fontSize: 14,
  },
  selectDaysMainContainer: {
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  selectDaysTitle: {
    fontSize: FontSize.h15,
    fontFamily: FontFamily.RobotoMedium,
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  allDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  specificDayContainer: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  allDayText: {
    fontFamily: FontFamily.RobotoRegular,
    color: Colors.dune,
    fontSize: FontSize.h16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.midGrey,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  saveButton: {
    backgroundColor: Colors.lovelyPurple,
  },
  buttonText: {
    fontFamily: FontFamily.RobotoMedium,
    letterSpacing: 0.6,
    fontSize: FontSize.h16,
  },
  buttonCancelText: {
    color: Colors.dune,
  },
  buttonSaveText: {
    color: Colors.white,
  },
  leaveTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaveType: {
    fontSize: 13,
  },
  noExpandedDataText: {
    textAlign: 'center',
    paddingVertical: 12,
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h15,
  },
  loaderContainer: {
    paddingVertical: 14,
  },
});

export default styles;
