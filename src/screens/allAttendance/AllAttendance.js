import {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomHeader from 'navigation/CustomHeader';
import styles from './AllAttendanceStyles';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {getAllResourcesAttendence} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from 'colors/Colors';

import DayWiseCard from './DayWiseCard';
import MonthWiseCalnder from './MonthWise';
import Loader from 'component/loader/Loader';
import ShowAlert, {renewCurrentToken} from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import {renewToken} from 'Auth/LoginSlice';

const DAY_WISE = 'day wise';
const MONTH_WISE = 'month wise';

const AllAttendance = ({navigation}) => {
  const token = useSelector(state => state.auth.userToken);
  const refreshToken = useSelector(state => state?.auth?.refreshToken);
  const dispatch = useDispatch();
  const todayDateObj = new Date(); // Current date and time
  const yesterdayDateObj = new Date(todayDateObj);
  yesterdayDateObj.setDate(todayDateObj.getDate() - 1);
  const yesterdayDateString = `${yesterdayDateObj.toLocaleString('default', {
    month: 'long',
  })} ${yesterdayDateObj.getDate()}, ${yesterdayDateObj.getFullYear()}`;

  const [selectedAttendanceType, setSelectedAttendanceType] = useState({
    type: DAY_WISE,
  });
  const [selectedDate, setSelectedDate] = useState({
    selectedDateObj: yesterdayDateObj,
    selectedDateStr: yesterdayDateString,
  });

  const [isDateSelecting, setIsDateSelecting] = useState(false);
  const [dayWiseData, setDayWiseData] = useState([]);

  const [isFetchingData, setIsFetchingData] = useState(false);

  const fetchDayWiseData = async dayWiseDate => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const yesterdayDate = today.getDate();
    const yesterdayMonth = today.getMonth() + 1;
    const yesterdayYear = today.getFullYear();
    const yesterdayDateStr = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDate}`;

    try {
      setIsFetchingData(true);

      const result = await dispatch(
        getAllResourcesAttendence({
          token,
          date: dayWiseDate ? dayWiseDate : yesterdayDateStr,
        }),
      );

      if (result?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: result?.error?.message,
          buttonText: 'Close',
          dispatch,
          navigation,
        });
      }

      // if (result?.error?.message?.toLowerCase() === 'token-expired') {

      //   const date = selectedDate?.selectedDateObj.getDate();
      //   const month = selectedDate?.selectedDateObj?.getMonth() + 1;
      //   const year = selectedDate?.selectedDateObj?.getFullYear();
      //   const dateStr = `${year}-${month}-${date}`;

      //   const newFetchedData = await renewCurrentToken({
      //     dispatch,
      //     renewToken,
      //     refreshToken,
      //     data: {date: dateStr},
      //     apiCallAgain: getAllResourcesAttendence,
      //   });

      //   setDayWiseData(newFetchedData);
      // }
      else {
        setDayWiseData(result.payload);
      }
    } catch (err) {
      console.error('err:', err);
    } finally {
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    fetchDayWiseData();
  }, []);

  // Subtract 1 day from the current date
  const onDateSelection = date => {
    const selectedDate = date.getDate();
    const selectedMonth = date.toLocaleString('default', {
      month: 'long',
    });
    const selectedYear = date.getFullYear();
    const selectedDateStr = `${selectedMonth} ${selectedDate}, ${selectedYear}`;
    setSelectedDate({selectedDateObj: date, selectedDateStr});

    const dateStrToSend = `${selectedYear}-${
      date.getMonth() + 1
    }-${selectedDate}`;
    fetchDayWiseData(dateStrToSend);
    setIsDateSelecting(false);
  };

  const onCancelDateSelection = () => {
    setIsDateSelecting(false);
  };

  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="All Attendance"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      <View style={styles.selectDateContainer}>
        <DateTimePickerModal
          maximumDate={yesterdayDateObj}
          isVisible={showDatePicker}
          mode="date"
          onConfirm={onSelectDate}
          onCancel={onCalcel}
        />
        <Text style={styles.selectText}>Select Date:</Text>
        <Pressable
          onPress={() => {
            setShowDatePicker(true);
          }}
          style={styles.selectDatePressable}>
          <Image
            style={{height: 20, width: 20}}
            source={MonthImages.CalenderIcon}
          />
        </Pressable>
      </View>
      {employees?.length > 0 ? (
        <FlatList
          data={employees}
          renderItem={({item, index}) => {
            return (
              <View style={styles.singleCard}>
                <Text>{item.name}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      ) : null}
    </>
  );
};

export default AllAttendance;
