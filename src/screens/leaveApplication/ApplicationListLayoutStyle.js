import {FontFamily} from 'constants/fonts';
const {Colors} = require('colors/Colors');
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  request: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,
    shadowColor: Colors.colorDodgerBlue2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 0.1,
    elevation: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 10,
  },
  appliedRequestsLeft: {
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 0,
  },
  noDataFoundText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 16,
    color: Colors.lightBlue,
    marginVertical: 4,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leave: {
    alignItems: 'center',
    marginRight: wp(1),
  },
  totalDaysText: {
    fontSize: 25,
    fontFamily: FontFamily.RobotoLight,
  },
  daysText: {
    fontSize: 12,
    fontFamily: FontFamily.RobotoMedium,
  },
  empId: {
    fontSize: 12,
    fontFamily: FontFamily.RobotoMedium,
  },
  datesContainer: {
    marginLeft: 20,
    marginTop: 4,
  },
  dates: {
    fontSize: 15,
    fontFamily: FontFamily.RobotoRegular,
    color: Colors.dune,
    marginBottom: hp(1),
  },
  reguCont: {
    flexDirection: 'row',
  },
  reguText: {
    fontSize: 11,
    color: Colors.lightGray1,
  },
  reguTitleText: {
    fontSize: 12,
    color: Colors.lightGray1,
    fontFamily: FontFamily.RobotoMedium,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    color: Colors.gold,
  },
  statusText2: {
    fontSize: 12,
    color: Colors.darkBrown,
  },
  statusText3: {
    fontSize: 12,
    color: Colors.darkLovelyGreen,
  },
  loaderContainer: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  flatlist: {
    flex: 1,
  },
  flatlistContainer: {
    flex: 1,
    // borderWidth: 1,
  },
});

export default styles;
