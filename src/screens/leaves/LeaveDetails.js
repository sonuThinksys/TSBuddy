import {View, Text} from 'react-native';
import styles from './LeavesDetailsStyles';
const LeaveDetails = ({route, navigation}) => {
  const card = (leftText, rightText, index) => {
    return (
      <View key={index} style={styles.card}>
        <View>
          <Text style={styles.cardLeftText}>{leftText}</Text>
        </View>
        <View style={styles.cardRightTextContainer}>
          <Text>{rightText}</Text>
        </View>
      </View>
    );
  };

  const {params: data} = route;

  const applyingDate = `${new Date(data.postingDate).getDate()}-${new Date(
    data.postingDate,
  ).toLocaleString('default', {month: 'short'})}-${new Date(
    data.fromDate,
  ).getFullYear()}`;

  const rangeOfdate = item =>
    `${new Date(item.fromDate).getDate()}-${new Date(
      item.fromDate,
    ).toLocaleString('default', {month: 'short'})}-${new Date(
      item.fromDate,
    ).getFullYear()} to ${new Date(item.toDate).getDate()}-${new Date(
      item.toDate,
    ).toLocaleString('default', {month: 'short'})}-${new Date(
      item.toDate,
    ).getFullYear()}`;

  const details = [
    ['Employee Name', data?.employeeName || 'Utkarsh Gupta'],
    ['Leave Approver', data?.managerInfoDto?.employeeName || 'Mayank Sharma'],
    ['Leave Type', data?.leaveType || 'Earned Leave'],
    ['Leave Time Period', rangeOfdate(data)],
    ['Leave Status', data?.status || 'Approved'],
    ['Number Of Leaves', data?.totalLeaveDays || 1],
    ['Leave Balance', data?.currentLeaveBalance || 5],
    ['Applying Date', applyingDate || '04/05/2023'],
    ['Reason', data?.description || 'Feeling not well.'],
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {data.totalLeaveDays} {data.leaveType} {data.status}
        </Text>
      </View>
      <View>{details.map((item, index) => card(item[0], item[1], index))}</View>
    </View>
  );
};

export default LeaveDetails;
