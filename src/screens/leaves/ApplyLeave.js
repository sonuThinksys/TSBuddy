import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import {useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

const ApplyLeave = () => {
  const [fromCalenderVisible, setFromCalenderVisible] = useState(false);
  const [toCalenderVisible, setToCalenderVisible] = useState(false);
  const [fromDate, setFromDate] = useState({fromDateStr: ''});
  const [toDate, setToDate] = useState({toDateStr: ''});
  const [totalNumberOfLeaveDays, setTotalNumberOfLeaveDays] = useState('');

  const approver = 'Mayank Sharma';

  const showFromDatePicker = () => {
    setFromCalenderVisible(true);
  };

  const showToDatePicker = () => {
    setToCalenderVisible(true);
  };

  const fromOnCancel = () => {
    setFromCalenderVisible(false);
  };

  const toOnCancel = () => {
    setToCalenderVisible(false);
  };

  const fromCalenderConfirm = date => {
    // const today = new Date();
    const presentDate = String(date.getDate()).padStart(2, '0');
    const presentMonth = date.toLocaleString('default', {month: 'short'});
    const presentYear = date.getFullYear();

    const finalTodayDate = `${presentDate}-${presentMonth}-${presentYear}`;
    setFromDate({fromDateObj: date, fromDateStr: finalTodayDate});
    fromOnCancel();
  };

  const toCalenderConfirm = date => {
    const presentDate = String(date.getDate()).padStart(2, '0');
    const presentMonth = date.toLocaleString('default', {month: 'short'});
    const presentYear = date.getFullYear();

    const finalTodayDate = `${presentDate}-${presentMonth}-${presentYear}`;

    const time = Math.floor((date - fromDate.fromDateObj) / 86400000 + 1);

    // const totalDays=+presentDate
    setTotalNumberOfLeaveDays(time);

    setToDate({toDateObj: date, toDateStr: finalTodayDate});
    toOnCancel();
  };

  const today = new Date();
  const presentDate = String(today.getDate()).padStart(2, '0');
  const presentMonth = today.toLocaleString('default', {month: 'short'});
  const presentYear = today.getFullYear();

  const finalTodayDate = `${presentDate}-${presentMonth}-${presentYear}`;

  const leaves = [1, 4, 3, 4, 5, 6, 7, 8, 9, 8838];

  const card = ({
    leftLabel,
    rightLabel,
    selectableLeft,
    selectableRight,
    leftText,
    rightText,
    iconLeft,
    iconRight,
    leftOnPress,
    rightOnPress,
  }) => {
    return (
      <View style={styles.fromToContainer}>
        <View style={styles.fromContainer}>
          <Text style={styles.fromText}>{leftLabel}</Text>
          <View
            style={[
              styles.calenderContainer,
              !leftText && {justifyContent: 'flex-end'},
            ]}>
            {leftText && <Text>{leftText}</Text>}
            {selectableLeft && (
              <TouchableOpacity onPress={leftOnPress}>
                <Image source={iconLeft} style={{height: 20, width: 20}} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.toContainer}>
          <Text style={styles.toText}>{rightLabel}</Text>
          <View
            style={[
              styles.calenderContainer,
              !rightText && {justifyContent: 'flex-end'},
            ]}>
            {rightText && <Text>{rightText}</Text>}
            {selectableRight && (
              <TouchableOpacity onPress={rightOnPress}>
                <Image source={iconRight} style={{height: 20, width: 20}} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const leaveCard = () => {
    return (
      <View style={styles.leaveCard}>
        <Text>Hello world!</Text>
      </View>
    );
  };

  const sliderComponent = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          scrollEnabled={true}
          contentContainerStyle={{flexGrow: 1}}
          style={{
            backgroundColor: Colors.menuTransparentColor,
            // height: hp(10),
            flex: 1,
          }}
          horizontal={true}
          data={leaves}
          renderItem={({item}) => {
            return (
              <View style={styles.sliderComp}>
                <Text style={{color: Colors.white}}>
                  {item}einnsifugvlfd;nfnliThe
                </Text>
              </View>
            );
          }}
          keyExtractor={({item}, index) => {
            return index;
          }}
        />
      </View>
    );
  };

  const applyLeave = () => {};
  return (
    <View style={styles.mainContainer}>
      <View style={styles.swiperContainer}>{sliderComponent()}</View>
      <View style={styles.mainPart}>
        <View style={styles.formContainer}>
          {card({
            leftLabel: 'From',
            rightLabel: 'To',
            selectableLeft: true,
            selectableRight: true,
            iconLeft: MonthImages.CalenderIcon,
            iconRight: MonthImages.CalenderIcon,
            leftOnPress: showFromDatePicker,
            rightOnPress: showToDatePicker,
            leftText: fromDate.fromDateStr,
            rightText: toDate.toDateStr,
          })}
          {card({
            leftLabel: 'Created Date',
            rightLabel: 'Half Day',
            selectableRight: true,
            leftText: finalTodayDate,
            iconRight: MonthImages.DropDownIcon,
            rightText: 'None',
          })}
          {card({
            leftLabel: 'Leave Type',
            rightLabel: 'Number of Days',
            selectableLeft: true,
            iconLeft: MonthImages.DropDownIcon,
            rightText: totalNumberOfLeaveDays > 0 ? totalNumberOfLeaveDays : '',
            leftText: 'Earned Leave',
          })}
          <DateTimePickerModal
            isVisible={fromCalenderVisible}
            mode="date"
            onConfirm={fromCalenderConfirm}
            onCancel={fromOnCancel}
          />
          <DateTimePickerModal
            isVisible={toCalenderVisible}
            mode="date"
            onConfirm={toCalenderConfirm}
            onCancel={toOnCancel}
          />
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
  swiperContainer: {
    flex: 0.14,
  },
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
    // alignItems: 'flex-end',
    paddingHorizontal: 5,
    paddingVertical: 5,
    height: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    textAlignVertical: 'top',
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
    flex: 0.84,
    justifyContent: 'space-between',
  },
  applyText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 15,
  },
  sliderComp: {
    width: wp(48),
    marginRight: wp(2),
  },
  leaveCard: {
    width: wp(48),
    margin: wp(1),
  },
});
