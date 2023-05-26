import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import styles from './RequestLunchStyle';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import jwt_decode from 'jwt-decode';

import DropDownPicker from 'react-native-dropdown-picker';
import SelectDateModal from 'modals/SelectDateModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {monthsName, RequestLunchLabel} from 'utils/defaultData';
import {getEmployeeProfileData, requestLunchSubmission} from 'redux/homeSlice';

const RequestLunch = ({navigation}) => {
  const token = useSelector(state => state.auth.userToken);
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;
  const {employeeProfile} = useSelector(state => state.home);

  const [startDate, setStartDate] = useState({
    startDateStr: 'Select Start Date',
  });
  const [endDate, setEndDate] = useState({endDateStr: 'Select End Date'});
  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [permReq, setPermReq] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [satrtDate1, setStartDate1] = useState('');
  const [endDate1, setEndDate1] = useState('');
  const [items, setItems] = useState(RequestLunchLabel);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    token && dispatch(getEmployeeProfileData({token, employeeID}));
  }, []);

  const onSelectItem = item => {
    let date = new Date().getDate();

    const todayDate = new Date();
    let month = monthsName[todayDate.getMonth()];
    let year = new Date().getFullYear();
    if (item.value === 'daily') {
      setStartDate({
        startDateStr: date + '/' + month + '/' + year,
        startDateObj: todayDate,
      });
      setEndDate({
        endDateStr: date + '/' + month + '/' + year,
        endDateObj: todayDate,
      });
      setPermReq(false);
    } else if (item.value === 'duration') {
      setStartDate({startDateStr: 'Select Start Date', startDateObj: {}});
      setEndDate({endDateStr: 'Select End Date', endDateObj: {}});
      setPermReq(false);
    } else {
      setStartDate({startDateStr: 'Select Start Date', startDateObj: {}});
      setEndDate({endDateStr: 'Select End Date', endDateObj: {}});
      setPermReq(true);
      if (date === 1) {
        month = monthsName[todayDate.getMonth()];
        setStartDate1(date + '-' + month + '-' + year);
        setEndDate1(16 + '-' + month + '-' + year);
      } else if (date > 1 && date <= 16) {
        month = monthsName[todayDate.getMonth()];
        setStartDate1(16 + '-' + month + '-' + year);
        month = monthsName[todayDate.getMonth() + 1];
        setEndDate1(1 + '-' + month + '-' + year);
      } else if (date > 16 && date < 31) {
        monthaaa = 'april';
        setStartDate1(1 + '-' + monthaaa + '-' + year);
        setEndDate1(16 + '-' + monthaaa + '-' + year);
      }
    }
  };
  const modalData = {
    openModal: openModal,
    setOpenModal: setOpenModal,
    satrtDate1: satrtDate1,
    endDate1: endDate1,
  };

  const hideDatePicker = pickerToClose => {
    pickerToClose();
  };

  const handleStartConfirm = date => {
    let selectedDate = date.getDate();

    let selectedMonth = monthsName[date.getMonth()];
    let selectedYear = date.getFullYear();
    setStartDate({
      startDateStr: selectedDate + ' / ' + selectedMonth + ' / ' + selectedYear,
      startDateObj: date,
    });
    hideDatePicker(setStartDatePickerVisible);
  };

  const handleEndConfirm = date => {
    let selectedDate = date.getDate();

    let selectedMonth = monthsName[date.getMonth()];
    let selectedYear = date.getFullYear();
    setEndDate({
      endDateStr: selectedDate + ' / ' + selectedMonth + ' / ' + selectedYear,
      endDateObj: date,
    });
    hideDatePicker(setEndDatePickerVisible);
  };

  const onSubmit = async () => {
    const isMonthly = value === 'monthly';
    setIsLoading(true);

    const response = await dispatch(
      requestLunchSubmission({
        token,
        employeeName: employeeProfile?.employeeName,
        employee: employeeProfile?.name,
        requestlunchstartdate: startDate?.startDateObj.toISOString(),
        requestlunchenddate: endDate?.endDateObj.toISOString(),
        requestforlunch: 1,
        requestforlunchcancellation: 0,
        lunchRequestType: value,
        montlyLunchSubscription: isMonthly ? 1 : 0,
        lunchcancellationrequestdate: null,
      }),
    );

    // monthly , duration

    setIsLoading(false);

    if (response?.error) {
      alert(response?.error?.message || 'Something went wrong.');
    } else {
      Alert.alert('Success', 'Lunch requested successfully!', [
        {
          text: 'Ok',
          onPress: () => {
            // navigation.goBack();
          },
        },
      ]);
    }
  };

  const cancelRequest = () => {};

  return (
    // <SharedElement id="enter">
    <View>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={MonthImages.backArrowS}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.lunchTextView}>
          <Text style={styles.text1}>Request Lunch</Text>
          <Image
            source={MonthImages.info_scopy}
            style={{height: 20, width: 20}}
          />
        </View>
      </View>

      <View style={styles.secondView}>
        <View style={styles.dropDownView}>
          <Text style={{flex: 1, fontSize: 20}}>Request Lunch :</Text>
          <DropDownPicker
            open={open}
            placeholder={'Please Select'}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onSelectItem={onSelectItem}
            containerStyle={{width: wp(50)}}
            style={{height: hp(1), height: 10, borderRadius: 4}}
            dropDownStyle={{
              backgroundColor: Colors.lightBlue,
              borderBottomWidth: 1,
            }}
            labelStyle={{
              fontSize: 13,
              textAlign: 'left',
              color: Colors.black,
              alignSelf: 'center',
            }}
          />
        </View>

        <DateTimePickerModal
          isVisible={startDatePickerVisible}
          mode="date"
          onConfirm={handleStartConfirm}
          onCancel={hideDatePicker.bind(null, setStartDatePickerVisible)}
        />
        <DateTimePickerModal
          isVisible={endDatePickerVisible}
          mode="date"
          onConfirm={handleEndConfirm}
          onCancel={hideDatePicker.bind(null, setEndDatePickerVisible)}
        />
        <View style={styles.thirdView}>
          {openModal ? <SelectDateModal modalData={modalData} /> : null}
          <Text style={{flex: 1, fontSize: 20}}>Start Date :</Text>
          <TouchableOpacity
            onPress={() => {
              if (permReq) {
                setOpenModal(true);
              } else {
                setStartDatePickerVisible(true);
              }
            }}>
            <View style={styles.fourthView}>
              <Text style={styles.selectedDated}>{startDate.startDateStr}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.fifthView}>
          <Text style={{flex: 1, fontSize: 20}}>End Date :</Text>
          <TouchableOpacity
            onPress={() => {
              if (permReq) {
                setOpenModal(false);
              } else {
                setEndDatePickerVisible(true);
              }
            }}>
            <View style={styles.sixthView}>
              <Text style={styles.selectedDated}>{endDate.endDateStr}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            opacity:
              !startDate.startDateStr || !endDate.endDateStr || !value
                ? 0.5
                : 1,
            marginTop: 20,
          }}
          disabled={!startDate.startDateStr || !endDate.endDateStr || !value}
          onPress={onSubmit}>
          <View style={styles.submitView}>
            <Text style={{color: Colors.white, textAlign: 'center'}}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttomView}>
        <View style={styles.appliedView}>
          <Text style={styles.appliedText}>Applied Subscriptions</Text>
        </View>

        <View style={styles.monthlyRequestView}>
          <View style={styles.monthlyView}>
            <Text style={{fontSize: 15}}>Monthly Request</Text>

            <TouchableOpacity onPress={cancelRequest} style={styles.cancelView}>
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: 'bold',
                }}>
                Cancel Request
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttomTextView}>
            <Text style={styles.buttomText}>Start Date :</Text>
            <TextInput editable={false} value={'1/September/2022'} />
          </View>
        </View>
      </View>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <View style={styles.loaderBackground} />
          <ActivityIndicator size="large" />
        </View>
      ) : null}
    </View>
    // </SharedElement>
  );
};

export default RequestLunch;
