import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  mailImg: {
    height: 25,
    width: 25,
    tintColor: Colors.reddishTint,
  },
  mainContainer: {
    paddingHorizontal: 12,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginTop: hp(0.6),
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: wp(4),
    shadowColor: Colors.colorDodgerBlue2,
    shadowOffset: {width: 0, height: 2}, // Set the shadow offset
    shadowOpacity: 0.2, // Set the shadow opacity
    shadowRadius: 0.1, // Set the shadow radius
    elevation: 1,
    marginBottom: 5,
    paddingHorizontal: wp(4),
    justifyContent: 'space-between',
  },
  requestType: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: Colors.skin,
    color: Colors.darkSkin,
    fontSize: 12,
    fontFamily: FontFamily.RobotoLightItalic,
  },
  leftContainer: {
    flexDirection: 'row',
  },
  empID: {
    marginRight: 16,
    fontSize: FontSize.h16,
    fontFamily: FontFamily.RobotoLight,
    color: Colors.lovelyPurple,
  },
  name: {
    fontSize: FontSize.h17,
    fontFamily: FontFamily.RobotoRegular,
    color: Colors.darkishPink,
  },
  countText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h18,
    color: Colors.royalBlue,
  },
  countContainer: {
    alignItems: 'flex-end',
    marginRight: 16,
  },
});

export default styles;
