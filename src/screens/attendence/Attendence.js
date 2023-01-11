import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  FlatList,
} from 'react-native';
import TSBuddyBackImage from 'assets/mipmap/tsbuddyBack.png';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Calendar, CalendarList} from 'react-native-calendars';
import {Header} from 'react-native/Libraries/NewAppScreen';
const Attendence = () => {
  const DATA = [
    {
      id: '1',
      title: 'Absent',
      color: 'red',
    },
    {
      id: '2',
      title: 'Half Day',
      color: 'blue',
    },
    {
      id: '3',
      title: 'Holiday',
      color: 'pink',
    },
  ];

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}>
      <ImageBackground
        resizeMode="cover"
        source={TSBuddyBackImage}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <View
          style={{
            borderColor: 'white',
            borderColor: 'white',
            // paddingVertical: hp(1),
            //  paddingHorizontal: wp(5),
            borderWidth: 1,
            marginVertical: hp(7),
            marginHorizontal: wp(6),
            borderRadius: 10,
          }}>
          <View>
            <Text
              style={{
                color: '#FFE4E1',
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
                marginHorizontal: wp(10),
                marginVertical: hp(1.5),
              }}>
              09 January Monday
            </Text>
          </View>
          <View
            style={{
              borderColor: 'white',
              // borderColor: 'white',
              // paddingVertical: hp(1),
              //   paddingHorizontal: wp(5),
              borderTopWidth: 1,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View
              style={{
                borderRightWidth: 1,
                borderColor: 'white',
                borderWidth: 1,
                flex: 1,
                paddingHorizontal: wp(2),
                paddingVertical: hp(2),
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#3CB371',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Weekly Report 02 Jan - 08 Jan
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingHorizontal: wp(2),
                paddingVertical: hp(2),
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#9370DB',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Total Hour Spend 38:51{' '}
                <Text style={{color: 'red'}}> ( -06:09)</Text>
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
          theme={{
            'stylesheet.calendar': {
              padding: 0,
              margin: 0,
            },
            // arrowColor: 'green',
            'stylesheet.calendar.header': {
              partialHeader: {
                paddingHorizontal: 1,
              },
              headerContainer: {
                flexDirection: 'row',
                width: '100%',
              },

              week: {
                // marginTop: 5,
                // flex: 1,
                // width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'green',
                fontWeight: 'bold',
                fontSize: 16,
              },
              header: {
                // width: '120%',
                backgroundColor: 'green',
                color: 'white',
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
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                marginVertical: 10,
                textAlign: 'center',
              },
              monthHeader: {
                width: '100%',
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
          //   backgroundColor: 'red',
          backgroundColor:
            item.title === 'Absent'
              ? 'red'
              : item.title === 'Half Day'
              ? 'blue'
              : '#FFB6C1',
          marginHorizontal: wp(4),
        }}></View>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
        {item.title}
      </Text>
    </View>
  );
};

export default Attendence;
