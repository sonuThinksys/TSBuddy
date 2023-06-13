import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
import {View, Text} from 'react-native';

const CustomHeader = function ({title}) {
  return {
    headerTitleAlign: 'center',
    headerShown: true,

    headerStyle: {
      backgroundColor: Colors.lighterBlue,
    },

    headerTitle: () => (
      <View
        style={{
          flexDirection: 'row',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}>
        {
          <Text
            style={{
              color: Colors.white,
              fontSize: 18,
              fontFamily: FontFamily.RobotoMedium,
            }}>
            {title}
          </Text>
        }
      </View>
    ),
    headerTintColor: Colors.white,

    headerShadowVisible: true,
  };
};

export default CustomHeader;
