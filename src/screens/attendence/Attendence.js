import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import Modal from 'react-native-modal';

import {
  heightPercentageToDP as hp,
  screenHeight,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import styles from './AttendenceStyle';
import {CalendarList} from 'react-native-calendars';
import {Colors} from 'colors/Colors';
import {getAttendencaeData} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {attendenceMonthImages, days} from 'defaultData';
import {ERROR} from 'constants/strings';
import ShowAlert from 'customComponents/CustomError';
import {
  attendanceDate,
  finalCurrentDate,
  startEndDateFormat,
  todaySelectedDate,
} from 'utils/utils';
import {FontFamily} from 'constants/fonts';
const Attendence = ({navigation}) => {
  const {attendenceData: dailyAttendance = []} = useSelector(
    state => state.home,
  );

  const {holidayData: holidaysData = []} = useSelector(state => state.home);
  const [visisbleMonth, setVisibleMonth] = useState(0);
  const [visibleYear, setVisibleYear] = useState(0);
  const [remainingHours, setRemainingHours] = useState(0.0);
  const [isLoading, setLoading] = useState(false);
  const [isImageLoading, setImageLoading] = useState(false);
  const [showDailyStatusModal, setShowDailyStatusModal] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [pressedDayDate, setPressedDayDate] = useState(null);
  console.log('pressedDayDate:', pressedDayDate);

  useEffect(() => {
    // year:2023
    // month:5
    // day:5
    // timestamp:1683244800000
    // dateString:2023-05-05

    const pressedDate = dailyAttendance?.find(
      date =>
        new Date(date?.attendanceDate)?.getDate() ===
        new Date(modalDate?.dateString).getDate(),
    );

    const inTimeHours = new Date(pressedDate?.inTime)?.getHours();
    const outTimeHours = new Date(pressedDate?.outTime)?.getHours();
    const inTimeMinutes = new Date(pressedDate?.inTime)?.getMinutes();
    const outTimeMinutes = new Date(pressedDate?.outTime)?.getMinutes();

    const inTime =
      inTimeHours +
      ':' +
      (inTimeMinutes < 10 ? '0' + inTimeMinutes : inTimeMinutes);
    const outTime =
      outTimeHours +
      ':' +
      (outTimeMinutes < 10 ? '0' + outTimeMinutes : outTimeMinutes);

    const pressedDateObj = {
      inTime,
      outTime,
      totalHours: pressedDate?.totalHours,
    };

    // console.log('pressedDate:', typeof pressedDate.inTime);

    setPressedDayDate(pressedDateObj);
  }, [showDailyStatusModal]);

  const dispatch = useDispatch();
  const {userToken: token} = useSelector(state => state.auth);
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id || '';

  function getDaysInMonth(monthIndex) {
    // Create a new Date object with the current year and the given month index (0-based)
    const date = new Date(new Date().getFullYear(), monthIndex, 1);

    // Move the date to the next month
    date.setMonth(date.getMonth() + 1);

    // Set the date to the last day of the previous month
    date.setDate(date.getDate() - 1);

    // Return the date's day (which is the number of days in the month)
    return date.getDate();
  }

  useEffect(() => {
    (async () => {
      if (employeeID && token) {
        try {
          if (visisbleMonth > 0 || visibleYear > 0) {
            setLoading(true);
            const attendence = await dispatch(
              getAttendencaeData({
                token,
                employeeID,
                visisbleMonth,
                visibleYear,
              }),
            );
            // const data = attendence?.payload?.dailyAttendance;

            if (attendence?.error) {
              ShowAlert({
                messageHeader: ERROR,
                messageSubHeader: attendence?.error?.message,
                buttonText: 'Close',
                dispatch,
                navigation,
              });
            }
          }
        } catch (err) {
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [visisbleMonth, visibleYear]);

  const startEndDate = () => {
    let startDate = attendanceDate(1);

    let endDate = attendanceDate(7);
    return {startDate, endDate};
  };
  const {startDate, endDate} = startEndDate();
  // format the dates to your desired format
  let startDateFormat = startEndDateFormat(startDate);
  let endDateFormat = startEndDateFormat(endDate);

  const [finalWeekTime, setFinalWeekTime] = useState('00:00');

  useEffect(() => {
    let privMonDAy = new Date();
    privMonDAy.setDate(privMonDAy.getDate() - ((privMonDAy.getDay() + 6) % 7));
    var now = new Date();
    const todayDateIndex = now.getDay();

    const todayDate = now.getDate();

    let weekDays = [];

    for (let i = 1; i < todayDateIndex; i++) {
      let dayValue = todayDate - i;
      weekDays.push(dayValue);
    }

    let thisWeekDays = [];

    for (let val of dailyAttendance) {
      let {attendanceDate} = val;
      const attendanceDateValue = new Date(attendanceDate).getDate();
      if (weekDays.includes(attendanceDateValue)) {
        thisWeekDays.push(val);
      }
    }

    let thisWeekHours = 0;
    let thisWeekExtraMinutes = 0;

    for (let day of thisWeekDays) {
      const timeStr = day?.totalHours + '';
      let [hours, minutes] = timeStr?.split('.');

      if (day?.attendanceType !== 'A') {
        if (minutes.length === 1) minutes = minutes + 0;

        thisWeekHours += +hours;
        thisWeekExtraMinutes += +minutes;
      }
    }

    const remainingWeekHours = Math.floor(thisWeekExtraMinutes / 60);
    let finalMinutes = thisWeekExtraMinutes % 60;

    thisWeekHours += remainingWeekHours;

    // finalWeekTime = `${thisWeekHours}:${finalMinutes}`;
    setFinalWeekTime(
      `${thisWeekHours < 10 ? `0${thisWeekHours}` : thisWeekHours}:${
        finalMinutes < 10 ? `0${finalMinutes}` : finalMinutes
      }`,
    );

    const minutesShouldHaveCompleted = (todayDateIndex - 1) * 9 * 60;
    const minutesCompleted = thisWeekHours * 60 + finalMinutes;

    if (minutesShouldHaveCompleted <= minutesCompleted) {
      const extraTotalMinutes = minutesCompleted - minutesShouldHaveCompleted;
      const extraHours = Math.floor(extraTotalMinutes / 60);
      const extraMinutes = extraTotalMinutes % 60;
      setRemainingHours(
        // totalHoursSpendInWeek ? totalHoursSpendInWeek.toFixed(2) : '00.00',
        {
          isExtra: true,
          extraTime: `${extraHours}:${extraMinutes}`,
        },
      );
    } else {
      const remainingTotalMinutes =
        minutesShouldHaveCompleted - minutesCompleted;
      const hoursLeft = Math.floor(remainingTotalMinutes / 60);
      const minutesLeft = remainingTotalMinutes % 60;
      setRemainingHours({
        isExtra: false,
        extraTime: `-${hoursLeft}:${minutesLeft}`,
      });
    }
  }, [dailyAttendance]);

  let monthMark = {};

  const daysInMonth = getDaysInMonth(visisbleMonth - 1);
  // const daysInMonth = new Date().getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const date = i > 9 ? i : '0' + i;
    const month = visisbleMonth > 9 ? visisbleMonth : '0' + visisbleMonth;
    const dateStr = `${visibleYear}-${month}-${date}`;
    if (new Date(dateStr) < Date.now()) {
      const dateIndex = new Date(dateStr).getDay();
      if (dateIndex !== 6 && dateIndex !== 0) {
        monthMark = {
          ...monthMark,
          [dateStr]: {selected: true, selectedColor: 'red'},
        };
      }
    }
  }

  let todayDate = todaySelectedDate();

  monthMark = {
    ...monthMark,
    [todayDate]: {selected: true, selectedColor: Colors.parrotGreenLight},
  };

  let holidayDate;
  holidaysData &&
    holidaysData?.length &&
    holidaysData?.forEach(day => {
      holidayDate = day.holidayDate.split('T')[0];
      if (holidayDate) {
        monthMark[holidayDate] = {
          selectedColor: Colors.pink,
          selected: true,
        };
      }
    });

  dailyAttendance &&
    dailyAttendance.length &&
    dailyAttendance?.forEach(day => {
      let date = day?.attendanceDate?.split('T')[0];
      if (day.attendanceType === 'H') {
        monthMark[date] = {
          selectedColor: Colors.lightBlue,
          selected: true,
        };
      } else if (day.attendanceType === 'A') {
        monthMark[date] = {
          selectedColor: Colors.reddishTint,
          selected: true,
        };
      } else if (day.attendanceType === 'F') {
        monthMark[date] = {
          selectedColor: Colors.parrotGreen,
          dotColor: Colors.green,
          selected: true,
        };
      } else if (day.status === 'Present') {
        mark[date] = {
          selectedColor: Colors.green,
          selected: true,
        };
      }
    });

  let mark = monthMark;
  const DATA = [
    {
      id: '1',
      title: 'Absent',
      color: Colors.reddishTint,
    },
    {
      id: '2',
      title: 'Half Day',
      color: Colors.blue,
    },
    {
      id: '3',
      title: 'Holiday',
      color: Colors.pink,
    },
    {
      id: '4',
      title: 'Present',
      color: Colors.green,
    },
  ];

  const {currentDay, finalTodayDate} = finalCurrentDate();
  const renderLoading = style => {
    return (
      <View
        style={{
          ...styles.loaderStyle,
          ...style,
        }}>
        <ActivityIndicator size={'large'} color="white" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <View style={styles.loaderBackground} />
          <ActivityIndicator size="large" />
        </View>
      ) : null}
      <ImageBackground
        resizeMode="stretch"
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
        source={attendenceMonthImages[visisbleMonth]}
        style={{
          flex: 1,
        }}>
        {showDailyStatusModal ? (
          <Modal
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              top: hp(20),
            }}
            animationType="slide"
            transparent={true}
            closeOnClick={true}
            visible={showDailyStatusModal}
            onBackdropPress={() => {
              setShowDailyStatusModal(false);
            }}
            onBackButtonPress={() => {
              setShowDailyStatusModal(false);
            }}>
            <View style={styles.modalContainer}>
              <Text style={styles.text1}>
                In Time: {pressedDayDate?.inTime}
              </Text>
              <Text style={styles.text1}>
                Out Time: {pressedDayDate?.outTime}
              </Text>
              <View style={styles.imageView}>
                <Text>Total Hours: {pressedDayDate?.totalHours}</Text>
              </View>
            </View>
          </Modal>
        ) : null}
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          {isImageLoading ? renderLoading() : null}
          <View style={styles.secondContainer}>
            <View>
              <Text style={styles.monthText}>{finalTodayDate}</Text>
              <Text style={styles.dayText}>{currentDay}</Text>
            </View>
            <View style={styles.reportView}>
              <View style={styles.weekliyTextView}>
                <Text style={styles.reportText}>Weekly Report</Text>
                <Text style={styles.reportText}>
                  {startDateFormat} - {endDateFormat}
                </Text>
              </View>
              <View style={styles.timeSpendView}>
                <Text style={styles.timeSpendText}>
                  Total Hour Spend {finalWeekTime}
                  <Text
                    style={{
                      color: remainingHours?.isExtra
                        ? Colors.green
                        : Colors.reddishTint,
                    }}>
                    ({remainingHours?.extraTime})
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: hp(1),
              flex: 1,
              alignItems: 'center',
            }}>
            <FlatList
              data={DATA}
              horizontal={true}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ImageBackground>
      <SafeAreaView style={{flex: 1.2, position: 'relative'}}>
        <RenderCalender1
          setVisibleMonth={setVisibleMonth}
          setVisibleYear={setVisibleYear}
          mark={mark}
          setShowDailyStatusModal={setShowDailyStatusModal}
          setModalDate={setModalDate}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const renderItem = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        marginRight: wp(2.8),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: wp(4),
          height: hp(2),
          borderRadius: 20,
          backgroundColor:
            item.title === 'Absent'
              ? Colors.reddishTint
              : item.title === 'Half Day'
              ? Colors.blue
              : item.title === 'Present'
              ? Colors.green
              : Colors.pink,
          marginRight: wp(1.6),
        }}></View>
      <Text
        style={{
          color: Colors.white,
          // fontWeight: 'bold',
          fontFamily: FontFamily.RobotoBold,
          fontSize: 14,
          // marginRight: wp(1),
        }}>
        {item.title}
      </Text>
    </View>
  );
};

const RenderCalender = ({
  setVisibleMonth,
  setVisibleYear,
  mark,
  setShowDailyStatusModal,
  setModalDate,
}) => {
  return (
    <CalendarList
      onDayPress={day => {
        if (day.day < new Date().getDate()) {
          setShowDailyStatusModal(true);
          setModalDate(day);
        }
      }}
      horizontal={true}
      markingType={'custom'}
      scrollEnabled={true}
      animateScroll={true}
      showScrollIndicator={false}
      pagingEnabled={true}
      onVisibleMonthsChange={months => {
        console.log('months:', months);
        setVisibleMonth(months[0]?.month);
        setVisibleYear(months[0]?.year);
        // setLoading(true)
      }}
      pastScrollRange={100}
      markedDates={mark}
      // markedDates={{
      //   '2023-04-01': {selected: true, marked: true, selectedColor: 'red'},
      //   '2023-04-02': {marked: true, selectedColor: 'orange', selected: true},
      //   '2023-04-03': {selected: true, marked: true, selectedColor: 'blue'},
      // }}
      calendarStyle={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
      theme={{
        'stylesheet.calendar-list.main': {
          calendar: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
        'stylesheet.calendar.header': {
          partialHeader: {
            paddingHorizontal: 1,
            backgroundColor: Colors.blue,
          },
          headerContainer: {
            flexDirection: 'row',
            width: '100%',
            backgroundColor: Colors.green,
            justifyContent: 'center',
          },
          week: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: Colors.green,
            fontWeight: 'bold',
            fontSize: 16,
            color: Colors.white,
          },
          header: {
            width: '100%',
            backgroundColor: Colors.green,
            color: Colors.white,
            alignItems: 'center',
          },

          partialHeader: {
            paddingHorizontal: 15,
          },

          monthText: {
            color: Colors.white,
            fontWeight: 'bold',
            fontSize: 18,
            marginVertical: 10,
            textAlign: 'center',
          },
          monthHeader: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
      }}
      style={{
        container: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }}
    />
  );
};

const RenderCalender1 = React.memo(RenderCalender);

export default Attendence;
