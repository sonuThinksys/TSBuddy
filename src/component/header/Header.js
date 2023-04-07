import * as React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'colors/Colors';
import {employeeProfileScreen} from 'navigation/Route';
const Header = () => {
  const {userToken: token} = useSelector(state => state.auth);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(employeeProfileScreen);
        }}>
        <Image
          source={MonthImages.searchIconwhite}
          style={{
            height: 22,
            width: 22,
            marginRight: wp(1),
            // color: Colors.white,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
