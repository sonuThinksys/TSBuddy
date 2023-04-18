import React, {useEffect, useState} from 'react';
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
  const [spendhours, sendSpendhours] = useState(0);
  const [totalSpendHours, setTotalSpendHours] = useState(0);
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
    let totalEffectiveHours = 0;
    let totalHours = 0;
    let companyHours = 0;
    dailyAttendance?.map(data => {
      totalEffectiveHours = totalEffectiveHours + data.totalEffectiveHours;
      companyHours += 9;
    });
    totalHours = totalEffectiveHours - companyHours;
    sendSpendhours(totalHours);
    setTotalSpendHours(totalEffectiveHours);
  }, [dailyAttendance]);
  let todayDate = todaySelectedDate();
  let mark = {
    [todayDate]: {selected: true, selectedColor: Colors.green},
  };

  employeeAttendance &&
    employeeAttendance.length &&
    employeeAttendance?.forEach(day => {
      let date = day?.attDate?.split(' ')[0];
      var newdate = date?.split('-').reverse().join('-');
      if (day.status === 'Half Day') {
        mark[newdate] = {
          selectedColor: Colors.blue,
          // dotColor: Colors.blue,
          selected: true,
        };
      } else if (day.status === 'Absent') {
        mark[newdate] = {
          // dotColor: Colors.red,
          selectedColor: Colors.red,
          selected: true,
          //  dotColor: Colors.red,
          // activeOpacity: 0,
          // selectedColor: Colors.red,
        };
      } else if (day.status === 'Holiday') {
        mark[newdate] = {
          // dotColor: Colors.pink,
          selectedColor: Colors.pink,
          selected: true,
          //  dotColor: Colors.red,
          // activeOpacity: 0,
          // selectedColor: Colors.red,
        };
      } else if (day.status === 'Present') {
        mark[newdate] = {
          dotColor: Colors.green,
          mark: true,
          marked: true,
          // selectedColor: Colors.green,
          selected: true,
          //  dotColor: Colors.red,
          // activeOpacity: 0,
          // selectedColor: Colors.red,
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
      {/* {isLoading
        ? renderLoading({
            backgroundColor: 'rgba(51, 51, 51, 0.8)',
          })
        : null} */}
      <ImageBackground
        resizeMode="stretch"
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
        source={attendenceMonthImages[visisbleMonth]}
        style={{
          flex: 1,
          // justifyContent: 'space-between',
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
                  Total Hour Spend {totalSpendHours}
                  <Text
                    style={{
                      color: spendhours < 0 ? Colors.red : Colors.green,
                    }}>
                    ({spendhours})
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
    <View style={{flexDirection: 'row', flex: 1}}>
      <View
        style={{
          width: wp(5.5),
          height: hp(2.6),
          borderRadius: 20,
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
        // setLoading(true)
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
            // paddingHorizontal: 10,
            // paddingLeft: 10,
            // paddingRight: 10,
            // marginTop: 6,
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
            // marginHorizontal: 100,
            textAlign: 'center',
          },
          monthHeader: {
            // width: '120%',
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
