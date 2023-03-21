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
import styles from './MenudetailStyle';
import RequestLunch from 'screens/requestLunch/RequestLunch';
import {RequestLunchScreen} from 'navigation/Route';
import {FontFamily, FontSize} from 'constants/fonts';
import {Colors} from 'colors/Colors';
// import {SharedElement} from 'react-navigation-shared-element';
import LinearGradient from 'react-native-linear-gradient';
const MenuDetails = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Today's Menu</Text>
      {/* <SharedElement id="enter" style={{flex: 1}}> */}
      <LinearGradient
        // start={{x: 0.1, y: 0.1}}
        //  end={{x: 0.1, y: 1.0}}
        locations={[0.1, 1, 0.01]}
        colors={['#BABABA', 'blue', '#BABABA']}
        // colors={['white', 'white', 'white']}
        style={styles.secondContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate(RequestLunchScreen, navigation);
          }}>
          <Text style={styles.text2}> + Lunch Request</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default MenuDetails;
