import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
export default StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 18,
    paddingBottom: wp(6),
  },
  container: {
    // paddingBottom: hp(1),
    // paddingHorizontal: wp(3),
    // marginTop: hp(1),
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    marginTop: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  imageView: {
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
  leaveDetailsContainer: {
    flexDirection: 'row',
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
    fontFamily: FontFamily.RobotoLight,
    fontSize: FontSize.h13,
    color: Colors.dune,
    // color: Colors.white,
  },
  recentText: {
    fontFamily: FontFamily.RobotoLight,
    fontSize: FontSize.h18,
    color: Colors.black,
  },
  image: {height: 25, width: 25, flex: 0.1},
  daysContainer: {
    marginRight: wp(5),
  },
  daysText: {
    fontSize: 26,
    fontFamily: FontFamily.RobotoLight,
  },
  typeDateContainer: {
    justifyContent: 'center',
  },
  leaveTypeText: {
    fontSize: 18,
    color: Colors.gold,
    marginBottom: 5,
    fontFamily: FontFamily.RobotoMedium,
  },
  leaveDatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  approved: {
    fontSize: 12,
    color: Colors.darkLovelyGreen,
  },
  pending: {
    fontSize: 12,
    color: Colors.gold,
  },
  dismissed: {fontSize: 12, color: Colors.darkBrown},
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.purpleShade,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h16,
    color: Colors.purpleShade,
  },
  noLeavesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noLeavesText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 16,
    color: Colors.lightBlue,
    marginVertical: 4,
  },
});
