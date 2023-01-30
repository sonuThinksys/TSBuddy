import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import SelectDropdown from 'react-native-select-dropdown';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
//import {SharedElement} from 'react-navigation-shared-element';
import DropDownPicker from 'react-native-dropdown-picker';
const RequestLunch = ({navigation}) => {
  const dropData = ['TODAY', 'REQUEST FOR DURATION', 'MONTHLY LUNCH'];

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Apple1', value: 'apple1'},
    {label: 'Banana', value: 'banana'},
    {label: 'Banana1', value: 'banana1'},
  ]);

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
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: hp(1),
            paddingHorizontal: wp(2),
            alignItems: 'center',
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
            label="Request for"
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            // maxHeight={hp(50)}
            containerStyle={{width: wp(50)}}
            style={{height: hp(1), height: 10, borderRadius: 4}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: hp(1),
            paddingHorizontal: wp(2),
            alignItems: 'center',
            marginTop: hp(2),
          }}>
          <Text style={{flex: 1, fontSize: 20}}>Start Date :</Text>
          <TextInput
            style={{
              borderRadius: 4,
              borderWidth: 1,
              width: wp(50),
              height: hp(4),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: hp(1),
            paddingHorizontal: wp(2),
            alignItems: 'center',
          }}>
          <Text style={{flex: 1, fontSize: 20}}>End Date :</Text>
          <TextInput
            style={{
              borderRadius: 4,
              borderWidth: 1,
              width: wp(50),
              height: hp(4),
            }}
          />
        </View>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: Colors.darkBlue,
              paddingVertical: hp(1),
              width: wp(30),
            }}>
            <Text style={{color: 'white'}}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    // </SharedElement>
  );
};

export default RequestLunch;
