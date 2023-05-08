import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Header} from 'react-native/Libraries/NewAppScreen';
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
  finalTodayDate,
  startEndDateFormat,
  todaySelectedDate,
} from 'utils/utils';
const Attendence = ({navigation}) => {
  const [visisbleMonth, setVisibleMonth] = useState(0);
  const [visibleYear, setVisibleYear] = useState(0);
  const [totalHourSpend, setTotalHoursSpend] = useState(0);
  const [remainingHours, setRemainingHours] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isImageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();
  const {userToken: token} = useSelector(state => state.auth);
  var decoded = jwt_decode(token);
  const employeeID = decoded.id;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const attendence = await dispatch(
          getAttendencaeData({token, employeeID, visisbleMonth, visibleYear}),
        );

        if (attendence?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: attendence?.error?.message,
            buttonText: 'Close',
            dispatch,
            navigation,
          });
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, [visisbleMonth, visibleYear]);

  const {attendenceData: {employeeAttendance = [], dailyAttendance = []} = {}} =
    useSelector(state => state.home);
  const {holidayData: holidaysData = []} = useSelector(state => state.home);

  const startEndDate = () => {
    let startDate = attendanceDate(1);
    let endDate = attendanceDate(7);
    return {startDate, endDate};
  };
  const {startDate, endDate} = startEndDate();
  // format the dates to your desired format
  let startDateFormat = startEndDateFormat(startDate);
  let endDateFormat = startEndDateFormat(endDate);

  useEffect(() => {
    let privMonDAy = new Date();
    privMonDAy.setDate(privMonDAy.getDate() - ((privMonDAy.getDay() + 6) % 7));
    var now = new Date();
    let totalHoursSpendInWeek = 0;
    let totalCompanyHours = 0;
    let index = dailyAttendance.length - 1;

    for (var d = privMonDAy; d < now; d.setDate(d.getDate() + 1)) {
      totalHoursSpendInWeek =
        totalHoursSpendInWeek + dailyAttendance[index]?.totalHours;
      totalCompanyHours = totalCompanyHours + 9;
      index--;
    }
    console.log('totalHoursSpendInWeek = ', totalHoursSpendInWeek);
    let remainingHoursUpdate = totalCompanyHours - totalHoursSpendInWeek;
    setRemainingHours(remainingHoursUpdate);
    setTotalHoursSpend(totalHoursSpendInWeek ? totalHoursSpendInWeek : '00.00');
  }, []);

  let todayDate = todaySelectedDate();
  let mark = {
    [todayDate]: {selected: true, selectedColor: Colors.green},
  };

  let holidayDate;
  holidaysData &&
    holidaysData.length &&
    holidaysData?.forEach(day => {
      holidayDate = day.holidayDate.split('T')[0];
      if (holidayDate) {
        mark[holidayDate] = {
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
        mark[date] = {
          selectedColor: Colors.lightBlue,
          selected: true,
        };
      } else if (day.attendanceType === 'A') {
        mark[date] = {
          selectedColor: Colors.reddishTint,
          selected: true,
        };
      } else if (day.attendanceType === 'F') {
        mark[date] = {
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
      <ImageBackground
        resizeMode="stretch"
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
        source={attendenceMonthImages[visisbleMonth]}
        style={{
          flex: 1,
        }}>
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
                <Text style={styles.reportText}>
                  Weekly Report {startDateFormat} - {endDateFormat}
                </Text>
              </View>
              <View style={styles.timeSpendView}>
                <Text style={styles.timeSpendText}>
                  Total Hour Spend {totalHourSpend}
                  <Text
                    style={{
                      color:
                        remainingHours < 0 ? Colors.reddishTint : Colors.green,
                    }}>
                    ({remainingHours})
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={{marginTop: hp(4), flex: 1}}>
            <FlatList
              data={DATA}
              horizontal={true}
              renderItem={renderItem}
              style={{flex: 1}}
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
          marginHorizontal: wp(4),
        }}></View>
      <Text
        style={{
          color: Colors.white,
          fontWeight: 'bold',
          fontSize: 14,
          marginLeft: wp(-1),
          marginTop: hp(-0.5),
        }}>
        {item.title}
      </Text>
    </View>
  );
};

const RenderCalender = ({setVisibleMonth, setVisibleYear, mark}) => {
  return (
    <CalendarList
      horizontal={true}
      markingType={'custom'}
      scrollEnabled={true}
      animateScroll={true}
      showScrollIndicator={false}
      // Enable paging on horizontal, default = false
      pagingEnabled={true}
      onVisibleMonthsChange={months => {
        setVisibleMonth(months[0].month);
        setVisibleYear(months[0].year);
      }}
      pastScrollRange={100}
      markedDates={mark}
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
