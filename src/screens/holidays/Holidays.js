import {Colors} from 'colors/Colors';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {useSelector, useDispatch} from 'react-redux';
import {getHolidaysData} from 'redux/dataSlice';
import HolidayModal from 'modals/HolidayModal';
import styles from './HolidaysStyles';
const Holidays = () => {
  const [holidaysShowModal, holidaysSetShowModal] = useState(false);
  const [HolidaysData, setHolidaysData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHolidaysData());
  }, []);
  console.log('holidaysShowModal:---------------', holidaysShowModal);
  const holidaysData = useSelector(state => state.dataReducer.holidayData);

  const data1 = [
    {
      name: 'Past Holidays',
      color: 'gray',
      id: '1',
    },
    {
      name: 'Upcoming Holidays',
      color: Colors.darkBlue,
      id: '2',
    },
  ];
  return (
    <View style={{paddingTop: hp(1), flex: 1}}>
      <FlatList
        data={holidaysData}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return renderItem(
            item,
            index,
            holidaysShowModal,
            holidaysSetShowModal,
            dispatch,
            setHolidaysData,
            HolidaysData,
          );
        }}
      />
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.buttomView}></View>
          <Text> Past Holiday</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.secondButtomView}></View>
          <Text> Upcoming Holidays</Text>
        </View>
      </View>
    </View>
  );
};

const renderItem = (
  {
    nameOfHolidays,
    dateOfHolidays,
    daysOfHoliday,
    description,
    imageOfHoliday,
    id,
  },
  index,
  holidaysShowModal,
  holidaysSetShowModal,
  dispatch,
  setHolidaysData,
  HolidaysData,
) => {
  // console.log('clicke holidaysShowModal:--------', holidaysShowModal);
  console.log('clicke data:--------', HolidaysData);
  return (
    <TouchableOpacity
      onPress={() => {
        holidaysSetShowModal(true);
        setHolidaysData({
          ...HolidaysData,
          nameOfHolidays,
          dateOfHolidays,
          daysOfHoliday,
          description,
          imageOfHoliday,
          id,
          holidaysSetShowModal,
          //  holidaysShowModal,
        });

        console.log('"hello clicked', holidaysShowModal);
      }}>
      {holidaysShowModal ? (
        <HolidayModal
          key={new Date()}
          HolidaysData={HolidaysData}
          holidaysShowModal={holidaysShowModal}
        />
      ) : null}
      <View style={styles.flatelistView}>
        <View style={styles.flatelistView1}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>
            {dateOfHolidays}
          </Text>
        </View>
        <View style={styles.flatelistView2}>
          <Text style={{fontWeight: 'bold'}}>{nameOfHolidays}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Holidays;
