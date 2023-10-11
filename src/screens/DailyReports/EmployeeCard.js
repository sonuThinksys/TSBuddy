import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './EmployeeCardStyles';
import defaultUserIcon from 'assets/allImage/DefaultImage.imageset/defaultUserIcon.png';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';

const EmployeeCard = ({
  employeeName,
  rmName,
  employeeId,
  department,
  checkIn,
  checkOut,
  address,
  attendanceType,
  currentMode,
  fromLeave = false,
  totalLeaveDays,
  leaveType,
  postingDate,
  from,
  to,
}) => {
  const showAddress = +attendanceType > 0;
  const attendanceTypeStr =
    +attendanceType > 0
      ? 'Bio-Metric'
      : attendanceType === null
      ? '-'
      : 'Web-Checkin';
  function calculateTimeDifference(startTimeTimestamp, endTimeTimestamp) {
    // Calculate the time difference in milliseconds
    const timeDifference = endTimeTimestamp - startTimeTimestamp;

    // Calculate the number of hours and minutes
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    return {hours, minutes};
  }

  const fromDate = new Date(from);
  const fromDateDay =
    fromDate.getDate() > 9 ? fromDate.getDate() : '0' + fromDate.getDate();
  const fromDateMonth =
    fromDate.getMonth() + 1 > 9
      ? fromDate.getMonth() + 1
      : '0' + (fromDate.getMonth() + 1);
  const fromDateYear = fromDate.getFullYear();

  const toDate = new Date(to);
  const toDateDay =
    toDate.getDate() > 9 ? toDate.getDate() : '0' + toDate.getDate();
  const toDateMonth =
    toDate.getMonth() + 1 > 9
      ? toDate.getMonth() + 1
      : '0' + (toDate.getMonth() + 1);
  const toDateYear = toDate.getFullYear();

  const postingDateObj = new Date(postingDate);
  const postingDateDay =
    postingDateObj.getDate() > 9
      ? postingDateObj.getDate()
      : '0' + postingDateObj.getDate();
  const postingDateMonth =
    postingDateObj.getMonth() + 1 > 9
      ? postingDateObj.getMonth() + 1
      : '0' + (postingDateObj.getMonth() + 1);
  const postingDateYear = postingDateObj.getFullYear();

  const toDateStr = `${toDateDay}-${toDateMonth}-${toDateYear}`;
  const fromDateStr = `${fromDateDay}-${fromDateMonth}-${fromDateYear}`;
  const postingDateStr = `${postingDateDay}-${postingDateMonth}-${postingDateYear}`;

  const checkInTimeStamp = new Date(checkIn).getTime();
  const checkOutTimeStamp = new Date(checkOut).getTime();

  const totalHours = calculateTimeDifference(
    checkInTimeStamp,
    checkOutTimeStamp,
  );

  const totalHoursStr =
    checkInTimeStamp && checkOutTimeStamp
      ? `${totalHours.hours > 9 ? totalHours.hours : '0' + totalHours.hours}:${
          totalHours.minutes > 9 ? totalHours.minutes : '0' + totalHours.minutes
        }`
      : '-';

  const checkInHours = new Date(checkIn).getHours();
  const checkOutHours = new Date(checkOut).getHours();
  const checkInMinutes = new Date(checkIn).getMinutes();
  const checkOutMinutes = new Date(checkOut).getMinutes();

  const checkInStr = checkIn
    ? `${checkInHours > 9 ? checkInHours : '0' + checkInHours}:${
        checkInMinutes > 9 ? checkInMinutes : '0' + checkInMinutes
      }`
    : '-';
  const checkOutStr = checkOut
    ? `${checkOutHours > 9 ? checkOutHours : '0' + checkOutHours}:${
        checkOutMinutes > 9 ? checkOutMinutes : '0' + checkOutMinutes
      }`
    : '-';

  return (
    <View style={styles.mainContainer}>
      <View style={styles.profile}>
        <View style={styles.empDetailsMain}>
          <View style={styles.profileImageContainer}>
            <Image source={defaultUserIcon} style={styles.profileImage} />
          </View>
          <View style={styles.namesContainer}>
            <View>
              <Text style={[styles.employeeNameText, styles.darkDune]}>
                {employeeName}
              </Text>
            </View>
            <View>
              <Text style={[styles.RMNameText, styles.lightDune]}>
                RM: {rmName}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.employeeDepartmentMainContainer}>
          <View>
            <Text style={[styles.empIdText, styles.darkDune]}>
              #{employeeId}
            </Text>
          </View>
          <View style={styles.departmentContainer}>
            <MonthImages.GroupIconSVG
              height={20}
              width={20}
              color={Colors.lightGray1}
            />
            <Text style={[styles.lightDune]}>{department}</Text>
          </View>
        </View>
      </View>
      <View style={styles.checkInDetails}>
        <View style={[styles.checkInSubDetails]}>
          <Text style={[styles.checkInText, styles.darkDune]}>
            {checkIn ? 'Check in:' : 'From:'}{' '}
          </Text>
          <Text style={[styles.checkIn, styles.lightDune]}>
            {!fromLeave ? checkInStr : fromDateStr}
          </Text>
        </View>
        <View style={[styles.checkInSubDetails]}>
          <Text style={[styles.checkInText, styles.darkDune]}>
            {checkOut ? 'Check out:' : 'To:'}{' '}
          </Text>
          <Text style={[styles.checkIn, styles.lightDune]}>
            {!fromLeave ? checkOutStr : toDateStr}
          </Text>
        </View>
        <View style={[styles.checkInSubDetails]}>
          <Text style={[styles.checkInText, styles.darkDune]}>
            {totalLeaveDays ? 'Total Days: ' : 'Total Hours:'}{' '}
          </Text>
          <Text style={[styles.checkIn, styles.lightDune]}>
            {checkIn && checkOut ? totalHoursStr : totalLeaveDays}
          </Text>
        </View>
      </View>
      <View style={styles.addressAndTypeOfMode}>
        <View style={styles.location}>
          {!fromLeave ? (
            <>
              <MonthImages.LocationIconSVG
                height={20}
                width={20}
                color={Colors.lightGray1}
                style={styles.locationIcon}
              />
              <Text style={[styles.addressText, styles.lightDune]}>
                {showAddress ? address : '-'}
              </Text>
            </>
          ) : (
            <View style={styles.leaveTypeContainer}>
              <Text style={[styles.addressText, styles.lightDune]}>
                Leave Type:{' '}
              </Text>
              <Text style={styles.leaveType}>{leaveType}</Text>
            </View>
          )}
        </View>
        <View>
          {!fromLeave ? (
            <Text style={[styles.attendanceType, styles.darkDune]}>
              {attendanceTypeStr}
            </Text>
          ) : (
            <Text style={[styles.checkIn, styles.lightDune]}>
              Post: {postingDateStr}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default EmployeeCard;
