import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp(1.6),
    flex: 1,
    backgroundColor: Colors.whitishBlue,
  },
  applyLeaveButton: {
    // paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    borderWidth: 1,
    borderColor: Colors.black,
    marginHorizontal: wp(3),
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: Colors.lightGray,
    marginBottom: hp(1),
    alignItems: 'center',
    paddingLeft: wp(2.5),
    justifyContent: 'space-between',
  },
  applyLeaveTextContainer: {
    borderColor: Colors.orangeColor,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    width: 20,
    height: 20,
  },
  applyLeaveAddSign: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.orangeColor,
  },
  leaveApplicationText: {
    fontSize: FontSize.h12,
    fontFamily: FontFamily.RobotoMedium,
    color: Colors.purple,
    textAlign: 'center',
  },
});

export default styles;
