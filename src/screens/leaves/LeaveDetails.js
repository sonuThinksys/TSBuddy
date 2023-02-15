import {Colors} from 'colors/Colors';
import {View, StyleSheet, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'utils/Responsive';

const LeaveDetails = ({route, navigation}) => {
  const status = route.params.statusOfLeaves;

  let type = route.params.typesOfLeaves;
  if (type === 'WFH') type = 'WORK FROM HOME';
  if (type === 'EL') type = 'EARNED LEAVE';
  if (type === 'RH') type = 'RESTRICTED HOLIDAY';
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

  const data = route.params;

  const leaveCount = data.daysOfLeaves;

  const details = [
    ['Employee Name', 'Utkarsh Gupta'],
    ['Leave Approver', 'Mayank Sharma'],
    ['Leave Type', type],
    ['Leave Time Period', data.rangeOfdate],
    ['Leave Status', data.statusOfLeaves],
    ['Number Of Leaves', leaveCount],
    ['Leave Balance', '0.00'],
    ['Applying Date', data.applyingDate],
    ['Reason', data.reason],
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {leaveCount} {type} {status}
        </Text>
      </View>
      <View>{details.map((item, index) => card(item[0], item[1], index))}</View>
    </View>
  );
};

export default LeaveDetails;

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
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
