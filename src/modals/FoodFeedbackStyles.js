import {StyleSheet} from 'react-native';
import {Colors} from 'colors/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

export const styles = StyleSheet.create({
  modalBackground: {
    width: '100%',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    borderRadius: 5,
  },
  textView: {
    marginTop: hp(15),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    backgroundColor: Colors.customColor({opacity: 0.8, r: 51, g: 51, b: 51}),
    borderRadius: 5,
  },
  emojiConteiner: {
    width: '90%',
    height: hp(10),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  emojiImages: {
    width: wp(12),
    height: hp(6.3),
    borderRadius: 50,
  },
  txtInputFeedback: {
    borderWidth: 0.8,
    width: '85%',
    marginTop: hp(2),
    marginBottom: hp(2),
    borderRadius: 5,
  },
  btnContainer: {
    width: '90%',
    height: hp(6),
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 17,
  },
  btn: {
    width: wp(26),
    height: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
});
