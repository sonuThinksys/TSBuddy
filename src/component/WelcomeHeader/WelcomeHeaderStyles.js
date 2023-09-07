import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    shadowColor: Colors.colorDodgerBlue2,
    shadowOffset: {width: 0, height: 2}, // Set the shadow offset
    shadowOpacity: 0.2, // Set the shadow opacity
    shadowRadius: 0.1, // Set the shadow radius
    elevation: 1,
  },
  welcomeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 4,
    marginBottom: 22,
  },
  welcomeText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h24,
  },
  nameText: {
    fontFamily: FontFamily.RobotoThin,
    fontSize: FontSize.h24,
  },
  infoContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 32,
    borderRadius: 14,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 24,
  },
  timeText: {
    fontSize: FontSize.h20,
    fontFamily: FontFamily.RobotoLight,
  },
  timeContainer: {
    marginBottom: 18,
  },
  time: {
    fontSize: FontSize.h26,
    textAlign: 'center',
    color: Colors.green,
    fontFamily: FontFamily.RobotoRegular,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  dayMonthText: {
    fontFamily: FontFamily.RobotoRegular,
    fontSize: 16,
  },
  dateYearText: {
    fontSize: 16,
    fontFamily: FontFamily.RobotoLight,
  },
  addressContainer: {
    alignItems: 'center',
    marginBottom: 6,
  },
  addressText: {
    fontFamily: FontFamily.RobotoLight,
    fontSize: 15,
  },
  lateContainer: {
    alignItems: 'center',
  },
  lateText: {
    color: Colors.gold,
  },
});

export default styles;
