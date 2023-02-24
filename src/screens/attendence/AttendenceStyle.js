import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  secondContainer: {
    borderColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    marginVertical: hp(7),
    marginHorizontal: wp(6),
    borderRadius: 10,
  },
  monthText: {
    color: '#FFE4E1',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: wp(10),
    // marginVertical: hp(1.5),
  },
  dayText: {
    color: '#FFE4E1',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: wp(10),
  },
  reportView: {borderColor: 'white', borderTopWidth: 1, flexDirection: 'row'},
  weekliyTextView: {
    borderRightWidth: 1,
    borderColor: 'white',
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  reportText: {
    textAlign: 'center',
    color: '#3CB371',
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
    color: '#9370DB',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
