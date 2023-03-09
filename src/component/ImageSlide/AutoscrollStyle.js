import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
export default StyleSheet.create({
  container: {
    borderRadius: 10,
    marginVertical: hp(1),
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    width: wp(70),
    marginHorizontal: wp(4),
  },
  backgroundImage: {
    borderRadius: 10,
  },
  backgroundImageView: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    backgroundColor: Colors.darkTransparentColor,
    justifyContent: 'center',
    marginTop: hp(14),
    width: '60%',
    marginHorizontal: wp(12),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
