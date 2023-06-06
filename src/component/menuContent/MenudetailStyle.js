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
    // backgroundColor: Colors.skyColor,
    paddingHorizontal: 20,
    opacity: 1,
    justifyContent: 'space-between',
  },
  secondContainer: {
    // flex: 1,
    // backgroundColor: '#192f6a',
    backgroundColor: Colors.blue,
    backgroundColor: Colors.reddishTint,

    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
    borderRadius: 5,
    opacity: 1,
  },
  text1: {
    fontFamily: FontFamily.RobotoLight,
    fontSize: FontSize.h18,
    marginTop: hp(1),
    color: Colors.black,
    //flex: 2,
  },
  text2: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h16,
    color: Colors.purpleShade,
  },
  button: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.purpleShade,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
