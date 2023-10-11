import React, {useCallback, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import BarTabs from './BarTabs';
import styles from './DailyReportsStyles';
import Search from './SearchComp';
import EmployeeCard from './EmployeeCard';

const ON_LEAVE = 'On Leave';
const ABSENT = 'Absent';
const WFH = 'WFH';
const ACTIVE = 'Active';
const OFFICE = 'Office';

const AllEmployeesList = ({allEmployees, isLoadingAllEmployees}) => {
  const [attendanceSelectedBottomTab, setAttendanceSelectedBottomTab] =
    useState(ACTIVE);
  const [enteredValue, setEnteredValue] = useState('');

  const searchRef = useRef(null);

  const [filteredEmployeesList, setFilteredEmployeesList] = useState([]);
  const renderTabData = allEmployees[attendanceSelectedBottomTab];

  const changeAttendanceBottomTabHandler = tab => {
    setAttendanceSelectedBottomTab(tab);
    setFilteredEmployeesList([]);
    searchRef && searchRef?.current?.resetEnteredValue();
  };

  const getFilteredEmployeesList = useCallback(
    text => {
      setEnteredValue(text);
      text = text.trim().toLowerCase();
      if (renderTabData) {
        const totalEmployeesCopy = renderTabData.filter(
          employee =>
            employee.employeeFirstName?.toLowerCase().includes(text) ||
            employee.employeeMiddleName?.toLowerCase().includes(text) ||
            employee.employeeLastName?.toLowerCase().includes(text),
        );
        setFilteredEmployeesList(totalEmployeesCopy);
      }
    },
    [renderTabData],
  );

  const fullListRenderItem = ({item}) => {
    const employee = item;
    const employeeName = `${
      employee.employeeFirstName ? employee.employeeFirstName + ' ' : ''
    }${employee.employeeMiddleName ? employee.employeeMiddleName + ' ' : ''}${
      employee.employeeLastName ? employee.employeeLastName : ''
    }`;

    const managerName = `${
      employee.managerFirstName ? employee.managerFirstName + ' ' : ''
    }${employee.managerMiddleName ? employee.managerMiddleName + ' ' : ''}${
      employee.managerLastName ? employee.managerLastName : ''
    }`;

    const empId = employee.employeeId;
    const department = employee.department;
    const checkInTime = employee.checkInTime;
    const checkOutTime = employee.checkOutTime;
    const attendanceType = employee.machineCode;

    return (
      <EmployeeCard
        currentMode={attendanceSelectedBottomTab}
        key={empId}
        employeeName={employeeName}
        rmName={managerName}
        employeeId={empId}
        department={department}
        checkIn={checkInTime}
        checkOut={checkOutTime}
        totalHours=""
        address="Noida Sector-62, UP"
        attendanceType={attendanceType}
      />
    );
  };

  const renderFilteredEmployeesList = ({item: employee}) => {
    const employeeName = `${
      employee.employeeFirstName ? employee.employeeFirstName + ' ' : ''
    }${employee.employeeMiddleName ? employee.employeeMiddleName + ' ' : ''}${
      employee.employeeLastName ? employee.employeeLastName : ''
    }`;

    const managerName = `${
      employee.managerFirstName ? employee.managerFirstName + ' ' : ''
    }${employee.managerMiddleName ? employee.managerMiddleName + ' ' : ''}${
      employee.managerLastName ? employee.managerLastName : ''
    }`;

    const empId = employee.employeeId;
    const department = employee.department;
    const checkInTime = employee.checkInTime;
    const checkOutTime = employee.checkOutTime;
    const attendanceType = employee.machineCode;

    return (
      <EmployeeCard
        currentMode={attendanceSelectedBottomTab}
        key={empId}
        employeeName={employeeName}
        rmName={managerName}
        employeeId={empId}
        department={department}
        checkIn={checkInTime}
        checkOut={checkOutTime}
        totalHours=""
        address="Noida Sector-62, UP"
        attendanceType={attendanceType}
      />
    );
  };

  return (
    <View style={styles.mainContent}>
      <BarTabs
        changeBottomTabHandler={changeAttendanceBottomTabHandler}
        styles={styles}
        selectedTab={attendanceSelectedBottomTab}
        TAB1={ACTIVE}
        TAB2={OFFICE}
        TAB3={WFH}
        TAB4={ABSENT}
        TAB5={ON_LEAVE}
        // onTabChange={tabChangeHandler}
      />

      <Search
        styles={styles}
        searchEmployeesHandler={getFilteredEmployeesList}
        ref={searchRef}
      />

      <View style={styles.allEmployeesContainer}>
        {isLoadingAllEmployees ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : filteredEmployeesList?.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            pagingEnabled={true}
            data={filteredEmployeesList}
            renderItem={renderFilteredEmployeesList}
            keyExtractor={(_, index) => index}
            style={styles.employeeFlatlist}
          />
        ) : renderTabData?.length > 0 && !enteredValue ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            pagingEnabled={true}
            data={renderTabData}
            renderItem={fullListRenderItem}
            keyExtractor={(_, index) => index}
            initialNumToRender={5}
            style={styles.employeeFlatlist}
          />
        ) : (
          <View style={styles.noEmployeesContainer}>
            <Text style={styles.noEmployeesText}>No Employee Found.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default AllEmployeesList;
