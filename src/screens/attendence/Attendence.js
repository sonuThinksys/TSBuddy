import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, FlatList, StyleSheet} from 'react-native';
import TSBuddyBackImage from 'assets/mipmap/tsbuddyBack.png';
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
import {MonthImages} from 'assets/monthImage/MonthImage';
import {attendenceMonthImages} from 'defaultData';
import moment from 'moment';
const Attendence = () => {
  const [visisbleMonth, setVisibleMonth] = useState(0);
  const [visibleYear, setVisibleYear] = useState(0);
  const [spendhours, sendSpendhours] = useState(0);
  const [totalSpendHours, setTotalSpendHours] = useState(0);
  const dispatch = useDispatch();
  const {userToken: token} = useSelector(state => state.auth);
  var decoded = jwt_decode(token);
  const employeeID = decoded.Id;

  useEffect(() => {
    dispatch(
      getAttendencaeData({token, employeeID, visisbleMonth, visibleYear}),
    );
  }, [visisbleMonth, visibleYear]);

  const {
    attendenceData: {employeeAttendance, dailyAttendance},
  } = useSelector(state => state.home);
  console.log(
    'dailyAttendance:------------------------------------------------',
    dailyAttendance,
  );
  let today = new Date();

  // get current day of the week (0-6)
  let dayOfWeek = today.getDay();

  // calculate date range for Monday-Sunday of current week
  let startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - dayOfWeek + 1,
  );
  let endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - dayOfWeek + 7,
  );

  // format the dates to your desired format
  let startDateFormat = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  let endDateFormat = endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  useEffect(() => {
    let totalEffectiveHours = 0;
    let totalHours = 0;
    let companyHours = 0;
    dailyAttendance?.map(data => {
      totalEffectiveHours = totalEffectiveHours + data.totalEffectiveHours;
      companyHours += 9;
    });
    totalHours = totalEffectiveHours - companyHours;
    console.log(
      'totalEffectiveHours:-----------------------------------',
      totalEffectiveHours,
      companyHours,
    );
    sendSpendhours(totalHours);
    setTotalSpendHours(totalEffectiveHours);
  }, [dailyAttendance]);

  let mark = {};
  employeeAttendance?.forEach(day => {
    if (day.status === 'Present') {
      mark[day.attDate] = {
        marked: true,
        dotColor: Colors.blue,
      };
    } else if (day.status === 'Absent') {
      mark[day.attDate] = {
        // marked: true,
        // dotColor: Colors.red,
        selected: true,
        //  dotColor: Colors.red,
        // activeOpacity: 0,
        selectedColor: Colors.red,
      };
    } else if (day.status === 'Holiday') {
      mark[day.attDate] = {
        // marked: true,
        // dotColor: Colors.red,
        selected: true,
        //  dotColor: Colors.red,
        // activeOpacity: 0,
        selectedColor: Colors.red,
      };
    }
  });

  const DATA = [
    {
      id: '1',
      title: 'Absent',
      color: Colors.red,
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
  ];

  const date = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const presentDate = String(date.getDate()).padStart(2, '0');
  const presentMonth = date.toLocaleString('default', {month: 'long'});
  const presentYear = date.getFullYear();
  const currentDayIndex = date.getDay();
  const currentDay = days[currentDayIndex];

  const finalTodayDate = `${presentDate}, ${presentMonth}`;

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        source={attendenceMonthImages[visisbleMonth]}
        style={{flex: 0.8, backgroundColor: 'blue'}}>
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
                Total Hour Spend {totalSpendHours}
                <Text
                  style={{color: spendhours < 0 ? Colors.red : Colors.green}}>
                  ({spendhours})
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <FlatList
          data={DATA}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ImageBackground>
      {/* <View style={{flex: 0.8, backgroundColor: 'red'}}> */}
      <CalendarList
        horizontal={true}
        markingType={'custom'}
        scrollEnabled={true}
        showScrollIndicator={true}
        onVisibleMonthsChange={months => {
          setVisibleMonth(months[0].month);
          setVisibleYear(months[0].year);
        }}
        pastScrollRange={100}
        //initialDate={'2018-05-01'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={'2018-05-05'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        //  maxDate={'2020-05-30'}

        // markedDates={{
        //   '2023-03-16': {
        //     selected: true,
        //     marked: true,
        //     selectedColor: Colors.blue,
        //   },
        //   '2023-03-17': {marked: true},
        //   '2023-03-18': {
        //     // marked: true,
        //     selected: true,
        //     //  dotColor: Colors.red,
        //     // activeOpacity: 0,
        //     selectedColor: Colors.red,
        //   },
        //   '2023-03-19': {disabled: true, disableTouchEvent: true},
        // }}
        markedDates={mark}
        theme={{
          'stylesheet.calendar': {
            padding: 0,
            margin: 0,
            backgroundColor: Colors.red,
            // flex: 1,
          },
          // arrowColor: Colors.green,
          'stylesheet.calendar.header': {
            partialHeader: {
              paddingHorizontal: 1,
              backgroundColor: Colors.blue,
            },
            headerContainer: {
              flexDirection: 'row',
              width: '100%',
              backgroundColor: Colors.green,
            },

            week: {
              // marginTop: 5,
              // flex: 1,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: Colors.green,
              fontWeight: 'bold',
              fontSize: 16,
            },
            header: {
              width: '100%',
              backgroundColor: Colors.green,
              color: Colors.white,
              // paddingHorizontal: 10,
              // paddingLeft: 10,
              // paddingRight: 10,
              // marginTop: 6,
              alignItems: 'center',
            },

            partialHeader: {
              // paddingHorizontal: 15,
            },

            monthText: {
              color: Colors.white,
              fontWeight: 'bold',
              fontSize: 18,
              marginVertical: 10,
              marginHorizontal: 100,
              textAlign: 'center',
            },
            monthHeader: {
              width: '120%',
            },
          },
        }}
      />
      {/* </View> */}
    </View>
  );
};

const renderItem = ({item}) => {
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <View
        style={{
          width: wp(5.5),
          height: hp(2.6),
          borderRadius: 20,
          //   backgroundColor: Colors.red,
          backgroundColor:
            item.title === 'Absent'
              ? Colors.red
              : item.title === 'Half Day'
              ? Colors.blue
              : Colors.pink,
          marginHorizontal: wp(4),
        }}></View>
      <Text style={{color: Colors.white, fontWeight: 'bold', fontSize: 18}}>
        {item.title}
      </Text>
    </View>
  );
};

export default Attendence;
