import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import React, {useEffect, useRef, useState} from 'react';
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

import {widthPercentageToDP as wp} from 'utils/Responsive';
import styles from './ApplyLeaveStyle';

import {
  // leaveTypes,
  newDropDownOptions,
  none,
  firstFalf,
  secondHalf,
} from 'utils/defaultData';

import {
  applyForLeave,
  applyForUpdateedLeave,
  getEmployeeShift,
  getEmployeesByLeaveApprover,
  getFinalizedLeaveDays,
  getLeaveApprovers,
  getRemainingLeavesByEmpId,
  getResourseLeaveDetails,
  updateLeaveStatus,
} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {guestProfileData} from 'guestData';
import CustomHeader from 'navigation/CustomHeader';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
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
const invalidDate = 'Invalid Date';
const leaveApprFailFetch = 'Cannot fetch Leave Approvers. Kindly try later.';
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekoffsFetchFailed = 'Cannot fetch weekoffs for you. Kindly try later.';
const earnedLeave = 'Earned Leave';
const restrictedHoliday = 'Restricted Holiday';
const compensatoryHoliday = 'Compensatory Off';
const bereavementHoliday = 'Bereavement Leave';
const leaveWithoutPay = 'Leave Without Pay';
const maternityLeave = 'Maternity Leave';
const paternityLeave = 'Paternity Leave';

const ApplyLeave = ({navigation, route = {}, fromApproverEnd = false}) => {
  const {employeeProfile: empProfileData = {}} = useSelector(
    state => state.home,
  );

  const {employeeProfile: profileData = {}} = useSelector(state => state.home);
  // console.log('profileData:', profileData);

  const firstName = profileData?.firstName;
  const middleName = profileData?.middleName;
  const lastName = profileData?.lastName;

  const approverUserName = `${firstName ? firstName : ''} ${
    middleName ? middleName + ' ' : ''
  }${lastName ? lastName : ''}`;

  const userGender = empProfileData.gender;

  function getMonthIndex(shortForm) {
    const index =
      months.findIndex(
        month => month.toLowerCase() === shortForm?.toLowerCase(),
      ) + 1;
    return index;
  }

  const {leavesData} = useSelector(state => state.home);

  const {openLeavesCount} = route?.params || {};
  const {isGuestLogin: isGuestLogin} = useSelector(state => state.auth);
  const dateOptions = {day: 'numeric', month: 'short', year: 'numeric'};
  const fromResource = route?.params?.fromResource || false;
  const fromWfh = route?.params?.fromWfh;

  const fromOpenLeave = route?.params?.fromOpenLeave || false;
  const resourceEmployeeID = route?.params?.resourceEmployeeID || false;
  let isEditOpenleave = false;
  // const [isEditOpenleave, setIsEditOpenleave] = useState(false);

  const resourceData = route?.params;
  const openLeaveData = route?.params;
  const postingDateObj = new Date(resourceData?.postingDate);
  const toDateObj = new Date(resourceData?.toDate);

  const openLeavFromDateObj = new Date(openLeaveData?.fromDate);
  const openLeaveToDateObj = new Date(openLeaveData?.toDate);
  const openLeaveType = openLeaveData?.leaveType;
  const openLeaveNumberOfDays = openLeaveData?.totalLeaveDays;
  const openLeavePostingDateObj = new Date(openLeaveData?.postingDate);
  // const openLeavehalfDay = openLeaveData?.halfDay;
  const openLeaveReason = openLeaveData?.description;
  // const openLeaveApprover = openLeaveData?.managerInfoDto?.employeeName;
  const openLeaveApplicationId = openLeaveData?.leaveApplicationId;

  const currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  let fiscalYear = `${currentYear}-${new Date().getFullYear() + 1}`;

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
      openLeaveFromDatestr === invalidDate ? '' : openLeaveFromDatestr,
  });

  const [toDate, setToDate] = useState({
    toDateStr: openLeaveTooDatestr === invalidDate ? '' : openLeaveTooDatestr,
  });
  const [totalNumberOfLeaveDays, setTotalNumberOfLeaveDays] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({leaveType: ''});
  const [halfDay, setHalfDay] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState(openLeaveReason || '');
  const [leaveApprovers, setLeaveApprovers] = useState([]);
  const [openLeaveApprovers, setOpenLeaveApproovers] = useState(false);
  const [openResourcePicker, setOpenResourcePicker] = useState(false);
  const [leaveApproversValue, setLeaveApproversValue] = useState(null);
  const [resourcePickedId, setResourcePickedId] = useState(null);
  const [leaveApproversList, setLeaveApproversList] = useState([]);
  const [resourcePicks, setResourcePicks] = useState([]);
  const [resourceLeaves, setResourceLeaves] = useState([]);
  const [employeeWeekOffs, setEmployeeWeekOffs] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedResourceRemainingLeaves, setSelectedResourceRemainingLeaves] =
    useState([]);

  const leaveApproverFullName =
    leaveApprovers &&
    `${
      leaveApprovers[0]?.leaveApproverFirstName
        ? leaveApprovers[0]?.leaveApproverFirstName
        : ''
    } ${
      leaveApprovers[0]?.leaveApproverMiddleName
        ? leaveApprovers[0]?.leaveApproverMiddleName + ' '
        : ''
    }${
      leaveApprovers[0]?.leaveApproverLastName
        ? leaveApprovers[0]?.leaveApproverLastName
        : ''
    }`;

  useEffect(() => {
    if (fromResource || fromWfh) {
      (async () => {
        // const empId = +resourceEmployeeID.match(/\d+/g)[0];
        const empId = resourceEmployeeID;
        const remainingLeaves = await dispatch(
          getResourseLeaveDetails({token, id: empId}),
        );
        setResourceLeaves(remainingLeaves?.payload);
      })();
    }

    if (!isGuestLogin) {
      (async () => {
        try {
          const leaveApproversFetched = token
            ? await dispatch(getLeaveApprovers({token, employeeID}))
            : [];
          setLeaveApprovers(leaveApproversFetched?.payload);
          if (!leaveApproversFetched.payload) {
            alert(leaveApprFailFetch);
          }
          const listOfLeaveApprovers = leaveApproversFetched.payload.map(
            approver => {
              return {
                value: `${approver?.leaveApprover}`,
                label: `${approver.leaveApproverFirstName} ${approver.leaveApproverLastName}`,
              };
            },
          );
          setLeaveApproversList(listOfLeaveApprovers);
        } catch (err) {
          console.log('errMap:', err);
        }
      })();
    }
  }, [
    dispatch,
    isGuestLogin,
    employeeID,
    fromResource,
    fromWfh,
    resourceEmployeeID,
    token,
  ]);

  useEffect(() => {
    if (fromApproverEnd) {
      (async () => {
        try {
          setLoading(true);
          const employeeData = await dispatch(
            getEmployeesByLeaveApprover(token),
          );

          const finalResources = employeeData?.payload?.map(employee => {
            const empName = `${
              employee.firstName ? employee.firstName + ' ' : ''
            }${employee.middleName ? employee.middleName + ' ' : ''}${
              employee.lastName ? employee.lastName + ' ' : ''
            }`;

            return {value: employee.employeeId, label: empName, employee};
          });

          setResourcePicks(finalResources);
          if (employeeData?.error) {
            ShowAlert({
              messageHeader: ERROR,
              messageSubHeader: employeeData?.error?.message,
              buttonText: 'Close',
              dispatch,
              navigation,
            });
          }
        } catch (err) {
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [dispatch, navigation, token, fromApproverEnd]);

  useEffect(() => {
    if (!isGuestLogin) {
      (async () => {
        try {
          const employeeShift = await dispatch(
            getEmployeeShift({token, id: employeeID}),
          );
          const weekOffs = employeeShift?.payload?.weeklyOff.split('_');

          const finalWeekOffs = [];
          daysOfWeek?.map((el, index) => {
            if (weekOffs.includes(el)) {
              finalWeekOffs.push(index);
            }
          });
          setEmployeeWeekOffs(finalWeekOffs);
        } catch (err) {
          alert(weekoffsFetchFailed);
        }
      })();
    }
  }, [dispatch, employeeID, isGuestLogin, token]);

  const leaves = [
    {
      leaveType: allRemainingLeaves[0]?.leaveType || earnedLeave,
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
      leaveType: allRemainingLeaves[1]?.leaveType || restrictedHoliday,
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
      leaveType: allRemainingLeaves[2]?.leaveType || compensatoryHoliday,
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
      leaveType: allRemainingLeaves[3]?.leaveType || bereavementHoliday,
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
    {leaveType: leaveWithoutPay, allocated: 0, taken: 0, remaining: 0},
  ];

  const leaveTypes = [
    earnedLeave,
    restrictedHoliday,
    compensatoryHoliday,
    bereavementHoliday,
    leaveWithoutPay,
  ];

  if (!fromResource) {
    const genderSpecificLeave = allRemainingLeaves.find(
      leave =>
        leave.leaveType === maternityLeave ||
        leave.leaveType === paternityLeave,
    );
    let genderLeave;
    let leaveTypeAccordingToGender;
    const userGenderLowerCase = userGender?.toLowerCase();

    if (userGenderLowerCase === 'male') {
      genderLeave = {
        leaveType: paternityLeave,
        allocated: genderSpecificLeave?.totalLeavesAllocated || 0,
        taken: genderSpecificLeave?.currentLeaveApplied || 0,
        remaining: genderSpecificLeave?.currentLeaveBalance || 0,
      };
      leaveTypeAccordingToGender = paternityLeave;
    } else {
      genderLeave = {
        leaveType: maternityLeave,
        allocated: genderSpecificLeave?.totalLeavesAllocated || 0,
        taken: genderSpecificLeave?.currentLeaveApplied || 0,
        remaining: genderSpecificLeave?.currentLeaveBalance || 0,
      };

      leaveTypeAccordingToGender = maternityLeave;
    }

    leaveTypes.splice(4, 0, leaveTypeAccordingToGender);

    leaves.splice(4, 0, genderLeave);
  }

  for (let i = 2; i < resourceLeaves.length; i++) {
    const leaveTypeUpdate = resourceLeaves[i]?.leaveType;

    let leaveToBeUpdated = leaves?.find(
      leave => leave.leaveType.toLowerCase() === leaveTypeUpdate.toLowerCase(),
    );
    if (!leaveToBeUpdated) {
      leaveToBeUpdated = {};
      leaves?.splice(2, 0, leaveToBeUpdated);
    }
    leaveToBeUpdated.leaveType = leaveTypeUpdate;
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
    setToDate({
      toDateStr: openLeaveTooDatestr === invalidDate ? '' : openLeaveTooDatestr,
    });

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

    setTotalNumberOfLeaveDays('');
    setFromDate({fromDateObj: date, fromDateStr: finalTodayDate});
  };

  const toCalenderConfirm = async date => {
    toOnCancel();

    if (totalNumberOfLeaveDays > 1) {
      setHalfDay('None');
    }

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
      setTotalNumberOfLeaveDays(finalizedLeaveDays);
      setToDate({toDateObj: date, toDateStr: finalTodayDate});
    } catch (err) {
      console.log('err:', err);
    } finally {
      setLoading(false);
    }
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
                !leftText && styles.justifyContentFlexEnd,
              ]}>
              {leftText ? <Text>{leftText}</Text> : null}
              {!fromResource && selectableLeft ? (
                <TouchableOpacity disabled={fromResource} onPress={leftOnPress}>
                  <Image source={iconLeft} style={styles.cardLeftImage} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        )}
        {rightDropdown ? (
          <View style={[styles.toContainer, styles.zIndex1000]}>
            <Text style={styles.toText}>{rightLabel}</Text>
            {rightDropdown}
          </View>
        ) : (
          <View style={styles.toContainer}>
            <Text style={styles.toText}>{rightLabel}</Text>
            <View
              style={[
                styles.calenderContainer,
                !rightText && !fromResource && styles.justifyContentFlexEnd,
              ]}>
              {rightText && !fromResource && <Text>{rightText}</Text>}
              {fromResource && resourseRightText ? (
                <Text>{resourseRightText}</Text>
              ) : null}
              {selectableRight && !fromResource && (
                <TouchableOpacity
                  disabled={fromResource || rightDisabled}
                  onPress={rightOnPress}>
                  <Image source={iconRight} style={styles.imageRight} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  const leaveCard = (data, index) => {
    let checkSelected = data.leaveType === selectedCard.leaveType;
    return (
      <View
        style={[
          styles.leaveCard,
          checkSelected ? styles.backgroundGreen : styles.backgroundWhite,
        ]}>
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

  const sliderComponent = data => {
    return (
      <View style={styles.headerContainer}>
        <FlatList
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={styles.headerSliderContentContainerStyle}
          style={styles.headerSlider}
          horizontal={true}
          data={data}
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
      <View style={[styles.row]}>
        <Text style={[styles.rowText]}>{rowData}</Text>
      </View>
    );
  };

  const giveReason = value => {
    setReason(value);
  };

  const renderRightComponentResource = () => <View />;

  const renderRightComponent = () => (
    <View style={styles.cardRightContainer}>
      <Image source={MonthImages.DropDownIcon} style={styles.cardRightImage} />
    </View>
  );

  const renderButtonText = option => {
    return (
      <View style={styles.rightButtonCont}>
        <Text style={styles.rightButtonText}>
          {totalNumberOfLeaveDays > 1 ? 'None' : option}
        </Text>
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
          (leavesData[i]?.status?.toLowerCase() === 'open' ||
            leavesData[i]?.status?.toLowerCase() === 'approved') &&
          leavesData[i]?.leaveType?.toLowerCase() !== 'work from home'
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
          (leavesData[i]?.status?.toLowerCase() === 'open' ||
            leavesData[i]?.status?.toLowerCase() === 'approved') &&
          leavesData[i]?.leaveType?.toLowerCase() !== 'work from home'
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

    // return;

    if (leaveType?.toLowerCase() === 'restricted holiday') {
      const positiveDays = openLeavesCount?.rhOpen + totalNumberOfLeaveDays;
      if (positiveDays > restrictedLeaves?.currentLeaveBalance) {
        alert(
          'You either run out of leave balance or you already opened remaining leaves.',
        );
        return;
      }
    }

    // return;

    // =========================================================================

    const leaveApproverMailID =
      leaveApprovers.length === 1
        ? leaveApprovers[0].leaveApprover
        : leaveApproversValue;

    if (!leaveApproverMailID) {
      alert('Please Select a Leave Approver.');
      return;
    }

    if (fromApproverEnd && !selectedResource) {
      alert('Please Select a Resource.');
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
            employeeId: fromApproverEnd ? selectedResource.value : employeeID,
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
            leaveApprover: fromApproverEnd
              ? decoded?.emailId
              : leaveApproverMailID,
            fiscalYear: fiscalYear,
            userId: fromApproverEnd
              ? selectedResource.employee.companyEmail
              : decoded?.emailId,
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
            halfDay: halfDay,
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

  const onSelectResource = async selectedOption => {
    try {
      const empId = selectedOption.value;
      setLoading(true);
      const {payload: selectedEmployeeRemainingLeaves} = await dispatch(
        getRemainingLeavesByEmpId({token, empId}),
      );

      const finalLeaves = selectedEmployeeRemainingLeaves.map(leave => ({
        leaveType: leave.leaveType,
        allocated: leave.totalLeavesAllocated,
        taken: leave.currentLeaveApplied,
        remaining: leave.currentLeaveBalance,
      }));
      finalLeaves.push({
        leaveType: leaveWithoutPay,
        allocated: 0,
        taken: 0,
        remaining: 0,
      });
      setSelectedResourceRemainingLeaves(finalLeaves);

      setSelectedResource(selectedOption);
    } catch (err) {
      console.log('errorRemLeaves:', err);
    } finally {
      setLoading(false);
    }
  };

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
      <SafeAreaView style={styles.mainBottomContainer}>
        <View style={styles.swiperContainer}>
          {!fromApproverEnd || selectedResourceRemainingLeaves.length > 0 ? (
            sliderComponent(
              fromApproverEnd ? selectedResourceRemainingLeaves : leaves,
            )
          ) : (
            <Text style={styles.headerSliderText}>
              Please Select a Resource.
            </Text>
          )}
        </View>

        {fromApproverEnd ? (
          <View style={styles.resourcePickerContainer}>
            <Text style={styles.selectResourceText}>Employee: </Text>
            {!loading ? (
              <DropDownPicker
                placeholder={'Select....'}
                open={openResourcePicker}
                value={resourcePickedId}
                items={resourcePicks}
                setOpen={setOpenResourcePicker}
                setValue={setResourcePickedId}
                setItems={setResourcePicks}
                onSelectItem={onSelectResource}
                containerStyle={styles.resourceSelectContainerStyle}
                style={styles.leaveApproverSelect}
              />
            ) : null}
          </View>
        ) : null}
        <View
          showsVerticalScrollIndicator={false}
          style={styles.mainBottomContainer}>
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
                        style={[
                          styles.halfDayDropdown,
                          totalNumberOfLeaveDays > 1 && styles.lessOpacity,
                          // {
                          //   opacity:
                          //     route?.params?.applyLeave &&
                          //     totalNumberOfLeaveDays > 1
                          //       ? 0.5
                          //       : 1,
                          // },
                        ]}
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
                        dropdownStyle={styles.halfDayDropdownStyles}
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
                    : earnedLeave,
                  resourseRightText: resourceData?.totalLeaveDays,
                  leftDropdown: (
                    // <View>

                    <ModalDropdown
                      disabled={
                        fromResource || (!isEditOpenleave && fromOpenLeave)
                      }
                      style={styles.selectLeaveDropdown}
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
                      dropdownStyle={styles.selectLeaveDropdownStyle}
                      animated={true}
                      renderRow={renderRow}
                      onSelect={(index, itemName) => {
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
                  ),
                })}

                <DateTimePickerModal
                  minimumDate={minimumDateLeaveApplication}
                  date={fromDate?.fromDateObj}
                  maximumDate={dateAfter6Months}
                  isVisible={fromCalenderVisible}
                  mode="date"
                  onConfirm={fromCalenderConfirm}
                  onCancel={fromOnCancel}
                />
                <DateTimePickerModal
                  minimumDate={fromDate?.fromDateObj}
                  // minimumDate={minimumDateLeaveApplication}
                  date={fromDate?.fromDateObj}
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
                {fromApproverEnd ? (
                  <Text style={styles.leaveApproverName}>
                    {approverUserName}
                  </Text>
                ) : isEditOpenleave ? (
                  leaveApprovers?.length === 1 ? (
                    <Text style={styles.leaveApproverName}>
                      {leaveApproverFullName[0].firstName}
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
                          style={styles.selectLeaveApproversDropdown}
                        />
                      </View>
                    </View>
                  )
                ) : fromResource ? (
                  <Text style={styles.leaveApproverName}>
                    {`${resourceData?.leaveApproverFirstName} ${resourceData?.leaveApproverLastName}`}
                  </Text>
                ) : fromOpenLeave ? (
                  <Text style={styles.leaveApproverName}>
                    {`${openLeaveData?.leaveApproverFirstName} ${
                      openLeaveData?.leaveApproverMiddleName
                        ? openLeaveData?.leaveApproverMiddleName + ' '
                        : ''
                    }${openLeaveData?.leaveApproverLastName}`}
                  </Text>
                ) : isGuestLogin ? (
                  <Text style={styles.leaveApproverName}>
                    {guestProfileData?.managerInfoDto?.employeeName}
                  </Text>
                ) : leaveApprovers?.length === 1 ? (
                  <Text style={styles.leaveApproverName}>
                    {leaveApproverFullName && leaveApproverFullName}
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
                        style={styles.leaveApproverSelect}
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
        </View>
        {loading ? (
          <View style={styles.loaderContainer}>
            <View style={styles.loaderBackground} />
            <ActivityIndicator size="large" />
          </View>
        ) : null}
      </SafeAreaView>
    </>

    // </KeyboardAvoidingView>
  );
};

export default ApplyLeave;

// http://10.101.23.48:81/api/Leave/GetLeaveApprover?empId=10876
