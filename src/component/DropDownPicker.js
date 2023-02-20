import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {View, Text, Image, Modal} from 'react-native';
import {Colors} from 'colors/Colors';
// import {FontFamily, FontSize} from 'constants/Fonts';

// const DropdownIcon = require('assets/images/icon_down.png');

const DropDownPickerComponent = props => {
  const [state, setState] = useState({});
  const {multiple, value = []} = props;
  let multipleText = '';
  if (multiple) {
    value?.map((text, index) => {
      if (index == 0) {
        multipleText = multipleText + text;
      } else {
        multipleText = multipleText + ',' + text;
      }
    });
  }

  const {listItemStyle} = props;

  return (
    <View
      style={{
        // zIndex: 1000,
        zIndex: -5,
      }}>
      {props?.label ? (
        <Text
          style={{
            fontWeight: '700',
            marginBottom: 5,
            marginLeft: 4,
            fontSize: 15,
          }}>
          {props?.label || ''}
        </Text>
      ) : null}
      <DropDownPicker
        placeholderStyle={{
          //   fontFamily: FontFamily.BOLD,
          color: Colors.dune,
          //   fontSize: FontSize.h16,
        }}
        labelStyle={{
          //   fontFamily: FontFamily.BOLD,
          color: Colors.dune,
          //   fontSize: FontSize.h16,
        }}
        listItemLabelStyle={
          listItemStyle && {
            color: '#495057',
          }
        }
        // ArrowDownIconComponent={() => <Image source={DropdownIcon} />}
        // ArrowUpIconComponent={({style}) => <Image source={DropdownIcon} />}
        // onPress={() => {
        //   setState({ ...state, open: true });
        // }}
        // onClose={(item) => {
        //   setState({ ...state, open: false });
        // }}
        {...props}
        multipleText={multipleText}
        dropDownDirection={'BOTTOM'}
        listMode="SCROLLVIEW"
        autoScroll={true}
        nestedScrollEnabled={true}
        // ArrowDownIconComponent={() =>  <DownIcon />}
        // ArrowUpIconComponent={() =>  <DownIcon />}
      />
    </View>
  );
};

export default DropDownPickerComponent;
