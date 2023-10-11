import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import SearchIconSVG from 'assets/newDashboardIcons/search.svg';
import HouseIcon from 'assets/allImage/house/house-building.svg';
import {Colors} from 'colors/Colors';
import WorkModeEmployeeCard from './WorkModeEmployeeCard';
import styles from './DailyReportsStyles';

const WorkModeTabContent = ({workModeData, isLoading}) => {
  const createModeHandler = () => {};
  const workModeRenderData = ({item}) => {
    const employeeName = `${
      item.employeeFirstName ? item.employeeFirstName + ' ' : ''
    }${item.employeeMiddleName ? item.employeeMiddleName + ' ' : ''}${
      item.employeeLastName ? item.employeeLastName : ''
    }`;

    const managerName = `${
      item.managerFirstName ? item.managerFirstName + ' ' : ''
    }${item.managerMiddleName ? item.managerMiddleName + ' ' : ''}${
      item.managerLastName ? item.managerLastName : ''
    }`;

    const fromDate = new Date(item.fromDate);
    const fromDay = fromDate.getDate();
    const fromMonth = fromDate.toLocaleDateString('en-US', {month: 'short'});
    const fromYear = fromDate.getFullYear();
    const fromDateStr = `${fromMonth} ${
      fromDay > 9 ? fromDay : '0' + fromDay
    },${fromYear}`;

    const toDate = new Date(item.toDate);
    const toDay = toDate.getDate();
    const toMonth = toDate.toLocaleDateString('en-US', {month: 'short'});
    const toYear = toDate.getFullYear();
    const toDateStr = `${toMonth} ${toDay > 9 ? toDay : '0' + toDay},${toYear}`;
    return (
      <WorkModeEmployeeCard
        employeeName={employeeName}
        rmName={managerName}
        employeeId={item.employeeId}
        department={item.department}
        from={fromDateStr}
        to={toDateStr}
        mode={item.workMode}
        monday={item.monday}
        tuesday={item.tuesday}
        wednesday={item.wednesday}
        thursday={item.thursday}
        friday={item.friday}
        saturday={item.saturday}
        sunday={item.sunday}
      />
    );
  };

  return (
    <>
      <View style={styles.workModeHeader}>
        <View style={[styles?.searchContainer, styles.paddingHorizontal10]}>
          <TextInput placeholder="Search" style={styles?.textInput} />
          <SearchIconSVG color={Colors.lightGray1} height={22} width={22} />
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
      {isLoading ? (
        <View style={styles.fullContentLoaderContainer}>
          <ActivityIndicator size="large" color={Colors.dune} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          data={workModeData}
          renderItem={workModeRenderData}
          keyExtractor={(_, index) => index}
          style={styles.employeeFlatlist}
        />
      )}
    </>
  );
};

export default WorkModeTabContent;
