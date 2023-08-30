import {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import ModalDropdown from 'react-native-modal-dropdown';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {newDropDownOptions} from 'utils/defaultData';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import Clock from 'assets/clock/clock.svg';
import CheckIcon from 'assets/checkIcon/checkIcon.svg';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {FontFamily, FontSize} from 'constants/fonts';

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
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [inTimePickerVisible, setInTimePickerVisible] = useState(false);
  const [outTimePickerVisible, setOutTimePickerVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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

  const renderRow = (rowData, rowID, highlighted) => {
    return (
      <View
        style={[
          styles.row,
          {borderBottomColor: Colors.lightGray, borderBottomWidth: 1},
        ]}>
        <Text>ABC</Text>
      </View>
    );
  };

  const renderRightComponent = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingTop: 4,
        position: 'absolute',
        right: 0,
      }}>
      <Image
        source={MonthImages.DropDownIcon}
        style={{
          height: 20,
          width: 20,
        }}
      />
    </View>
  );

  const handleSubmitNewAttendance = () => {};

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
              animationIn={'slideInUp'}
              animationOut={'bounce'}
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
                <View style={{marginBottom: 10}}>
                  <ModalDropdown
                    // renderButtonText={renderButtonText}
                    style={{
                      borderWidth: 1,
                      borderColor: Colors.grey,
                      backgroundColor: Colors.white,
                      borderRadius: 3,
                      paddingVertical: 5,
                      height: hp(4.3),
                      paddingLeft: 10,
                      paddingTop: 8,
                    }}
                    isFullWidth={true}
                    showsVerticalScrollIndicator={false}
                    options={newDropDownOptions}
                    dropdownStyle={{
                      width: '45%',
                      paddingLeft: 10,
                      height: 100,
                    }}
                    renderRow={renderRow}
                    renderRightComponent={renderRightComponent}
                  />
                </View>
                <Text style={styles.headerText}>Attendance Date:</Text>
                <DateTimePickerModal
                  minimumDate={new Date()}
                  date={new Date()}
                  isVisible={datePickerVisible}
                  mode="date"
                  onConfirm={() => {}}
                  onCancel={() => {
                    setDatePickerVisible(false);
                  }}
                />
                <View style={{marginBottom: 15}}>
                  <TouchableOpacity
                    onPress={() => {
                      setDatePickerVisible(true);
                    }}>
                    <View style={styles.attendanceDate}>
                      <Text style={{color: 'gray'}}>dd-mm-yyyy</Text>
                      <CalenderIcon
                        fill={Colors.lightGray1}
                        height={hp(2)}
                        width={hp(2)}
                        marginRight={wp(0.64)}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  minimumDate={new Date()}
                  date={new Date()}
                  isVisible={inTimePickerVisible}
                  mode="time"
                  onConfirm={() => {}}
                  onCancel={() => {
                    setInTimePickerVisible(false);
                  }}
                />
                <DateTimePickerModal
                  isVisible={outTimePickerVisible}
                  mode="time"
                  onConfirm={() => {}}
                  onCancel={() => {
                    setOutTimePickerVisible(false);
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  }}>
                  <Pressable
                    onPress={() => {
                      setInTimePickerVisible(true);
                    }}>
                    <View style={[styles.attendanceDate, {width: wp(30)}]}>
                      <Text style={{color: 'gray'}}>In Time</Text>
                      <Clock
                        height={hp(2)}
                        stroke="gray"
                        width={hp(2)}
                        marginRight={wp(0.64)}
                      />
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setOutTimePickerVisible(true);
                    }}>
                    <View style={[styles.attendanceDate, {width: wp(30)}]}>
                      <Text style={{color: 'gray'}}>Out Time</Text>
                      <Clock
                        height={hp(2)}
                        stroke="gray"
                        width={hp(2)}
                        marginRight={wp(0.64)}
                      />
                    </View>
                  </Pressable>
                </View>
                <View style={{marginBottom: 25, flexDirection: 'row'}}>
                  <Text style={{marginRight: 5}}>Is Regularized:</Text>
                  <Pressable
                    onPress={() => {
                      setIsChecked(!isChecked);
                    }}>
                    <View style={styles.checkBox}>
                      {isChecked && (
                        <CheckIcon
                          height={hp(2)}
                          stroke="black"
                          width={hp(2)}
                        />
                      )}
                    </View>
                  </Pressable>
                </View>
                <View style={styles.buttonContainer}>
                  <Pressable onPress={() => setShowModal(false)}>
                    <View
                      style={[
                        styles.btn,
                        {borderColor: 'gray', borderWidth: 1},
                      ]}>
                      <Text
                        style={{
                          fontFamily: FontFamily.RobotoMedium,
                          fontSize: FontSize.h14,
                        }}>
                        Cancel
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable onPress={handleSubmitNewAttendance}>
                    <View
                      style={[
                        styles.btn,
                        {backgroundColor: Colors.lovelyPurple},
                      ]}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: FontFamily.RobotoMedium,
                          fontSize: FontSize.h14,
                        }}>
                        Save
                      </Text>
                    </View>
                  </Pressable>
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
