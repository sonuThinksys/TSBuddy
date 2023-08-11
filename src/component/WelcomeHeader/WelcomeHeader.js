import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import {StyleSheet, Text, View} from 'react-native';
import BusinessClock from 'assets/newDashboardIcons/business-time.svg';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getEmployeeShift, getTodayCheckInTime} from 'redux/homeSlice';
import jwt_decode from 'jwt-decode';

const WelcomeHeader = () => {
  const dispatch = useDispatch();
  const {employeeProfile: profileData = {}} = useSelector(state => state.home);
  const firstName = profileData?.firstName;
  const middleName = profileData?.middleName;
  const lastName = profileData?.lastName;
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  const [checkInDetails, setCheckInDetails] = useState({});
  const [todayStatus, setTodayStatus] = useState(null);
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id || '';

  useEffect(() => {
    if (!isGuestLogin) {
      (async () => {
        try {
          const checkIn = await dispatch(getTodayCheckInTime({token}));

          const employeeShift = await dispatch(
            getEmployeeShift({token, id: employeeID}),
          );

          const checkedInTimeObj = new Date(checkIn.payload[0]?.time);
          const properInTime = employeeShift?.payload?.startTime;

          const [properInHours, properInMinutes, properInSeconds] =
            properInTime.split(':');

          const properCheckInTimeStamp = new Date().setHours(
            properInHours,
            properInMinutes,
            properInSeconds,
          );

          const checkedInTimeStamp = checkedInTimeObj.getTime();
          const differenceInTime = checkedInTimeStamp - properCheckInTimeStamp;

          const lateHours = Math.floor(differenceInTime / (1000 * 60 * 60));
          const lateMinutes = Math.floor(
            (differenceInTime % (1000 * 60 * 60)) / (1000 * 60),
          );
          const lateSeconds = Math.floor(
            (differenceInTime % (1000 * 60)) / 1000,
          );

          setTodayStatus({
            lateHours,
            lateMinutes,
            lateSeconds,
            isLate: differenceInTime > 0,
          });

          if (checkIn.error) {
            throw new Error('Time not found.');
          }
          const checkInDateObj = new Date(checkIn?.payload[0]?.time);
          const totalSpentTime = +(new Date() - checkInDateObj);

          const hours = +Math.floor(totalSpentTime / (1000 * 60 * 60));
          const minutes = +Math.floor(
            (totalSpentTime % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = +Math.floor((totalSpentTime % (1000 * 60)) / 1000);

          setCheckInDetails({
            hours,
            minutes,
            seconds,
            empMachineCode: +checkIn?.payload[0].employeeMachineCode,
          });
        } catch (err) {
          console.log('erroor:', err);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (!isGuestLogin) {
      if (checkInDetails.hours !== undefined) {
        const timer = setInterval(() => {
          let currentSeconds = checkInDetails.seconds;
          let currentMinutes = checkInDetails.minutes;
          let currentHours = checkInDetails.hours;
          if (currentSeconds === 59 && currentMinutes !== 59) {
            currentSeconds = 0;
            currentMinutes += 1;
          } else if (currentSeconds === 59 && currentMinutes === 59) {
            currentSeconds = 0;
            currentMinutes = 0;
            currentHours += 1;
          } else {
            currentSeconds += 1;
          }

          // setCheckInDetails({
          //   hours: currentHours,
          //   minutes: currentMinutes,
          //   seconds: currentSeconds,
          // });

          setCheckInDetails(currentCheckInDetails => ({
            ...currentCheckInDetails,
            hours: currentHours,
            minutes: currentMinutes,
            seconds: currentSeconds,
          }));
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      }
    }
  }, [checkInDetails.seconds]);

  const userName = `${firstName ? firstName : ''} ${
    middleName ? middleName : ''
  } ${lastName ? lastName : ''}`;

  const todayDateObject = new Date();
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome, </Text>
        <Text style={styles.nameText}>
          {' '}
          {isGuestLogin ? 'Guest' : userName || 'N/A'}
        </Text>
        {/* <Text style={styles.nameText}> {userName || 'N/A'}</Text> */}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.headingContainer}>
          <BusinessClock height={22} width={22} marginRight={16} />
          <Text style={styles.timeText}>Total Work Time</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>
            {checkInDetails?.hours < 10
              ? `0${checkInDetails?.hours}`
              : checkInDetails?.hours || '00'}{' '}
            :{' '}
            {checkInDetails?.minutes < 10
              ? `0${checkInDetails?.minutes}`
              : checkInDetails?.minutes || '00'}{' '}
            :{' '}
            {checkInDetails?.seconds < 10
              ? `0${checkInDetails?.seconds}`
              : checkInDetails?.seconds || '00'}{' '}
            Hrs
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dayMonthText}>
            {daysOfWeek[todayDateObject.getDay()]},{' '}
            {todayDateObject.toLocaleString('en-US', {month: 'short'})}{' '}
          </Text>
          <Text style={styles.dateYearText}>
            {todayDateObject?.getDate()}, {todayDateObject.getFullYear()}
          </Text>
        </View>
        {checkInDetails?.empMachineCode !== 0 ? (
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>
              Noida Sector 62, Uttar Pradesh
            </Text>
          </View>
        ) : null}
        <View style={styles.lateContainer}>
          <Text style={styles.lateText}>
            {todayStatus?.isLate ? 'Late' : 'Early'} by{' '}
            {`${!isGuestLogin ? todayStatus?.lateHours || '00' : '00'}:${
              !isGuestLogin ? todayStatus?.lateMinutes || '00' : '00'
            }:${todayStatus?.lateSeconds || '00'}`}{' '}
            hours
          </Text>
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
    flexWrap: 'wrap',
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
