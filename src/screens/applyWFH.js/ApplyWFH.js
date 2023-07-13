import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Pressable,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
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
import SelectDateModal from 'modals/SelectDateModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  applyForWfhLeave,
  cancelSubscribedLunchRequest,
  getLeaveApprovers,
  getLeaveDetails,
} from 'redux/homeSlice';
import {FontFamily} from 'constants/fonts';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import TrashIcon from 'assets/newDashboardIcons/trash-can.svg';
import Loader from 'component/loader/Loader';
import CustomHeader from 'navigation/CustomHeader';
import {useIsFocused} from '@react-navigation/native';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import {ScrollView} from 'react-native-gesture-handler';
import {useDrawerStatus} from '@react-navigation/drawer';

const ApplyWFH = ({navigation}) => {
  const token = useSelector(state => state.auth.userToken);
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;

  const [startDate, setStartDate] = useState({
    startDateStr: 'Select Start Date',
  });

  const [endDate, setEndDate] = useState({endDateStr: 'Select End Date'});
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
  const [updateState, setUpdateState] = useState(false);

  let currentYear = new Date().getFullYear();
  const fiscalYear = `${currentYear}-${new Date().getFullYear() + 1}`;

  const setUpcomingMonthlyStartDate = ({date}) => {
    setMonthlyStartDate(date);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (drawerStatus === 'open') {
      Keyboard.dismiss();
    }
  }, [drawerStatus]);
  useEffect(() => {
    (async () => {
      const leaveApprovers = token
        ? await dispatch(getLeaveApprovers({token, employeeID}))
        : [];
      const listOfLeaveApprovers = leaveApprovers.payload.map(approver => {
        return {
          value: approver.leaveApprover,
          label: approver.leaveApproverName,
        };
      });
      setLeaveApprover(listOfLeaveApprovers);
      setItems(listOfLeaveApprovers);
    })();
  }, []);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        setLoading(true);
        const leavesData = await dispatch(
          getLeaveDetails({
            token,
            empID: employeeID,
          }),
        );
        setLoading(false);

        let wfhLeaveList = leavesData.payload.filter(
          leave => leave.leaveType === 'Work From Home',
        );

        let sortedWfhData = wfhLeaveList.sort(
          (a, b) =>
            new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime(),
        );

        setWfhList(sortedWfhData);

        if (leavesData?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: leavesData?.error?.message,
            buttonText: 'Close',
            dispatch,
          });
        }
      })();
    }
  }, [isFocused]);

  useEffect(() => {
    const diffTime = toDate?.getTime() - fromDate?.getTime();
    const diffInDays = diffTime / (1000 * 60 * 60 * 24) + 1;
    setTotalDaysCount(diffInDays);
  }, [endDate.endDateStr]);

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

  const handleStartConfirm = date => {
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
    setEndDate({endDateStr: 'Select End Date'});
  };

  const handleEndConfirm = date => {
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
  };

  let opacity = 1;

  if (value !== 'monthly') {
    if (!startSelected || !endSelected || !value) opacity = 0.5;
  } else {
    if (!monthlyStartDate) opacity = 0.5;
  }

  let endDateMaximumLimit = startSelected ? startDate?.startDateObj : undefined;

  const startDateCopy = new Date(startDate?.startDateObj);

  const onApplyWfh = async () => {
    if (!startDate.startDateStr || !endDate.endDateStr) {
      alert('Please select dates for which you want to apply a leave.');
      return;
    }

    if (!reason) {
      alert('Please enter a reason for applying a leave.');
      return;
    }

    if (selectedLeaveApprover == '') {
      alert('Please select a leave approver.');
      return;
    }
    // if (totalDaysCount === 0) {
    //   alert('You can not apply leave on Weekends.');
    //   return;
    // }

    if (totalDaysCount < 0) {
      alert('Difference between the number of leave days must be positive.');
      return;
    }

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

    setLoading(false);
    if (appliedWfh?.error) {
      alert(appliedWfh.error.message);
    } else {
      setUpdateState(true);
      Alert.alert('Success', 'Leave applied successfully!', [
        {
          text: 'Ok',
          onPress: () => {
            // navigation.goBack();
          },
        },
      ]);
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

      <View style={styles.secondView}>
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
            startSelected
              ? new Date(
                  startDate?.startDateObj?.getTime() + 7 * 24 * 60 * 60 * 1000,
                )
              : undefined
          }
          isVisible={endDatePickerVisible}
          mode="date"
          date={startSelected ? startDate?.startDateObj : undefined}
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
              From Date :
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (permReq) {
                  setOpenModal(true);
                } else {
                  setStartDatePickerVisible(true);
                }
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
            onPress={() => {
              setEndSelected(false);
              setStartSelected(false);
              setStartDate({
                startDateStr: 'Select Start Date',
              });
              setEndDate({endDateStr: 'Select End Date'});
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
              marginTop: 15,
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
      <View style={styles.appliedView}>
        <Text style={styles.appliedText}>Work From Home History</Text>
      </View>
      <View style={styles.buttomView}>
        {wfhList?.length > 0 ? (
          <View style={{flexBasis: 300}}>
            {loading && <Loader />}
            <FlatList
              showsVerticalScrollIndicator={false}
              data={wfhList}
              renderItem={({item}) => {
                return renderListOfAppliedRequests({
                  item,
                  dispatch,
                  token,
                  onCancel: cancelSubscribedLunchRequest,
                  setIsLoading,
                });
              }}
              keyExtractor={item => Math.random() * Math.random()}
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
              You don't have any wfh.
            </Text>
          </View>
        )}
      </View>
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
    <View style={styles.request}>
      <View style={styles.appliedRequestsLeft}>
        <View
          style={{
            alignItems: 'center',
            marginRight: wp(4),
          }}>
          <Text style={{fontSize: 25, fontFamily: FontFamily.RobotoLight}}>
            {item.totalLeaveDays < 9 ? '0' : null}
            {item.totalLeaveDays}
          </Text>
          <Text style={{fontSize: 12, fontFamily: FontFamily.RobotoMedium}}>
            {item?.totalLeaveDays === 1 ? 'Day' : 'Days'}
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
          </View>
        </View>
      </View>
    </View>
  );
};

export default ApplyWFH;
``;
