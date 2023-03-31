import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import styles from './UpComingHolidaysStyles';
import {getHolidaysData} from 'redux/homeSlice';
const UpComingHolidays = () => {
  const {userToken: token} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHolidaysData(token));
  }, []);
  const {holidayData: holidaysData} = useSelector(state => state.home);
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.upcomingText}>Upcoming Holidays</Text>
      </View>
      <FlatList
        data={holidaysData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        style={{marginRight: wp(1)}}
      />
    </View>
  );
};
const renderItem = ({item, index}) => {
  const newDateFormate = moment(item.holidayDate).format(`DD MMM YYYY`);
  let year = new Date().getFullYear();

  const date1 = +new Date();
  const date = +moment(item.holidayDate).format('DD');
  const Month = +moment(item.holidayDate).format(' MM ');
  const Years = +moment(item.holidayDate).format(`    YYYY`);

  return (
    <View>
      {date < date1 && Month >= 4 && Years <= 2021 ? (
        <View style={styles.imageView} key={index}>
          <Image
            resizeMode="contain"
            source={
              item.description === 'Republic Day'
                ? MonthImages.republicDay
                : item.description === 'Holi'
                ? MonthImages.holi
                : item.description === 'Independence Day'
                ? MonthImages.independenceDay
                : item.description === 'Diwali'
                ? MonthImages.diwali
                : item.description === 'Dussehra'
                ? MonthImages.diwali
                : item.description === "Mahatma Gandhi's Birthday"
                ? MonthImages.gandhiJayantiS
                : MonthImages.gandhiJayantiS
            }
            style={styles.image}
          />
          <Text style={styles.text1}>{item.description}</Text>
          <View style={{flex: 3}}>
            <View style={styles.textView}>
              <TouchableOpacity>
                <Text style={styles.text2}>{newDateFormate}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};
export default UpComingHolidays;