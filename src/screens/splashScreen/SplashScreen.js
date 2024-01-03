import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import AppIcon from '../../assets/mipmap/appIcon120-1.png';

import {appVersion} from '../../utils/AppVersion';
import {Colors} from 'colors/Colors';
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainRoute');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={AppIcon} />
      <Text style={styles.versionText}>{appVersion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContiner: {
    borderWidth: 1,
    borderColor: 'red',
  },
  versionText: {textAlign: 'center'},
});

export default SplashScreen;
