import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  //DatePicker,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';

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
      <View
        style={{
          backgroundColor: Colors.darkBlue,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingHorizontal: wp(5),
          paddingVertical: hp(2),
        }}>
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
        <View
          style={{
            flexDirection: 'row',
            flex: 4,
            justifyContent: 'center',
            paddingTop: hp(0.5),
          }}>
          <Text
            style={{
              color: Colors.white,
              marginRight: wp(2),
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Request Lunch
          </Text>
          <Image
            source={MonthImages.info_scopy}
            style={{height: 20, width: 20}}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          shadowOpacity: 0.1,
          top: hp(1),
          marginHorizontal: wp(2),
          paddingHorizontal: wp(2),
          paddingVertical: hp(2),
          display: 'flex',
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: hp(1),
            paddingHorizontal: wp(2),
            alignItems: 'center',
            zIndex: 1000,
          }}>
          <Text style={{flex: 1, fontSize: 20}}>Request Lunch :</Text>
          {/* <SelectDropdown
            data={dropData}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText="Please Select"
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            style={{backgroundColor: 'red'}}
          /> */}

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
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: hp(1),
            paddingHorizontal: wp(2),
            alignItems: 'center',
            marginTop: hp(2),
          }}>
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
            <View
              style={{
                borderRadius: 4,
                borderWidth: 1,
                width: wp(50),
                height: hp(4),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, opacity: 0.7}}>{startDate}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: hp(1),
            paddingHorizontal: wp(2),
            alignItems: 'center',
          }}>
          <Text style={{flex: 1, fontSize: 20}}>End Date :</Text>
          <TouchableOpacity
            onPress={() => {
              setOpenCalender(true);
            }}>
            <View
              style={{
                borderRadius: 4,
                borderWidth: 1,
                width: wp(50),
                height: hp(4),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, opacity: 0.7}}>{endDate}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: Colors.darkBlue,
              paddingVertical: hp(1.5),
              width: wp(50),
              marginHorizontal: wp(20),
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          shadowOpacity: 0.1,
          top: hp(2),
          marginHorizontal: wp(2),
          paddingHorizontal: wp(2),
          paddingVertical: hp(2),
          display: 'flex',
          height: hp(52),
        }}>
        <View
          style={{
            backgroundColor: '#C0C0C0',
            paddingVertical: hp(1.5),
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              color: 'rgb(1,98,143)',
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
            }}>
            Applied Subscriptions
          </Text>
        </View>

        <View
          style={{
            // backgroundColor: '#C0C0C0',
            marginTop: hp(1),
            shadowOpacity: 0.4,
            borderRadius: 2,
            backgroundColor: '#F4F5FA',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              paddingVertical: hp(2),
              paddingHorizontal: wp(4),
            }}>
            <Text style={{fontSize: 15}}>Monthly Request</Text>
            <View
              style={{
                backgroundColor: 'red',
                paddingVertical: hp(0.5),
                paddingHorizontal: wp(1),
                borderRadius: 4,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Cancel Request
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: wp(20),
              paddingVertical: hp(3),
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: Colors.lightBlue,
              }}>
              Start Date :
            </Text>
            <Text style={{fontSize: 16}}>01/Sep/2022</Text>
          </View>
        </View>
      </View>
    </View>
    // </SharedElement>
  );
};

export default RequestLunch;
