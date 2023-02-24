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
import moment from 'moment';
import jwt_decode from 'jwt-decode';
const Holidays = () => {
  const [holidaysShowModal, holidaysSetShowModal] = useState(false);
  const [HolidaysData, setHolidaysData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHolidaysData(token));
  }, []);
  console.log('holidaysShowModal:---------------', holidaysShowModal);
  const token = useSelector(state => state.auth.userToken);
  console.log('holidays token gor ', token);
  const holidaysData = useSelector(state => state.dataReducer.holidayData);
  var decoded = jwt_decode(token);
  console.log(
    'decode :-----------------------------------------',
    decoded[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ],
  );
  console.log(
    'holidaysData in screen:----------------------------------------',
    holidaysData,
  );

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
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => {
          return renderItem(
            item,
            index,
            holidaysShowModal,
            holidaysSetShowModal,
            dispatch,
            setHolidaysData,
            HolidaysData,
            moment,
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
  {description, holidayDate},
  index,
  holidaysShowModal,
  holidaysSetShowModal,
  dispatch,
  setHolidaysData,
  HolidaysData,
) => {
  const newDateFormate = moment(holidayDate).format(`DD-MMM-YYYY`);

  return (
    <TouchableOpacity
      onPress={() => {
        holidaysSetShowModal(true);
        setHolidaysData({
          ...HolidaysData,
          description,
          holidayDate,
          newDateFormate,
          holidaysSetShowModal,
        });
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
            {newDateFormate}
          </Text>
        </View>
        <View style={styles.flatelistView2}>
          <Text style={{fontWeight: 'bold'}}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Holidays;
