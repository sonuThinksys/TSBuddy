import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightPurple,
    // marginTop: 16,
  },
  commonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    objectFit: 'contain',
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  arrowButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: wp(2),
  },
  empTextStyle: {
    paddingLeft: wp(1.5),
    fontSize: 12,
  },
  singleItemStyle: {
    backgroundColor: Colors.white,
    paddingVertical: hp(1.6),
    marginTop: hp(1),
    paddingHorizontal: wp(2.5),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedEmployeeStyle: {
    backgroundColor: Colors.white,
    paddingTop: hp(1.6),
    marginTop: hp(1),
    borderRadius: 8,
  },
  selectedCommonEmployeeStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: wp(2.5),
    paddingBottom: hp(1.5),
    borderBottomColor: Colors.lightGray2,
  },
  calenderListStyle: {
    borderRightWidth: 1,
    borderRightColor: Colors.lightGray2,
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: 5,
    flex: 1,
  },
  listItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
    paddingHorizontal: wp(1),
  },
  mainPressButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: hp(1.5),
    justifyContent: 'space-between',
    paddingHorizontal: wp(2.5),
    alignItems: 'center',
    borderColor: Colors.lightGray2,
    backgroundColor: Colors.white,
    marginTop: 16,
    marginBottom: 20,
  },
  dropdownIconContainer: {
    marginRight: 4,
  },
});
