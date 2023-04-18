import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import styles from './UpComingHolidaysStyles';
import {getHolidaysData} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'constants/strings';
const UpComingHolidays = ({navigation}) => {
  function sortByFiscalYear(date1, date2) {
    const a = new Date(date1?.holidayDate);
    const b = new Date(date2?.holidayDate);
    const fiscalYearA =
      a.getMonth() >= 3 ? a.getFullYear() : a.getFullYear() - 1;
    const fiscalYearB =
      b.getMonth() >= 3 ? b.getFullYear() : b.getFullYear() - 1;
    if (fiscalYearA < fiscalYearB) {
      return 1;
    } else if (fiscalYearA > fiscalYearB) {
      return -1;
    } else {
      return a.getTime() - b.getTime();
    }
  }

  const {userToken: token} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const holidays = await dispatch(getHolidaysData(token));
      if (holidays?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: holidays?.error?.message,
          buttonText: 'Close',
          dispatch,
          navigation,
        });
      }
    })();
  }, []);

  const {holidayData: holidaysData} = useSelector(state => state.home);

  const duplicateHolidays =
    (holidaysData &&
      holidaysData.length &&
      [...holidaysData]?.sort(sortByFiscalYear)) ||
    [];

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.upcomingText}>Upcoming Holidays</Text>
      </View>
      <FlatList
        data={duplicateHolidays}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        style={{marginRight: wp(1)}}
      />
    </View>
  );
};
const renderItem = ({item, index}) => {
  const newDateFormate = moment(item.holidayDate).format(`DD MMM YYYY`);
  // let year = new Date().getFullYear();

  // const date1 = +new Date();
  // const date = +moment(item.holidayDate).format('DD');
  // const Month = +moment(item.holidayDate).format(' MM ');
  // const Years = +moment(item.holidayDate).format(`    YYYY`);

  return (
    <View>
      {/* {date < date1 && Month >= 4 && Years <= 2021 ? ( */}
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
      {/* ) : null} */}
    </View>
  );
};
export default UpComingHolidays;
