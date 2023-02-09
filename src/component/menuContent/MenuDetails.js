import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import RequestLunch from 'screens/requestLunch/RequestLunch';
// import {SharedElement} from 'react-navigation-shared-element';
const MenuDetails = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text
        style={{fontWeight: 'bold', fontSize: 16, marginTop: hp(1), flex: 2}}>
        Today's Menu
      </Text>
      {/* <SharedElement id="enter" style={{flex: 1}}> */}
      <View style={styles.secondContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate('RequestLunch', navigation);
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {' '}
            + Lunch Request
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: hp(1.4),
    backgroundColor: '#C3F8FF',
    paddingHorizontal: wp(2),
    opacity: 1,
  },
  secondContainer: {
    flex: 1,
    backgroundColor: '#3333FF',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
    borderRadius: 4,
    opacity: 1,
  },
});
export default MenuDetails;
