import {Colors} from 'colors/Colors';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
export default StyleSheet.create({
  container: {
    flex: 1,
    // width:"100%",
    // justifyContent: 'space-between',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  secondContainer: {
    borderColor: Colors.white,
    borderWidth: 1,
    marginVertical: hp(7),
    marginHorizontal: wp(6),
    borderRadius: 10,
    backgroundColor: Colors.darkTransparentColor,
    // flex:1
  },
  monthText: {
    color: Colors.whitishPink,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: wp(10),
    // marginVertical: hp(1.5),
  },
  dayText: {
    color: Colors.whitishPink,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: wp(10),
  },
  reportView: {
    borderColor: Colors.white,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  weekliyTextView: {
    borderRightWidth: 1,
    borderColor: Colors.white,
    borderTopWidth: 0,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  reportText: {
    textAlign: 'center',
    color: Colors.parrotGreen,
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeSpendView: {
    flex: 1,
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  timeSpendText: {
    textAlign: 'center',
    color: Colors.violet,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loaderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: 2000,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
