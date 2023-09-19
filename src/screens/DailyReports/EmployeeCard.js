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
  totalHours,
  address,
  attendanceType,
}) => {
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
          <Text style={[styles.checkInText, styles.darkDune]}>Check in: </Text>
          <Text style={[styles.checkIn, styles.lightDune]}>{checkIn}</Text>
        </View>
        <View style={[styles.checkInSubDetails]}>
          <Text style={[styles.checkInText, styles.darkDune]}>Check out: </Text>
          <Text style={[styles.checkIn, styles.lightDune]}>{checkOut}</Text>
        </View>
        <View style={[styles.checkInSubDetails]}>
          <Text style={[styles.checkInText, styles.darkDune]}>
            Total Hours:{' '}
          </Text>
          <Text style={[styles.checkIn, styles.lightDune]}>{totalHours}</Text>
        </View>
      </View>
      <View style={styles.addressAndTypeOfMode}>
        <View style={styles.location}>
          <MonthImages.LocationIconSVG
            height={20}
            width={20}
            color={Colors.lightGray1}
            style={styles.locationIcon}
          />
          <Text style={[styles.addressText, styles.lightDune]}>{address}</Text>
        </View>
        <View>
          <Text style={[styles.attendanceType, styles.darkDune]}>
            {attendanceType}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EmployeeCard;
