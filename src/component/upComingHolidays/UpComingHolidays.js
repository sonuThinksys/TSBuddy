import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import styles from './UpComingHolidaysStyles';
import {getHolidaysData} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'constants/strings';
import {sortByFiscalYear} from 'utils/utils';
const UpComingHolidays = ({navigation}) => {
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isGuestLogin) {
      (async () => {
        try {
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
        } catch (err) {
          console.log('errHoliday:', err);
        }
      })();
    }
  }, [dispatch, navigation, token, isGuestLogin]);

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
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.upcomingText}>Holidays {fiscalYear}</Text>
      </View>
      {duplicateHolidays?.length > 0 ? (
        // <FlatList
        //   data={duplicateHolidays}
        //   renderItem={renderItem}
        //   keyExtractor={(item, index) => index}
        //   style={{marginRight: wp(1)}}
        // />
        duplicateHolidays.map((item, index) => {
          return renderItem({item, index});
        })
      ) : (
        <View style={styles.noHolidaysContainer}>
          <Text style={styles.noHolidaysText}>No holidays found.</Text>
        </View>
      )}
    </View>
  );
};
const renderItem = ({item, index}) => {
  // const newDateFormate = moment(item.holidayDate).format(`DD MMMM`);
  const date = moment(item.holidayDate).format('DD');
  const month = moment(item.holidayDate).format('MMMM');

  return (
    <View style={styles.imageView} key={index}>
      <View style={styles.dateContainer}>
        <View style={styles.daysContainer}>
          <Text style={styles.daysText}>{date}</Text>
          <Text>{month}</Text>
        </View>
        <View style={styles.typeDateContainer}>
          <Text style={styles.leaveTypeText}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
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
