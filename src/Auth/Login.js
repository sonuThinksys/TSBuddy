import React, {useState} from 'react';
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
  BackHandler,
} from 'react-native';
import {Colors} from 'colors/Colors';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import TouchID from 'react-native-touch-id';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import backgoundVideo from '../assets/video/backgoundVideo.mp4';
import Video from 'react-native-video';
import {FlatList} from 'react-native-gesture-handler';
import LoginUser from '../assets/mipmap/loginUser.imageset/user.png';
import LoginLock from 'assets/mipmap/loginLock.imageset/lock.png';
import LoginCheck from 'assets/mipmap/loginUncheck.imageset/uncheck.png';
import fingerPrint from 'assets/allImage/fingerPrint.png';
import {loginStatus} from './LoginSlice';
const Login = () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  console.log('backgroundVideo:------------------------', backgoundVideo);

  const enableTouchId = () => {
    const optionalConfigObject = {
      title: 'Authentication Required',
      imageColor: '#0073cf',
      imageErrorColor: '#ff0000',
      sensorDescription: 'Touch sensor',
      sensorErrorDescription: 'Failed',
      cancelText: 'Cancel',
      fallbackLabel: 'Show Passcode',
      unifiedErrors: false,
      passcodeFallback: false,
    };

    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
          if (isAuth) {
            return null;
          }
          TouchID.authenticate('Authentication', optionalConfigObject)
            .then(success => {
              console.log('sucess:--------------', success);
              setIsAuth(success);
            })
            .catch(err => {
              console.log('error of atjfjfdf', err);
              // BackHandler.exitApp();
            });
        }
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  };

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
            marginLeft: wp(5),
            borderRadius: 5,
            paddingHorizontal: wp(3),
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
                <Text style={{color: 'white', textDecorationLine: 'underline'}}>
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
        {/* 
        <View
          style={{
            backgroundColor: '#0073cf',
            width: '90%',
         }}> */}
        <TouchableOpacity onPress={enableTouchId}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: wp(5),
              paddingVertical: hp(1),
              backgroundColor: '#0073cf',
              marginHorizontal: wp(10),
              borderRadius: 5,
              borderColor: 'white',
              borderWidth: 1,
            }}>
            <Image source={fingerPrint} style={{height: 30, width: 35}} />
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                paddingTop: hp(0.5),
                paddingLeft: wp(15),
              }}>
              Biometric login
            </Text>
          </View>
        </TouchableOpacity>
        {/* </View> */}
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
