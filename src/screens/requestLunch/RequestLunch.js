import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Pressable,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import styles from './RequestLunchStyle';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import jwt_decode from 'jwt-decode';

import DropDownPicker from 'react-native-dropdown-picker';
import SelectDateModal from 'modals/SelectDateModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {monthsName, RequestLunchLabel} from 'utils/defaultData';
import {
  cancelSubscribedLunchRequest,
  getSubscribedLunchRequests,
  requestLunchSubmission,
} from 'redux/homeSlice';
import {FontFamily} from 'constants/fonts';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import TrashIcon from 'assets/newDashboardIcons/trash-can.svg';
import Loader from 'component/loader/Loader';
import CustomHeader from 'navigation/CustomHeader';

const RequestLunch = ({navigation}) => {
  const token = useSelector(state => state.auth.userToken);
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;
  const {employeeProfile, dateData} = useSelector(state => state.home);

  const [startDate, setStartDate] = useState({
    startDateStr: 'Select Start Date',
  });
  const [endDate, setEndDate] = useState({endDateStr: 'Select End Date'});
  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [permReq, setPermReq] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [satrtDate1, setStartDate1] = useState('');
  const [endDate1, setEndDate1] = useState('');
  const [items, setItems] = useState(RequestLunchLabel);
  const [isLoading, setIsLoading] = useState(false);
  const [isDaily, setIsDaily] = useState(false);
  const [startSelected, setStartSelected] = useState(false);
  const [endSelected, setEndSelected] = useState(false);
  const [lunchRequests, setLunchRequests] = useState([]);
  const [monthlyStartDate, setMonthlyStartDate] = useState(null);

  const setUpcomingMonthlyStartDate = ({date}) => {
    setMonthlyStartDate(date);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const subscribedLunchRequests =
        token &&
        (await dispatch(getSubscribedLunchRequests({token, employeeID})));

      let lunchRequestsList = subscribedLunchRequests?.payload;
      const sortedLunchRequestList = lunchRequestsList.sort(
        (a, b) =>
          new Date(a?.requestStartDate).getTime() -
          new Date(b?.requestStartDate).getTime(),
      );

      setLunchRequests(subscribedLunchRequests?.payload);
    })();
  }, [lunchRequests?.length]);

  const onSelectItem = item => {
    let date = new Date().getDate();

    const todayDate = new Date();
    let month = monthsName[todayDate.getMonth()];
    let year = new Date().getFullYear();
    if (item.value === 'daily') {
      setStartDate({
        startDateStr: date + '-' + month + '-' + year,
        startDateObj: todayDate,
      });
      setEndDate({
        endDateStr: date + '-' + month + '-' + year,
        endDateObj: todayDate,
      });
      setIsDaily(true);
      setPermReq(false);
      setStartSelected(true);
      setEndSelected(true);
    } else if (item.value === 'duration') {
      setStartDate({startDateStr: 'Select Start Date', startDateObj: {}});
      setEndDate({endDateStr: 'Select End Date', endDateObj: {}});
      setStartSelected(false);
      setEndSelected(false);
      setIsDaily(false);
      setPermReq(false);
    } else {
      setStartSelected(false);
      setEndSelected(false);
      setStartDate({startDateStr: 'Select Start Date', startDateObj: {}});
      setEndDate({endDateStr: 'Select End Date', endDateObj: {}});
      setIsDaily(false);
      setPermReq(true);
      if (date === 1) {
        month = monthsName[todayDate.getMonth()];
        setStartDate1(date + '-' + month + '-' + year);
        // setEndDate1(16 + '-' + month + '-' + year);
      }
      // else if (date > 1 && date < 16) {
      //   month = monthsName[todayDate.getMonth()];
      //   setStartDate1(16 + '-' + month + '-' + year);
      //   month = monthsName[todayDate.getMonth() + 1];
      //   setEndDate1(1 + '-' + month + '-' + year);
      // }
      else {
        // else if (date >= 16 && date < 31) {
        month = monthsName[todayDate.getMonth() + 1];
        setStartDate1(1 + '-' + month + '-' + year);
        // setEndDate1(16 + '-' + month + '-' + year);
      }
    }
  };
  const modalData = {
    openModal: openModal,
    setOpenModal: setOpenModal,
    satrtDate1: satrtDate1,
    // endDate1: endDate1,
  };

  const hideDatePicker = pickerToClose => {
    pickerToClose();
  };

  const handleStartConfirm = date => {
    let selectedDate = date.getDate();

    let selectedMonth = monthsName[date.getMonth()];
    let selectedYear = date.getFullYear();
    hideDatePicker(setStartDatePickerVisible);
    setStartDate({
      startDateStr: selectedDate + ' / ' + selectedMonth + ' / ' + selectedYear,
      startDateObj: date,
    });
    setStartSelected(true);
  };

  const handleEndConfirm = date => {
    setEndSelected(true);
    let selectedDate = date.getDate();

    let selectedMonth = monthsName[date.getMonth()];
    let selectedYear = date.getFullYear();
    setEndDate({
      endDateStr: selectedDate + ' / ' + selectedMonth + ' / ' + selectedYear,
      endDateObj: date,
    });
    hideDatePicker(setEndDatePickerVisible);
  };

  const onSubmit = async () => {
    let requestType;
    if (value === 'daily') requestType = 1;
    else if (value === 'duration') requestType = 2;
    else requestType = 3;

    let dateObj = {};
    if (value === 'monthly') {
      const dateArray = monthlyStartDate.split('-');

      const day = dateArray[0];
      let startingDate = day;
      if (day.length === 1) startingDate = 0 + startingDate;
      const month = dateArray[1];
      const year = dateArray[2];

      let monthNumber;
      let numberOfDaysInThisMonth;

      for (let i = 0; i < monthsName.length; i++) {
        if (monthsName[i].toLowerCase() === month.toLowerCase()) {
          monthNumber = i + 1 + '';
          numberOfDaysInThisMonth = new Date(year, i + 1, 0).getDate();
          if (monthNumber.length === 1) monthNumber = 0 + monthNumber;
          break;
        }
      }

      const startDateStr = `${year}-${monthNumber}-${startingDate}`;
      const endDateStr = `${year}-${monthNumber}-${numberOfDaysInThisMonth}`;
      dateObj = {
        requestStartDate: startDateStr,
        requestEndDate: endDateStr,
      };
    } else {
      const requestStartDate = startDate?.startDateObj
        ?.toISOString()
        ?.slice(0, 10);
      const requestEndDate = endDate?.endDateObj?.toISOString()?.slice(0, 10);
      dateObj = {requestEndDate, requestStartDate};
    }
    //

    if (
      value !== 'monthly' &&
      (startDate?.startDateObj?.getDay() === 0 ||
        startDate.startDateObj.getDay() === 6)
    ) {
      alert('You Cannot Start a lunch request on Weekends.');
      return;
    }

    if (
      value !== 'monthly' &&
      (endDate?.endDateObj?.getDay() === 0 ||
        endDate?.endDateObj?.getDay() === 6)
    ) {
      alert('You Cannot End a lunch request on Weekends.');
      return;
    }
    const todayDateObj = new Date();
    const todayDate = todayDateObj.getDate();
    const currentHour = todayDateObj.getHours();
    const currentMinutes = todayDateObj.getMinutes();
    const appliedDate = new Date(dateObj.requestStartDate).getDate();

    if (
      appliedDate === todayDate &&
      (currentHour > 10 || (currentHour === 10 && currentMinutes > 29))
    ) {
      alert('You can not apply for the lunch request after 10:30.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await dispatch(
        requestLunchSubmission({
          token,
          employeeId: employeeID,
          requestType,
          ...dateObj,
        }),
      );

      const appliedSubscriptions = response?.payload?.data;

      if (requestType === 2 && !response?.error) {
        setLunchRequests(prevRequests => [
          ...prevRequests,
          ...appliedSubscriptions,
        ]);
      } else if (!response?.error) {
        setLunchRequests(prevRequests => [
          ...prevRequests,
          appliedSubscriptions,
        ]);
      }

      if (response?.error) {
        alert(response?.error?.message || 'Something went wrong.');
      } else {
        Alert.alert('Success', 'Lunch requested successfully!', [
          {
            text: 'Ok',
            onPress: () => {
              // navigation.goBack();
            },
          },
        ]);
      }
    } catch (err) {
      alert('Something Went Wrong.');
    } finally {
      setIsLoading(false);
      setStartDate({startDateStr: 'Select Start Date'});
      setEndDate({endDateStr: 'Select End Date'});
    }

    // monthly , duration
  };

  let opacity = 1;

  if (value !== 'monthly') {
    if (!startSelected || !endSelected || !value) opacity = 0.5;
  } else {
    if (!monthlyStartDate) opacity = 0.5;
  }

  return (
    // <SharedElement id="enter">
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={MonthImages.backArrowS}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.text1}>Request Lunch</Text>
        <View style={styles.lunchTextView}>
          <Image
            source={MonthImages.info_scopy}
            style={{height: 20, width: 20}}
          />
        </View>
      </View>

      <View style={styles.secondView}>
        <View style={styles.dropDownView}>
          <Text
            style={{
              marginBottom: hp(1.6),
              fontSize: 18,
              color: Colors.black,
            }}>
            Request Type:
          </Text>
          <View
            style={{
              zIndex: 9999,
            }}>
            <DropDownPicker
              open={open}
              placeholder={'Please Select'}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onSelectItem={onSelectItem}
              containerStyle={{height: 40}}
              style={{
                height: hp(1),
                height: 10,
                borderRadius: 50,
                borderColor: Colors.grey,
                marginBottom: hp(3),
              }}
              dropDownStyle={{
                backgroundColor: Colors.lightBlue,
                borderBottomWidth: 1,
              }}
              labelStyle={{
                fontSize: 13,
                textAlign: 'left',
                color: Colors.black,
                alignSelf: 'center',
              }}
            />
          </View>
        </View>
        <DateTimePickerModal
          minimumDate={new Date()}
          maximumDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
          isVisible={startDatePickerVisible}
          mode="date"
          onConfirm={handleStartConfirm}
          onCancel={hideDatePicker.bind(null, setStartDatePickerVisible)}
        />
        <DateTimePickerModal
          minimumDate={startSelected ? startDate?.startDateObj : undefined}
          maximumDate={
            startSelected && startDate?.startDateObj?.getDate
              ? new Date(
                  new Date().setDate(startDate.startDateObj.getDate() + 7),
                )
              : undefined
          }
          isVisible={endDatePickerVisible}
          mode="date"
          onConfirm={handleEndConfirm}
          onCancel={hideDatePicker.bind(null, setEndDatePickerVisible)}
        />
        <View style={styles.datesContainer}>
          <View style={styles.thirdView}>
            <SelectDateModal
              modalData={modalData}
              setUpcomingMonthlyStartDate={setUpcomingMonthlyStartDate}
            />
            <Text
              style={{
                marginBottom: hp(1),
                fontSize: 18,
                color: Colors.black,
              }}>
              Start Date :
            </Text>
            <TouchableOpacity
              disabled={!value || value === 'daily'}
              onPress={() => {
                if (permReq) {
                  setOpenModal(true);
                } else {
                  setStartDatePickerVisible(true);
                }
              }}>
              <View style={styles.fourthView}>
                <Text style={styles.selectedDated}>
                  {value !== 'monthly'
                    ? startDate.startDateStr
                    : monthlyStartDate || 'Select Start Date'}
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
          {value !== 'monthly' ? (
            <View style={styles.fifthView}>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.black,
                  marginBottom: hp(1),
                }}>
                End Date :
              </Text>
              <TouchableOpacity
                disabled={!value || value === 'daily' || !startSelected}
                // disabled={isDaily}
                onPress={() => {
                  if (permReq) {
                    setOpenModal(true);
                  } else {
                    setEndDatePickerVisible(true);
                  }
                }}>
                <View style={styles.sixthView}>
                  <Text style={styles.selectedDated}>{endDate.endDateStr}</Text>
                  <CalenderIcon
                    fill={Colors.lightGray1}
                    height={hp(2)}
                    width={hp(2)}
                    marginRight={wp(0.64)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(4),
          }}>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: Colors.grayishWhite,
              paddingHorizontal: wp(8.6),
              borderRadius: 200,
              paddingVertical: hp(1.4),
            }}>
            <View>
              <Text
                style={{
                  color: Colors.black,
                  textAlign: 'center',
                  fontSize: 17,
                }}>
                Cancel
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              opacity: opacity,
              marginTop: 20,
              backgroundColor: Colors.lovelyPurple,
              paddingHorizontal: wp(9.2),
              borderRadius: 200,
              paddingVertical: hp(1.5),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={
              value !== 'monthly'
                ? !startSelected || !endSelected || !value
                : !monthlyStartDate
            }
            onPress={onSubmit}>
            <View>
              <Text
                style={{
                  color: Colors.white,
                  textAlign: 'center',
                  fontSize: 17,
                }}>
                Apply
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.appliedView}>
        <Text style={styles.appliedText}>Lunch Request History</Text>
      </View>
      <View style={styles.buttomView}>
        {lunchRequests?.length > 0 ? (
          <View style={{flexBasis: 300}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={lunchRequests}
              renderItem={({item}) => {
                return renderListOfAppliedRequests({
                  item,
                  dispatch,
                  token,
                  onCancel: cancelSubscribedLunchRequest,
                  setIsLoading,
                  lunchRequests,
                  setLunchRequests,
                });
              }}
              keyExtractor={item => Math.random() * Math.random()}
              // keyExtractor={item => item.id.toString()}
              scrol
            />
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: FontFamily.RobotoLight,
                position: 'absolute',
                top: hp(10),
              }}>
              You don't have any lunch request.
            </Text>
          </View>
        )}
      </View>
      {isLoading ? <Loader /> : null}
    </View>
  );
};

const renderListOfAppliedRequests = ({
  item,
  dispatch,
  onCancel,
  token,
  setIsLoading,
  lunchRequests,
  setLunchRequests,
}) => {
  const options = {month: 'short', day: '2-digit', year: 'numeric'};

  const formattedStartDate = new Date(
    item?.requestStartDate,
  )?.toLocaleDateString('en-US', options);

  const formattedEndDate = new Date(item?.requestEndDate)?.toLocaleDateString(
    'en-US',
    options,
  );

  const appliedDate = new Date(item?.creation)?.toLocaleDateString(
    'en-US',
    options,
  );

  return (
    <View style={styles.request}>
      <View style={styles.appliedRequestsLeft}>
        <View
          style={{
            alignItems: 'center',
            marginRight: wp(4),
          }}>
          <Text style={{fontSize: 25, fontFamily: FontFamily.RobotoLight}}>
            01
          </Text>
          <Text style={{fontSize: 12, fontFamily: FontFamily.RobotoMedium}}>
            {item?.planId === 1 || item?.planId === 2 ? 'Day' : 'Month'}
          </Text>
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: FontFamily.RobotoRegular,
              color: Colors.dune,
              marginBottom: hp(1),
            }}>
            {formattedStartDate} - {formattedEndDate}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 11, color: Colors.lightGray1}}>
              Applied on:{' '}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: Colors.lightGray1,
                fontFamily: FontFamily.RobotoMedium,
              }}>
              {appliedDate}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                paddingHorizontal: 10,
                paddingVertical: 3,
                backgroundColor: Colors.skin,
                color: Colors.darkSkin,
                fontSize: 12,
                fontFamily: FontFamily.RobotoLightItalic,
              }}>
              {item?.requestType}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => {
          Alert.alert(
            'Cancel Request',
            `Are you sure you want to Cancel Lunch Request for ${formattedStartDate}`,
            [
              {
                text: 'No',
                onPress: () => null,
              },
              {
                text: 'Yes',
                onPress: async () => {
                  try {
                    setIsLoading(true);
                    const response = await dispatch(
                      onCancel({
                        token,
                        body: {id: item.id},
                      }),
                    );
                    // console.log('response:', response?.error?.message);
                    if (response?.error) {
                      alert(response?.error.message);
                    } else {
                      Alert.alert('Success', 'Request canceled Successfully.', [
                        {text: 'Ok', onPress: () => null},
                      ]);
                      const newLunchRequestList = lunchRequests.filter(
                        request => request.id !== item.id,
                      );
                      setLunchRequests(newLunchRequestList);
                    }
                  } catch (err) {
                  } finally {
                    setIsLoading(false);
                  }
                },
              },
            ],
          );
        }}
        style={styles.cancelButton}>
        <TrashIcon fill={Colors.darkSkin} height={hp(2)} width={hp(2)} />
      </Pressable>
    </View>
  );
};

export default RequestLunch;
