import React from 'react';
import styles from './DailyReportsStyles';
import {Pressable, Text, View} from 'react-native';
const HeaderTab = ({selectedHeaderTab, changeTabHandler}) => {
  return (
    <View style={styles.headerBarTabs}>
      <Pressable
        onPress={changeTabHandler.bind(null, 'attendance')}
        style={[
          styles.textContainer,
          selectedHeaderTab === 'attendance' ? styles.backgroundPurple : null,
          styles.borderRadiusLeft,
        ]}>
        <Text
          style={[
            styles.headerTabText,
            selectedHeaderTab === 'attendance'
              ? styles.colorWhite
              : styles.colorGray,
          ]}>
          Attendance
        </Text>
      </Pressable>
      <Pressable
        onPress={changeTabHandler.bind(null, 'leave')}
        style={[
          styles.textContainer,
          selectedHeaderTab === 'leave' ? styles.backgroundPurple : null,
          styles.borderVertical,
        ]}>
        <Text
          style={[
            styles.headerTabText,
            selectedHeaderTab === 'leave'
              ? styles.colorWhite
              : styles.colorGray,
          ]}>
          Leave
        </Text>
      </Pressable>
      <Pressable
        onPress={changeTabHandler.bind(null, 'work mode')}
        style={[
          styles.textContainer,
          selectedHeaderTab === 'work mode' ? styles.backgroundPurple : null,
          styles.borderRadiusRight,
        ]}>
        <Text
          style={[
            styles.headerTabText,
            selectedHeaderTab === 'work mode'
              ? styles.colorWhite
              : styles.colorGray,
          ]}>
          Work Mode
        </Text>
      </Pressable>
    </View>
  );
};

export default HeaderTab;
