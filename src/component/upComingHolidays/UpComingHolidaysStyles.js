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
    backgroundColor: '#C3F8FF',
    marginTop: hp(1),
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginTop: hp(0.6),
    shadowOpacity: 0.1,
    paddingLeft: wp(1),
  },
  textView: {
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(5),
    width: wp(40),
    borderRadius: 5,
    marginVertical: hp(0.5),
    backgroundColor: Colors.darkBlue,
  },
  image: {height: 40, width: 40, marginTop: hp(1.8), flex: 1},
  text1: {marginTop: hp(2.4), flex: 5, marginLeft: wp(1)},
  text2: {
    fontFamily: FontFamily.RobotoBlack,
    fontSize: FontSize.h16,
    color: Colors.white,
  },
  upcomingText: {fontFamily: FontFamily.RobotoBlack, fontSize: FontSize.h16},
});
