import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import * as Keychain from 'react-native-keychain';

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';
import styles from './LoginStyle';
import TouchID from 'react-native-touch-id';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import LoginVideo from '../assets/video/backgoundVideo.mp4';
import Video from 'react-native-video';
import LoginCheck from 'assets/mipmap/loginUncheck.imageset/uncheck.png';
import fingerPrint from 'assets/allImage/fingerPrint.png';
import {getUserToken} from './LoginSlice';
import {useSelector} from 'react-redux';
const Login = () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const [isBiometric, setIsBiometric] = useState(true);
  const [bioMetricEnable, setBiometricEnable] = useState(false);
  // const [username, setUserName] = useState('gupta.radhika');
  // const [password, setPassword] = useState('radhikathinksys@123');
  const [username, setUserName] = useState('pant.amit');
  const [password, setPassword] = useState('thinksys@321');

  const {userToken: token, formInput} = useSelector(state => state.auth);
  useEffect(() => {
    if (Platform.OS === 'android') {
      Alert.alert('Alert Title', 'Enable BioMetric Authentication', [
        {
          text: 'Cancel',
          onPress: () => setBiometricEnable(false),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => setBiometricEnable(true)},
      ]);
      setBiometricEnable(true);
    }
  }, [formInput, token]);

  const enableTouchId = () => {
    const optionalConfigObject = {
      title: 'Authentication Required',
      imageColor: Colors.lightBlue,
      imageErrorColor: Colors.red,
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
        } else {
          if (isAuth) {
            // dispatch(loginStatus(true));
            return null;
          }
          TouchID.authenticate('Authentication', optionalConfigObject)
            .then(success => {
              if (token !== '') {
                const username = formInput.username;
                const password = formInput.password;

                dispatch(getUserToken({username, password}));
              }
            })

            .catch(err => {
              // BackHandler.exitApp();
            });
        }
      })
      .catch(error => {
        // Failure code
        setIsBiometric(false);
      });
  };

  const onPressLogin = async () => {
    dispatch(getUserToken({username, password}));
  };

  return (
    <View style={styles.container}>
      <Video
        source={LoginVideo}
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
          source={MonthImages.TSBudLogo}
        />
      </View>
      <View style={styles.textInputContainer}>
        <View style={styles.textinputView}>
          <View style={styles.iconView}>
            <Image
              style={{height: 30, width: 25}}
              source={MonthImages.LoginUser}
            />
          </View>
          <View style={styles.textinput}>
            <TextInput
              style={{height: '100%', width: '100%'}}
              maxLength={256}
              name="username"
              returnKeyType="next"
              placeholder="Username"
              placeholderTextColor={Colors.silver}
              onChangeText={e => setUserName(e)}
              value={username}
            />
          </View>
        </View>
        <View style={styles.textinputView}>
          <View style={styles.iconView}>
            <Image
              style={{height: 24, width: 18}}
              source={MonthImages.LoginLock}
            />
          </View>
          <View style={styles.textinput}>
            <TextInput
              style={{height: '100%', width: '100%'}}
              // ref={this.passwordRef}

              name="password"
              // maxLength={256}
              returnKeyType="done"
              secureTextEntry
              placeholder="Password"
              placeholderTextColor={Colors.silver}
              // onChangeText={value => {
              //   this.onChange({name: 'password', value});
              // }}
              // onChange={onChangeTextInput}
              onChangeText={e => setPassword(e)}
              value={password}
            />
          </View>
        </View>
        {/* )}
        /> */}
        <View style={styles.passwordView}>
          <TouchableOpacity>
            <Text
              style={{color: Colors.white, textDecorationLine: 'underline'}}>
              Forgot Password
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row-reverse',
              paddingHorizontal: wp(2),
              alignItems: 'center',
            }}>
            <Text style={styles.rememberText}>Remember Me</Text>
            <Image style={{height: 30, width: 30}} source={LoginCheck} />
          </View>
        </View>

        <TouchableOpacity onPress={onPressLogin}>
          <View style={styles.loginView}>
            <Text style={styles.loginText}>Login</Text>
          </View>
        </TouchableOpacity>
        {/* //closing  */}
        <Text style={styles.orText}>OR</Text>
        <Text
          style={{color: Colors.white, textAlign: 'center', marginTop: hp(1)}}>
          Guest Login
        </Text>
      </View>
      {Platform.OS === 'android' && bioMetricEnable ? (
        <TouchableOpacity onPress={enableTouchId}>
          <View style={styles.bioMetricView}>
            <Image source={fingerPrint} style={{height: 30, width: 35}} />
            <Text style={styles.bioMetricText}>Biometric login</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Login;
