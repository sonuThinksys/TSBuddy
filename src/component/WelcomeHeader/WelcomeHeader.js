import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import {StyleSheet, Text, View} from 'react-native';
import BusinessClock from 'assets/newDashboardIcons/business-time.svg';

const WelcomeHeader = () => {
  const userName = 'Utkarsh gupta';
  return (
    <View style={styles.mainContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome, </Text>
        <Text style={styles.nameText}> {userName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.headingContainer}>
          <BusinessClock height={22} width={22} marginRight={16} />
          <Text style={styles.timeText}>Total Work Time</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>02 : 15 : 08 Hrs</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dayMonthText}>Tuesday, Mar </Text>
          <Text style={styles.dateYearText}>28, 2023</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Noida Sector 62, Uttar Pradesh</Text>
        </View>
        <View style={styles.lateContainer}>
          <Text style={styles.lateText}>Late by 15:42 min</Text>
        </View>
      </View>
    </View>
  );
};

export default WelcomeHeader;

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
