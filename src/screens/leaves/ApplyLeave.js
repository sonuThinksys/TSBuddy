import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import {useRef, useState} from 'react';
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
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import jwt_decode from 'jwt-decode';

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

import {applyForLeave, updateLeaveStatus} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';

const ApplyLeave = ({navigation, route}) => {
  const dateOptions = {day: 'numeric', month: 'short', year: 'numeric'};
  const fromResource = route?.params?.fromResource || false;
  const resourceData = route?.params;
  const resourceEmployeeID = resourceData?.employeeId;
  const postingDateObj = new Date(resourceData?.postingDate);
  const toDateObj = new Date(resourceData?.toDate);
  const fromDateObj = new Date(resourceData?.fromDate);

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
  var decoded = jwt_decode(token);
  const employeeID = decoded.id;

  const {
    leaveMenuDetails: {
      remainingLeaves: [earnedLeaves = {}, restrictedLeaves = {}],
    },
  } = useSelector(state => state.home);

  const leaves = [
    {
      leaveType: 'Earned Leave',
      allocated: earnedLeaves?.totalLeavesAllocated,
      taken: earnedLeaves?.currentLeaveApplied,
      remaining: earnedLeaves?.currentLeaveBalance,
    },
    {
      leaveType: 'Restricted Holiday',
      allocated: restrictedLeaves?.totalLeavesAllocated,
      taken: restrictedLeaves.currentLeaveApplied,
      remaining: restrictedLeaves.currentLeaveBalance,
    },
    {leaveType: 'Bereavement Leave', allocated: 0, taken: 0, remaining: 0},
    {leaveType: 'Compensatory Off', allocated: 0, taken: 0, remaining: 0},
    {leaveType: 'Maternity Leave', allocated: 0, taken: 0, remaining: 0},
    {leaveType: 'Paternity Leave', allocated: 0, taken: 0, remaining: 0},
    {leaveType: 'Work From Home', allocated: 13, taken: 23, remaining: -10},
  ];

  const [fromCalenderVisible, setFromCalenderVisible] = useState(false);
  const [toCalenderVisible, setToCalenderVisible] = useState(false);
  const [fromDate, setFromDate] = useState({fromDateStr: ''});
  const [toDate, setToDate] = useState({toDateStr: ''});
  const [totalNumberOfLeaveDays, setTotalNumberOfLeaveDays] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({leaveType: 'Earned Leave'});

  const [halfDay, setHalfDay] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');

  const showFromDatePicker = () => {
    setFromCalenderVisible(true);
  };

  const showToDatePicker = () => {
    setToCalenderVisible(true);
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
    const presentDate = String(date.getDate()).padStart(2, '0');
    const presentMonth = date.toLocaleString('default', {month: 'short'});
    const presentYear = date.getFullYear();

    const finalTodayDate = `${presentDate}-${presentMonth}-${presentYear}`;

    if (toDate.toDateObj) {
      // const diffInMs = toDate.toDateObj.getTime() - date.getTime();
      // const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;
      // =================================================================
      const totalWeekdays = Math.round(weekdayCount(date, toDate.toDateObj));
      // =================================================================

      setTotalNumberOfLeaveDays(totalWeekdays);
      setFromDate({fromDateObj: date, fromDateStr: finalTodayDate});
    } else {
      setFromDate({fromDateObj: date, fromDateStr: finalTodayDate});
    }

    fromOnCancel();
  };

  const toCalenderConfirm = date => {
    const presentDate = String(date.getDate()).padStart(2, '0');
    const presentMonth = date.toLocaleString('default', {month: 'short'});
    const presentYear = date.getFullYear();

    const finalTodayDate = `${presentDate}-${presentMonth}-${presentYear}`;

    const totalWeekdays = weekdayCount(fromDate.fromDateObj, date);
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
                  disabled={fromResource}
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
          // paddingLeft: 8,
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
    if (totalNumberOfLeaveDays < 0.5) {
      alert('Difference between the number of leave days must be positive.');
      return;
    }
    setLoading(true);

    const appliedLeave = await dispatch(
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
          leaveApprover: 'Mayank Sharma',
          fiscalYear: '2023-2024',
        },
      }),
    );

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

  const finalizeLeave = async status => {
    setLoading(true);
    const empId = +resourceEmployeeID.match(/\d+/g)[0];
    const response = await dispatch(
      updateLeaveStatus({
        token,
        body: {
          employeeId: empId,
          leaveApplicationId: resourceData.leaveApplicationId,
          status: status,
          leaveType: resourceData.leaveType,
        },
      }),
    );

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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.swiperContainer}>{sliderComponent()}</View>

      <View style={styles.mainPart}>
        <View style={[styles.formContainer]}>
          {card({
            leftLabel: 'From',
            rightLabel: 'To',
            selectableLeft: true,
            selectableRight: true,
            iconLeft: MonthImages.CalenderIcon,
            iconRight: MonthImages.CalenderIcon,
            leftOnPress: showFromDatePicker,
            rightOnPress: showToDatePicker,
            leftText: !fromResource ? fromDate.fromDateStr : fromDatestr,
            rightText: toDate.toDateStr,
            zIndex: 1000,
            resourseRightText: toDatestr,
          })}
          {card({
            zIndex: 1000,
            leftLabel: 'Created Date',
            rightLabel: 'Half Day',
            selectableRight: true,
            leftText: !fromResource ? finalTodayDate : postingDateStr,
            iconRight: MonthImages.DropDownIcon,
            rightText: 'None',
            rightDropdown: (
              <View>
                <ModalDropdown
                  disabled={
                    !fromDate.fromDateObj ||
                    !toDate.toDateObj ||
                    totalNumberOfLeaveDays > 1 ||
                    fromResource
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
              totalNumberOfLeaveDays >= 0.5 ? totalNumberOfLeaveDays : '',
            leftText: !fromResource ? 'Earned Leave' : resourceData.leaveType,
            resourseRightText: resourceData?.totalLeaveDays,
            leftDropdown: (
              <View style={{}}>
                <ModalDropdown
                  disabled={fromResource}
                  style={{
                    borderWidth: 1,
                    backgroundColor: Colors.white,
                    borderRadius: 3,
                    paddingVertical: 5,
                    height: 32,
                  }}
                  isFullWidth={true}
                  showsVerticalScrollIndicator={false}
                  defaultValue={fromResource ? resourceData.leaveType : ''}
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
              </View>
            ),
          })}
          <DateTimePickerModal
            isVisible={fromCalenderVisible}
            mode="date"
            onConfirm={fromCalenderConfirm}
            onCancel={fromOnCancel}
          />
          <DateTimePickerModal
            isVisible={toCalenderVisible}
            mode="date"
            onConfirm={toCalenderConfirm}
            onCancel={toOnCancel}
          />
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonText}>Reason</Text>
            {!fromResource ? (
              <TextInput
                onChangeText={giveReason}
                multiline={true}
                style={styles.reasonTextInput}
              />
            ) : (
              <Text style={styles.resourceReasonText}>
                {resourceData?.description}
              </Text>
            )}
          </View>
          <View style={styles.leaveApproverContainer}>
            <Text style={styles.leaveApproverText}>Leave Approver:</Text>
            <Text style={styles.leaveApproverName}>{approver}</Text>
          </View>
        </View>
        {!fromResource ? (
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={applyLeave}>
              <Text style={styles.applyText}>Apply</Text>
            </Pressable>
          </View>
        ) : (
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
        )}
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <View style={styles.loaderBackground} />
          <ActivityIndicator size="large" />
        </View>
      ) : null}
    </View>
  );
};

export default ApplyLeave;
