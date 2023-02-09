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
  FlatList,
} from 'react-native';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import styles from './LoginStyle';
import TouchID from 'react-native-touch-id';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import backgoundVideo from '../assets/video/backgoundVideo.mp4';
import Video from 'react-native-video';
import LoginUser from '../assets/mipmap/loginUser.imageset/user.png';
import LoginLock from 'assets/mipmap/loginLock.imageset/lock.png';
import LoginCheck from 'assets/mipmap/loginUncheck.imageset/uncheck.png';
import fingerPrint from 'assets/allImage/fingerPrint.png';
import {loginStatus} from './LoginSlice';
const Login = () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const [isBiometric, setIsBiometric] = useState(true);
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
            console.log('fgfdkgj:-', isAuth);
            dispatch(loginStatus(true));
            // return null;
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
        setIsBiometric(false);
        console.log(error);
      });
  };

  const textInputData = [
    {
      placeholderText: 'username',
      icon: MonthImages.LoginUser,
      id: '1',
    },
    {
      placeholderText: 'LDAP Password',
      icon: MonthImages.LoginLock,
      id: '2',
    },
  ];

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/video/backgoundVideo.mp4')}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />
      <View style={{alignItems: 'center'}}>
        <Image
          style={{height: hp(10), width: wp(10)}}
          source={{
            uri: 'https://play-lh.googleusercontent.com/FPGHGqbXGcZVIM3zv6FkuCanLdq8_VMszGKTSlXPB7LBfn4f6ZvMWkbiDMR8RPjx2YU=w480-h960-rw',
          }}
        />
      </View>
      <View style={styles.textInputContainer}>
        <FlatList
          data={textInputData}
          keyExtractor={item => item.id}
          renderItem={item => {
            return (
              <View style={styles.textinputView}>
                <View style={styles.iconView}>
                  <Image style={{height: 30, width: 25}} source={item.icon} />
                </View>
                <View style={styles.textinput}>
                  <TextInput
                    style={{height: '100%', width: '100%'}}
                    placeholder={item.placeholderText}
                  />
                </View>
              </View>
            );
          }}
        />
        <View style={styles.passwordView}>
          <TouchableOpacity>
            <Text style={{color: 'white', textDecorationLine: 'underline'}}>
              Forgot Password
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row-reverse',
              paddingHorizontal: wp(2),
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginHorizontal: wp(1),
                color: 'white',
              }}>
              Remember Me
            </Text>
            <Image style={{height: 30, width: 30}} source={LoginCheck} />
          </View>
        </View>

        <TouchableOpacity onPress={() => dispatch(loginStatus(true))}>
          <View style={styles.loginView}>
            <Text style={styles.loginText}>Login</Text>
          </View>
        </TouchableOpacity>
        {/* //closing  */}
        <Text style={styles.orText}>OR</Text>
        <Text style={{color: 'white', textAlign: 'center', marginTop: hp(1)}}>
          Guest Login
        </Text>
      </View>

      <TouchableOpacity onPress={enableTouchId}>
        <View style={styles.bioMetricView}>
          <Image source={fingerPrint} style={{height: 30, width: 35}} />
          <Text style={styles.bioMetricText}>Biometric login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
