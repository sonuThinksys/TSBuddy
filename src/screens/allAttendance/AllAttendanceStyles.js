import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import {heightPercentageToDP, widthPercentageToDP} from 'utils/Responsive';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 17,
    backgroundColor: Colors.whitishBlue,
    flex: 1,
  },
  attendanceTypeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: Colors.whitishBlue,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 100,
  },
  selectDateContainer: {
    margin: 10,
    flexDirection: 'row',
  },
  selectText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h20,
    color: Colors.darkBrown,
    marginRight: 14,
  },
  selectDatePressable: {
    justifyContent: 'center',
  },
  singleCard: {},
  leftType: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  rightType: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  textColorWhite: {
    color: Colors.white,
  },
  selectedDateContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.lightGray2,
    marginTop: 16,
    marginBottom: 15,
    flexDirection: 'row',
  },
  newAttBtnContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.lightGray2,
    flexDirection: 'row',
    marginTop: 20,
  },
  selectedDateText: {
    fontFamily: FontFamily.RobotoRegular,
    fontSize: FontSize.h14,
  },
  dateTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dropdownIconContainer: {
    marginRight: 12,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 5,
    // height: '44.5%',
    width: '95%',
    padding: 20,
  },
  newAttendanceTitle: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h17,
    color: Colors.lovelyPurple,
    marginBottom: 10,
  },
  headerText: {marginBottom: 10},
  attendanceDate: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.lightGray1,
    borderRadius: 3,
    padding: 10,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(3.5),
    borderRadius: widthPercentageToDP(3.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    width: widthPercentageToDP(4),
    height: heightPercentageToDP(2),
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray1,
    borderRadius: 3,
    marginBottom: 10,
  },
  searchBoxForEmployee: {
    padding: 8,
    flex: 1,
  },
  searchResultBox: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: Colors.white,
    height: '64%',
    width: '101%',
    // borderWidth: 1,
    borderColor: Colors.lightGray1,
    top: heightPercentageToDP(18),
    left: widthPercentageToDP(4),
    right: 0,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 7,
  },
  searcheResultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  borderBottom: {
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginBottom: 6,
    borderColor: Colors.lightGray2,
  },
  searchedName: {
    fontSize: FontSize.h15,
    fontFamily: FontFamily.RobotoMedium,
  },
  searchedEmpId: {
    fontSize: FontSize.h14,
    fontFamily: FontFamily.RobotoRegular,
  },
});

export default styles;
