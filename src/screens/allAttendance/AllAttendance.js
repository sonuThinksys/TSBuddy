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
import Modal from 'react-native-modal';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

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
  const [showModal, setShowModal] = useState(false);
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

      const resourceAttendance = await dispatch(
        getAllResourcesAttendence({
          token,
          date: dayWiseDate ? dayWiseDate : yesterdayDateStr,
        }),
      );

      if (resourceAttendance?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: resourceAttendance?.error?.message,
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
        setDayWiseData(resourceAttendance.payload);
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
        title="Attendance"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      <View style={styles.mainContainer}>
        <View style={styles.attendanceTypeContainer}>
          <View style={styles.typeContainer}>
            <Pressable
              onPress={() => {
                setSelectedAttendanceType({type: MONTH_WISE});
              }}
              style={[
                styles.leftType,
                {
                  backgroundColor:
                    selectedAttendanceType.type === MONTH_WISE
                      ? Colors.lighterBlue
                      : Colors.white,
                },
              ]}>
              <Text
                style={{
                  color:
                    selectedAttendanceType.type === MONTH_WISE
                      ? Colors.white
                      : null,
                }}>
                Month Wise
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setSelectedAttendanceType({type: DAY_WISE});
              }}
              style={[
                styles.rightType,
                {
                  backgroundColor:
                    selectedAttendanceType.type === DAY_WISE
                      ? Colors.lighterBlue
                      : Colors.white,
                },
              ]}>
              <Text
                style={{
                  color:
                    selectedAttendanceType.type === DAY_WISE
                      ? Colors.white
                      : null,
                }}>
                Day Wise
              </Text>
            </Pressable>
          </View>
        </View>
        {showModal ? (
          <TouchableWithoutFeedback
            onPress={() => {
              setShowModal(false);
            }}>
            <Modal
              backdropOpacity={0.2}
              // animationType="fade"
              animationIn={'bounceIn'}
              animationOut={'jello'}
              transparent={true}
              closeOnClick={true}
              isVisible={showModal}
              onBackdropPress={() => {
                setShowModal(false);
              }}
              onBackButtonPress={() => {
                setShowModal(false);
              }}>
              <View style={styles.modalContainer}>
                <Text style={styles.newAttendanceTitle}>New Attendance</Text>
                <Text style={styles.headerText}>Employee:</Text>
                <View>
                  <ModalDropdown
                    disabled={
                      !fromDate.fromDateObj ||
                      !toDate.toDateObj ||
                      totalNumberOfLeaveDays > 1 ||
                      fromResource ||
                      (!isEditOpenleave && fromOpenLeave)
                    }
                    renderButtonText={renderButtonText}
                    style={{
                      borderWidth: 1,
                      backgroundColor: Colors.white,
                      opacity:
                        route.params.applyLeave && totalNumberOfLeaveDays > 1
                          ? 0.5
                          : 1,
                      // opacity: totalNumberOfLeaveDays === 1 ? 1 : 0.5,
                      borderRadius: 3,
                      paddingVertical: 5,
                      height: 32,
                    }}
                    isFullWidth={true}
                    showsVerticalScrollIndicator={false}
                    defaultValue={
                      !fromResource
                        ? 'Select'
                        : resourceHalfDay === 0
                        ? none
                        : resourceHalfDay === 1
                        ? firstFalf
                        : secondHalf
                    }
                    // defaultIndex={0}
                    options={newDropDownOptions}
                    dropdownStyle={{
                      width: '45%',
                      paddingLeft: 10,
                      height: 100,
                    }}
                    renderRow={renderRow}
                    onSelect={(index, itemName) => {
                      if (itemName !== none) {
                        setTotalNumberOfLeaveDays(0.5);
                      } else {
                        setTotalNumberOfLeaveDays(1);
                      }
                      setHalfDay(itemName);
                      totalNumberOfLeaveDays > 1 && setHalfDay(' None');
                    }}
                    renderRightComponent={
                      !fromResource
                        ? renderRightComponent
                        : renderRightComponentResource
                    }
                  />
                </View>
              </View>
            </Modal>
          </TouchableWithoutFeedback>
        ) : null}

        {selectedAttendanceType.type === DAY_WISE ? (
          <View style={{flex: 1, marginBottom: 20}}>
            <Pressable
              onPress={() => {
                setIsDateSelecting(true);
              }}
              style={styles.selectedDateContainer}>
              <View style={styles.dateTextContainer}>
                <Text style={styles.selectedDateText}>
                  {selectedDate?.selectedDateStr}
                </Text>
              </View>
              <View style={styles.dropdownIconContainer}>
                <MonthImages.DropDownIconSVG
                  color={Colors.lightBlack}
                  height={16}
                  width={16}
                />
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setShowModal(true);
              }}
              style={styles.newAttBtnContainer}>
              <View style={styles.dateTextContainer}>
                <Text style={styles.selectedDateText}>New Attendance</Text>
              </View>
            </Pressable>
            <DateTimePickerModal
              // minimumDate={minimumDateLeaveApplication}
              maximumDate={new Date()}
              isVisible={isDateSelecting}
              mode="date"
              onConfirm={onDateSelection}
              onCancel={onCancelDateSelection}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              contentContainerStyle={{flexGrow: 1}}
              style={{}}
              data={dayWiseData}
              renderItem={({item, index}) => {
                return <DayWiseCard item={item} />;
              }}
              keyExtractor={(item, index) => index}
            />
          </View>
        ) : (
          <MonthWiseCalnder />
        )}

        {isFetchingData ? <Loader /> : null}
      </View>
    </>
  );
};

export default AllAttendance;
