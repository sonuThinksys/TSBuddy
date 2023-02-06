import {Colors} from 'colors/Colors';
import {useState} from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {ClipPath} from 'react-native-svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

const ApplyLeave = () => {
  const [fromCalenderOpen, setFromCalenderOpen] = useState(false);
  const [toCalenderOpen, setToCalenderOpen] = useState('');
  const [fromDate, setFromDate] = useState('');

  const approver = 'Mayank Sharma';

  const openFromCalender = () => {
    setFromCalenderOpen(true);
    console.log('pressed');
  };

  const today = new Date();
  const today2 = new Date().toLocaleDateString();
  const presentDate = String(today.getDate()).padStart(2, '0');
  const presentMonth = today.toLocaleString('default', {month: 'short'});
  const presentYear = today.getFullYear();

  const finalTodayDate = `Todays Date, ${presentDate}-${presentMonth}-${presentYear}`;

  const card = ({leftLabel, rightLabel, leftIcon, rightIcon}) => {
    return (
      <View style={styles.fromToContainer}>
        <View style={styles.fromContainer}>
          <Text style={styles.fromText}>{leftLabel}</Text>
          <View style={styles.calenderContainer}>
            <TouchableOpacity>
              <Text>press</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.toContainer}>
          <Text style={styles.toText}>{rightLabel}</Text>
          <View style={styles.calenderContainer}>
            <TouchableOpacity>
              <Text>press</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const applyLeave = () => {};
  return (
    <View style={styles.mainContainer}>
      <View style={styles.swiperContainer}></View>
      <View style={styles.mainPart}>
        <View style={styles.formContainer}>
          {card({leftLabel: 'From', rightLabel: 'To'})}
          {card({leftLabel: 'Created Date', rightLabel: 'Half Day'})}
          {card({leftLabel: 'Leave Type', rightLabel: 'Number of Days'})}
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonText}>Reason</Text>
            <TextInput multiline={true} style={styles.reasonTextInput} />
          </View>
          <View style={styles.leaveApproverContainer}>
            <Text style={styles.leaveApproverText}>Leave Approver:</Text>
            <Text style={styles.leaveApproverName}>{approver}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={applyLeave}>
            <Text style={styles.applyText}>Apply</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ApplyLeave;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  swiperContainer: {},
  formContainer: {
    paddingHorizontal: 10,
  },
  fromToContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginTop: 8,
  },
  calenderContainer: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 3,
    paddingHorizontal: 6,
    alignItems: 'flex-end',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  fromContainer: {
    width: '50%',
    paddingRight: 12,
  },
  toContainer: {
    width: '50%',
  },
  fromText: {
    fontWeight: '700',
    marginBottom: 5,
    marginLeft: 4,
    fontSize: 15,
  },
  toText: {
    fontWeight: '700',
    marginBottom: 5,
    marginLeft: 4,
    fontSize: 15,
  },
  reasonText: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 5,
    marginLeft: 4,
  },
  reasonContainer: {
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginTop: 8,
  },
  reasonTextInput: {
    backgroundColor: Colors.white,
    height: hp(8),
    fontSize: 16,
  },
  leaveApproverContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    marginTop: 8,
  },
  leaveApproverText: {
    fontWeight: 'bold',
    marginRight: wp(12),
  },
  leaveApproverName: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Colors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: hp(4),
  },
  button: {
    backgroundColor: Colors.white,
    paddingHorizontal: 32,
    borderRadius: 5,
    paddingVertical: 6,
  },
  mainPart: {
    flex: 1,
    justifyContent: 'space-between',
  },
  applyText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
