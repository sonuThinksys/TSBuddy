import React, {useEffect} from 'react';
import {View, TextView, Text, Image, StyleSheet} from 'react-native';
import AppIcon from '../../assets/mipmap/appIcon120-1.png';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {appVersion} from '../../utils/AppVersion';
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainRoute');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imageContiner}>
        <Image
          style={{height: '100%', width: '100%', marginBottom: hp(33)}}
          source={{
            uri: 'https://play-lh.googleusercontent.com/FPGHGqbXGcZVIM3zv6FkuCanLdq8_VMszGKTSlXPB7LBfn4f6ZvMWkbiDMR8RPjx2YU=w480-h960-rw',
          }}
        />
        <Text style={{textAlign: 'center'}}>{appVersion}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: wp(40),
  },
  imageContiner: {
    height: hp(20),
    width: wp(20),
    display: 'flex',
  },
});

export default SplashScreen;
