import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import styles from './RequestLunchStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDateModal from 'modals/SelectDateModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useSelector} from 'react-redux';

const RequestLunch = ({navigation}) => {
  const MonthlyDate = useSelector(state => state.dataReducer.dateData);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState('');
  const [modalForStartDate, setModalForStartDate] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [permReq, setPermReq] = useState(false);
  const [permissionForClick, setPersssionForClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [satrtDate1, setStartDate1] = useState('');
  const [endDate1, setEndDate1] = useState('');

  const [items, setItems] = useState([
    {label: 'TODAY', value: 'today'},
    {label: 'REQUEST FOR DURATION', value: 'req_duration'},
    {label: 'MONTHLY LUNCH', value: 'monthly_lunch'},
  ]);

  const onSelectItem = item => {
    let date = new Date().getDate();
    const name = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const d = new Date();
    let month = name[d.getMonth()];
    let year = new Date().getFullYear();
    if (item.value === 'today') {
      setStartDate(date + '/' + month + '/' + year);
      setEndDate(date + '/' + month + '/' + year);
      setPermReq(false);
      setPersssionForClick(false);
    } else if (item.value === 'req_duration') {
      setStartDate('');
      setEndDate('');
      setPermReq(false);
      setPersssionForClick(true);
    } else {
      setStartDate('');
      setEndDate('');
      setPermReq(true);
      setPersssionForClick(true);
      if (date === 1) {
        month = name[d.getMonth()];
        setStartDate1(date + '-' + month + '-' + year);
        setEndDate1(16 + '-' + month + '-' + year);
      } else if (date > 1 && date <= 16) {
        month = name[d.getMonth()];
        setStartDate1(16 + '-' + month + '-' + year);
        month = name[d.getMonth() + 1];
        setEndDate1(1 + '-' + month + '-' + year);
      }
    }
  };
  const modalData = {
    openModal: openModal,
    setOpenModal: setOpenModal,
    satrtDate1: satrtDate1,
    endDate1: endDate1,
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    if (modalForStartDate) {
      setStartDate(date.toString());
    } else {
      setEndDate(date.toString());
    }
    hideDatePicker();
  };

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
              fontSize: wp('3.5%'),
              textAlign: 'left',
              color: Colors.black,
              alignSelf: 'center',
            }}
          />
        </View>
        {isDatePickerVisible ? (
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        ) : null}
        <View style={styles.thirdView}>
          {openModal ? <SelectDateModal modalData={modalData} /> : null}
          <Text style={{flex: 1, fontSize: 20}}>Start Date :</Text>
          <TouchableOpacity
            onPress={() => {
              if (permissionForClick) {
                if (permReq) {
                  setOpenModal(true);
                } else {
                  setModalForStartDate(true);
                  setDatePickerVisibility(true);
                }
              }
            }}>
            <View style={styles.fourthView}>
              <TextInput editable={false} value={startDate} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.fifthView}>
          <Text style={{flex: 1, fontSize: 20}}>End Date :</Text>
          <TouchableOpacity
            onPress={() => {
              if (permissionForClick) {
                if (permReq) {
                  setOpenModal(false);
                } else {
                  setModalForStartDate(false);
                  setDatePickerVisibility(true);
                }
              }
            }}>
            <View style={styles.sixthView}>
              <TextInput editable={false} value={endDate} />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <View style={styles.submitView}>
            <Text style={{color: 'white', textAlign: 'center'}}>Submit</Text>
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
            <View style={styles.cancelView}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Cancel Request
              </Text>
            </View>
          </View>
          <View style={styles.buttomTextView}>
            <Text style={styles.buttomText}>Start Date :</Text>
            <TextInput editable={false} value={'1/September/2022'} />
          </View>
        </View>
      </View>
    </View>
    // </SharedElement>
  );
};

export default RequestLunch;
