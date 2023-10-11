import React from 'react';
import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import MenuSVG from 'assets/newDashboardIcons/bars-sort.svg';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useRoute} from '@react-navigation/native';
import {employeeProfileScreen} from 'navigation/Route';
import SearchIcon from 'assets/newDashboardIcons/user-magnifying-glass.svg';

const CustomHeader = function ({
  showDrawerMenu,
  title,
  navigation,
  isHome,
  showHeaderRight,
  headerRight,
  // navigation2,
}) {
  const route = useRoute();
  const screenName = route.name;

  return (
    <View
      style={[
        styles.mainContainer,
        isHome ? styles.backgroundColorWhitishBlue : styles.backgroundColorBlue,
      ]}>
      {showDrawerMenu ? (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <MenuSVG
            fill={isHome ? Colors.black : Colors.white}
            height={24}
            width={24}
          />
        </TouchableOpacity>
      ) : (
        <Pressable
          onPress={() => {
            navigation.goBack();
            // navigation.pop();
          }}>
          <Image
            source={MonthImages.backArrowS}
            style={{height: 20, width: 20}}
          />
        </Pressable>
      )}

      <View style={styles.headerIconContainer}>
        {isHome ? (
          <Image
            source={MonthImages.TRMSIcon}
            style={{width: 108, height: 40}}
          />
        ) : (
          <Text style={styles.headerTitle}>{title}</Text>
        )}
        {/* <Text>TRMS</Text> */}

        {/* {headerIcon && (
          <Image
            source={headerIcon}
            fill={isHome ? Colors.black : Colors.white}
            style={{height: 22, width: 22}}
          />
        )} */}
      </View>

      {showHeaderRight ? (
        <View style={styles.headerRightContainer}>
          <View>
            <TouchableOpacity
              onPress={() => {
                // dispatch(setFromNavigatedScreen({screenName}));
                navigation.navigate(employeeProfileScreen, {screenName});
              }}>
              <SearchIcon
                fill={isHome ? Colors.black : Colors.white}
                height={26}
                width={26}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        headerRight
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: isHome ? '#EEF2FA' : Colors.lighterBlue,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    // marginHorizontal: 10,
    borderRadius: 2,
    alignItems: 'center',
  },
  backgroundColorBlue: {
    backgroundColor: Colors.lighterBlue,
  },
  backgroundColorWhitishBlue: {
    backgroundColor: '#EEF2FA',
  },
  headerRightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: FontFamily.RobotoMedium,
  },
  headerIconContainer: {
    flexDirection: 'row',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});
