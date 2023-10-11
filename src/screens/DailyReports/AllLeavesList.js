import React, {useCallback, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Pressable, Text, View} from 'react-native';
import BarTabs from './BarTabs';
import styles from './DailyReportsStyles';
import Search from './SearchComp';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Colors} from 'colors/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import EmployeeCard from './EmployeeCard';

const ALL = 'All';
const OPEN = 'Open';
const APPROVED = 'Approve';
const REJECTED = 'Reject';
const DISMISSED = 'Dismiss';

const AllLeavesList = ({
  leaves,
  selectStartDate,
  selectEndDate,
  isLoadingLeave,
}) => {
  const [leaveSelectedBottomTab, setLeaveSelectedBottomTab] = useState(ALL);
  const [searchTerm, setSearchTerm] = useState('');

  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [startSelected, setStartSelected] = useState(false);
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [startSelectedDate, setStartSelectedDate] = useState(null);

  const todayDate = new Date();
  const todayDateDay = todayDate.getDate();
  const todayDateMonth = todayDate.getMonth() + 1;
  const todayDateYear = todayDate.getFullYear();

  const searchRef = useRef(null);

  const [startDateStr, setStartDateStr] = useState(
    `${todayDateDay > 9 ? todayDateDay : '0' + todayDateDay}-${
      todayDateMonth > 9 ? todayDateMonth : '0' + todayDateMonth
    }-${todayDateYear}`,
  );
  const [endDateStr, setEndDateStr] = useState(
    `${todayDateDay > 9 ? todayDateDay : '0' + todayDateDay}-${
      todayDateMonth > 9 ? todayDateMonth : '0' + todayDateMonth
    }-${todayDateYear}`,
  );

  const changeLeaveBottomTabHandler = tab => {
    setLeaveSelectedBottomTab(tab);
    setFilteredLeaves([]);
    searchRef && searchRef?.current?.resetEnteredValue();
  };

  const searchEmployeeHandler = useCallback(
    searchedTerm => {
      setSearchTerm(searchedTerm);

      const searchTermLowerCase = searchedTerm.trim().toLowerCase();
      const finalFilteredLeaves = leaves[
        leaveSelectedBottomTab.toLowerCase()
      ]?.filter(
        leave =>
          leave.employeeFirstName
            ?.toLowerCase()
            .includes(searchTermLowerCase) ||
          leave.employeeMiddleName
            ?.toLowerCase()
            .includes(searchTermLowerCase) ||
          leave.employeeLastName?.toLowerCase().includes(searchTermLowerCase),
      );

      setFilteredLeaves(finalFilteredLeaves);
    },
    [leaveSelectedBottomTab, leaves],
  );

  const handleStartConfirm = date => {
    selectStartDate(date);
    const selectedDate =
      date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    const selectedMonth =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1);
    const selectedYear =
      date.getFullYear() > 9 ? date.getFullYear() : '0' + date.getFullYear();

    setStartDatePickerVisible(false);
    setStartDateStr(`${selectedDate}-${selectedMonth}-${selectedYear}`);
    setStartSelected(true);
    setStartSelectedDate(date);
  };

  const handleEndConfirm = date => {
    selectEndDate(date);
    const selectedDate =
      date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    const selectedMonth =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1);
    const selectedYear =
      date.getFullYear() > 9 ? date.getFullYear() : '0' + date.getFullYear();

    setEndDatePickerVisible(false);
    setEndDateStr(`${selectedDate}-${selectedMonth}-${selectedYear}`);
  };

  const hideDatePicker = pickerToHide => {
    pickerToHide(false);
  };

  const renderFlatlistHeader = () => {
    return (
      <View style={styles.datesContainer}>
        <View style={styles.fromDateContainer}>
          <Text style={styles.dateTitleText}>From Date :</Text>
          <Pressable
            onPress={() => {
              setStartDatePickerVisible(true);
            }}>
            <View style={styles.fromDateSelect}>
              <Text>{startDateStr}</Text>
              <CalenderIcon
                fill={Colors.lightGray1}
                height={hp(2)}
                width={hp(2)}
                marginRight={wp(0.64)}
              />
            </View>
          </Pressable>
        </View>

        <View style={styles.toDateMainContainer}>
          <Text style={styles.toDateTitleText}>To Date :</Text>
          <Pressable
            disabled={!startSelected}
            style={startSelected ? null : styles.opacity60}
            onPress={() => {
              setEndDatePickerVisible(true);
            }}>
            <View style={styles.toDateSelect}>
              <Text>{endDateStr}</Text>
              <CalenderIcon
                fill={Colors.lightGray1}
                height={hp(2)}
                width={hp(2)}
                marginRight={wp(0.64)}
              />
            </View>
          </Pressable>
        </View>
        <DateTimePickerModal
          isVisible={startDatePickerVisible}
          mode="date"
          onConfirm={handleStartConfirm}
          onCancel={hideDatePicker.bind(null, setStartDatePickerVisible)}
        />
        <DateTimePickerModal
          isVisible={endDatePickerVisible}
          mode="date"
          onConfirm={handleEndConfirm}
          onCancel={hideDatePicker.bind(null, setEndDatePickerVisible)}
          minimumDate={startSelectedDate}
        />
      </View>
    );
  };

  const filteredFlatistRenderItem = ({item: leave}) => {
    const employeeName = `${
      leave.employeeFirstName ? leave.employeeFirstName + ' ' : ''
    }${leave.employeeMiddleName ? leave.employeeMiddleName + ' ' : ''}${
      leave.employeeLastName ? leave.employeeLastName : ''
    }`;

    const managerName = `${
      leave.managerFirstName ? leave.managerFirstName + ' ' : ''
    }${leave.managerMiddleName ? leave.managerMiddleName + ' ' : ''}${
      leave.managerLastName ? leave.managerLastName : ''
    }`;
    return (
      <EmployeeCard
        fromLeave={true}
        from={leave.fromDate}
        to={leave.toDate}
        totalLeaveDays={leave.totalLeaveDays}
        leaveType={leave.leaveType}
        status={leave.status}
        employeeName={employeeName}
        rmName={managerName}
        employeeId={leave.employeeId}
        department={leave.department}
        postingDate={leave.postingDate}
      />
    );
  };

  return (
    <View style={styles.leavesListMainContainer}>
      <BarTabs
        changeBottomTabHandler={changeLeaveBottomTabHandler}
        styles={styles}
        selectedTab={leaveSelectedBottomTab}
        TAB1={ALL}
        TAB2={OPEN}
        TAB3={APPROVED}
        TAB4={REJECTED}
        TAB5={DISMISSED}
      />

      <Search
        searchEmployeesHandler={searchEmployeeHandler}
        styles={styles}
        ref={searchRef}
      />
      {filteredLeaves?.length > 0 && searchTerm?.length > 0 ? (
        <FlatList
          ListHeaderComponent={renderFlatlistHeader()}
          style={styles.employeeFlatlist}
          showsVerticalScrollIndicator={false}
          pagingEnabled={true}
          data={filteredLeaves}
          renderItem={filteredFlatistRenderItem}
          keyExtractor={(_, index) => index}
        />
      ) : searchTerm?.length === 0 &&
        leaves[leaveSelectedBottomTab.toLowerCase()]?.length > 0 ? (
        <FlatList
          ListHeaderComponent={renderFlatlistHeader()}
          style={styles.employeeFlatlist}
          showsVerticalScrollIndicator={false}
          pagingEnabled={true}
          data={leaves[leaveSelectedBottomTab.toLowerCase()]}
          renderItem={({item, index}) => {
            const leave = item;

            const employeeName = `${
              leave.employeeFirstName ? leave.employeeFirstName + ' ' : ''
            }${leave.employeeMiddleName ? leave.employeeMiddleName + ' ' : ''}${
              leave.employeeLastName ? leave.employeeLastName : ''
            }`;

            const managerName = `${
              leave.managerFirstName ? leave.managerFirstName + ' ' : ''
            }${leave.managerMiddleName ? leave.managerMiddleName + ' ' : ''}${
              leave.managerLastName ? leave.managerLastName : ''
            }`;

            return (
              <EmployeeCard
                fromLeave={true}
                key={index}
                from={leave.fromDate}
                to={leave.toDate}
                totalLeaveDays={leave.totalLeaveDays}
                leaveType={leave.leaveType}
                status={leave.status}
                employeeName={employeeName}
                rmName={managerName}
                employeeId={leave.employeeId}
                department={leave.department}
                postingDate={leave.postingDate}
              />
            );
          }}
          keyExtractor={(_, index) => index}
        />
      ) : (
        <View style={styles.noLeaveContainer}>
          <Text style={styles.noLeaveFound}>No Employee Found!!</Text>
        </View>
      )}
      {isLoadingLeave ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
    </View>
  );
};

export default AllLeavesList;
