import {useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomHeader from 'navigation/CustomHeader';
import styles from './AllAttendanceStyles';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {getAllResourcesAttendence} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';

const AllAttendance = ({navigation}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [employees, setEmployees] = useState([]);
  const token = useSelector(state => state.auth.userToken);
  const dispatch = useDispatch();

  // const DUMMY_DATA = [
  //   {
  //     name: 'Utkarsh Gupta',
  //     empID: 10860,
  //     attendanceDate: '05-07-2023',
  //     inTime: '09:26:43',
  //     outTime: '18:32:32',
  //     regularized: 'No',
  //     status: 'Present',
  //   },
  //   {
  //     name: 'Sonu Patel',
  //     empID: 10920,
  //     attendanceDate: '05-07-2023',
  //     inTime: '08:56:43',
  //     outTime: '19:38:32',
  //     regularized: 'No',
  //     status: 'Present',
  //   },
  //   {
  //     name: 'Roshan jambhulkar',
  //     empID: 10859,
  //     attendanceDate: '05-07-2023',
  //     inTime: '09:32:43',
  //     outTime: '18:35:32',
  //     regularized: 'No',
  //     status: 'Present',
  //   },
  //   {
  //     name: 'Tribhuvan Bhandari',
  //     empID: 10868,
  //     attendanceDate: '05-07-2023',
  //     inTime: '10:24:48',
  //     outTime: '19:39:42',
  //     regularized: 'No',
  //     status: 'Present',
  //   },
  //   {
  //     name: 'Kalpana Bisht',
  //     empID: 10769,
  //     attendanceDate: '05-07-2023',
  //     inTime: '11:21:43',
  //     outTime: '20:35:12',
  //     regularized: 'No',
  //     status: 'Present',
  //   },
  // ];

  const onSelectDate = async date => {
    const selectedDate = date.getDate();
    const selectedMonth = date.getMonth() + 1;
    const selectedYear = date.getFullYear();
    const dateStr = `${selectedDate}-${selectedMonth}-${selectedYear}`;
    setSelectedDate(dateStr);
    setShowDatePicker(false);
    (async () => {
      const allAttendance = await dispatch(
        getAllResourcesAttendence({token, date: dateStr}),
      );
    })();
    // setEmployees(DUMMY_DATA);
  };

  const onCalcel = () => {
    setShowDatePicker(false);
  };

  const todayDateObj = new Date(); // Current date and time

  // Subtract 1 day from the current date
  const yesterdayDateObj = new Date(todayDateObj);
  yesterdayDateObj.setDate(todayDateObj.getDate() - 1);

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
