import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Alert, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontSize} from 'constants/fonts';
import {logOut} from 'Auth/LoginSlice';
import {homeReset} from 'redux/homeSlice';
import {CommonActions} from '@react-navigation/native';
import styles from './DrawerComponentStyles';
const DrawerComponent = ({
  selected,
  navigation,
  screen,
  label,
  dispatch,
  icon,
  child = [],
  index,
}) => {
  const [childMenu, setChildMenu] = useState(false);
  return (
    <>
      <TouchableOpacity
        key={index}
        onPress={() => {
          if (dispatch) {
            // navigation.closeDrawer();
            // dispatch(logOut());
            Alert.alert(
              'Log Out',
              'Are you sure you want to Log Out from this app?',
              [
                {
                  text: 'Cancel',
                  onPress: () => null,
                },
                {
                  text: 'Log Out',
                  onPress: () => {
                    // ========================================================================
                    if (dispatch) {
                      navigation &&
                        navigation.dispatch(
                          CommonActions.reset({
                            routes: [
                              {
                                name: 'Home',
                              },
                            ],
                          }),
                        );
                      dispatch(logOut());
                      setTimeout(() => {
                        dispatch(homeReset());
                        // navigation &&
                        //   navigation.dispatch(
                        //     CommonActions.reset({
                        //       routes: [
                        //         {
                        //           name: 'Home',
                        //         },
                        //       ],
                        //     }),
                        //   );
                      }, 20);
                    }
                    // ========================================================================
                  },
                },
              ],
            );
            navigation.closeDrawer();
          } else {
            if (child.length) {
              setChildMenu && setChildMenu(!childMenu);
            } else {
              navigation.navigate(screen);
              navigation.closeDrawer();
            }
          }
        }}
        style={{
          paddingVertical: wp(3),
          borderBottomWidth: 1,
          borderBottomColor: Colors.lightBlack,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: selected ? Colors.royalBlue : null,
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{height: 30, width: 30, borderRadius: 50}}
        />
        <Text
          style={{
            color: Colors.white,
            fontSize: FontSize.h15,
            textAlign: 'center',
          }}>
          {label}
        </Text>
      </TouchableOpacity>
      {child && child.length && childMenu ? (
        <View style={styles.childrenContainer}>
          {child.map((val, index) => {
            return (
              <TouchableOpacity
                style={{backgroundColor: Colors.lightBlue, paddingVertical: 5}}
                onPress={() => {
                  navigation.navigate(val?.screen);
                  navigation.closeDrawer();
                  setChildMenu && setChildMenu(!childMenu);
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    paddingLeft: 10,
                  }}>
                  {val?.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </>
  );
};
export default DrawerComponent;
