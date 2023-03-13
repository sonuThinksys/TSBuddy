import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {FontFamily, FontSize} from 'constants/fonts';
import {Colors} from 'colors/Colors';
export default StyleSheet.create({
  container: {
    backgroundColor: Colors.lightBlue,
    height: '100%',
    width: '100%',
  },
  textInputContainer: {
    width: '90%',
    backgroundColor: Colors.darkTransparentColor,
    marginVertical: hp(4),
    paddingVertical: hp(4),
    marginLeft: wp(5),
    borderRadius: 5,
    paddingHorizontal: wp(3),
  },
  textinputView: {
    height: hp(7),
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
    flexDirection: 'row',
    marginVertical: hp(3),
  },
  iconView: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.lightBlue,
    paddingHorizontal: wp(5),
  },
  textinput: {
    width: '80%',
    height: '100%',
    backgroundColor: Colors.white,
    paddingLeft: wp(5),
  },
  passwordView: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginView: {
    height: hp(7),
    backgroundColor: Colors.lightBlue,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 1,
    justifyContent: 'center',
  },
  loginText: {
    color: Colors.white,
    fontFamily: FontFamily.RobotoBold,
    textAlign: 'center',
  },
  orText: {
    textAlign: 'center',
    color: Colors.skyColor,
    fontSize: 18,
    marginTop: hp(2),
    fontWeight: '200',
  },
  bioMetricView: {
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    backgroundColor: Colors.lightBlue,
    marginHorizontal: wp(10),
    borderRadius: 5,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  bioMetricText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: FontSize.h16,
    paddingTop: hp(0.5),
    paddingLeft: wp(15),
  },
  backgroundVideo: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  rememberText: {
    marginHorizontal: wp(1),
    color: Colors.white,
    fontFamily: FontFamily.RobotoBold,
  },
});
