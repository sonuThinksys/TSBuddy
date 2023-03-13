import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
} from 'react-native';
import TSBuddyBackImage from 'assets/mipmap/tsbuddyBack.png';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Header} from 'react-native/Libraries/NewAppScreen';
import styles from './AttendenceStyle';
import {CalendarList} from 'react-native-calendars';
import {Colors} from 'colors/Colors';
const Attendence = () => {
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
        resizeMode="cover"
        source={TSBuddyBackImage}
        style={{height: '100%', width: '100%'}}>
        <View style={styles.secondContainer}>
          <View>
            <Text style={styles.monthText}>{finalTodayDate}</Text>
            <Text style={styles.dayText}>{currentDay}</Text>
          </View>
          <View style={styles.reportView}>
            <View style={styles.weekliyTextView}>
              <Text style={styles.reportText}>
                Weekly Report 02 Jan - 08 Jan
              </Text>
            </View>
            <View style={styles.timeSpendView}>
              <Text style={styles.timeSpendText}>
                Total Hour Spend 38:51{' '}
                <Text style={{color: Colors.red}}> ( -06:09)</Text>
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
        <CalendarList
          horizontal={true}
          markingType={'custom'}
          scrollEnabled={true}
          showScrollIndicator={true}
          markedDates={{
            '2023-02-16': {
              selected: true,
              marked: true,
              selectedColor: Colors.blue,
            },
            '2023-02-17': {marked: true},
            '2023-02-18': {
              marked: true,
              dotColor: Colors.red,
              activeOpacity: 0,
            },
            '2023-02-19': {disabled: true, disableTouchEvent: true},
          }}
          theme={{
            'stylesheet.calendar': {
              padding: 0,
              margin: 0,
            },
            // arrowColor: Colors.green,
            'stylesheet.calendar.header': {
              partialHeader: {
                paddingHorizontal: 1,
              },
              headerContainer: {
                flexDirection: 'row',
                width: '90%',
              },

              week: {
                // marginTop: 5,
                // flex: 1,
                width: '120%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: Colors.green,
                fontWeight: 'bold',
                fontSize: 16,
              },
              header: {
                width: '120%',
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
      </ImageBackground>
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
