import {Colors} from 'colors/Colors';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, FlatList, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {useSelector, useDispatch} from 'react-redux';
import {getHolidaysData} from 'redux/dataSlice';
import HolidayModal from 'modals/HolidayModal';
const Holidays = () => {
  const [holidaysShowModal, holidaysSetShowModal] = useState(false);
  const [HolidaysData, setHolidaysData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHolidaysData());
  }, []);
  console.log('holidaysShowModal:---------------', holidaysShowModal);
  const holidaysData = useSelector(state => state.dataReducer.holidayData);

  return (
    <View style={{paddingTop: hp(2), flex: 1}}>
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
      <View
        style={{
          paddingHorizontal: wp(10),
          justifyContent: 'flex-end',
          height: hp(7),
          borderTopWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'gray',
              height: 30,
              width: 30,
              borderRadius: 5,
            }}></View>
          <Text> Past Holiday</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: Colors.darkBlue,
              height: 30,
              width: 30,
              borderRadius: 5,
            }}></View>
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          // paddingVertical: hp(0.5),
          // paddingHorizontal: wp(2),
          borderRadius: 5,
          // borderWidth: 1,
          marginVertical: hp(0.5),
          marginHorizontal: wp(1),
          backgroundColor: 'lightcyan',
          shadowOpacity: 0.1,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'midnightblue',
            //  backgroundColor: item.statusOfLeaves === 'Dismissed' ? '#FFB6C1' : 'lightseagreen',
            paddingHorizontal: wp(2),
            paddingVertical: hp(1),
            justifyContent: 'center',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            shadowOpacity: 0.1,
          }}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>
            {dateOfHolidays}
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            backgroundColor: 'white',
            paddingHorizontal: wp(2),
            paddingVertical: hp(1),
            justifyContent: 'center',
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}>
          <Text style={{fontWeight: 'bold'}}>{nameOfHolidays}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Holidays;
