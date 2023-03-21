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
    backgroundColor: Colors.skyColor,
    marginTop: hp(1),
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginTop: hp(0.6),
    shadowOpacity: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemView: {
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(6),
    borderRadius: 5,
    marginVertical: hp(0.5),
    backgroundColor: Colors.darkCyan,
    flex: 0.3,
  },
  dateText: {
    fontFamily: FontFamily.RobotoBold,
    fontSize: FontSize.h16,
    color: Colors.white,
  },
  recentText: {fontFamily: FontFamily.RobotoBold, fontSize: FontSize.h16},
  image: {height: 25, width: 25, flex: 0.1},
});
