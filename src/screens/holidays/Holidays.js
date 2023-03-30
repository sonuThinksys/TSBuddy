import {Colors} from 'colors/Colors';
import React, {useState} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {useSelector, useDispatch} from 'react-redux';
import HolidayModal from 'modals/HolidayModal';
import styles from './HolidaysStyles';
import moment from 'moment';
import Loader from 'component/loader/Loader';
import {DATE_FORMAT, PAST_HOLIDAYS, UPCOMING_HOLIDAYS} from 'constants/strings';
import {isBefore2021} from 'utils/utils';
const Holidays = () => {
  const [holidaysShowModal, holidaysSetShowModal] = useState(false);
  const [HolidaysData, setHolidaysData] = useState({});
  const dispatch = useDispatch();

  const {holidayData: holidaysData, holidayDataLoading: isLoading} =
    useSelector(state => state.home);

  return (
    <View style={{paddingTop: hp(1), flex: 1}}>
      {isLoading ? <Loader /> : null}
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
        <View style={styles.pastHolidaysContainer}>
          <View style={styles.buttomView}></View>
          <Text> {PAST_HOLIDAYS}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.secondButtomView}></View>
          <Text> {UPCOMING_HOLIDAYS}</Text>
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
  const newDateFormate = moment(holidayDate).format(DATE_FORMAT);

  const date1 = +new Date();
  const date = +moment(holidayDate).format('DD');

  const Years = +moment(holidayDate).format(`    YYYY`);

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
      <View
        // style={styles.flatelistView}
        style={{
          flexDirection: 'row',
          borderRadius: 5,
          marginVertical: hp(0.5),
          marginHorizontal: wp(1),
          backgroundColor: Colors.skyColor,
          shadowOpacity: 0.1,
        }}>
        <View
          //style={styles.flatelistView1}

          style={{
            flex: 1,
            backgroundColor: isBefore2021(date, date1, Years, holidayDate)
              ? Colors.royalBlue
              : Colors.grey,
            paddingHorizontal: wp(2),
            paddingVertical: hp(1),
            justifyContent: 'center',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            shadowOpacity: 0.1,
          }}>
          <Text
            style={{textAlign: 'center', color: Colors.white, fontSize: 18}}>
            {newDateFormate}
          </Text>
        </View>
        <View style={styles.flatelistView2}>
          <Text
            style={{
              fontWeight: 'bold',
              color: isBefore2021(date, date1, Years, holidayDate)
                ? Colors.black
                : Colors.grey,
            }}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Holidays;
