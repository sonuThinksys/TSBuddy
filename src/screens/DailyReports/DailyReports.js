import CustomHeader from 'navigation/CustomHeader';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import styles from './DailyReportsStyles';
import React, {useState} from 'react';
import AttendanceStatusBox from './AttendanceStatusBox';
import SearchIconSVG from 'assets/newDashboardIcons/search.svg';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import EmployeeCard from './EmployeeCard';
import BarTabs from './BarTabs';
import Search from './SearchComp';
// import DatePicker from './DatePicker';
import WorkModeEmployeeCard from './WorkModeEmployeeCard';
import HouseIcon from 'assets/allImage/house/house-building.svg';
import {Colors} from 'colors/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

const ON_LEAVE = 'On Leave';
const ABSENT = 'Absent';
const WFH = 'WFH';
const ACTIVE = 'Active';
const OFFICE = 'Office';
const ALL = 'All';
const OPEN = 'Open';
const APPROVED = 'Approved';
const REJECTED = 'Rejected';
const DISMISSED = 'Dismissed';

const DailyReports = ({navigation}) => {
  const [selectedHeaderTab, setSelectedHeaderTab] = useState('attendance');
  const [attendanceSelectedBottomTab, setAttendanceSelectedBottomTab] =
    useState(ACTIVE);
  const [leaveSelectedBottomTab, setLeaveSelectedBottomTab] = useState(ALL);
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);

  const changeTabHandler = tab => {
    setSelectedHeaderTab(tab);
  };
  const changeAttendanceBottomTabHandler = tab => {
    setAttendanceSelectedBottomTab(tab);
  };

  const changeLeaveBottomTabHandler = tab => {
    setLeaveSelectedBottomTab(tab);
  };

  const handleStartConfirm = () => {
    setStartDatePickerVisible(false);
  };
  const hideDatePicker = pickerToHide => {
    pickerToHide(false);
  };

  const handleEndConfirm = () => {
    setEndDatePickerVisible(false);
  };
  // const selectLeaveDateHandler = () => {};

  const createModeHandler = () => {};

  const attendanceTabContent = (
    <>
      <View style={styles.statusBoxesContainer}>
        <AttendanceStatusBox
          title="Active Employees"
          percentage="100%"
          count={364}
        />
        <AttendanceStatusBox
          title="Employees In Office"
          percentage="37.64%"
          count={137}
        />
        <AttendanceStatusBox
          title="Employees On WFH"
          percentage="0%"
          count={0}
        />
        <AttendanceStatusBox
          title="Absent Employees"
          percentage="59.89%"
          count={218}
        />
        <AttendanceStatusBox
          title="Employees On Leave"
          percentage="2.47%"
          count={9}
        />
      </View>

      <BarTabs
        changeBottomTabHandler={changeAttendanceBottomTabHandler}
        styles={styles}
        selectedTab={attendanceSelectedBottomTab}
        TAB1={ACTIVE}
        TAB2={OFFICE}
        TAB3={WFH}
        TAB4={ABSENT}
        TAB5={ON_LEAVE}
      />

      <Search styles={styles} />
      <View style={styles.allEmployeesContainer}>
        <EmployeeCard
          employeeName="Utkarsh Gupta"
          rmName="Mayank Sharma"
          employeeId="10860"
          department="Development"
          checkIn="9:29 am"
          checkOut="7:19 pm"
          totalHours="9:50"
          address="Noida Sector-62, UP"
          attendanceType="Bio-Metric"
        />
        <EmployeeCard
          employeeName="Tribhuvan Bhandari"
          rmName="Mayank Sharma"
          employeeId="10869"
          department="Development"
          checkIn="9:49 am"
          checkOut="7:29 pm"
          totalHours="9:40"
          address="Noida Sector-62, UP"
          attendanceType="Bio-Metric"
        />
      </View>
    </>
  );

  const leaveTabContent = (
    <>
      <View style={styles.statusBoxesContainer}>
        <AttendanceStatusBox title="All Leaves" percentage="100%" count={2} />
        <AttendanceStatusBox title="Open Leaves" percentage="0%" count={0} />
        <AttendanceStatusBox
          title="Approved Leaves"
          percentage="100%"
          count={2}
        />
        <AttendanceStatusBox
          title="Rejected Leaves"
          percentage="0%"
          count={0}
        />
        <AttendanceStatusBox
          title="Dismissed Leaves"
          percentage="0%"
          count={0}
        />
      </View>
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
      <Search styles={styles} />
      {/* <DatePicker
        selectDateHandler={selectLeaveDateHandler}
        title={'Select Date..'}
        styles={styles}
      /> */}
      <View style={styles.datesContainer}>
        <View style={styles.fromDateContainer}>
          <Text style={styles.dateTitleText}>From Date :</Text>
          <Pressable
            onPress={() => {
              setStartDatePickerVisible(true);
            }}>
            <View style={styles.fromDateSelect}>
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
            onPress={() => {
              setEndDatePickerVisible(true);
            }}>
            <View style={styles.toDateSelect}>
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
        />
      </View>
      <EmployeeCard
        employeeName="Tarun Ahirwar"
        rmName="Mayank Sharma"
        employeeId="10852"
        department="Development"
        checkIn="10:21 am"
        checkOut="7:22 pm"
        totalHours="9:01"
        address="Noida Sector-62, UP"
        attendanceType="Bio-Metric"
      />
    </>
  );

  // const workModeTabContent = <></>;

  const workModeTabContent = (
    <>
      <View style={styles.workModeHeader}>
        <View style={styles?.searchContainer}>
          <View style={styles?.textInputContainer}>
            <TextInput placeholder="Search" style={styles?.textInput} />
            <SearchIconSVG color={Colors.lightGray1} height={22} width={22} />
          </View>
        </View>
        <Pressable
          onPress={createModeHandler}
          style={styles.createWorkModeButton}>
          <HouseIcon height={19} width={19} fill={Colors.lovelyPurple} />
          <Text style={styles.createText}>Create</Text>
        </Pressable>
      </View>
      <View style={styles.workStatusContainer}>
        <View style={styles.typeOfWork}>
          <View style={[styles.circle, styles.homeCircle]} />
          <Text>Home</Text>
        </View>
        <View style={styles.typeOfWork}>
          <View style={[styles.circle, styles.officeCircle]} />
          <Text>Office</Text>
        </View>
        <View style={styles.typeOfWork}>
          <View style={[styles.circle, styles.weekOffCircle]} />
          <Text>Week Off</Text>
        </View>
      </View>
      <View>
        <WorkModeEmployeeCard
          employeeName={'Simran Arora'}
          rmName="Asit Mishra"
          employeeId="10861"
          department="QA"
          from={'Sept 01, 2023'}
          to={'Sept 07, 2023'}
          mode="Office"
        />
        <WorkModeEmployeeCard
          employeeName={'Vivek Singh'}
          rmName="Jitendar Singh"
          employeeId="10861"
          department="QA"
          from={'Sept 01, 2023'}
          to={'Sept 07, 2023'}
          mode="Office"
        />
      </View>
    </>
  );

  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Daily Reports"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}>
        <View style={styles.headerBarTabs}>
          <Pressable
            onPress={changeTabHandler.bind(null, 'attendance')}
            style={[
              styles.textContainer,
              selectedHeaderTab === 'attendance'
                ? styles.backgroundPurple
                : null,
              styles.borderRadiusLeft,
            ]}>
            <Text
              style={[
                styles.headerTabText,
                selectedHeaderTab === 'attendance'
                  ? styles.colorWhite
                  : styles.colorGray,
              ]}>
              Attendance
            </Text>
          </Pressable>
          <Pressable
            onPress={changeTabHandler.bind(null, 'leave')}
            style={[
              styles.textContainer,
              selectedHeaderTab === 'leave' ? styles.backgroundPurple : null,
              styles.borderVertical,
            ]}>
            <Text
              style={[
                styles.headerTabText,
                selectedHeaderTab === 'leave'
                  ? styles.colorWhite
                  : styles.colorGray,
              ]}>
              Leave
            </Text>
          </Pressable>
          <Pressable
            onPress={changeTabHandler.bind(null, 'work mode')}
            style={[
              styles.textContainer,
              selectedHeaderTab === 'work mode'
                ? styles.backgroundPurple
                : null,
              styles.borderRadiusRight,
            ]}>
            <Text
              style={[
                styles.headerTabText,
                selectedHeaderTab === 'work mode'
                  ? styles.colorWhite
                  : styles.colorGray,
              ]}>
              Work Mode
            </Text>
          </Pressable>
        </View>
        {selectedHeaderTab === 'attendance' && attendanceTabContent}
        {selectedHeaderTab === 'leave' && leaveTabContent}
        {selectedHeaderTab === 'work mode' && workModeTabContent}
      </ScrollView>
    </>
  );
};

export default DailyReports;

{
  /* <View style={styles.bottomBarTabs}>
        <Pressable
          onPress={changeAttendanceBottomTabHandler.bind(null, ACTIVE)}
          style={[
            styles.bottomBarTab,
            styles.borderRadiusLeft,
            styles.borderVerticalRight,
            attendanceSelectedBottomTab === ACTIVE && styles.backgroundPurple,
          ]}>
          <Text
            style={[
              attendanceSelectedBottomTab === ACTIVE
                ? styles.colorWhite
                : styles.colorGray,
            ]}>
            Active
          </Text>
        </Pressable>
        <Pressable
          onPress={changeAttendanceBottomTabHandler.bind(null, OFFICE)}
          style={[
            styles.bottomBarTab,
            styles.borderVerticalRight,
            attendanceSelectedBottomTab === OFFICE && styles.backgroundPurple,
          ]}>
          <Text
            style={[
              attendanceSelectedBottomTab === OFFICE
                ? styles.colorWhite
                : styles.colorGray,
            ]}>
            Office
          </Text>
        </Pressable>
        <Pressable
          onPress={changeAttendanceBottomTabHandler.bind(null, WFH)}
          style={[
            styles.bottomBarTab,
            styles.borderVerticalRight,
            attendanceSelectedBottomTab === WFH && styles.backgroundPurple,
          ]}>
          <Text
            style={[
              attendanceSelectedBottomTab === WFH ? styles.colorWhite : styles.colorGray,
            ]}>
            WFH
          </Text>
        </Pressable>
        <Pressable
          onPress={changeAttendanceBottomTabHandler.bind(null, ABSENT)}
          style={[
            styles.bottomBarTab,
            styles.borderVerticalRight,
            attendanceSelectedBottomTab === ABSENT && styles.backgroundPurple,
          ]}>
          <Text
            style={[
              attendanceSelectedBottomTab === ABSENT
                ? styles.colorWhite
                : styles.colorGray,
            ]}>
            Absent
          </Text>
        </Pressable>
        <Pressable
          onPress={changeAttendanceBottomTabHandler.bind(null, ON_LEAVE)}
          style={[
            styles.bottomBarTab,
            styles.borderRadiusRight,
            attendanceSelectedBottomTab === ON_LEAVE && styles.backgroundPurple,
          ]}>
          <Text
            style={[
              attendanceSelectedBottomTab === ON_LEAVE
                ? styles.colorWhite
                : styles.colorGray,
            ]}>
            On Leave
          </Text>
        </Pressable>
      </View> */
}
{
  /* <View style={styles.searchContainer}>
        <View style={styles.textInputContainer}>
          <TextInput placeholder="Search" style={styles.textInput} />
          <SearchIconSVG color={Colors.lightGray1} height={22} width={22} />
        </View>
      </View> */
}
