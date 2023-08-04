import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
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
  // leaveTypes,
  newDropDownOptions,
  approver,
  none,
  firstFalf,
  secondHalf,
} from 'utils/defaultData';

import {
  applyForLeave,
  applyForUpdateedLeave,
  getEmployeeShift,
  getFinalizedLeaveDays,
  getLeaveApprovers,
  getResourseLeaveDetails,
  updateLeaveStatus,
} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {guestProfileData} from 'guestData';
import CustomHeader from 'navigation/CustomHeader';

const ApplyLeave = ({navigation, route}) => {
  console.log('routeee:', route.params);
  const {employeeProfile: empProfileData = {}} = useSelector(
    state => state.home,
  );

  const userGender = empProfileData.gender;

  function getMonthIndex(shortForm) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const index =
      months.findIndex(
        month => month.toLowerCase() === shortForm?.toLowerCase(),
      ) + 1;
    return index;
  }

  const {
    leavesData,
    isLeaveDataLoading: {isLoading},
  } = useSelector(state => state.home);

  const {openLeavesCount} = route?.params || {};
  const {isGuestLogin: isGuestLogin} = useSelector(state => state.auth);
  const dateOptions = {day: 'numeric', month: 'short', year: 'numeric'};
  const fromResource = route?.params?.fromResource || false;
  const fromWfh = route?.params?.fromWfh;

  const fromOpenLeave = route?.params?.fromOpenLeave || false;
  const resourceEmployeeID = route?.params?.resourceEmployeeID || false;
  const [isEditOpenleave, setIsEditOpenleave] = useState(false);

  const resourceData = route?.params;
  const openLeaveData = route?.params;
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

  const currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  const fiscalYear = `${currentYear}-${new Date().getFullYear() + 1}`;

  if (currentMonth < 3) {
    fiscalYear = `${currentYear - 1} - ${new Date().getFullYear()}`;
  }

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
    leaveMenuDetails: {remainingLeaves: allRemainingLeaves},
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
  const [selectedCard, setSelectedCard] = useState({leaveType: ''});
  const [halfDay, setHalfDay] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState(openLeaveReason || '');
  const [leaveApprovers, setLeaveApprovers] = useState('');
  const [openLeaveApprovers, setOpenLeaveApproovers] = useState(false);
  const [leaveApproversValue, setLeaveApproversValue] = useState(null);
  const [leaveApproversList, setLeaveApproversList] = useState([]);
  const [resourceLeaves, setResourceLeaves] = useState([]);
  const [employeeWeekOffs, setEmployeeWeekOffs] = useState([]);

  const sameDateOrNot = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
  };

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity
  //         onPress={() => {
  //           navigation.goBack();
  //         }}>
  //         <View>
  //           <Image style={styles.downloadBTN} source={MonthImages.backArrowS} />
  //         </View>
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation]);

  useEffect(() => {
    if (fromResource || fromWfh) {
      (async () => {
        const empId = +resourceEmployeeID.match(/\d+/g)[0];
        const remainingLeaves = await dispatch(
          getResourseLeaveDetails({token, id: empId}),
        );
        setResourceLeaves(remainingLeaves?.payload);
      })();
    }

    if (!isGuestLogin) {
      (async () => {
        try {
          const leaveApprovers = token
            ? await dispatch(getLeaveApprovers({token, employeeID}))
            : [];
          setLeaveApprovers(leaveApprovers?.payload);
          if (!leaveApprovers.payload) {
            alert('Cannot fetch Leave Approvers. Kindly try later.');
          }
          const listOfLeaveApprovers = leaveApprovers.payload.map(approver => {
            return {
              value: approver.leaveApprover,
              label: approver.leaveApproverName,
            };
          });
          setLeaveApproversList(listOfLeaveApprovers);
        } catch (err) {
          console.log('errMap:', err);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (!isGuestLogin) {
      (async () => {
        try {
          const employeeShift = await dispatch(
            getEmployeeShift({token, id: employeeID}),
          );
          const weekOffs = employeeShift?.payload?.weeklyOff.split('_');

          const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const finalWeekOffs = [];
          daysOfWeek.map((el, index) => {
            if (weekOffs.includes(el)) finalWeekOffs.push(index);
          });
          setEmployeeWeekOffs(finalWeekOffs);
        } catch (err) {
          alert('Cannot fetch weekoffs for you. Kindly try later.');
        }
      })();
    }
  }, []);

  const leaves = [
    {
      leaveType: allRemainingLeaves[0]?.leaveType || 'Earned Leave',
      allocated: isGuestLogin
        ? 15
        : fromResource || fromWfh
        ? resourceLeaves[0]?.totalLeavesAllocated
        : allRemainingLeaves[0]?.totalLeavesAllocated || 0,
      taken: isGuestLogin
        ? 7
        : fromResource || fromWfh
        ? resourceLeaves[0]?.currentLeaveApplied
        : allRemainingLeaves[0]?.currentLeaveApplied || 0,
      remaining: isGuestLogin
        ? 8
        : fromResource || fromWfh
        ? resourceLeaves[0]?.currentLeaveBalance
        : allRemainingLeaves[0]?.currentLeaveBalance || 0,
    },
    {
      leaveType: allRemainingLeaves[1]?.leaveType || 'Restricted Holiday',
      allocated: isGuestLogin
        ? 1
        : fromResource || fromWfh
        ? resourceLeaves[1]?.totalLeavesAllocated || 0
        : allRemainingLeaves[1]?.totalLeavesAllocated || 0,
      taken: isGuestLogin
        ? 0
        : fromResource || fromWfh
        ? resourceLeaves[1]?.currentLeaveApplied || 0
        : allRemainingLeaves[1]?.currentLeaveApplied || 0,
      remaining: isGuestLogin
        ? 1
        : fromResource || fromWfh
        ? resourceLeaves[1]?.currentLeaveBalance || 0
        : allRemainingLeaves[1]?.currentLeaveBalance || 0,
    },
    {
      leaveType: allRemainingLeaves[2]?.leaveType || 'Compensatory Off',
      allocated: isGuestLogin
        ? 1
        : fromResource || fromWfh
        ? resourceLeaves[2]?.totalLeavesAllocated || 0
        : allRemainingLeaves[2]?.totalLeavesAllocated || 0,
      taken: isGuestLogin
        ? 0
        : fromResource || fromWfh
        ? resourceLeaves[2]?.currentLeaveApplied || 0
        : allRemainingLeaves[2]?.currentLeaveApplied || 0,
      remaining: isGuestLogin
        ? 1
        : fromResource || fromWfh
        ? resourceLeaves[2]?.currentLeaveBalance || 0
        : allRemainingLeaves[2]?.currentLeaveBalance || 0,
    },
    {
      leaveType: allRemainingLeaves[3]?.leaveType || 'Bereavement Leave',
      allocated: isGuestLogin
        ? 1
        : fromResource || fromWfh
        ? resourceLeaves[3]?.totalLeavesAllocated || 0
        : allRemainingLeaves[3]?.totalLeavesAllocated || 0,
      taken: isGuestLogin
        ? 0
        : fromResource || fromWfh
        ? resourceLeaves[3]?.currentLeaveApplied || 0
        : allRemainingLeaves[3]?.currentLeaveApplied || 0,
      remaining: isGuestLogin
        ? 1
        : fromResource || fromWfh
        ? resourceLeaves[3]?.currentLeaveBalance || 0
        : allRemainingLeaves[3]?.currentLeaveBalance || 0,
    },
    // {
    //   leaveType: allRemainingLeaves[4]?.leaveType || 'Leave Without Pay',
    //   allocated: isGuestLogin
    //     ? 1
    //     : fromResource
    //     ? resourceLeaves[4]?.totalLeavesAllocated
    //     : allRemainingLeaves[4]?.totalLeavesAllocated || 0,
    //   taken: isGuestLogin
    //     ? 0
    //     : fromResource
    //     ? resourceLeaves[4]?.currentLeaveApplied
    //     : allRemainingLeaves[4]?.currentLeaveApplied || 0,
    //   remaining: isGuestLogin
    //     ? 1
    //     : fromResource
    //     ? resourceLeaves[4]?.currentLeaveBalance
    //     : allRemainingLeaves[4]?.currentLeaveBalance || 0,
    // },
    // {leaveType: 'Bereavement Leave', allocated: 0, taken: 0, remaining: 0},
    // {leaveType: 'Compensatory Off', allocated: 0, taken: 0, remaining: 0},
    // // {leaveType: 'Maternity Leave', allocated: 0, taken: 0, remaining: 0},
    // // {leaveType: 'Paternity Leave', allocated: 0, taken: 0, remaining: 0},
    {leaveType: 'Leave Without Pay', allocated: 0, taken: 0, remaining: 0},
    // {leaveType: 'Work From Home', allocated: 0, taken: 0, remaining: 0},
  ];

  const leaveTypes = [
    'Earned Leave',
    'Restricted Holiday',
    'Compensatory Off',
    'Bereavement Leave',
    // 'Maternity Leave',
    // 'Paternity Leave',
    'Leave Without Pay',
    // 'Work From Home',
  ];
  if (!fromResource) {
    const genderSpecificLeave = allRemainingLeaves.find(
      leave =>
        leave.leaveType === 'Maternity Leave' ||
        leave.leaveType === 'Paternity Leave',
    );

    let genderLeave;
    let leaveTypeAccordingToGender;
    const userGenderLowerCase = userGender?.toLowerCase();

    if (userGenderLowerCase === 'male') {
      genderLeave = {
        leaveType: 'Paternity Leave',
        allocated: genderSpecificLeave?.totalLeavesAllocated || 0,
        taken: genderSpecificLeave?.currentLeaveApplied || 0,
        remaining: genderSpecificLeave?.currentLeaveBalance || 0,
      };
      leaveTypeAccordingToGender = 'Paternity Leave';
    } else {
      genderLeave = {
        leaveType: 'Maternity Leave',
        allocated: genderSpecificLeave?.totalLeavesAllocated || 0,
        taken: genderSpecificLeave?.currentLeaveApplied || 0,
        remaining: genderSpecificLeave?.currentLeaveBalance || 0,
      };

      leaveTypeAccordingToGender = 'Maternity Leave';
    }

    leaveTypes.splice(4, 0, leaveTypeAccordingToGender);

    leaves.splice(4, 0, genderLeave);
  }

  for (let i = 2; i < resourceLeaves.length; i++) {
    const leaveType = resourceLeaves[i]?.leaveType;

    let leaveToBeUpdated = leaves?.find(
      leave => leave.leaveType.toLowerCase() === leaveType.toLowerCase(),
    );
    if (!leaveToBeUpdated) {
      leaveToBeUpdated = {};
      leaves?.splice(2, 0, leaveToBeUpdated);
    }
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

  const fromCalenderConfirm = async date => {
    fromOnCancel();

    if (employeeWeekOffs?.includes(date.getDay())) {
      alert('You already have a weekend holiday on this day.');
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

      const toDateMS = toDate.toDateObj.getTime();
      const fromDateMS = date.getTime();

      const toMonthIndex =
        getMonthIndex(toDate?.toDateStr?.split('-')[1]) < 10
          ? `0${getMonthIndex(toDate?.toDateStr?.split('-')[1])}`
          : getMonthIndex(toDate?.toDateStr?.split('-')[1]);

      const fromMonthIndex =
        getMonthIndex(finalTodayDate.split('-')[1]) < 10
          ? `0${getMonthIndex(finalTodayDate.split('-')[1])}`
          : getMonthIndex(finalTodayDate.split('-')[1]);

      let toDateStr = [...toDate?.toDateStr?.split('-')].reverse();
      toDateStr[1] = toMonthIndex;
      toDateStr = toDateStr.join('-');

      let fromDateStr = `${presentYear}-${fromMonthIndex}-${presentDate}`;

      try {
        setLoading(true);
        const totalOutputDays = await dispatch(
          getFinalizedLeaveDays({
            token,
            employeeId: employeeID,
            fromDate: fromDateStr,
            toDate: toDateStr,
          }),
        );

        const finalizedLeaveDays = totalOutputDays?.payload?.totalLeaveDays;
        const isSandwitching = totalOutputDays?.payload?.isSandwichApplicable;

        setTotalNumberOfLeaveDays(finalizedLeaveDays);
        setFromDate({fromDateObj: date, fromDateStr: finalTodayDate});
      } catch (err) {
        console.log('err:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setFromDate({fromDateObj: date, fromDateStr: finalTodayDate});
    }
  };

  const toCalenderConfirm = async date => {
    toOnCancel();

    // if (date.getDay() === 0 || date.getDay() === 6) {
    //   // date.setDate(date.getDate() + 1);
    //   alert(
    //     'Please select a valid end date which should not fall on weekends.',
    //   );
    //   toOnCancel();
    //   return;
    // }

    if (employeeWeekOffs?.includes(date.getDay())) {
      // date.setDate(date.getDate() + 1);
      alert('You already have a weekend holiday on this day.');
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

    // const toDateMS = date.getTime();
    // const fromDateMS = fromDate.fromDateObj.getTime();
    // const diffInMS = toDateMS - fromDateMS;

    // const tempDate = new Date(`${fromDate.fromDateStr.split('-')[1]} 1, 2000`);
    const fromMonthIndex =
      getMonthIndex(fromDate.fromDateStr.split('-')[1]) < 10
        ? `0${getMonthIndex(fromDate.fromDateStr.split('-')[1])}`
        : getMonthIndex(fromDate.fromDateStr.split('-')[1]);

    const toMonthIndex =
      getMonthIndex(finalTodayDate.split('-')[1]) < 10
        ? `0${getMonthIndex(finalTodayDate.split('-')[1])}`
        : getMonthIndex(finalTodayDate.split('-')[1]);

    let fromDateStr = [...fromDate?.fromDateStr?.split('-')].reverse();
    fromDateStr[1] = fromMonthIndex;
    fromDateStr = fromDateStr.join('-');

    let toDateStr = `${presentYear}-${toMonthIndex}-${presentDate}`;

    try {
      setLoading(true);
      const totalOutputDays = await dispatch(
        getFinalizedLeaveDays({
          token,
          employeeId: employeeID,
          fromDate: fromDateStr,
          toDate: toDateStr,
        }),
      );

      const finalizedLeaveDays = totalOutputDays?.payload?.totalLeaveDays;
      const isSandwitching = totalOutputDays?.payload?.isSandwichApplicable;
      setTotalNumberOfLeaveDays(finalizedLeaveDays);
      setToDate({toDateObj: date, toDateStr: finalTodayDate});
    } catch (err) {
      console.log('err:', err);
    } finally {
      setLoading(false);
    }

    // const totalWeekdays = weekdayCount(fromDate.fromDateObj, date);

    // if (totalWeekdays > 5) {
    //   const numberOfLeaveDays = Math.ceil(diffInMS / (24 * 60 * 60 * 1000)) + 1;
    //   setTotalNumberOfLeaveDays(numberOfLeaveDays);
    //   setToDate({toDateObj: date, toDateStr: finalTodayDate});
    //   toOnCancel();
    //   return;
    // }

    // setTotalNumberOfLeaveDays(totalWeekdays);
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
            backgroundColor: Colors.lighterBlue,
            paddingHorizontal: wp(2.4),
            paddingVertical: hp(1.2),
            flex: 1,
          }}
          horizontal={true}
          data={leaves}
          renderItem={({item, index}) => {
            return leaveCard(item, index);
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
      alert('Please select dates for which you want to apply a leave.');
      return;
    }

    if (!reason) {
      alert('Please enter a reason for applying a leave.');
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

    for (let i = 0; i < leavesData?.length; i++) {
      let {fromDate: startDate1, toDate: endDate1} = leavesData[i];
      startDate1 = new Date(startDate1);
      endDate1 = new Date(endDate1);
      const startDate2 = fromDate.fromDateObj;
      const endDate2 = toDate.toDateObj;

      if (
        (startDate1 >= startDate2 && endDate2 >= startDate1) ||
        (startDate2 >= startDate1 && startDate2 <= endDate1)
      ) {
        if (
          leavesData[i].status?.toLowerCase() === 'open' ||
          leavesData[i].status?.toLowerCase() === 'approved'
        ) {
          alert('Leaves are already applied to these dates.');
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
          leavesData[i].status?.toLowerCase() === 'open' ||
          leavesData[i].status?.toLowerCase() === 'approved'
        ) {
          alert('Leaves are already applied to these dates.');
          return;
        }
      }
    }

    if (leaveType?.toLowerCase() === 'earned leave') {
      const positiveDays = openLeavesCount?.earnedOpen + totalNumberOfLeaveDays;

      if (positiveDays > earnedLeaves?.currentLeaveBalance) {
        alert(
          'You either run out of leave balance or you already have opened remaining leaves.',
        );
        return;
      }
    }

    if (leaveType?.toLowerCase() === 'restricted holiday') {
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
            halfDay:
              (halfDay === firstFalf || halfDay === secondHalf) &&
              totalNumberOfLeaveDays === 0.5
                ? 1
                : 0,
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
    // let empId;

    // if (fromResource) {
    //   empId = +resourceEmployeeID.match(/\d+/g)[0];
    // } else {
    //   empId = employeeID;
    // }

    const empId = fromResource ? route?.params?.resourceEmployeeID : employeeID;
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

  const minimumDateLeaveApplication = new Date(
    `${new Date().getFullYear()}-${new Date().getMonth()}-25`,
  );

  const handleLeaveApply = () => {
    isEditOpenleave ? applyUpdatedLeave() : applyLeave();
  };

  return (
    // <KeyboardAvoidingView behavior="height" style={styles.mainContainer}>
    <>
      <CustomHeader
        showDrawerMenu={false}
        title={
          route?.params?.fromWfh || fromResource
            ? 'Leave Details'
            : 'Apply Leave'
        }
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
      />
      <SafeAreaView style={{flex: 1}}>
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
                          backgroundColor:
                            !fromDate.fromDateObj ||
                            !toDate.toDateObj ||
                            totalNumberOfLeaveDays > 1 ||
                            fromResource ||
                            (!isEditOpenleave && fromOpenLeave)
                              ? Colors.lightGray
                              : Colors.white,
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
                      isFullWidth={true}
                      showsVerticalScrollIndicator={false}
                      defaultValue={
                        fromResource
                          ? resourceData.leaveType
                          : fromOpenLeave
                          ? openLeaveType
                          : 'Select'
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
                  minimumDate={minimumDateLeaveApplication}
                  maximumDate={dateAfter6Months}
                  isVisible={fromCalenderVisible}
                  mode="date"
                  onConfirm={fromCalenderConfirm}
                  onCancel={fromOnCancel}
                />
                <DateTimePickerModal
                  minimumDate={minimumDateLeaveApplication}
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
                    {openLeaveData?.leaveApproverName}
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
                {/* <Pressable
                style={styles.resourceButton}
                onPress={() => {
                  setIsEditOpenleave(true);
                }}>
                <Text style={styles.applyText}>Edit</Text>
              </Pressable> */}
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
      </SafeAreaView>
    </>

    // </KeyboardAvoidingView>
  );
};

export default ApplyLeave;

// http://10.101.23.48:81/api/Leave/GetLeaveApprover?empId=10876
