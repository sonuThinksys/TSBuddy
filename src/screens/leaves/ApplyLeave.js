import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import jwt_decode from 'jwt-decode';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import styles from './ApplyLeaveStyle';

import {
  leaveTypes,
  newDropDownOptions,
  approver,
  none,
} from 'utils/defaultData';

import {
  applyForLeave,
  applyForUpdateedLeave,
  getLeaveApprovers,
  getResourseLeaveDetails,
  updateLeaveStatus,
} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {guestProfileData} from 'guestData';
// import {TouchableHighlight} from 'react-native-gesture-handler';

const ApplyLeave = ({navigation, route}) => {
  const {leavesData} = route.params;
  const {openLeavesCount} = route?.params || {};
  const {isGuestLogin: isGuestLogin} = useSelector(state => state.auth);
  const dateOptions = {day: 'numeric', month: 'short', year: 'numeric'};
  const fromResource = route?.params?.fromResource || false;
  const fromOpenLeave = route?.params?.fromOpenLeave || false;
  const [isEditOpenleave, setIsEditOpenleave] = useState(false);

  const resourceData = route?.params;
  const openLeaveData = route?.params;
  const resourceEmployeeID = resourceData?.employeeId;
  const postingDateObj = new Date(resourceData?.postingDate);
  const toDateObj = new Date(resourceData?.toDate);
  const fromDateObj = new Date(resourceData?.fromDate);

  const openLeavFromDateObj = new Date(openLeaveData?.fromDate);
  const openLeaveToDateObj = new Date(openLeaveData?.toDate);
  const openLeaveType = openLeaveData?.leaveType;
  const openLeaveNumberOfDays = openLeaveData?.totalLeaveDays;
  const openLeavePostingDateObj = new Date(openLeaveData?.postingDate);
  const openLeavehalfDay = openLeaveData?.halfDay;
  const openLeaveReason = openLeaveData?.description;
  const openLeaveApprover = openLeaveData?.managerInfoDto?.employeeName;
  const openLeaveApplicationId = openLeaveData?.leaveApplicationId;
  const fiscalYear = openLeaveData?.fiscalYear;
  const openLeaveApproverEmail = openLeaveData?.leaveApprover;

  const openLeaveFromDatestr = openLeavFromDateObj.toLocaleDateString(
    'en-US',
    dateOptions,
  );
  const openLeaveTooDatestr = openLeaveToDateObj.toLocaleDateString(
    'en-US',
    dateOptions,
  );

  const openLeavePostingDateStr = openLeavePostingDateObj.toLocaleDateString(
    'en-US',
    dateOptions,
  );

  const postingDateStr = postingDateObj?.toLocaleDateString(
    'en-US',
    dateOptions,
  );

  const fromDatestr = fromDateObj.toLocaleDateString('en-US', dateOptions);
  const toDatestr = toDateObj.toLocaleDateString('en-US', dateOptions);
  const resourceHalfDay = route?.params?.halfDay;

  const flatListRef = useRef(null);
  const dispatch = useDispatch();
  const {userToken: token} = useSelector(state => state.auth);
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id || '';

  const {
    leaveMenuDetails: {
      remainingLeaves: [earnedLeaves = {}, restrictedLeaves = {}],
    },
    holidayData,
  } = useSelector(state => state.home);

  const [fromCalenderVisible, setFromCalenderVisible] = useState(false);
  const [toCalenderVisible, setToCalenderVisible] = useState(false);
  const [fromDate, setFromDate] = useState({
    fromDateStr:
      openLeaveFromDatestr == 'Invalid Date' ? '' : openLeaveFromDatestr,
  });

  const [toDate, setToDate] = useState({
    toDateStr: openLeaveTooDatestr == 'Invalid Date' ? '' : openLeaveTooDatestr,
  });
  const [totalNumberOfLeaveDays, setTotalNumberOfLeaveDays] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({leaveType: 'Earned Leave'});
  const [halfDay, setHalfDay] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState(openLeaveReason || '');
  const [leaveApprovers, setLeaveApprovers] = useState('');
  const [openLeaveApprovers, setOpenLeaveApproovers] = useState(false);
  const [leaveApproversValue, setLeaveApproversValue] = useState(null);
  const [leaveApproversList, setLeaveApproversList] = useState([]);
  const [resourceLeaves, setResourceLeaves] = useState([]);

  const sameDateOrNot = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
  };

  useEffect(() => {
    if (fromResource) {
      (async () => {
        const empId = +resourceEmployeeID.match(/\d+/g)[0];
        const remainingLeaves = await dispatch(
          getResourseLeaveDetails({token, id: empId}),
        );
        setResourceLeaves(remainingLeaves?.payload);
      })();
    }

    (async () => {
      const leaveApprovers = token
        ? await dispatch(getLeaveApprovers({token, employeeID}))
        : [];
      setLeaveApprovers(leaveApprovers?.payload);
      const listOfLeaveApprovers = leaveApprovers.payload.map(approver => {
        return {
          value: approver.leaveApprover,
          label: approver.leaveApproverName,
        };
      });
      setLeaveApproversList(listOfLeaveApprovers);
    })();
  }, []);

  const leaves = [
    {
      leaveType: 'Earned Leave',
      allocated: isGuestLogin
        ? 15
        : fromResource
        ? resourceLeaves[0]?.totalLeavesAllocated
        : earnedLeaves?.totalLeavesAllocated,
      taken: isGuestLogin
        ? 7
        : fromResource
        ? resourceLeaves[0]?.currentLeaveApplied
        : earnedLeaves?.currentLeaveApplied,
      remaining: isGuestLogin
        ? 8
        : fromResource
        ? resourceLeaves[0]?.currentLeaveBalance
        : earnedLeaves?.currentLeaveBalance,
    },
    {
      leaveType: 'Restricted Holiday',
      allocated: isGuestLogin
        ? 1
        : fromResource
        ? resourceLeaves[1]?.totalLeavesAllocated
        : restrictedLeaves?.totalLeavesAllocated,
      taken: isGuestLogin
        ? 0
        : fromResource
        ? resourceLeaves[1]?.currentLeaveApplied
        : restrictedLeaves?.currentLeaveApplied,
      remaining: isGuestLogin
        ? 1
        : fromResource
        ? resourceLeaves[1]?.currentLeaveBalance
        : restrictedLeaves?.currentLeaveBalance,
    },
    {leaveType: 'Bereavement Leave', allocated: 0, taken: 0, remaining: 0},
    {leaveType: 'Compensatory Off', allocated: 0, taken: 0, remaining: 0},
    {leaveType: 'Maternity Leave', allocated: 0, taken: 0, remaining: 0},
    {leaveType: 'Paternity Leave', allocated: 0, taken: 0, remaining: 0},
    {leaveType: 'Work From Home', allocated: 0, taken: 0, remaining: 0},
  ];

  for (let i = 2; i < resourceLeaves.length; i++) {
    const leaveType = resourceLeaves[i]?.leaveType;

    const leaveToBeUpdated = leaves.find(
      leave => leave.leaveType.toLowerCase() === leaveType.toLowerCase(),
    );
    leaveToBeUpdated.leaveType = leaveType;
    leaveToBeUpdated.allocated = resourceLeaves[i]?.totalLeavesAllocated;
    leaveToBeUpdated.remaining = resourceLeaves[i]?.currentLeaveBalance;
    leaveToBeUpdated.taken = resourceLeaves[i]?.currentLeaveApplied;
  }

  const showFromDatePicker = () => {
    if (!isEditOpenleave && fromOpenLeave) {
    } else {
      setFromCalenderVisible(true);
    }
  };

  const showToDatePicker = () => {
    if (!isEditOpenleave && fromOpenLeave) {
    } else {
      setToCalenderVisible(true);
    }
  };

  const fromOnCancel = () => {
    setFromCalenderVisible(false);
  };

  const toOnCancel = () => {
    setToCalenderVisible(false);
  };

  function weekdayCount(startDate, endDate) {
    let dayCount = 0;

    const timeDiff = Math.abs(endDate?.getTime() - startDate?.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

    const presentDate = new Date(startDate);

    for (let i = 0; i < diffDays; i++) {
      const dayOfWeek = presentDate.getDay();

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dayCount++;
      }

      presentDate.setDate(presentDate.getDate() + 1);
    }

    return dayCount;
  }

  const fromCalenderConfirm = date => {
    if (date.getDay() === 0 || date.getDay() === 6) {
      // date.setDate(date.getDate() + 1);
      alert(
        'Please select a valid start date which should not fall on weekends.',
      );
      fromOnCancel();
      return;
    }
    for (let i = 0; i < holidayData.length; i++) {
      const holidayObj = new Date(holidayData[i].holidayDate);

      if (
        holidayObj.getMonth() === date.getMonth() &&
        date.getDate() === holidayObj.getDate()
      ) {
        alert('You can not take a leave on National holiday.');
        fromOnCancel();
        return;
      }
    }

    const presentDate = String(date.getDate()).padStart(2, '0');
    const presentMonth = date.toLocaleString('default', {month: 'short'});
    const presentYear = date.getFullYear();

    const finalTodayDate = `${presentDate}-${presentMonth}-${presentYear}`;

    if (toDate.toDateObj) {
      if (date > toDate.toDateObj) {
        alert('Please select From date which is not less than To date.');
        fromOnCancel();
        return;
      }
      // const diffInMs = toDate.toDateObj.getTime() - date.getTime();
      // const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;
      // =================================================================

      const toDateMS = toDate.toDateObj.getTime();
      const fromDateMS = date.getTime();
      const diffInMS = toDateMS - fromDateMS;

      const totalWeekdays = Math.round(weekdayCount(date, toDate.toDateObj));

      if (totalWeekdays > 5) {
        const numberOfLeaveDays =
          Math.ceil(diffInMS / (24 * 60 * 60 * 1000)) + 1;
        setTotalNumberOfLeaveDays(numberOfLeaveDays);
        setFromDate({fromDateObj: date, fromDateStr: finalTodayDate});
        fromOnCancel();
        return;
      }

      // =================================================================

      setTotalNumberOfLeaveDays(totalWeekdays);
      setFromDate({fromDateObj: date, fromDateStr: finalTodayDate});
    } else {
      setFromDate({fromDateObj: date, fromDateStr: finalTodayDate});
    }

    fromOnCancel();
  };

  const toCalenderConfirm = date => {
    if (date.getDay() === 0 || date.getDay() === 6) {
      // date.setDate(date.getDate() + 1);
      alert(
        'Please select a valid end date which should not fall on weekends.',
      );
      toOnCancel();
      return;
    }

    for (let i = 0; i < holidayData.length; i++) {
      const holidayObj = new Date(holidayData[i].holidayDate);

      if (
        holidayObj.getMonth() === date.getMonth() &&
        date.getDate() === holidayObj.getDate()
      ) {
        alert('You can not take a leave on National holiday.');
        toOnCancel();
        return;
      }
    }

    if (fromDate?.fromDateObj) {
      if (fromDate?.fromDateObj > date) {
        toOnCancel();
        alert('Please select To date which is same or greater than From date.');
        toOnCancel();
        return;
      }
    }

    const presentDate = String(date.getDate()).padStart(2, '0');
    const presentMonth = date.toLocaleString('default', {month: 'short'});
    const presentYear = date.getFullYear();

    const finalTodayDate = `${presentDate}-${presentMonth}-${presentYear}`;

    const toDateMS = date.getTime();
    const fromDateMS = fromDate.fromDateObj.getTime();
    const diffInMS = toDateMS - fromDateMS;

    const totalWeekdays = weekdayCount(fromDate.fromDateObj, date);

    if (totalWeekdays > 5) {
      const numberOfLeaveDays = Math.ceil(diffInMS / (24 * 60 * 60 * 1000)) + 1;
      setTotalNumberOfLeaveDays(numberOfLeaveDays);
      setToDate({toDateObj: date, toDateStr: finalTodayDate});
      toOnCancel();
      return;
    }

    setTotalNumberOfLeaveDays(totalWeekdays);

    setToDate({toDateObj: date, toDateStr: finalTodayDate});
    toOnCancel();
  };

  const today = new Date();
  const presentDate = String(today.getDate()).padStart(2, '0');
  const presentMonth = today.toLocaleString('default', {month: 'short'});
  const presentYear = today.getFullYear();

  const finalTodayDate = `${presentDate}-${presentMonth}-${presentYear}`;

  const card = ({
    leftLabel,
    rightLabel,
    selectableLeft,
    selectableRight,
    leftText,
    rightText,
    iconLeft,
    iconRight,
    leftOnPress,
    rightOnPress,
    rightDropdown,
    leftDropdown,
    zIndex,
    resourseRightText,
    rightDisabled = false,
  }) => {
    return (
      <View style={[styles.fromToContainer, {zIndex}]}>
        {!fromResource && leftDropdown ? (
          <View style={styles.fromContainer}>
            <Text style={styles.fromText}>{leftLabel}</Text>
            {leftDropdown}
          </View>
        ) : (
          <View style={styles.fromContainer}>
            <Text style={styles.fromText}>{leftLabel}</Text>
            <View
              style={[
                styles.calenderContainer,
                !leftText && {justifyContent: 'flex-end'},
              ]}>
              {leftText ? <Text>{leftText}</Text> : null}
              {!fromResource && selectableLeft ? (
                <TouchableOpacity disabled={fromResource} onPress={leftOnPress}>
                  <Image source={iconLeft} style={{height: 20, width: 20}} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        )}
        {rightDropdown ? (
          <View style={[styles.toContainer, {zIndex: 1000}]}>
            <Text style={styles.toText}>{rightLabel}</Text>
            {rightDropdown}
          </View>
        ) : (
          <View style={styles.toContainer}>
            <Text style={styles.toText}>{rightLabel}</Text>
            <View
              style={[
                styles.calenderContainer,
                !rightText && !fromResource && {justifyContent: 'flex-end'},
              ]}>
              {rightText && !fromResource && <Text>{rightText}</Text>}
              {fromResource && resourseRightText ? (
                <Text>{resourseRightText}</Text>
              ) : null}
              {selectableRight && !fromResource && (
                <TouchableOpacity
                  disabled={fromResource || rightDisabled}
                  onPress={rightOnPress}>
                  <Image source={iconRight} style={{height: 20, width: 20}} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  const leaveCard = (data, index) => {
    const {leaveType, allocated, taken, remaining} = data;
    let checkSelected = data.leaveType == selectedCard.leaveType;
    return (
      <View
        style={{
          ...styles.leaveCard,
          backgroundColor: checkSelected ? 'green' : 'white',
        }}>
        <View
          style={{
            ...styles.leaveTextContainer,
            borderBottomColor: checkSelected ? Colors.white : Colors.black,
          }}>
          <Text
            style={{
              ...styles.leaveText,
              color: checkSelected ? Colors.white : Colors.black,
            }}>
            {data.leaveType}
          </Text>
        </View>
        <View style={styles.bottomPart}>
          <View
            style={{
              ...styles.remainingContainer,
              backgroundColor: Colors.white,
            }}>
            <Text style={styles.remainingText}>{data.remaining}</Text>
          </View>
          <View
            style={{
              ...styles.verticalLine,
              borderColor: checkSelected ? Colors.white : Colors.black,
            }}
          />
          <View style={styles.leaveDetails}>
            <View style={styles.allocated}>
              <Text
                style={{
                  ...styles.allocatedText,
                  color: checkSelected ? Colors.white : Colors.black,
                }}>
                Allocated: {data.allocated}
              </Text>
            </View>
            <View style={styles.taken}>
              <Text
                style={{
                  ...styles.takenText,
                  color: checkSelected ? Colors.white : Colors.black,
                }}>
                Taken: {data.taken}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const sliderComponent = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={{flexGrow: 1}}
          style={{
            backgroundColor: Colors.darkBlue,
            // height: hp(10),
            paddingHorizontal: wp(2.4),
            paddingVertical: hp(1.2),
            flex: 1,
          }}
          horizontal={true}
          data={leaves}
          renderItem={({item, index}) => {
            return leaveCard(item, index);
            // <View style={styles.sliderComp}>
            //   <Text style={{color: Colors.white}}>
            //     {item}einnsifugvlfd;nfnliThe
            //   </Text>
            // </View>
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  };

  const renderRow = (rowData, rowID, highlighted) => {
    return (
      <View
        style={[
          styles.row,
          {borderBottomColor: Colors.lightGray, borderBottomWidth: 1},
          highlighted && styles.highlighted,
        ]}>
        <Text style={[styles.rowText]}>{rowData}</Text>
      </View>
    );
  };

  const giveReason = value => {
    setReason(value);
  };

  const renderRightComponentResource = () => <View></View>;

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

  const renderButtonText = option => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16}}>{option}</Text>
      </View>
    );
  };

  const applyLeave = async () => {
    if (!fromDate.fromDateObj || !toDate.toDateObj) {
      alert('Please select dates for which you want to apply for a leave.');
      return;
    }

    if (!reason) {
      alert('Please enter a reason for applying for a leave.');
      return;
    }

    if (!leaveType) {
      alert('Please select a leave type.');
      return;
    }

    if (totalNumberOfLeaveDays === 0) {
      alert('You can not apply leave on Weekends.');
      return;
    }
    if (totalNumberOfLeaveDays < 0.5) {
      alert('Difference between the number of leave days must be positive.');
      return;
    }

    for (let i = 0; i < leavesData.length; i++) {
      let {fromDate: startDate1, toDate: endDate1} = leavesData[i];
      startDate1 = new Date(startDate1);
      endDate1 = new Date(endDate1);
      const startDate2 = fromDate.fromDateObj;
      const endDate2 = toDate.toDateObj;

      if (
        (startDate1 >= startDate2 && endDate2 >= startDate1) ||
        (startDate2 >= startDate1 && startDate2 <= endDate1)
      ) {
        alert('Leaves are already applied to these dates.');
        return;
      }

      if (
        startDate1.toDateString() === startDate2.toDateString() ||
        startDate1.toDateString() === endDate2.toDateString() ||
        startDate2.toDateString() === startDate1.toDateString() ||
        startDate2.toDateString() === endDate1.toDateString()
      ) {
        alert('Leaves are already applied to these dates.');
        return;
      }
    }

    if (leaveType.toLowerCase() === 'earned leave') {
      const positiveDays = openLeavesCount?.earnedOpen + totalNumberOfLeaveDays;

      if (positiveDays > earnedLeaves?.currentLeaveBalance) {
        alert(
          'You either run out of leave balance or you already opened remaining leaves.',
        );
        return;
      }
    }

    if (leaveType.toLowerCase() === 'restricted holiday') {
      const positiveDays = openLeavesCount?.rhOpen + totalNumberOfLeaveDays;
      if (positiveDays > restrictedLeaves?.currentLeaveBalance) {
        alert(
          'You either run out of leave balance or you already opened remaining leaves.',
        );
        return;
      }
    }

    // =========================================================================

    const leaveApproverMailID =
      leaveApprovers.length === 1
        ? leaveApprovers[0].leaveApprover
        : leaveApproversValue;

    if (!leaveApproverMailID) {
      alert('Please Select a Leave Approver.');
      return;
    }

    // =========================================================================

    setLoading(true);

    const appliedLeave =
      token &&
      (await dispatch(
        applyForLeave({
          token,
          body: {
            employeeId: employeeID,
            fromDate: fromDate.fromDateObj,
            toDate: toDate.toDateObj,
            totalLeaveDays: totalNumberOfLeaveDays,
            description: reason,
            halfDay: 0,
            postingDate: new Date(),
            leaveType: leaveType,
            leaveApprover: leaveApproverMailID,
            fiscalYear: fiscalYear,
          },
        }),
      ));

    setLoading(false);
    if (appliedLeave?.error) {
      alert(appliedLeave.error.message);
    } else {
      Alert.alert('Success', 'Leave applied successfully!', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  const applyUpdatedLeave = async () => {
    if (!fromDate.fromDateObj || !toDate.toDateObj) {
      alert('Please select dates for which you want to apply for a leave.');
      return;
    }

    if (!reason) {
      alert('Please enter a reason for applying for a leave.');
      return;
    }

    if (!leaveType) {
      alert('Please select a leave type.');
      return;
    }

    if (totalNumberOfLeaveDays < 0.5) {
      alert('Difference between the number of leave days must be positive.');
      return;
    }
    setLoading(true);
    const appliedLeave =
      token &&
      (await dispatch(
        applyForUpdateedLeave({
          token,
          body: {
            leaveApplicationId: openLeaveApplicationId,
            employeeId: employeeID,
            fromDate: fromDate.fromDateObj,
            toDate: toDate.toDateObj,
            halfDay: 0,
            leaveType: openLeaveType,
            totalLeaveDays: openLeaveNumberOfDays,
            description: openLeaveReason,
            postingDate: new Date(),
            leaveApprover: openLeaveApproverEmail,
          },
        }),
      ));

    setLoading(false);
    if (appliedLeave?.error) {
      alert(appliedLeave.error.message);
    } else {
      Alert.alert('Success', 'Leave Updated successfully!', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };
  const finalizeLeave = async status => {
    const empId = +employeeID.match(/\d+/g)[0];

    const response =
      token &&
      (await dispatch(
        updateLeaveStatus({
          token,
          body: {
            employeeId: empId,
            leaveApplicationId: openLeaveApplicationId,
            status: status,
            leaveType: openLeaveType,
          },
        }),
      ));

    setLoading(false);
    if (response?.error) {
      // alert(response?.error?.message);
      Alert.alert('Failed', `Leave ${status} failed!`, [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } else {
      Alert.alert('Success', `Leave ${status} successfully!`, [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  const onSelectLeaveApprover = selectedOption => {};

  const dateAfter6Months = new Date();
  dateAfter6Months.setMonth(new Date().getMonth() + 6);

  const handleLeaveApply = () => {
    isEditOpenleave ? applyUpdatedLeave() : applyLeave();
  };

  return (
    // <KeyboardAvoidingView behavior="height" style={styles.mainContainer}>
    <View style={{flex: 1}}>
      <View style={styles.swiperContainer}>{sliderComponent()}</View>
      <View
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{
          justifyContent: 'space-between',

          flexGrow: 1,
        }}>
        <View style={styles.mainPart}>
          <View style={[styles.formContainer]}>
            <ScrollView>
              {card({
                leftLabel: 'From',
                rightLabel: 'To',
                selectableLeft: true,
                selectableRight: true,
                iconLeft: MonthImages.CalenderIcon,
                iconRight: MonthImages.CalenderIcon,
                leftOnPress: showFromDatePicker,
                rightOnPress: showToDatePicker,
                leftText: isEditOpenleave
                  ? fromDate.fromDateStr
                  : fromOpenLeave
                  ? openLeaveFromDatestr
                  : fromDate.fromDateStr,
                rightText: isEditOpenleave
                  ? toDate.toDateStr
                  : fromOpenLeave
                  ? openLeaveTooDatestr
                  : toDate.toDateStr,
                zIndex: 1000,
                resourseRightText: toDatestr,
                rightDisabled: !fromDate.fromDateObj,
              })}
              {card({
                zIndex: 1000,
                leftLabel: 'Created Date',
                rightLabel: 'Half Day',
                selectableRight: true,
                leftText: isEditOpenleave
                  ? finalTodayDate
                  : fromResource
                  ? postingDateStr
                  : fromOpenLeave
                  ? openLeavePostingDateStr
                  : finalTodayDate,
                iconRight: MonthImages.DropDownIcon,
                rightText: 'None',
                rightDropdown: (
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
                          ? 'None'
                          : resourceHalfDay === 1
                          ? 'First Half'
                          : 'Second Half'
                      }
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
                      }}
                      renderRightComponent={
                        !fromResource
                          ? renderRightComponent
                          : renderRightComponentResource
                      }
                    />
                  </View>
                ),
              })}
              {card({
                zIndex: 1000,
                leftLabel: 'Leave Type',
                rightLabel: 'Number of Days',
                selectableLeft: true,
                iconLeft: MonthImages.DropDownIcon,
                rightText:
                  totalNumberOfLeaveDays >= 0.5
                    ? totalNumberOfLeaveDays
                    : fromOpenLeave
                    ? openLeaveNumberOfDays
                    : '',
                leftText: fromResource
                  ? resourceData.leaveType
                  : fromOpenLeave
                  ? openLeaveType
                  : 'Earned Leave',
                resourseRightText: resourceData?.totalLeaveDays,
                leftDropdown: (
                  // <View>
                  <ModalDropdown
                    disabled={
                      fromResource || (!isEditOpenleave && fromOpenLeave)
                    }
                    style={{
                      borderWidth: 1,
                      backgroundColor: Colors.white,
                      borderRadius: 3,
                      paddingVertical: 5,
                      height: 32,
                    }}
                    dropdownTextHighlightStyle={{color: Colors.white}}
                    isFullWidth={true}
                    showsVerticalScrollIndicator={false}
                    defaultValue={
                      fromResource
                        ? resourceData.leaveType
                        : fromOpenLeave
                        ? openLeaveType
                        : ''
                    }
                    options={leaveTypes}
                    dropdownStyle={{
                      width: '45%',
                      paddingLeft: 6,
                    }}
                    animated={true}
                    renderRow={renderRow}
                    onSelect={(index, itemName) => {
                      const itemIndex = leaves.findIndex(
                        item => item.leaveType === itemName,
                      );
                      flatListRef.current?.scrollToIndex({
                        animated: true,
                        index: index,
                        viewPosition: 0.5,
                      });
                      setSelectedCard({leaveType: itemName});
                      setLeaveType(itemName);
                    }}
                    renderRightComponent={renderRightComponent}
                  />
                  // </View>
                ),
              })}
              <DateTimePickerModal
                maximumDate={dateAfter6Months}
                isVisible={fromCalenderVisible}
                mode="date"
                onConfirm={fromCalenderConfirm}
                onCancel={fromOnCancel}
              />
              <DateTimePickerModal
                maximumDate={dateAfter6Months}
                isVisible={toCalenderVisible}
                mode="date"
                onConfirm={toCalenderConfirm}
                onCancel={toOnCancel}
              />
              <View style={styles.reasonContainer}>
                <Text style={styles.reasonText}>Reason</Text>
                {isEditOpenleave ? (
                  <TextInput
                    onChangeText={giveReason}
                    multiline={true}
                    style={styles.reasonTextInput}
                    value={reason}
                  />
                ) : fromResource ? (
                  <Text style={styles.resourceReasonText}>
                    {resourceData?.description}
                  </Text>
                ) : fromOpenLeave ? (
                  <Text style={styles.resourceReasonText}>
                    {openLeaveReason}
                  </Text>
                ) : (
                  <TextInput
                    onChangeText={giveReason}
                    multiline={true}
                    style={styles.reasonTextInput}
                  />
                )}
              </View>
            </ScrollView>
            <View style={styles.leaveApproverContainer}>
              <Text style={styles.leaveApproverText}>Leave Approver:</Text>
              {isEditOpenleave ? (
                leaveApprovers?.length === 1 ? (
                  <Text style={styles.leaveApproverName}>
                    {leaveApprovers[0]?.leaveApproverName}
                  </Text>
                ) : (
                  <View>
                    <View>
                      <DropDownPicker
                        placeholder={'Select....'}
                        open={openLeaveApprovers}
                        value={leaveApproversValue}
                        items={leaveApproversList}
                        setOpen={setOpenLeaveApproovers}
                        setValue={setLeaveApproversValue}
                        setItems={setLeaveApproversList}
                        onSelectItem={onSelectLeaveApprover}
                        containerStyle={{width: wp(50)}}
                        style={{borderRadius: 4}}
                      />
                    </View>
                  </View>
                )
              ) : fromResource ? (
                <Text style={styles.leaveApproverName}>
                  {resourceData.leaveApproverName}
                </Text>
              ) : fromOpenLeave ? (
                <Text style={styles.leaveApproverName}>
                  {openLeaveApprover}
                </Text>
              ) : isGuestLogin ? (
                <Text style={styles.leaveApproverName}>
                  {guestProfileData?.managerInfoDto?.employeeName}
                </Text>
              ) : leaveApprovers?.length === 1 ? (
                <Text style={styles.leaveApproverName}>
                  {leaveApprovers[0]?.leaveApproverName}
                </Text>
              ) : (
                <View>
                  <View>
                    <DropDownPicker
                      placeholder={'Select....'}
                      open={openLeaveApprovers}
                      value={leaveApproversValue}
                      items={leaveApproversList}
                      setOpen={setOpenLeaveApproovers}
                      setValue={setLeaveApproversValue}
                      setItems={setLeaveApproversList}
                      onSelectItem={onSelectLeaveApprover}
                      containerStyle={{width: wp(50)}}
                      style={{borderRadius: 4}}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>

          {fromResource ? (
            <View style={styles.resourceButtonContainer}>
              <Pressable
                style={styles.resourceButton}
                onPress={finalizeLeave.bind(null, 'Dismissed')}>
                <Text style={styles.applyText}>Dismiss</Text>
              </Pressable>
              <Pressable
                style={styles.resourceButton}
                onPress={finalizeLeave.bind(null, 'Rejected')}>
                <Text style={styles.applyText}>Reject</Text>
              </Pressable>
              <Pressable
                style={styles.resourceButton}
                onPress={finalizeLeave.bind(null, 'Approved')}>
                <Text style={styles.applyText}>Approve</Text>
              </Pressable>
            </View>
          ) : isEditOpenleave ? (
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={handleLeaveApply}>
                <Text style={styles.applyText}>Apply</Text>
              </Pressable>
            </View>
          ) : fromOpenLeave ? (
            <View style={styles.resourceButtonContainer}>
              <Pressable
                style={styles.resourceButton}
                onPress={finalizeLeave.bind(null, 'Dismissed')}>
                <Text style={styles.applyText}>Dismiss</Text>
              </Pressable>
              <Pressable
                style={styles.resourceButton}
                onPress={() => {
                  setIsEditOpenleave(true);
                }}>
                <Text style={styles.applyText}>Edit</Text>
              </Pressable>
              <Pressable
                style={styles.resourceButton}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={styles.applyText}>Cancel</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={applyLeave}>
                <Text style={styles.applyText}>Apply</Text>
              </Pressable>
            </View>
          )}
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <View style={styles.loaderBackground} />
            <ActivityIndicator size="large" />
          </View>
        ) : null}
      </View>
    </View>
    // </KeyboardAvoidingView>
  );
};

export default ApplyLeave;

// http://10.101.23.48:81/api/Leave/GetLeaveApprover?empId=10876
