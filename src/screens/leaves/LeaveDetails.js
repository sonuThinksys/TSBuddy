import {View, StyleSheet} from 'react-native';

const LeaveDetails = ({leaveCount, leaveType, status}) => {
  const card = (leftText, rightText) => {
    <View style={styles.card}>
      <View>
        <Text>{leftText}</Text>
      </View>
      <View>
        <Text>{rightText}</Text>
      </View>
    </View>;
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text>
          {leaveCount} {leaveType} {status}
        </Text>
      </View>
    </View>
  );
};

export default LeaveDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  statusContainer: {
    backgroundColor: '#51cf66',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
  },
});
