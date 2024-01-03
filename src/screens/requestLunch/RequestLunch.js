import React, {useState, useEffect, useRef} from 'react';
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
  getLunchPlans,
  getSubscribedLunchRequests,
  requestLunchSubmission,
} from 'redux/homeSlice';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import TrashIcon from 'assets/newDashboardIcons/trash-can.svg';
import Loader from 'component/loader/Loader';

const RequestLunch = ({navigation}) => {
  const token = useSelector(state => state.auth.userToken);
  const {isGuestLogin: isGuestLogin} = useSelector(state => state.auth);
  const {configData} = useSelector(state => state.home);
  // const [{value: deadlineToRequestForLunch}] = configData;
  let deadlineToRequestForLunch = configData[0];
  deadlineToRequestForLunch = deadlineToRequestForLunch?.value || '60';

  const [deadlineHours, deadlineMinutes] = deadlineToRequestForLunch.split(':');
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;

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
  const [items, setItems] = useState(RequestLunchLabel);
  const [isLoading, setIsLoading] = useState(false);
  // const [isDaily, setIsDaily] = useState(false);
  const [startSelected, setStartSelected] = useState(false);
  const [endSelected, setEndSelected] = useState(false);
  const [lunchRequests, setLunchRequests] = useState([]);
  const [monthlyStartDate, setMonthlyStartDate] = useState(null);
  const [lunchPlans, setLunchPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState();
  const refAnimationSuccess = useRef(null);

  useEffect(() => {
    if (!isGuestLogin) {
      (async () => {
        try {
          setIsLoading(true);
          let lunchPlansResponse = await dispatch(getLunchPlans({token}));
          if (!lunchPlansResponse.error) {
            setLunchPlans(lunchPlansResponse.payload);
          } else {
            alert('could not fetch lunch plans.');
          }
        } catch (err) {
          console.log('errIs:', err);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [dispatch, isGuestLogin, token]);

  const setUpcomingMonthlyStartDate = ({date}) => {
    setMonthlyStartDate(date);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isGuestLogin) {
      (async () => {
        const subscribedLunchRequests =
          token &&
          (await dispatch(getSubscribedLunchRequests({token, employeeID})));

        if (!subscribedLunchRequests.error) {
          // let lunchRequestsList = subscribedLunchRequests?.payload;
          // const sortedLunchRequestList = lunchRequestsList.sort(
          //   (a, b) =>
          //     new Date(a?.requestStartDate).getTime() -
          //     new Date(b?.requestStartDate).getTime(),
          // );

          setLunchRequests(subscribedLunchRequests?.payload);
        } else {
          alert('Unable to fetch lunch requests.');
        }
      })();
    }
  }, [lunchRequests?.length, isGuestLogin, token, employeeID, dispatch]);

  const onSelectItem = item => {
    const selectedPlanByUser = lunchPlans?.find(
      plan =>
        plan?.requestType?.toLowerCase() === item?.value?.toLowerCase() ||
        plan?.requestType?.toLowerCase() === item?.label?.toLowerCase(),
    );

    setSelectedPlan(selectedPlanByUser);

    // alert(
    //   lunchChargeMessage(
    //     selectedPlanByUser?.price,
    //     selectedPlanByUser?.requestType?.toLowerCase(),
    //   ),
    // );

    let date = new Date().getDate();

    const todayDate = new Date();
    let month = monthsName[todayDate.getMonth()];
    let year = new Date().getFullYear();
    if (item.value === 'daily') {
      const monthNameInStr = todayDate.toLocaleString('en-US', {
        month: 'short',
      });

      setStartDate({
        startDateStr: date + '-' + monthNameInStr + '-' + year,
        startDateObj: todayDate,
      });
      setEndDate({
        endDateStr: date + '-' + monthNameInStr + '-' + year,
        endDateObj: todayDate,
      });
      // setIsDaily(true);
      setPermReq(false);
      setStartSelected(true);
      setEndSelected(true);
    } else if (item.value === 'duration') {
      setStartDate({startDateStr: 'Select Start Date', startDateObj: {}});
      setEndDate({endDateStr: 'Select End Date', endDateObj: {}});
      setStartSelected(false);
      setEndSelected(false);
      // setIsDaily(false);
      setPermReq(false);
    } else {
      setStartSelected(false);
      setEndSelected(false);
      setStartDate({startDateStr: 'Select Start Date', startDateObj: {}});
      setEndDate({endDateStr: 'Select End Date', endDateObj: {}});
      // setIsDaily(false);
      setPermReq(true);
      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();
      if (date === 1 && hours < 11 && minutes < 30) {
        month = monthsName[todayDate.getMonth()];
        // const monthNameInStr = new Date().toLocaleString('en-US', {
        //   month: 'short',
        // });
        setStartDate1(date + '-' + month + '-' + year);

        // setEndDate1(16 + '-' + month + '-' + year);
      } else {
        // else if (date >= 16 && date < 31) {
        month = monthsName[todayDate.getMonth() + 1] || monthsName[0];
        const currentMonthIndex = new Date().getMonth();

        if (currentMonthIndex === 11) {
          year += 1;
        }

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
    pickerToClose(false);
  };

  const handleStartConfirm = date => {
    const selectedDate = date.getDate();
    const monthNameInStr = date.toLocaleString('en-US', {month: 'short'});
    const selectedYear = date.getFullYear();
    hideDatePicker(setStartDatePickerVisible);
    setStartDate({
      startDateStr: selectedDate + '-' + monthNameInStr + '-' + selectedYear,
      startDateObj: date,
    });
    setStartSelected(true);
    setEndDate({endDateStr: 'Select End Date'});
    setEndSelected(false);
    // setEndSelected(true);
    // setEndDate({endDateStr: 'Select End Date'});
  };

  const handleEndConfirm = date => {
    setEndSelected(true);
    const selectedDate = date.getDate();

    const monthNameInStr = date.toLocaleString('en-US', {month: 'short'});
    let selectedYear = date.getFullYear();
    setEndDate({
      endDateStr: selectedDate + '-' + monthNameInStr + '-' + selectedYear,
      endDateObj: date,
    });
    hideDatePicker(setEndDatePickerVisible);
  };

  const onSubmit = async () => {
    if (isGuestLogin) {
      alert("Guests aren't allowed to Request for lunch.");
      return;
    }
    const requestType = selectedPlan?.id;

    let dateObj = {};
    if (value === 'monthly') {
      const dateArray = monthlyStartDate.split('-');

      const day = dateArray[0];
      let startingDate = day;
      if (day.length === 1) {
        startingDate = 0 + startingDate;
      }
      const month = dateArray[1];
      const year = dateArray[2];

      let monthNumber;
      let numberOfDaysInThisMonth;

      for (let i = 0; i < monthsName.length; i++) {
        if (monthsName[i]?.toLowerCase() === month?.toLowerCase()) {
          monthNumber = i + 1 + '';
          numberOfDaysInThisMonth = new Date(year, i + 1, 0).getDate();
          if (monthNumber.length === 1) {
            monthNumber = 0 + monthNumber;
          }
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
        startDate?.startDateObj?.getDay() === 6)
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
    const todayDateMonth = todayDateObj.getMonth() + 1;
    const currentHour = todayDateObj.getHours();
    const currentMinutes = todayDateObj.getMinutes();
    const appliedDate = new Date(dateObj.requestStartDate).getDate();
    const appliedMonth = new Date(dateObj.requestStartDate).getMonth() + 1;
    if (
      appliedDate === todayDate &&
      appliedMonth === todayDateMonth &&
      (+currentHour > +deadlineHours ||
        (+currentHour === +deadlineHours && +deadlineMinutes < +currentMinutes))
    ) {
      alert(
        `You can not apply for the lunch request after ${deadlineHours}:${deadlineMinutes}.`,
      );
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
      setStartSelected(false);
      setEndSelected(false);
      setValue('');
    }
    refAnimationSuccess.current.resetSelected(false);

    // monthly , duration
  };

  let opacity = 1;

  if (value !== 'monthly') {
    if (!startSelected || !endSelected || !value) {
      opacity = 0.5;
    }
  } else {
    if (!monthlyStartDate) {
      opacity = 0.5;
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Image source={MonthImages.backArrowS} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text1}>Request Lunch</Text>
        <View style={styles.lunchTextView}>
          <Image source={MonthImages.info_scopy} style={styles.headerIcon} />
        </View>
      </View>

      <View style={styles.secondView}>
        <View style={styles.dropDownView}>
          <Text style={styles.reqTypeText}>Request Type:</Text>
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              open={open}
              placeholder={'Please Select..'}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onSelectItem={onSelectItem}
              containerStyle={styles.dropdownContainerStyle}
              style={[styles.dropdownStyle, open && styles.borderRadius5]}
              dropDownStyle={styles.selectDropdownStyle}
              labelStyle={styles.dropdownLabelStyle}
            />
          </View>
        </View>
        <DateTimePickerModal
          minimumDate={new Date()}
          date={startSelected ? startDate?.startDateObj : undefined}
          maximumDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
          isVisible={startDatePickerVisible}
          mode="date"
          onConfirm={handleStartConfirm}
          onCancel={hideDatePicker.bind(null, setStartDatePickerVisible)}
        />
        <DateTimePickerModal
          minimumDate={startSelected ? startDate?.startDateObj : undefined}
          maximumDate={
            startSelected
              ? new Date(
                  startDate?.startDateObj?.getTime() + 6 * 24 * 60 * 60 * 1000,
                )
              : undefined
          }
          isVisible={endDatePickerVisible}
          mode="date"
          date={
            endSelected
              ? endDate?.endDateObj
              : startSelected
              ? startDate.startDateObj
              : undefined
          }
          onConfirm={handleEndConfirm}
          onCancel={hideDatePicker.bind(null, setEndDatePickerVisible)}
        />
        <View style={styles.datesContainer}>
          <View style={styles.thirdView}>
            <SelectDateModal
              modalData={modalData}
              setUpcomingMonthlyStartDate={setUpcomingMonthlyStartDate}
              ref={refAnimationSuccess}
            />
            <Text style={styles.datePickerLabel}>Start Date :</Text>
            <TouchableOpacity
              style={!value || value === 'daily' ? styles.opacity60 : null}
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
              <Text style={styles.datePickerLabel}>End Date :</Text>
              <TouchableOpacity
                disabled={!value || value === 'daily' || !startSelected}
                style={
                  (!value || value === 'daily' || !startSelected) &&
                  styles.opacity60
                }
                // disabled={isDaily}
                onPress={() => {
                  setEndDatePickerVisible(true);
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
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              setEndSelected(false);
              setStartSelected(false);
              setStartDate({
                startDateStr: 'Select Start Date',
              });

              setEndDate({endDateStr: 'Select End Date'});
              setMonthlyStartDate(null);
              setValue(null);
              refAnimationSuccess.current.resetSelected(false);
            }}
            style={styles.buttonCancel}>
            <View>
              <Text style={styles.buttonCancelText}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonSubmit, {opacity}]}
            disabled={
              value !== 'monthly'
                ? !startSelected || !endSelected || !value
                : !monthlyStartDate
            }
            onPress={onSubmit}>
            <View>
              <Text style={styles.applyText}>Apply</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.appliedView}>
        <Text style={styles.appliedText}>Lunch Request History</Text>
      </View>
      <View style={styles.buttomView}>
        {lunchRequests?.length > 0 ? (
          <View style={styles.lunchRequestsContainer}>
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
          <View style={styles.noRequestsContainer}>
            <Text style={styles.noRequestsText}>
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
  // console.log('CheckingIdAndDate:', item.planId, new Date().getDate());

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
        <View style={styles.requestDetails}>
          <Text style={styles.dayText}>01</Text>
          <Text style={styles.requestTypeText}>
            {item?.planId === 1 || item?.planId === 2 ? 'Day' : 'Month'}
          </Text>
        </View>
        <View style={{}}>
          <Text style={styles.requestDateText}>
            {formattedStartDate} - {formattedEndDate}
          </Text>
          <View style={styles.applyContainer}>
            <Text style={styles.appliedOnText}>Applied on: </Text>
            <Text style={styles.appliedDateText}>{appliedDate}</Text>
            <Text style={styles.typeRequestText}>{item?.requestType}</Text>
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
                        body: {
                          id: item.id,
                          employeeId: item.employeeId,
                          requestStartDate: item.requestStartDate,
                          requestEndDate: item.requestEndDate,
                          requestCancellationDate: new Date(),
                          requestType: item.planId,
                        },
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
