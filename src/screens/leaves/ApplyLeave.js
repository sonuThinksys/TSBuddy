import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import {useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ModalDropdown from 'react-native-modal-dropdown';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

import DropDownPickerComponent from 'component/DropDownPicker';
import {FontSize} from 'constants/fonts';

const ApplyLeave = () => {
  const [fromCalenderVisible, setFromCalenderVisible] = useState(false);
  const [toCalenderVisible, setToCalenderVisible] = useState(false);
  const [fromDate, setFromDate] = useState({fromDateStr: ''});
  const [toDate, setToDate] = useState({toDateStr: ''});
  const [totalNumberOfLeaveDays, setTotalNumberOfLeaveDays] = useState('');
  const [selectedHolidayType, setSelectedHolidayType] = useState(null);
  const [openHolidayType, setOpenHolidayType] = useState(false);
  const [typeState, setTypeState] = useState({
    type: '',
    typeName: '',
    typeOpen: false,
    id: null,
  });
  const [halfDay, setHalfDay] = useState('');
  const [leaveType, setLeaveType] = useState('');

  const setTypeValue = data => {
    setTypeState(prevData => {
      return {...prevData, ...data};
    });
  };

  const holidayTypeOptions = [
    {label: 'First Half Day', value: 'firstHalf'},
    {label: 'Second Half Day', value: 'secondHalf'},
    {label: 'None', value: 'none'},
  ];

  const newDropDownOptions = ['First Half Day', 'Second Half Day', 'None'];

  const leaveTypes = [
    'Earned Leave',
    'Restricted Holiday',
    'Bereavement Leave',
    'Compensatory Off',
    'Maternity Leave',
    'Paternity Leave',
    'Work From Home',
  ];

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

  const leaves = [
    {leaveType: 'Earned Leave', allocated: 12.25, taken: 3, remaining: 9.25},
    {leaveType: 'Restricted Holiday', allocated: 4, taken: 3, remaining: 1},
    {leaveType: 'Bereavement Leave', allocated: 0, taken: 0, remaining: 0},
    {leaveType: 'Compensatory Off', allocated: 0, taken: 0, remaining: 0},
    {leaveType: 'Maternity Leave', allocated: 0, taken: 0, remaining: 0},
    {leaveType: 'Paternity Leave', allocated: 0, taken: 0, remaining: 0},
    {leaveType: 'Work From Home', allocated: 13, taken: 23, remaining: -10},
  ];

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
    rightDropdown,
    leftDropdown,
  }) => {
    return (
      <View style={[styles.fromToContainer]}>
        {leftDropdown ? (
          <View style={styles.fromContainer}>
            <Text style={styles.fromText}>{leftLabel}</Text>
            {leftDropdown}
          </View>
        ) : (
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
        )}
        {rightDropdown ? (
          <View style={[styles.toContainer, {zIndex: 1000}]}>
            <Text style={styles.toText}>{rightLabel}</Text>
            {rightDropdown}
          </View>
        ) : (
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
        )}
      </View>
    );
  };

  const leaveCard = data => {
    const {leaveType, allocated, taken, remaining} = data;
    return (
      <View style={styles.leaveCard}>
        <View style={styles.leaveTextContainer}>
          <Text style={styles.leaveText}>{data.leaveType}</Text>
        </View>
        <View style={styles.bottomPart}>
          <View style={styles.remainingContainer}>
            <Text style={styles.remainingText}>{data.remaining}</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.leaveDetails}>
            <View style={styles.allocated}>
              <Text style={styles.allocatedText}>
                Allocated: {data.allocated}
              </Text>
            </View>
            <View style={styles.taken}>
              <Text style={styles.takenText}>Taken: {data.taken}</Text>
            </View>
          </View>
        </View>
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
            paddingHorizontal: wp(2.4),
            paddingVertical: hp(1.2),
            flex: 1,
          }}
          horizontal={true}
          data={leaves}
          renderItem={({item}) => {
            return leaveCard(item);
            // <View style={styles.sliderComp}>
            //   <Text style={{color: Colors.white}}>
            //     {item}einnsifugvlfd;nfnliThe
            //   </Text>
            // </View>
          }}
          keyExtractor={({item}, index) => {
            return index;
          }}
        />
      </View>
    );
  };

  const renderRow = (rowData, rowID, highlighted) => {
    return (
      <View
        style={[
          styles.row,
          {borderBottomColor: Colors.lightGray, borderBottomWidth: 1},
          highlighted && styles.highlighted,
        ]}>
        <Text style={[styles.rowText]}>{rowData}</Text>
      </View>
    );
  };

  const renderRightComponent = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingTop: 4,
        position: 'absolute',
        right: 0,
      }}>
      <Image
        source={MonthImages.DropDownIcon}
        style={{
          height: 20,
          width: 20,
        }}
      />
    </View>
  );

  const applyLeave = () => {};
  return (
    <View style={styles.mainContainer}>
      <View style={styles.swiperContainer}>{sliderComponent()}</View>

      <DropDown
        field="country"
        value={typeState.type}
        label="Type:"
        state={typeState}
        setState={setTypeValue}
        fieldOpen="typeOpen"
        list={holidayTypeOptions || []}
        // setFirstSelected={setFirstSelected}
        maxHeight={20}
        styles={styles}
        // maxHeight={styles.dropDownHeightStyle}
        containerStyle={{
          marginHorizontal: '5%',
        }}
        display={'flex'}
      />
      {/* // ) : null} */}
      <View style={styles.mainPart}>
        <View style={[styles.formContainer]}>
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
            rightDropdown: (
              <View
                style={{
                  // marginHorizontal: '5%',
                  // zIndex: -5,
                  zIndex: 99999,
                }}>
                <ModalDropdown
                  // renderRightComponent={
                  //   <Image
                  //     source={MonthImages.DropDownIcon}
                  //     style={{height: 20, width: 20}}
                  //   />
                  // }
                  style={{
                    borderWidth: 1,
                    backgroundColor: Colors.white,
                    borderRadius: 3,
                    paddingVertical: 5,
                    height: 32,
                  }}
                  isFullWidth={true}
                  showsVerticalScrollIndicator={false}
                  defaultValue=""
                  options={newDropDownOptions}
                  dropdownStyle={{
                    width: '45%',
                    paddingLeft: 10,
                    // borderColor: Colors.black,
                    // borderWidth: 1,
                  }}
                  // dropdownTextStyle={{
                  //   borderBottomWidth: 1,
                  //   borderBottomColor: 'blue',
                  // }}
                  renderRow={renderRow}
                  onSelect={(index, itemName) => {
                    setHalfDay(itemName);
                  }}
                  // renderRightComponent={() => (
                  // <Image
                  //   source={MonthImages.DropDownIcon}
                  //   style={{
                  //     height: 20,
                  //     width: 20,
                  //   }}
                  // />
                  // )}

                  renderRightComponent={renderRightComponent}
                />

                {/* <DropDown
                  bottomStyle={styles.bottomStyle}
                  field="country"
                  value={typeState.type}
                  label="Type:"
                  state={typeState}
                  setState={setTypeValue}
                  fieldOpen="typeOpen"
                  list={holidayTypeOptions || []}
                  // setFirstSelected={setFirstSelected}
                  maxHeight={20}
                  styles={styles}
                  // maxHeight={styles.dropDownHeightStyle}
                  containerStyle={{
                    marginHorizontal: '5%',
                  }}
                  display={'flex'}
                /> */}
                {/* // ) : null} */}
              </View>
            ),
          })}
          {card({
            leftLabel: 'Leave Type',
            rightLabel: 'Number of Days',
            selectableLeft: true,
            iconLeft: MonthImages.DropDownIcon,
            rightText: totalNumberOfLeaveDays > 0 ? totalNumberOfLeaveDays : '',
            leftText: 'Earned Leave',
            leftDropdown: (
              <View style={{}}>
                <ModalDropdown
                  style={{
                    borderWidth: 1,
                    backgroundColor: Colors.white,
                    borderRadius: 3,
                    paddingVertical: 5,
                    height: 32,
                  }}
                  isFullWidth={true}
                  showsVerticalScrollIndicator={false}
                  defaultValue=""
                  options={leaveTypes}
                  dropdownStyle={{
                    width: '45%',
                    paddingLeft: 10,
                  }}
                  renderRow={renderRow}
                  onSelect={(index, itemName) => {
                    setLeaveType(itemName);
                  }}
                  renderRightComponent={renderRightComponent}
                />
              </View>
            ),
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
    // position: 'absolute',
  },

  swiperContainer: {
    flex: 0.14,
  },
  formContainer: {
    paddingHorizontal: 10,
  },
  fromToContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.whitishGray,
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
    backgroundColor: Colors.whitishGray,
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
    backgroundColor: Colors.whitishGray,
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
    width: wp(47),
    marginRight: wp(2.4),
    backgroundColor: Colors.white,
    borderRadius: 6,
  },
  leaveTextContainer: {
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.black,
    paddingBottom: hp(0.5),
  },
  leaveText: {
    textAlign: 'center',
    color: Colors.black,
    fontWeight: '700',
  },
  bottomPart: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  remainingContainer: {
    width: wp(11),
    height: wp(11),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.parrotGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(3),
  },
  remainingText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.parrotGreen,
  },
  verticalLine: {
    height: '100%',
    borderWidth: 0.4,
    borderColor: 'black',
  },
  leaveDetails: {
    // alignItems: 'center',
    alignContent: 'center',
    marginLeft: wp(3),
  },
  allocated: {
    flex: 1,
    justifyContent: 'center',
  },
  taken: {
    flex: 1,
  },
  allocatedText: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '600',
  },
  takenText: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '600',
  },
  platformStyle: {
    marginBottom: hp(5),
    marginHorizontal: '5%',
  },
  marginBottom: hp(2),
  dropDownContainerStyle: {borderColor: Colors.borderColor},
  searchContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    height: 40,
  },

  row: {
    padding: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  highlighted: {
    backgroundColor: 'lightgrey',
  },
  rowText: {
    fontSize: 16,
  },
});

// =======================================================================================

const DropDown = ({
  value = '',
  label = '',
  field = '',
  state = {},
  list = [],
  setState,
  typeOpen = '',
  disabled = false,
  setFirstSelected,
  styles = {},
  width,
  placeholder = '- Select -',
  containerStyle = {},
  multiple,
  customMethod,
  display,
  setsearchFocussed,
  fieldOpen,
  bottomStyle = {},
  ...props
}) => {
  return (
    <DropDownPickerComponent
      bottomStyle={bottomStyle}
      value={multiple ? value || [] : value || undefined}
      dropDownDirection={'AUTO'}
      closeAfterSelecting={true}
      label={label}
      open={state[fieldOpen] || false}
      onPress={() => {
        setState && setState({...state, [fieldOpen]: !state[fieldOpen]});
      }}
      renderListItem={({item}) => {
        return (
          <TouchableOpacity
            key={item?.label || 'key'}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => {
              setState &&
                setState({
                  ...state,
                  id: item?.key,
                  [field]: item?.value,
                  ...item,
                  [fieldOpen]: false,
                });
              setFirstSelected && setFirstSelected(true);
            }}>
            <Text
              style={{
                // fontFamily: FontFamily.REGULAR,
                fontSize: FontSize.h16,
                color: Colors.grey,
                paddingVertical: 5,
                color: state[field] == item.value ? Colors.purple : Colors.grey,
                // fontFamily:
                //   state[field] == item.value
                //     ? FontFamily.SEMI_BOLD
                //     : FontFamily.REGULAR,
              }}>
              {item?.label}
            </Text>
          </TouchableOpacity>
        );
      }}
      listMode={'SCROLLVIEW'}
      items={list}
      style={{
        minHeight: 32,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#ccc',
      }}
      textStyle={[styles.textStyle, disabled && {color: '#adb5bd'}]}
      placeholder={placeholder}
      containerStyle={{
        borderWidth: 0,
      }}
      showTickIcon={true}
      dropDownContainerStyle={[styles.dropDownContainerStyle]}
      itemSeparatorStyle={{backgroundColor: Colors.borderColor}}
      itemSeparator={true}
      disabled={disabled}
      searchable={true}
      searchPlaceholder={'Search...'}
      searchContainerStyle={[
        styles.searchContainerStyle,
        {margin: 0, padding: 0, height: 30},
      ]}
      // ListHeaderComponentStyle={{zIndex: 10}}
      searchTextInputStyle={{
        borderWidth: 0,
      }}
      multiple={multiple ? true : false}
      // searchTextInputProps={{
      //   onFocus: () => setsearchFocussed(true),
      //   onBlur: () => setsearchFocussed(false),
      // }}
      {...props}
    />
  );
};
