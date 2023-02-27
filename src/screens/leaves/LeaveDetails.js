import {Colors} from 'colors/Colors';
import {View, StyleSheet, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'utils/Responsive';

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
  console.log('data:', data);

  const applyingDate = `${new Date(data.postingDate).getDate()}-${new Date(
    data.fromDate,
  ).toLocaleString('default', {month: 'short'})}-${new Date(
    data.fromDate,
  ).getFullYear()}`;
  console.log('applyingDate:', applyingDate);

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
    ['Employee Name', data.employeeName],
    ['Leave Approver', data.managerInfoDto.employeeName],
    ['Leave Type', data.leaveType],
    ['Leave Time Period', rangeOfdate(data)],
    ['Leave Status', data.status],
    ['Number Of Leaves', data.totalLeaveDays],
    ['Leave Balance', data.currentLeaveBalance],
    ['Applying Date', applyingDate],
    ['Reason', data.description],
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

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 8,
    marginTop: 8,
    borderWidth: 2,
    borderColor: Colors.parrotGreen,
    marginBottom: 40,
  },

  card: {
    // flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.whitishGray,
  },
  header: {
    backgroundColor: Colors.parrotGreen,
    padding: 10,
  },
  headerText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  cardLeftText: {
    fontWeight: '700',
    width: wp(32),
    paddingHorizontal: 10,
    paddingVertical: 14,
    backgroundColor: Colors.whitishGray,
  },
  cardRightTextContainer: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
});
