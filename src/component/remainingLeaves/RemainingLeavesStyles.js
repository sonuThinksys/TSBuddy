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
    backgroundColor: '#C3F8FF',
    marginTop: hp(1),
  },
  remainingText: {fontFamily: FontFamily.RobotoBlack, fontSize: FontSize.h16},
  leavesTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leaveType: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    justifyContent: 'space-around',
    paddingRight: 10,
    // paddingHorizontal: 10,
    // minWidth: wp(20),
  },
  leavesType1: {
    height: 12,
    width: 12,
    backgroundColor: 'orange',
    marginRight: 5,
  },
  leavesType2: {
    height: 12,
    width: 12,
    backgroundColor: Colors.darkBlue,
    marginRight: 5,
  },
  leavesType3: {
    height: 12,
    width: 12,
    backgroundColor: Colors.green,
    marginRight: 5,
  },
  leavesType4: {
    height: 12,
    width: 12,
    backgroundColor: Colors.red,
    marginRight: 5,
  },
  leaveTextColor: {},
});
