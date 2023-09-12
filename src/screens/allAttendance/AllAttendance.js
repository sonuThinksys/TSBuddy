import {useCallback, useEffect, useState} from 'react';
import {
  Alert,
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
import {
  createAttendance,
  getAllEmployeeListForHR,
  getAllResourcesAttendence,
  getEmployeeShift,
} from 'redux/homeSlice';
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
import {
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {newDropDownOptions} from 'utils/defaultData';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import Clock from 'assets/clock/clock.svg';
import CheckIcon from 'assets/checkIcon/checkIcon.svg';
import CrossIcon from 'assets/crossIcon/crossIcon.svg';
import jwt_decode from 'jwt-decode';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {FontFamily, FontSize} from 'constants/fonts';
import {out} from 'react-native/Libraries/Animated/Easing';

const DAY_WISE = 'day wise';
const MONTH_WISE = 'month wise';

const AllAttendance = ({navigation}) => {
  const token = useSelector(state => state.auth.userToken);
  var decoded = token && jwt_decode(token);
  const isHRManager = decoded?.role?.includes('HR Manager') || false;
  const employeeID = decoded?.id;
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
  const [isChecked, setIsChecked] = useState(true);
  const [allEmployeeListForHR, setAllEmployeeListForHR] = useState([]);
  const [text, setText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [employeeWeekOffs, setEmployeeWeekOffs] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState([]);
  const [selectDate, setSelectDate] = useState({
    dateStr: 'DD-MM-YYYY',
  });
  const [selectInTime, setSelectInTime] = useState({inTimeStr: 'HH:MM'});
  const [selectOutTime, setSelectOutTime] = useState({outTimeStr: 'HH:MM'});
  const [selectDateForInOut, setSelectDateForInOut] = useState();
  const [totalHours, setTotalHours] = useState();
  const [getInTime, setGetInTime] = useState();
  const [inTime, setInTime] = useState();
  const [outTime, setOutTime] = useState();

  const {holidayData} = useSelector(state => state.home);

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
      } else {
        setDayWiseData(resourceAttendance.payload);
      }
    } catch (err) {
      console.error('err:', err);
    } finally {
      setIsFetchingData(false);
    }
  };

  const allEmployeeForListHR = async () => {
    try {
      setIsFetchingData(true);

      const employeeList = await dispatch(
        getAllEmployeeListForHR({
          token,
        }),
      );

      if (employeeList?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: employeeList?.error?.message,
          buttonText: 'Close',
          dispatch,
          navigation,
        });
      } else {
        setAllEmployeeListForHR(employeeList.payload);
      }
    } catch (err) {
      console.error('err:', err);
    } finally {
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    fetchDayWiseData();
    isHRManager && allEmployeeForListHR();
  }, []);

  useEffect(() => {
    (async () => {
      const employeeShift = await dispatch(
        getEmployeeShift({token, id: employeeID}),
      );
      const weekOffs = employeeShift?.payload?.weeklyOff.split('_');

      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const finalWeekOffs = [];
      daysOfWeek?.map((el, index) => {
        if (weekOffs?.includes(el)) finalWeekOffs.push(index);
      });
      setEmployeeWeekOffs(finalWeekOffs);
    })();
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

  const handleChangeEmpoyeeList = word => {
    setText(word);
    let employeeList = allEmployeeListForHR && allEmployeeListForHR?.data;
    let result = employeeList?.filter(
      item =>
        item?.firstName?.toLowerCase().includes(word?.toLowerCase()) ||
        item?.lastName?.toLowerCase().includes(word?.toLowerCase()) ||
        item?.employeeId.toString().includes(word.toString()),
    );
    setSearchResult(result);
  };
  const handleSubmitNewAttendance = async () => {
    try {
      const createNewAttendance =
        token &&
        (await dispatch(
          createAttendance({
            token,
            body: {
              employeeId: employeeID,
              attendanceDate: attendanceDate,
              inTime: inTime,
              outTime: outTime,
              totalHours: totalHours,
              isRegularized: isChecked ? 1 : 0,
            },
          }),
        ));

      if (createNewAttendance?.error) {
        alert(createNewAttendance.error.message);
      } else {
        Alert.alert('Success', 'Attendance created successfully!', [
          {
            text: 'Ok',
            onPress: () => {
              setDatePickerVisible(false);
            },
          },
        ]);
      }
    } catch (err) {
      console.log('errCreateNewAttendance:', err);
    } finally {
    }
  };

  const renderItem = useCallback(({item}) => {
    return (
      <>
        <Pressable
          onPress={() => {
            setText(
              `${item.firstName ? item.firstName : ''} ${
                item.lastName ? item.lastName : ''
              }`,
            );

            setSearchResult([]);
          }}>
          <View style={styles.searcheResultRow}>
            <Text>
              {item?.firstName ? item?.firstName : ''}{' '}
              {item?.lastName ? item?.lastName : ''}
            </Text>
            <Text>{item?.employeeId}</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Colors.lightGray2,
              marginBottom: 6,
            }}></View>
        </Pressable>
      </>
    );
  }, []);

  const keyExtractor = item => item.employeeId.toString();

  const handleConfirmDate = date => {
    if (employeeWeekOffs?.includes(date.getDay())) {
      alert('You already have a weekend holiday on this day.');
      setDatePickerVisible(false);
      return;
    }

    for (let i = 0; i < holidayData.length; i++) {
      const holidayObj = new Date(holidayData[i].holidayDate);

      if (
        holidayObj.getMonth() === date.getMonth() &&
        date.getDate() === holidayObj.getDate()
      ) {
        alert('You can not take a WFH on National holiday.');
        setDatePickerVisible(false);
        return;
      }
    }

    setSelectDateForInOut(date);

    const attendanceDate = date;
    setAttendanceDate(attendanceDate);
    let selectedDate = date.getDate();

    let selectedMonth = date.getMonth() + 1;
    let selectedYear = date.getFullYear();
    setDatePickerVisible(false);
    setSelectDate({
      dateStr: selectedDate + ' / ' + selectedMonth + ' / ' + selectedYear,
      startDateObj: date,
    });
  };

  const handleConfirmInTime = time => {
    setInTime(time);

    let inTimeStr = new Date(time.toString());
    let inTimeToSubtract = inTimeStr.getTime();

    setGetInTime(inTimeToSubtract);

    const inTime = time.toLocaleString();
    let time1 = inTime.split(',')[1];
    setSelectInTime({inTimeStr: time1});
    setInTimePickerVisible(false);
  };

  const handleConfirmOutTime = time => {
    setOutTime(time);

    const outTime = time.toLocaleString();
    let time1 = outTime.split(',')[1];
    setSelectOutTime({outTimeStr: time1});
    setOutTimePickerVisible(false);

    let outTimeStr = new Date(time.toString());
    let outTimeToSubstract = outTimeStr.getTime();

    const diffTime = outTimeToSubstract - getInTime;
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffTime / (60 * 1000)) % 60;
    let totalTimeStr = `${totalHours}.${totalMinutes}`;
    let totalTimeflot = +totalTimeStr;
    setTotalHours(totalTimeflot);
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
        {isHRManager && (
          <Pressable
            onPress={() => {
              setShowModal(true);
            }}
            style={styles.newAttBtnContainer}>
            <View style={styles.dateTextContainer}>
              <Text style={styles.selectedDateText}>New Attendance</Text>
            </View>
          </Pressable>
        )}
        {showModal ? (
          <TouchableWithoutFeedback
            onPress={() => {
              setShowModal(false);
            }}>
            <Modal
              backdropOpacity={0.6}
              animationIn={'slideInUp'}
              animationOut={'slideOutDown'}
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
                <View style={styles.searchBoxContainer}>
                  <TextInput
                    placeholder="Employee.."
                    onChangeText={item => {
                      handleChangeEmpoyeeList(item);
                    }}
                    value={text}
                    style={styles.searchBoxForEmployee}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  <Pressable onPress={() => setText('')}>
                    <CrossIcon
                      height={hp(2)}
                      stroke="gray"
                      width={hp(2)}
                      marginRight={wp(0.64)}
                    />
                  </Pressable>
                </View>
                {text?.length !== 0 && searchResult.length != 0 ? (
                  <View style={styles.searchResultBox}>
                    <FlatList
                      data={searchResult}
                      renderItem={renderItem}
                      showsVerticalScrollIndicator={false}
                      bounces={false}
                      keyExtractor={keyExtractor}
                    />
                  </View>
                ) : null}
                <Text style={styles.headerText}>Attendance Date:</Text>
                <DateTimePickerModal
                  // date={new Date()}
                  isVisible={datePickerVisible}
                  mode="date"
                  onConfirm={handleConfirmDate}
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
                      <Text style={{color: 'gray'}}>
                        {selectDate?.dateStr
                          ? selectDate?.dateStr
                          : dd - mm - yyyy}
                      </Text>
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
                  date={selectDateForInOut}
                  isVisible={inTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirmInTime}
                  onCancel={() => {
                    setInTimePickerVisible(false);
                  }}
                />
                <DateTimePickerModal
                  date={selectDateForInOut}
                  isVisible={outTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirmOutTime}
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
                    <View style={[styles.attendanceDate, {width: wp(35)}]}>
                      <Text style={{color: 'gray'}}>
                        {selectInTime?.inTimeStr && selectInTime.inTimeStr}
                      </Text>
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
                    <View style={[styles.attendanceDate, {width: wp(35)}]}>
                      <Text style={{color: 'gray'}}>
                        {selectOutTime.outTimeStr && selectOutTime.outTimeStr}
                      </Text>
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
                  <Pressable
                    onPress={() => {
                      setText('');
                      setSelectDate({
                        dateStr: 'DD-MM-YYYY',
                      });
                      setSelectInTime({inTimeStr: 'HH:MM'});
                      setSelectOutTime({outTimeStr: 'HH:MM'});
                    }}>
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
