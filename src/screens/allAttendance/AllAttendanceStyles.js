import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';

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
  selectedDateContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.lightGray2,
    marginTop: 16,
    marginBottom: 20,
    flexDirection: 'row',
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
});

export default styles;
