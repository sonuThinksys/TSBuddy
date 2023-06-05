import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
export default StyleSheet.create({
  container: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    marginTop: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  leavesContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.colorDodgerBlue2,
    shadowOffset: {width: 0, height: 2}, // Set the shadow offset
    shadowOpacity: 0.2, // Set the shadow opacity
    shadowRadius: 0.1, // Set the shadow radius
    elevation: 1,
    paddingVertical: wp(6),
    marginBottom: hp(3.2),
  },
  remainingText: {
    fontFamily: FontFamily.RobotoLight,
    fontSize: FontSize.h18,
    marginTop: hp(1),
    color: Colors.black,
  },
  leavesTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leaveType: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    justifyContent: 'space-around',
    // paddingRight: 10,
    marginHorizontal: 16,
    // paddingHorizontal: 10,
    // minWidth: wp(20),
  },
  leavesType1: {
    height: 14,
    width: 14,
    backgroundColor: Colors.lovelyYellow,
    borderRadius: 7,
    marginRight: 5,
  },
  leavesType2: {
    height: 14,
    width: 14,
    backgroundColor: Colors.lovelyBlue,
    borderRadius: 7,
    marginRight: 5,
  },
  leavesType3: {
    height: 14,
    width: 14,
    backgroundColor: Colors.lovelyGreen,
    borderRadius: 7,
    marginRight: 5,
  },
  leavesType4: {
    height: 12,
    width: 12,
    backgroundColor: Colors.red,
    marginRight: 5,
  },
  leaveTextColor: {},
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.purpleShade,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h16,
    color: Colors.purpleShade,
  },
});
