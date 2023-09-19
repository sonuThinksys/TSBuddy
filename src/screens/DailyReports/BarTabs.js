import React from 'react';
import {Pressable, Text, View} from 'react-native';

const BarTabs = ({
  changeBottomTabHandler,
  styles,
  selectedTab,
  TAB1,
  TAB2,
  TAB3,
  TAB4,
  TAB5,
}) => {
  return (
    <View style={styles.bottomBarTabs}>
      <Pressable
        onPress={changeBottomTabHandler.bind(null, TAB1)}
        style={[
          styles.bottomBarTab,
          styles.borderRadiusLeft,
          styles.borderVerticalRight,
          selectedTab === TAB1 && styles.backgroundPurple,
        ]}>
        <Text
          style={[selectedTab === TAB1 ? styles.colorWhite : styles.colorGray]}>
          {TAB1}
        </Text>
      </Pressable>
      <Pressable
        onPress={changeBottomTabHandler.bind(null, TAB2)}
        style={[
          styles.bottomBarTab,
          styles.borderVerticalRight,
          selectedTab === TAB2 && styles.backgroundPurple,
        ]}>
        <Text
          style={[selectedTab === TAB2 ? styles.colorWhite : styles.colorGray]}>
          {TAB2}
        </Text>
      </Pressable>
      <Pressable
        onPress={changeBottomTabHandler.bind(null, TAB3)}
        style={[
          styles.bottomBarTab,
          styles.borderVerticalRight,
          selectedTab === TAB3 && styles.backgroundPurple,
        ]}>
        <Text
          style={[selectedTab === TAB3 ? styles.colorWhite : styles.colorGray]}>
          {TAB3}
        </Text>
      </Pressable>
      <Pressable
        onPress={changeBottomTabHandler.bind(null, TAB4)}
        style={[
          styles.bottomBarTab,
          styles.borderVerticalRight,
          selectedTab === TAB4 && styles.backgroundPurple,
        ]}>
        <Text
          style={[selectedTab === TAB4 ? styles.colorWhite : styles.colorGray]}>
          {TAB4}
        </Text>
      </Pressable>
      <Pressable
        onPress={changeBottomTabHandler.bind(null, TAB5)}
        style={[
          styles.bottomBarTab,
          styles.borderRadiusRight,
          selectedTab === TAB5 && styles.backgroundPurple,
        ]}>
        <Text
          style={[selectedTab === TAB5 ? styles.colorWhite : styles.colorGray]}>
          {TAB5}
        </Text>
      </Pressable>
    </View>
  );
};

export default BarTabs;
