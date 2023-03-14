import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
export default StyleSheet.create({
  container: {
    backgroundColor: '#CFD2CF',
    width: wp(50),
    marginTop: hp(1),
    marginHorizontal: wp(1),
    borderRadius: 5,
    opacity: 1,
  },
  imagebackground: {
    maxHeight: hp(18),
    width: wp(50),
    borderColor: Colors.black,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  menuView: {
    backgroundColor: Colors.menuTransparentColor,
    width: '42%',
    height: '100%',
    paddingLeft: wp(4),
  },
  likeView: {
    flexDirection: 'row',
    paddingLeft: wp(2),
    paddingVertical: hp(0.5),
    alignItems: 'center',
  },
});
