import React from 'react';
import {useDispatch} from 'react-redux';

import {
  View,
  Text,
  ImageBackground,
  TextView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import backgoundVideo from '../assets/video/backgoundVideo.mp4';
import Video from 'react-native-video';
import {FlatList} from 'react-native-gesture-handler';
import LoginUser from '../assets/mipmap/loginUser.imageset/user.png';
import LoginLock from 'assets/mipmap/loginLock.imageset/lock.png';
import LoginCheck from 'assets/mipmap/loginUncheck.imageset/uncheck.png';
import {loginStatus} from './LoginSlice';
const Login = () => {
  const dispatch = useDispatch();
  console.log('backgroundVideo:------------------------', backgoundVideo);

  const rnBiometrics = new ReactNativeBiometrics();

  const {biometryType} = rnBiometrics.isSensorAvailable();

  if (biometryType === BiometryTypes.TouchID) {
    //do something fingerprint specific
    console.log('biometric available');
  }

  if (biometryType !== BiometryTypes.TouchID) {
    //do something fingerprint specific
    console.log('not biometric available');
  }

  if (biometryType === BiometryTypes.FaceID) {
    //do something face id specific
    console.log('helo avalialble');
  }

  if (biometryType === BiometryTypes.Biometrics) {
    //do something face id specific
    console.log('android biometric avalabvle');
  }

  return (
    <View style={{backgroundColor: '#0073cf', height: '100%', width: '100%'}}>
      <View
        style={{
          height: '100%',
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <Video
          source={require('../assets/video/backgoundVideo.mp4')}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
        <View style={{marginHorizontal: wp(45)}}>
          <Image
            style={{height: hp(10), width: wp(10)}}
            source={{
              uri: 'https://play-lh.googleusercontent.com/FPGHGqbXGcZVIM3zv6FkuCanLdq8_VMszGKTSlXPB7LBfn4f6ZvMWkbiDMR8RPjx2YU=w480-h960-rw',
            }}
          />
        </View>
        <View
          style={{
            width: '90%',
            backgroundColor: 'rgba(51, 51, 51, 0.8)',
            marginVertical: hp(5),
            paddingVertical: hp(5),
            marginLeft: 20,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              height: hp(7),
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'row',
              marginVertical: hp(3),
            }}>
            <View
              style={{
                width: '20%',
                height: '100%',
                justifyContent: 'center',
                backgroundColor: '#0073cf',
                paddingHorizontal: wp(5),
              }}>
              <Image style={{height: 30, width: 25}} source={LoginUser} />
            </View>
            <View
              style={{
                width: '80%',
                height: '100%',
                backgroundColor: 'white',
                paddingLeft: wp(5),
              }}>
              <TextInput
                style={{height: '100%', width: '100%'}}
                placeholder="username"
              />
            </View>
          </View>
          <View
            style={{
              height: hp(7),
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '20%',
                height: '100%',
                justifyContent: 'center',
                backgroundColor: '#0073cf',
                paddingHorizontal: wp(5),
              }}>
              <Image style={{height: 30, width: 22}} source={LoginLock} />
            </View>
            <View
              style={{
                width: '80%',
                height: '100%',
                backgroundColor: 'white',
                paddingLeft: wp(5),
              }}>
              <TextInput
                style={{height: '100%', width: '100%'}}
                placeholder="LDAP Password"
              />
            </View>
          </View>
          {/* forgot paasword view */}
          <View
            style={{
              height: hp(10),
              marginHorizontal: wp(2),
              marginVertical: hp(2),
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View style={{width: '50%', paddingVertical: hp(3)}}>
              <TouchableOpacity>
                <Text style={{color: 'white', textDecorationLine: 1}}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '50%',
                display: 'flex',
                flexDirection: 'row-reverse',
                paddingVertical: hp(2),
                paddingHorizontal: wp(2),
              }}>
              <Text
                style={{
                  marginTop: hp(1),
                  marginHorizontal: wp(1),
                  color: 'white',
                }}>
                Remember Me
              </Text>
              <Image style={{height: 30, width: 30}} source={LoginCheck} />
            </View>
          </View>

          <TouchableOpacity onPress={() => dispatch(loginStatus(true))}>
            <View
              style={{
                height: hp(7),
                backgroundColor: '#0073cf',
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
          {/* //closing  */}
          <Text
            style={{
              textAlign: 'center',
              color: 'blue',
              fontSize: 18,
              marginTop: hp(2),
              fontWeight: '200',
            }}>
            OR
          </Text>
          <Text style={{color: 'white', textAlign: 'center', marginTop: hp(1)}}>
            Guest Login
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
});

export default Login;
