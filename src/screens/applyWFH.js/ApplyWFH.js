import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';

import {Colors} from 'colors/Colors';
import styles from './ApplyWFHstyles';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import jwt_decode from 'jwt-decode';

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  applyForWfhLeave,
  cancelSubscribedLunchRequest,
  getEmployeeShift,
  getLeaveApprovers,
  getLeaveDetails,
} from 'redux/homeSlice';
import {FontFamily} from 'constants/fonts';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import Loader from 'component/loader/Loader';
import CustomHeader from 'navigation/CustomHeader';
import {useIsFocused} from '@react-navigation/native';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import {useDrawerStatus} from '@react-navigation/drawer';
import ApprovedIcon from 'assets/newDashboardIcons/circle-check.svg';
import RejectedIcon from 'assets/newDashboardIcons/ban.svg';
import PendingIcon from 'assets/newDashboardIcons/circle-minus.svg';

const initialEndDate = {endDateStr: 'Select End Date'};
const initialStartDate = {startDateStr: 'Select Start Date'};
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const alreadyWeekend = 'You already have a weekend holiday on this day.';
const alreadyNationalHoliday = 'You can not take a WFH on National holiday.';
const alreadyWFHApplied = 'WFH are already applied for these dates.';

const ApplyWFH = ({navigation}) => {
  const token = useSelector(state => state.auth.userToken);
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const drawerStatus = useDrawerStatus();

  const [openModal, setOpenModal] = useState(false);
  const [permReq, setPermReq] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [satrtDate1, setStartDate1] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDaily, setIsDaily] = useState(false);
  const [startSelected, setStartSelected] = useState(false);
  const [endSelected, setEndSelected] = useState(false);
  const [lunchRequests, setLunchRequests] = useState([]);
  const [monthlyStartDate, setMonthlyStartDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wfhList, setWfhList] = useState([]);
  const [totalDaysCount, setTotalDaysCount] = useState(0);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [leaveApprover, setLeaveApprover] = useState('');
  const [selectedLeaveApprover, setSelectedLeaveApprover] = useState('');
  const [reason, setReason] = useState('');
  const [employeeWeekOffs, setEmployeeWeekOffs] = useState([]);
  const [leavesNotIncludeWFH, setLeavesNotIncludeWFH] = useState([]);

  const {holidayData} = useSelector(state => state.home);

  let currentYear = new Date().getFullYear();
  const fiscalYear = `${currentYear}-${new Date().getFullYear() + 1}`;

  const setUpcomingMonthlyStartDate = ({date}) => {
    setMonthlyStartDate(date);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    const windowHeight = Dimensions.get('window').height;
    if (drawerStatus === 'open') {
      Keyboard.dismiss();
      // setEndSelected(false);
      // setStartSelected(false);
      // setStartDate({
      //   startDateStr: 'Select Start Date',
      // });
      // setEndDate({endDateStr: 'Select End Date'});
      // setReason('');
      // setTotalDaysCount(0);
      // setValue(null);
    }
  }, [drawerStatus]);

  useEffect(() => {
    (async () => {
      const leaveApprovers = token
        ? await dispatch(getLeaveApprovers({token, employeeID}))
        : [];

      const listOfLeaveApprovers = leaveApprovers.payload?.map(approver => {
        const approverName = `${approver?.leaveApproverFirstName} ${
          approver.leaveApproverMiddleName
            ? approver.leaveApproverMiddleName + ' '
            : ''
        }${
          approver.leaveApproverLastName ? approver.leaveApproverLastName : ''
        }`;

        return {
          value: approver.leaveApprover,
          label: approverName,
        };
      });
      setLeaveApprover(listOfLeaveApprovers);
      setItems(listOfLeaveApprovers);
    })();
  }, [dispatch, employeeID, token]);

  useEffect(() => {
    (async () => {
      try {
        const employeeShift = await dispatch(
          getEmployeeShift({token, id: employeeID}),
        );
        const weekOffs = employeeShift?.payload?.weeklyOff.split('_');

        const finalWeekOffs = [];
        daysOfWeek?.map((el, index) => {
          if (weekOffs?.includes(el)) finalWeekOffs.push(index);
        });
        setEmployeeWeekOffs(finalWeekOffs);
      } catch (err) {
        console.log('errorEmpShift:', err);
      }
    })();
  }, [dispatch, employeeID, token]);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        try {
          setLoading(true);
          const leavesData = await dispatch(
            getLeaveDetails({
              token,
              empID: employeeID,
            }),
          );

          // let wfhLeaveList = leavesData.payload?.filter(
          //   leave => leave.leaveType.toLowerCase() === 'work from home',
          // );
          const wfhLeaveList = [];
          const otherLeaves = [];

          for (let leave of leavesData?.payload) {
            if (leave?.leaveType?.toLowerCase() === 'work from home') {
              wfhLeaveList.push(leave);
            } else otherLeaves.push(leave);
          }

          let sortedWfhData = wfhLeaveList?.sort(
            (a, b) =>
              new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime(),
          );

          setWfhList(sortedWfhData);
          setLeavesNotIncludeWFH(otherLeaves);

          if (leavesData?.error) {
            ShowAlert({
              messageHeader: ERROR,
              messageSubHeader: leavesData?.error?.message,
              buttonText: 'Close',
              dispatch,
            });
          }
        } catch (err) {
          console.log('errWFH:', err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isFocused, dispatch, employeeID, token]);

  const dispatch = useDispatch();

  const onSelectItem = item => {
    const selectedLeaveApprover = leaveApprover.find(
      approver => approver?.label?.toLowerCase() === item.label.toLowerCase(),
    );
    setSelectedLeaveApprover(selectedLeaveApprover.value);
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

  const startOnCancel = () => {
    setStartDatePickerVisible(false);
  };

  const endOnCancel = () => {
    setEndDatePickerVisible(false);
  };

  const handleStartConfirm = date => {
    Keyboard.dismiss;
    if (employeeWeekOffs?.includes(date.getDay())) {
      // date.setDate(date.getDate() + 1);
      alert(alreadyWeekend);
      startOnCancel();
      return;
    }

    for (let i = 0; i < holidayData.length; i++) {
      const holidayObj = new Date(holidayData[i].holidayDate);

      if (
        holidayObj.getMonth() === date.getMonth() &&
        date.getDate() === holidayObj.getDate()
      ) {
        alert(alreadyNationalHoliday);
        startOnCancel();
        return;
      }
    }

    const fromDate = date;
    setFromDate(fromDate);
    let selectedDate = date.getDate();

    let selectedMonth = date.getMonth() + 1;
    let selectedYear = date.getFullYear();
    hideDatePicker(setStartDatePickerVisible);
    setStartDate({
      startDateStr: selectedDate + ' / ' + selectedMonth + ' / ' + selectedYear,
      startDateObj: date,
    });
    setStartSelected(true);
    setEndSelected(false);
    setEndDate(initialEndDate);
    setTotalDaysCount(0);
  };

  const handleEndConfirm = date => {
    Keyboard.dismiss;
    if (employeeWeekOffs?.includes(date.getDay())) {
      // date.setDate(date.getDate() + 1);
      alert(alreadyWeekend);
      endOnCancel();
      return;
    }

    for (let i = 0; i < holidayData.length; i++) {
      const holidayObj = new Date(holidayData[i].holidayDate);

      if (
        holidayObj.getMonth() === date.getMonth() &&
        date.getDate() === holidayObj.getDate()
      ) {
        alert(alreadyNationalHoliday);
        endOnCancel();
        return;
      }
    }
    const toDate = date;
    setToDate(toDate);
    setEndSelected(true);
    let selectedDate = date.getDate();

    let selectedMonth = date.getMonth() + 1;
    let selectedYear = date.getFullYear();
    setEndDate({
      endDateStr: selectedDate + ' / ' + selectedMonth + ' / ' + selectedYear,
      endDateObj: date,
    });
    hideDatePicker(setEndDatePickerVisible);
    const diffTime = toDate?.getTime() - fromDate?.getTime();
    const diffInDays = diffTime / (1000 * 60 * 60 * 24) + 1;
    setTotalDaysCount(Math.round(diffInDays));
  };

  let opacity = 1;

  if (value !== 'monthly') {
    if (!startSelected || !endSelected || !value || reason?.trim().length === 0)
      opacity = 0.5;
  } else {
    if (!monthlyStartDate) opacity = 0.5;
  }

  let endDateMaximumLimit = startSelected ? startDate?.startDateObj : undefined;

  const startDateCopy = new Date(startDate?.startDateObj);

  const onApplyWfh = async () => {
    // if (!startDate.startDateStr || !endDate.endDateStr) {
    //   alert('Please select dates for which you want to apply a WFH.');
    //   return;
    // }

    // if (selectedLeaveApprover === '') {
    //   alert('Please select a leave approver.');
    //   return;
    // }
    // if (totalDaysCount === 0) {
    //   alert('You can not apply leave on Weekends.');
    //   return;
    // }

    // if (reason?.trim().length === 0) {
    //   alert('Please enter a reason for applying a WFH.');
    //   return;
    // }

    for (let i = 0; i < wfhList?.length; i++) {
      let {fromDate: startDate1, toDate: endDate1} = wfhList[i];
      startDate1 = new Date(startDate1);
      endDate1 = new Date(endDate1);
      const startDate2 = startDate.startDateObj;
      const endDate2 = endDate.endDateObj;

      if (
        (startDate1 >= startDate2 && endDate2 >= startDate1) ||
        (startDate2 >= startDate1 && startDate2 <= endDate1)
      ) {
        if (
          wfhList[i].status.toLowerCase() === 'open' ||
          wfhList[i].status.toLowerCase() === 'approved'
        ) {
          alert(alreadyWFHApplied);
          return;
        }
      }

      if (
        startDate1.toDateString() === startDate2.toDateString() ||
        startDate1.toDateString() === endDate2.toDateString() ||
        startDate2.toDateString() === startDate1.toDateString() ||
        startDate2.toDateString() === endDate1.toDateString()
      ) {
        if (
          wfhList[i].status.toLowerCase() === 'open' ||
          wfhList[i].status.toLowerCase() === 'approved'
        ) {
          alert(alreadyWFHApplied);
          return;
        }
      }
    }

    // =================================================================
    for (let i = 0; i < leavesNotIncludeWFH?.length; i++) {
      let {fromDate: startDate1, toDate: endDate1} = leavesNotIncludeWFH[i];
      startDate1 = new Date(startDate1);
      endDate1 = new Date(endDate1);
      const startDate2 = fromDate;
      const endDate2 = toDate;

      if (
        (startDate1 >= startDate2 && endDate2 >= startDate1) ||
        (startDate2 >= startDate1 && startDate2 <= endDate1)
      ) {
        if (
          leavesNotIncludeWFH[i]?.status?.toLowerCase() === 'open' ||
          leavesNotIncludeWFH[i]?.status?.toLowerCase() === 'approved'
        ) {
          alert('Leaves are already applied for these dates.');
          return;
        }
      }

      if (
        startDate1.toDateString() === startDate2.toDateString() ||
        startDate1.toDateString() === endDate2.toDateString() ||
        startDate2.toDateString() === startDate1.toDateString() ||
        startDate2.toDateString() === endDate1.toDateString()
      ) {
        if (
          leavesNotIncludeWFH[i]?.status?.toLowerCase() === 'open' ||
          leavesNotIncludeWFH[i]?.status?.toLowerCase() === 'approved'
        ) {
          alert('Leaves are already applied for these dates.');
          return;
        }
      }
    }
    // =================================================================

    try {
      setLoading(true);
      const appliedWfh =
        token &&
        (await dispatch(
          applyForWfhLeave({
            token,
            body: {
              employeeId: employeeID,
              fromDate: fromDate,
              toDate: toDate,
              totalLeaveDays: totalDaysCount,
              description: reason,
              leaveType: 'Work From Home',
              leaveApprover: selectedLeaveApprover,
              fiscalYear: fiscalYear,
              postingDate: new Date(),
            },
          }),
        ));

      const appliedWorkFromHome = appliedWfh?.payload;

      if (!appliedWfh?.error) {
        setWfhList(prevRequests => [appliedWorkFromHome, ...prevRequests]);
      } else if (appliedWfh?.error) {
        // setWfhList(prevRequests => [...prevRequests, appliedWorkFromHome]);
      }

      if (appliedWfh?.error) {
        alert(appliedWfh.error.message);
      } else {
        Alert.alert('Success', 'WFH applied successfully!', [
          {
            text: 'Ok',
            onPress: () => {
              setEndSelected(false);
              setStartSelected(false);
              setStartDate(initialStartDate);
              setEndDate(initialEndDate);
              setReason('');
              setTotalDaysCount(0);
              setValue(null);
            },
          },
        ]);

        setTotalDaysCount(0);
      }
    } catch (err) {
      console.log('errWFH2:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        showDrawerMenu={true}
        title="Apply WFH"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />

      <View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.secondView}>
              <DateTimePickerModal
                minimumDate={new Date()}
                date={startSelected ? startDate?.startDateObj : undefined}
                // maximumDate={
                //   new Date(new Date().setMonth(new Date().getMonth() + 1))
                // }
                isVisible={startDatePickerVisible}
                mode="date"
                onConfirm={handleStartConfirm}
                onCancel={hideDatePicker.bind(null, setStartDatePickerVisible)}
              />
              <DateTimePickerModal
                minimumDate={
                  startSelected ? startDate?.startDateObj : undefined
                }
                // maximumDate={
                //   startSelected
                //     ? new Date(
                //         startDate?.startDateObj?.getTime() +
                //           7 * 24 * 60 * 60 * 1000,
                //       )
                //     : undefined
                // }
                isVisible={endDatePickerVisible}
                mode="date"
                date={startSelected ? startDate?.startDateObj : undefined}
                onConfirm={handleEndConfirm}
                onCancel={hideDatePicker.bind(null, setEndDatePickerVisible)}
              />
              <View style={styles.datesContainer}>
                <View style={styles.thirdView}>
                  {/* <SelectDateModal
                  modalData={modalData}
                  setUpcomingMonthlyStartDate={setUpcomingMonthlyStartDate}
                /> */}
                  <Text
                    style={{
                      marginBottom: hp(1),
                      fontSize: 18,
                      color: Colors.black,
                    }}>
                    From Date :
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setStartDatePickerVisible(true);
                    }}>
                    <View style={styles.fourthView}>
                      <Text style={styles.selectedDated}>
                        {startDate.startDateStr}
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
                <View style={styles.fifthView}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.black,
                      marginBottom: hp(1),
                    }}>
                    To Date :
                  </Text>
                  <TouchableOpacity
                    disabled={!startSelected}
                    style={{
                      opacity: !startSelected ? 0.6 : 1,
                    }}
                    onPress={() => {
                      setEndDatePickerVisible(true);
                    }}>
                    <View style={styles.sixthView}>
                      <Text style={styles.selectedDated}>
                        {endDate.endDateStr}
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
              </View>

              <View style={styles.dropDownView}>
                <Text
                  style={{
                    marginBottom: hp(1.6),
                    fontSize: 18,
                    color: Colors.black,
                  }}>
                  Total Days: {!totalDaysCount ? 0 : totalDaysCount}
                </Text>
                <View
                  style={{
                    zIndex: 9999,
                  }}>
                  <DropDownPicker
                    open={open}
                    placeholder={'Please Select Leave Approver..'}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onSelectItem={onSelectItem}
                    containerStyle={{height: 40}}
                    style={{
                      borderRadius: open ? 5 : 50,
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
              <View style={styles.reasonViewBox}>
                <TextInput
                  value={reason}
                  placeholder="Reason..."
                  multiline={true}
                  style={styles.reasonInputBox}
                  onChangeText={text => setReason(text)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: wp(4),
                }}>
                <TouchableOpacity
                  disabled={
                    !startDate.startDateObj &&
                    !endDate.endDateObj &&
                    !reason &&
                    !value
                  }
                  onPress={() => {
                    setEndSelected(false);
                    setStartSelected(false);
                    setStartDate(initialStartDate);
                    setEndDate(initialEndDate);
                    setReason('');
                    setTotalDaysCount(0);
                    setValue(null);
                  }}
                  style={{
                    marginTop: 15,
                    backgroundColor: Colors.grayishWhite,
                    paddingHorizontal: wp(8.6),
                    borderRadius: 200,
                    paddingVertical: hp(1.4),
                    opacity:
                      !startDate.startDateObj &&
                      !endDate.endDateObj &&
                      reason?.trim().length === 0 &&
                      !value
                        ? 0.5
                        : 1,
                  }}>
                  <View>
                    <Text
                      style={{
                        color: Colors.black,
                        textAlign: 'center',
                        fontSize: 17,
                      }}>
                      Clear
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    opacity: opacity,
                    marginTop: 15,
                    backgroundColor: Colors.lovelyPurple,
                    paddingHorizontal: wp(9.2),
                    borderRadius: 200,
                    paddingVertical: hp(1.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  disabled={
                    !startSelected ||
                    !endSelected ||
                    !value ||
                    reason?.trim().length === 0
                  }
                  onPress={onApplyWfh}>
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
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={styles.appliedView}>
          <Text style={styles.wfhHistoryText}>Work From Home History</Text>
        </View>
        <View style={styles.buttomView}>
          {wfhList?.length > 0 && (
            <View>
              {loading ? (
                <View style={{flex: 1}}>
                  <Loader />
                </View>
              ) : (
                <FlatList
                  style={{height: '100%'}}
                  showsVerticalScrollIndicator={false}
                  data={wfhList}
                  renderItem={renderListOfAppliedRequests}
                  keyExtractor={keyExtractor}
                />
                // <Text>hh</Text>
              )}
            </View>
          )}

          {!loading && wfhList?.length == 0 && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.RobotoMedium,
                  fontSize: 16,
                  color: Colors.lightBlue,
                  marginVertical: 4,
                }}>
                You don't have any WFH.
              </Text>
            </View>
          )}
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

const keyExtractor = item => Math.random() * Math.random();

const renderListOfAppliedRequests = ({item}) => {
  const options = {month: 'short', day: '2-digit', year: 'numeric'};

  const formattedStartDate = new Date(item?.fromDate)?.toLocaleDateString(
    'en-US',
    options,
  );

  const formattedEndDate = new Date(item?.toDate)?.toLocaleDateString(
    'en-US',
    options,
  );

  const appliedDate = new Date(item?.postingDate)?.toLocaleDateString(
    'en-US',
    options,
  );

  return (
    <View style={styles.request} key={item.leaveApplicationId}>
      <View style={styles.appliedRequestsLeft}>
        <View
          style={{
            alignItems: 'center',
            marginRight: wp(4),
          }}>
          <Text style={{fontSize: 25, fontFamily: FontFamily.RobotoLight}}>
            {item?.totalLeaveDays <= 9 && Number.isInteger(item?.totalLeaveDays)
              ? '0'
              : null}
            {item?.totalLeaveDays}
          </Text>
          <Text style={{fontSize: 12, fontFamily: FontFamily.RobotoMedium}}>
            {item?.totalLeaveDays > 1 ? 'Days' : 'Day'}
          </Text>
        </View>
        <View style={{marginLeft: 20, marginTop: 4}}>
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
          </View>
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {item.status?.toLowerCase() === 'open' ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <PendingIcon
              fill={Colors.gold}
              height={20}
              width={20}
              marginBottom={4}
            />
            <Text style={{fontSize: 12, color: Colors.gold}}>Pending</Text>
          </View>
        ) : item.status?.toLowerCase() === 'dismissed' ||
          item.status?.toLowerCase() === 'rejected' ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <RejectedIcon
              fill={Colors.darkBrown}
              height={20}
              width={20}
              marginBottom={4}
            />
            <Text style={{fontSize: 12, color: Colors.darkBrown}}>
              {item.status}
            </Text>
          </View>
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ApprovedIcon
              fill={Colors.darkLovelyGreen}
              height={20}
              width={20}
              marginBottom={4}
            />
            <Text style={{fontSize: 12, color: Colors.darkLovelyGreen}}>
              {item.status || 'Approved'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ApplyWFH;
