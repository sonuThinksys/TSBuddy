import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainRoute');
    }, 3000);
  }, []);
  return (
    <View>
      <Text style={{justifyContent: 'center', paddingTop: 100}}>
        Splash-Screen
      </Text>
    </View>
  );
};
export default SplashScreen;
