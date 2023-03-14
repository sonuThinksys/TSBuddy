import React from 'react';
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
const UpComingHolidays = () => {
  const holidaysData = useSelector(state => state.dataReducer.holidayData);
  console.log('holidaysData:', holidaysData);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.upcomingText}>Upcoming Holidays</Text>
      </View>
      <FlatList
        data={holidaysData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{marginRight: wp(1)}}
      />
    </View>
  );
};
const renderItem = ({item}) => {
  const newDateFormate = moment(item.holidayDate).format(`DD MMM YYYY`);
  return (
    <View style={styles.imageView}>
      {/* {item.holidayData <= '30 Mar 2023' ? <Text></Text> : null} */}
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
  );
};
export default UpComingHolidays;
