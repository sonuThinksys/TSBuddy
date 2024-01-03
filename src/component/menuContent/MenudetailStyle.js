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
  modalBackground: {
    backgroundColor: Colors.white,
    borderRadius: 14,
  },
  newDailyMenuHeading: {
    padding: 13,
    backgroundColor: Colors.lovelyBlue,
    color: Colors.white,
    fontSize: 20,
    fontFamily: FontFamily.RobotoMedium,
  },
  modal: {
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  foodTypeText: {
    fontSize: 18,
    fontFamily: FontFamily.RobotoLight,
    color: Colors.dune,
    marginBottom: 7,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.lightGray2,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 8,
  },
  foodContainer: {
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
  },
  buttonContainer: {
    borderRadius: 7,
    paddingHorizontal: 18,
    paddingVertical: 9,
    backgroundColor: Colors.green,
  },
  opacity40: {
    opacity: 0.4,
  },
  buttonText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 18,
    color: Colors.white,
  },
});
