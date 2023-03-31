import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';
import styles from './LoginStyle';
import TouchID from 'react-native-touch-id';
import {
  heightPercentageToDP as hp,
  screenWidth,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import TSBuddyIcon from '../assets/Icons/TSIcon.webp';
import LoginVideo from '../assets/video/backgoundVideo.mp4';
import Video from 'react-native-video';
import LoginUnCheck from 'assets/mipmap/loginUncheck.imageset/uncheck.png';
import LoginCheck from 'assets/mipmap/loginCheck.imageset/check.png';
import fingerPrint from 'assets/allImage/fingerPrint.png';
import fingerPrint1 from 'assets/allImage/fingerImage.png';
import {guestLoginStatus} from './LoginSlice';
import {loginStatus} from './LoginSlice';
import {getUserToken, setIsRemeber, setBiometricEnable} from './LoginSlice';
import {FontFamily, FontSize} from 'constants/fonts';
import LoadingScreen from 'component/LoadingScreen/LoadingScreen';
import {useSelector} from 'react-redux';
import {
  BIOMETRIC_LOGIN,
  CANCEL,
  CONFIRM_FINGERPRINT,
  COPY_RIGHT,
  ERROR,
  FORGOT_PASSWORD,
  GUEST_LOGIN,
  INCORRECT_LOGIN,
  REMEMBER_ME,
  SIGN_IN,
  TOUCH_SENSOR,
} from 'utils/string';
import ShowAlert from 'component/ShowAlert/ShowAlert';
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  // const [isBiometric, setIsBiometric] = useState(true);
  // const [bioMetricEnable, setBiometricEnable] = useState(false);
  const [showBiomatricModal, setshowBiomatricModal] = useState(true);
  const [isLoading, setLoading] = useState(false);
  // const [username, setUserName] = useState('gupta.radhika');
  // const [password, setPassword] = useState('radhikathinksys@123');
  const [username, setUserName] = useState('pant.amit');
  const [password, setPassword] = useState('thinksys@321');
  const {
    userToken: token,
    formInput,
    isRemember,
    bioMetricEnable,
  } = useSelector(state => state.auth);
  useEffect(() => {
    // (async () => {
    //   if (isRemember) {
    //     let userDetailsRemeber = await AsyncStorage.getItem(
    //       'userDetailsRemeber',
    //     );
    //     userDetailsRemeber = JSON.parse(userDetailsRemeber);
    //     console.log(
    //       'userDetailsRemeber',
    //       userDetailsRemeber,
    //       userDetailsRemeber?.username,
    //     );
    //     if (userDetailsRemeber && Object.keys(userDetailsRemeber).length) {
    //       console.log(
    //         'userDetailsRemeber',
    //         userDetailsRemeber,
    //         userDetailsRemeber?.username,
    //       );
    //       // setLoading(true);
    //       // await dispatch(getUserToken({username, password}));
    //       // setLoading(false);
    //     }
    //   }
    // })();
    if (Platform.OS === 'android') {
      // Alert.alert('Alert Title', 'Enable BioMetric Authentication', [
      //   {
      //     text: 'Cancel',
      //     onPress: () => setBiometricEnable(false),
      //     style: 'cancel',
      //   },
      //   {text: 'OK', onPress: () => setBiometricEnable(true)},
      // ]);
      // setBiometricEnable(true);
      dispatch(setBiometricEnable(true));
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
        // setIsBiometric(false);
      });
  };

  const onPressLogin = async () => {
    try {
      setLoading(true);
      let result = await dispatch(getUserToken({username, password}));
      if (result?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: INCORRECT_LOGIN,
          buttonText: 'CLOSE',
          dispatch,
          navigation,
        });
      } else {
        if (isRemember) {
          AsyncStorage.setItem(
            'userDetailsRemeber',
            JSON.stringify({username, password}),
          );
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {showBiomatricModal ? (
        <Modal
          backdropColor={Colors.smokeyGrey}
          isVisible={showBiomatricModal}
          style={{flex: 1}}>
          <View style={styles.modalContainer}>
            <View style={styles.signInContainerStyle}>
              <Text style={styles.signInTextStyle}>{SIGN_IN}</Text>
            </View>
            <Text style={styles.confirmTextStyle}>{CONFIRM_FINGERPRINT}</Text>
            <View style={styles.imageSensorStyle}>
              <View style={styles.imageContainer}>
                <Image source={fingerPrint1} style={styles.imageStyle} />
              </View>
              <Text style={styles.touchSensorText}>{TOUCH_SENSOR}</Text>
            </View>
            <View style={styles.cancelButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setBiometricEnable(false));
                  setshowBiomatricModal(false);
                }}>
                <Text style={styles.cancelButton}>{CANCEL}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
      <View style={{flex: 1}}>
        <Video
          source={LoginVideo}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
        {isLoading ? <LoadingScreen /> : null}
        <View style={{alignItems: 'center', paddingTop: hp(4)}}>
          <Image
            style={{height: hp(12), width: wp(25)}}
            source={MonthImages.TSBudLogo}
            resizeMode="contain"
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
                {FORGOT_PASSWORD}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(setIsRemeber(!isRemember));
                if (isRemember) {
                  AsyncStorage.removeItem('userDetailsRemeber');
                }
              }}
              style={{
                flexDirection: 'row',
                paddingHorizontal: wp(2),
                alignItems: 'center',
              }}>
              <Image
                style={{height: 25, width: 25}}
                source={isRemember ? LoginCheck : LoginUnCheck}
              />
              <Text style={styles.rememberText}>{REMEMBER_ME}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onPressLogin}>
            <View style={styles.loginView}>
              <Text style={styles.loginText}>Login</Text>
            </View>
          </TouchableOpacity>
          {/* //closing  */}
          <Text style={styles.orText}>OR</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(guestLoginStatus(true));
            }}>
            <Text
              style={{
                color: Colors.white,
                textAlign: 'center',
                marginTop: hp(1),
              }}>
              {GUEST_LOGIN}
            </Text>
          </TouchableOpacity>
        </View>
        {Platform.OS === 'android' && bioMetricEnable ? (
          <TouchableOpacity onPress={enableTouchId}>
            <View style={styles.bioMetricView}>
              <Image source={fingerPrint} style={{height: 30, width: 35}} />
              <Text style={styles.bioMetricText}>{BIOMETRIC_LOGIN}</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.copyRightContainer}>
        <Text style={styles.copyRightStyle}>{COPY_RIGHT}</Text>
      </View>
    </View>
  );
};

export default Login;