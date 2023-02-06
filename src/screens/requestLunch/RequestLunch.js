import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import styles from './RequestLunchStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
//import {SharedElement} from 'react-navigation-shared-element';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDateModal from 'modals/SelectDateModal';
const RequestLunch = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [opentCalender, setOpenCalender] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [permReq, setPermReq] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'TODAY', value: 'today'},
    {label: 'REQUEST FOR DURATION', value: 'req_duration'},
    {label: 'MONTHLY LUNCH', value: 'monthly_lunch'},
  ]);

  const onSelectItem = item => {
    if (item.value === 'today') {
      let date = new Date().getDate();
      const datee = new Date(2009, 10, 10);
      const month = datee.toLocaleString('default', {month: 'long'});
      let year = new Date().getFullYear();
      setStartDate(date + '/' + month + '/' + year);
      setEndDate(date + '/' + month + '/' + year);
    } else if (item.value === 'req_duration') {
      setStartDate('');
      setEndDate('');
      // setPermReq(true);
    } else {
      setStartDate('');
      setEndDate('');
      setPermReq(true);
    }
  };
  const modalData = {
    openModal: openModal,
    setOpenModal: setOpenModal,
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
              color: 'red',
              alignSelf: 'center',
            }}
          />
        </View>
        {opentCalender ? (
          <DatePicker
            modal
            open={opentCalender}
            date={date}
            onConfirm={date => {
              setOpenCalender(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpenCalender(false);
            }}
          />
        ) : null}
        <View style={styles.thirdView}>
          {openModal ? <SelectDateModal modalData={modalData} /> : null}
          <Text style={{flex: 1, fontSize: 20}}>Start Date :</Text>
          <TouchableOpacity
            onPress={() => {
              // setOpenCalender(true);
              if (permReq) {
                setOpenModal(true);
              } else {
                setOpenCalender(true);
              }
            }}>
            <View style={styles.fourthView}>
              <Text style={{fontSize: 16, opacity: 0.7}}>{startDate}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.fifthView}>
          <Text style={{flex: 1, fontSize: 20}}>End Date :</Text>
          <TouchableOpacity
            onPress={() => {
              setOpenCalender(true);
            }}>
            <View style={styles.sixthView}>
              <Text style={{fontSize: 16, opacity: 0.7}}>{endDate}</Text>
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
            <Text style={{fontSize: 16}}>01/Sep/2022</Text>
          </View>
        </View>
      </View>
    </View>
    // </SharedElement>
  );
};

export default RequestLunch;
