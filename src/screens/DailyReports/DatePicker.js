import React from 'react';
import {View, Text, Pressable} from 'react-native';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import {Colors} from 'colors/Colors';

const DatePicker = ({title, styles, selectedDate = '', selectDateHandler}) => {
  return (
    <View style={styles.datePickerMainContainer}>
      <Text style={styles.datePickerTitleText}>{title}</Text>
      <Pressable onPress={selectDateHandler} style={styles.calenderContainer}>
        <Text>{selectedDate}</Text>
        <CalenderIcon
          height={18}
          width={18}
          fill={Colors.lightGray1}
          marginRight={8}
        />
      </Pressable>
    </View>
  );
};

export default DatePicker;
