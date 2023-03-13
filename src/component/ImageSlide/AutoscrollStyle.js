import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
export default StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    paddingRight: 1,
    borderRadius: 15,
  },
  backgroundImage: {
    width: '100%',
    minWidth: wp(70),
    borderWidth: 1,
    borderColor: Colors.lightGray2,
    backgroundColor: Colors.lightGray2,
    borderRadius: 9,
    alignItems: 'flex-end',
  },
  textView: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    backgroundColor: Colors.darkTransparentColor,
    marginTop: hp(14),
    width: wp(60),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
