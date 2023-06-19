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
import {FontFamily} from 'constants/fonts';
import {Colors} from 'colors/Colors';
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
          isTokenExpired: false,
        });
      }
    })();
  }, []);

  const currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  let fiscalYear = `${currentYear} - ${(new Date().getFullYear() % 100) + 1}`;

  if (currentMonth < 3) {
    fiscalYear = `${currentYear - 1} - ${new Date().getFullYear() % 100}`;
  }

  const {holidayData: holidaysData} = useSelector(state => state.home);

  const duplicateHolidays =
    (holidaysData &&
      holidaysData.length &&
      [...holidaysData]?.sort(sortByFiscalYear)) ||
    [];

  return (
    <View style={{paddingHorizontal: 18, paddingBottom: wp(6)}}>
      <View style={styles.container}>
        <Text style={styles.upcomingText}>Holidays {fiscalYear}</Text>
      </View>
      {duplicateHolidays?.length > 0 ? (
        <FlatList
          data={duplicateHolidays}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          style={{marginRight: wp(1)}}
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: FontFamily.RobotoMedium,
              fontSize: 16,
              color: Colors.lightBlue,
              marginVertical: 4,
            }}>
            No holidays found.
          </Text>
        </View>
      )}
    </View>
  );
};
const renderItem = ({item, index}) => {
  const newDateFormate = moment(item.holidayDate).format(`DD MMMM`);
  const date = moment(item.holidayDate).format(`DD`);
  const month = moment(item.holidayDate).format(`MMMM`);

  return (
    <View style={styles.imageView} key={index}>
      {/* <Text style={styles.text1}>{item.description}</Text>
      <View style={{flex: 3}}>
        <View style={styles.textView}>
          <Text style={styles.text2}>{newDateFormate}</Text>
        </View>
      </View>
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
      /> */}

      <View style={{flexDirection: 'row'}}>
        <View style={styles.daysContainer}>
          <Text style={styles.daysText}>{date}</Text>
          <Text>{month}</Text>
        </View>
        <View style={styles.typeDateContainer}>
          <Text style={styles.leaveTypeText}>{item.description}</Text>
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          resizeMode="contain"
          source={
            item.description === 'Republic day'
              ? MonthImages.republicDay
              : item.description === 'Holi'
              ? MonthImages.holi
              : item.description === 'Independence Day'
              ? MonthImages.independenceDay
              : item.description === 'Diwali'
              ? MonthImages.diwali
              : item.description === 'Dussehra'
              ? MonthImages.dussehra
              : item.description === 'Gandhi Jayanti'
              ? MonthImages.gandhiJayantiS
              : MonthImages.newYear
          }
          style={styles.image}
        />
      </View>
    </View>
  );
};
export default UpComingHolidays;
