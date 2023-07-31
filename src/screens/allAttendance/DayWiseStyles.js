import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: Colors.colorDodgerBlue2,
    shadowOffset: {width: 0, height: 2}, // Set the shadow offset
    shadowOpacity: 0.2, // Set the shadow opacity
    shadowRadius: 0.1, // Set the shadow radius
    elevation: 1,
  },
  image: {
    height: 36,
    width: 36,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  imageContainer: {
    marginRight: 12,
  },
  empDetailsContainer: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
  },
  mainDetailsContainer: {
    justifyContent: 'space-between',
  },
  attendanceStatusContainer: {
    marginRight: 4,
    width: 44,
    paddingVertical: 12.5,
    borderRadius: 12,
  },
  nameContainer: {},
  nameText: {
    fontFamily: FontFamily.RobotoRegular,
    color: Colors.lightDune,
    fontSize: FontSize.h15,
  },
  employeeIdText: {
    fontSize: FontSize.h11,
    fontFamily: FontFamily.RobotoRegular,
    color: Colors.lightDune,
    marginRight: 10,
  },
  empIdRegularizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  regularizedText: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: Colors.skin,
    color: Colors.darkSkin,
    fontSize: FontSize.h11,
    fontFamily: FontFamily.RobotoLightItalic,
  },
  regularizeStatus: {
    fontSize: FontSize.h11,
    fontFamily: FontFamily.RobotoLightItalic,
    backgroundColor: Colors.darkSkin,
    color: Colors.skin,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  empDetailsLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statusText: {
    textAlign: 'center',
    fontSize: FontSize.h15,
  },
  checkInOutContainer: {
    backgroundColor: Colors.skyBlue,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 11,
    flexDirection: 'row',
  },
  checkInOutTime: {
    color: Colors.lightDune,
    fontFamily: FontFamily.RobotoRegular,
  },
  checkInOutText: {
    fontFamily: FontFamily.RobotoRegular,
  },
});

export default styles;
