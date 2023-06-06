import {StyleSheet} from 'react-native';
import {Colors} from 'colors/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {FontFamily} from 'constants/fonts';

export const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderRadius: 5,
    padding: wp(4),
  },
  textView: {
    marginTop: hp(15),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    backgroundColor: Colors.customColor({opacity: 0.8, r: 51, g: 51, b: 51}),
    borderRadius: 5,
  },
  emojiConteiner: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: hp(2.8),
    marginBottom: hp(1.6),
  },
  emojiImages: {
    width: wp(8),
    height: wp(8),
    borderRadius: 50,
  },
  txtInputFeedback: {
    borderWidth: 1,
    borderColor: Colors.grey,
    margin: wp(2),
    paddingTop: hp(1.4),
    paddingBottom: hp(7),
    paddingLeft: wp(2),
    borderRadius: 7,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  textStyle: {
    fontFamily: FontFamily.RobotoLight,
    fontSize: 17,
  },
  btn: {
    width: wp(26),
    height: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  foodTypeText: {
    fontSize: 19,
    color: Colors.lovelyPurple,
    marginLeft: wp(1),
  },
  buttonCancel: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(1),
    borderWidth: 1,
    borderColor: Colors.dune,
    borderRadius: 50,
  },
  buttonSubmit: {
    borderColor: Colors.lovelyPurple,
    marginLeft: wp(6),
  },
});
