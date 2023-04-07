import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import {useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
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
import styles from './ApplyLeaveStyle';

import {
  leaveTypes,
  newDropDownOptions,
  approver,
  leaves,
} from 'utils/DummyData';
import {applyForLeave} from 'redux/homeSlice';
import {useSelector} from 'react-redux';

const ApplyLeave = () => {
  const {userToken: token} = useSelector(state => state.auth);
  const [fromCalenderVisible, setFromCalenderVisible] = useState(false);
  const [toCalenderVisible, setToCalenderVisible] = useState(false);
  const [fromDate, setFromDate] = useState({fromDateStr: ''});
  const [toDate, setToDate] = useState({toDateStr: ''});
  const [totalNumberOfLeaveDays, setTotalNumberOfLeaveDays] = useState('');
  const [selectedHolidayType, setSelectedHolidayType] = useState(null);
  const [openHolidayType, setOpenHolidayType] = useState(false);
  const [selectedCard, setSelectedCard] = useState({leaveType: 'Earned Leave'});
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
    const presentDate = String(date.getDate()).padStart(2, '0');
    const presentMonth = date.toLocaleString('default', {month: 'short'});
    const presentYear = date.getFullYear();

    const finalTodayDate = `${presentDate}-${presentMonth}-${presentYear}`;

    if (toDate.toDateObj) {
      const diffInMs = toDate.toDateObj.getTime() - date.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;
      setTotalNumberOfLeaveDays(diffInDays);
    }

    // const totalDays=+presentDate

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
    zIndex,
  }) => {
    return (
      <View style={[styles.fromToContainer, {zIndex}]}>
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
              {leftText ? <Text>{leftText}</Text> : null}
              {selectableLeft ? (
                <TouchableOpacity onPress={leftOnPress}>
                  <Image source={iconLeft} style={{height: 20, width: 20}} />
                </TouchableOpacity>
              ) : null}
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

  const leaveCard = (data, index) => {
    const {leaveType, allocated, taken, remaining} = data;
    let checkSelected = data.leaveType == selectedCard.leaveType;
    return (
      <View
        style={{
          ...styles.leaveCard,
          backgroundColor: checkSelected ? 'green' : 'white',
        }}>
        <View
          style={{
            ...styles.leaveTextContainer,
            borderBottomColor: checkSelected ? Colors.white : Colors.black,
          }}>
          <Text
            style={{
              ...styles.leaveText,
              color: checkSelected ? Colors.white : Colors.black,
            }}>
            {data.leaveType}
          </Text>
        </View>
        <View style={styles.bottomPart}>
          <View
            style={{
              ...styles.remainingContainer,
              backgroundColor: Colors.white,
            }}>
            <Text style={styles.remainingText}>{data.remaining}</Text>
          </View>
          <View
            style={{
              ...styles.verticalLine,
              borderColor: checkSelected ? Colors.white : Colors.black,
            }}
          />
          <View style={styles.leaveDetails}>
            <View style={styles.allocated}>
              <Text
                style={{
                  ...styles.allocatedText,
                  color: checkSelected ? Colors.white : Colors.black,
                }}>
                Allocated: {data.allocated}
              </Text>
            </View>
            <View style={styles.taken}>
              <Text
                style={{
                  ...styles.takenText,
                  color: checkSelected ? Colors.white : Colors.black,
                }}>
                Taken: {data.taken}
              </Text>
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
            backgroundColor: Colors.darkBlue,
            // height: hp(10),
            paddingHorizontal: wp(2.4),
            paddingVertical: hp(1.2),
            flex: 1,
          }}
          horizontal={true}
          data={leaves}
          renderItem={({item, index}) => {
            return leaveCard(item, index);
            // <View style={styles.sliderComp}>
            //   <Text style={{color: Colors.white}}>
            //     {item}einnsifugvlfd;nfnliThe
            //   </Text>
            // </View>
          }}
          keyExtractor={(item, index) => index}
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

  const renderButtonText = option => {
    return (
      <View
        style={{
          // paddingLeft: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16}}>{option}</Text>
      </View>
    );
  };

  const applyLeave = () => {
    applyForLeave({
      token,
      body: {
        employeeId: 10352,
        fromDate: '2023-03-31T11:10:09.792Z',
        toDate: '2023-03-31T11:10:09.792Z',
        totalLeaveDays: 1,
        description: 'Testing',
        halfDay: 0,
        postingDate: '2023-03-29T11:10:09.792Z',
        leaveType: 'Earned Leave',
        leaveApprover: 'Mayank Sharma',
      },
    });
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.swiperContainer}>{sliderComponent()}</View>

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
            zIndex: 1000,
          })}
          {card({
            zIndex: 1000,
            leftLabel: 'Created Date',
            rightLabel: 'Half Day',
            selectableRight: true,
            leftText: finalTodayDate,
            iconRight: MonthImages.DropDownIcon,
            rightText: 'None',
            rightDropdown: (
              <View>
                <ModalDropdown
                  renderButtonText={renderButtonText}
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
                  }}
                  renderRow={renderRow}
                  onSelect={(index, itemName) => {
                    setHalfDay(itemName);
                  }}
                  renderRightComponent={renderRightComponent}
                />
              </View>
            ),
          })}
          {card({
            zIndex: 1000,
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
                    paddingLeft: 6,
                  }}
                  animated={true}
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

// =======================================================================================

// const DropDown = ({
//   value = '',
//   label = '',
//   field = '',
//   state = {},
//   list = [],
//   setState,
//   typeOpen = '',
//   disabled = false,
//   setFirstSelected,
//   styles = {},
//   width,
//   placeholder = '- Select -',
//   containerStyle = {},
//   multiple,
//   customMethod,
//   display,
//   setsearchFocussed,
//   fieldOpen,
//   bottomStyle = {},
//   ...props
// }) => {
//   return (
//     <DropDownPickerComponent
//       bottomStyle={bottomStyle}
//       value={multiple ? value || [] : value || undefined}
//       dropDownDirection={'AUTO'}
//       closeAfterSelecting={true}
//       label={label}
//       open={state[fieldOpen] || false}
//       onPress={() => {
//         setState && setState({...state, [fieldOpen]: !state[fieldOpen]});
//       }}
//       renderListItem={({item}) => {
//         return (
//           <TouchableOpacity
//             key={item?.label || 'key'}
//             style={{
//               paddingVertical: 5,
//               paddingHorizontal: 10,
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}
//             onPress={() => {
//               setState &&
//                 setState({
//                   ...state,
//                   id: item?.key,
//                   [field]: item?.value,
//                   ...item,
//                   [fieldOpen]: false,
//                 });
//               setFirstSelected && setFirstSelected(true);
//             }}>
//             <Text
//               style={{
//                 // fontFamily: FontFamily.REGULAR,
//                 fontSize: FontSize.h16,
//                 color: Colors.grey,
//                 paddingVertical: 5,
//                 color: state[field] == item.value ? Colors.purple : Colors.grey,
//                 // fontFamily:
//                 //   state[field] == item.value
//                 //     ? FontFamily.SEMI_BOLD
//                 //     : FontFamily.REGULAR,
//               }}>
//               {item?.label}
//             </Text>
//           </TouchableOpacity>
//         );
//       }}
//       listMode={'SCROLLVIEW'}
//       items={list}
//       style={{
//         minHeight: 32,
//         borderRadius: 3,
//         borderWidth: 1,
//         borderColor: '#ccc',
//       }}
//       textStyle={[styles.textStyle, disabled && {color: '#adb5bd'}]}
//       placeholder={placeholder}
//       containerStyle={{
//         borderWidth: 0,
//       }}
//       showTickIcon={true}
//       dropDownContainerStyle={[styles.dropDownContainerStyle]}
//       itemSeparatorStyle={{backgroundColor: Colors.borderColor}}
//       itemSeparator={true}
//       disabled={disabled}
//       searchable={true}
//       searchPlaceholder={'Search...'}
//       searchContainerStyle={[
//         styles.searchContainerStyle,
//         {margin: 0, padding: 0, height: 30},
//       ]}
//       // ListHeaderComponentStyle={{zIndex: 10}}
//       searchTextInputStyle={{
//         borderWidth: 0,
//       }}
//       multiple={multiple ? true : false}
//       // searchTextInputProps={{
//       //   onFocus: () => setsearchFocussed(true),
//       //   onBlur: () => setsearchFocussed(false),
//       // }}
//       {...props}
//     />
//   );
// };
