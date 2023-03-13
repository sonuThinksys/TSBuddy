import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: hp(1.4),
    backgroundColor: Colors.skyColor,
    paddingHorizontal: wp(2),
    opacity: 1,
    justifyContent: 'space-between',
  },
  secondContainer: {
    // flex: 1,
    backgroundColor: Colors.blue,
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
    borderRadius: 4,
    opacity: 1,
  },
  text1: {
    fontFamily: FontFamily.RobotoBold,
    fontSize: FontSize.h16,
    marginTop: hp(1),
    color: Colors.black,
    //flex: 2,
  },
  text2: {
    fontFamily: FontFamily.RobotoBold,
    fontSize: FontSize.h14,
    color: Colors.white,
  },
});
