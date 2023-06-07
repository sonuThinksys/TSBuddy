import {Colors} from 'colors/Colors';
import {
  View,
  TouchableOpacity,
  Text,
  AppState,
  PermissionsAndroid,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import styles from '../../screens/checkInOut/checkInOutStyles';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import GetLocation from 'react-native-get-location';

const dayArray = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const monthArray = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const CheckInOut = () => {
  const [toggleCheckInBtn, setToggleCheckInBtn] = useState(true);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckoutTime] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  const todayDate = new Date().getDate();
  const todayDay = new Date().getDay();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();
  const totalDateString = `${dayArray[todayDay - 1]}, ${
    monthArray[todayMonth]
  } ${todayDate}, ${todayYear}`;

  // async function requestLocationPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Location Permission',
  //         message:
  //           'This App needs access to your location ' +
  //           'so we can know where you are.',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use locations ');
  //     } else {
  //       console.log('Location permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }

  // useEffect(() => {
  // requestLocationPermission();
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 60000,
  //   })
  //     .then(location => {
  //       console.log(location);
  //     })
  //     .catch(error => {
  //       const {code, message} = error;
  //       console.warn(code, message);
  //     });
  // }, []);

  useEffect(() => {
    const loadTimer = async () => {
      try {
        const storedTimer = await AsyncStorage.getItem('stopwatchTimer');
        const checkInOutState = await AsyncStorage.getItem('btnState');

        if (storedTimer && checkInOutState) {
          setTimer(parseInt(storedTimer, 10));
          setToggleCheckInBtn(JSON.parse(checkInOutState));
        }
      } catch (error) {
        // setIsRunning(true);
      }
    };

    loadTimer();
  }, []);

  useEffect(() => {
    const saveTimer = async () => {
      try {
        await AsyncStorage.setItem('stopwatchTimer', timer.toString());
        await AsyncStorage.setItem('btnState', toggleCheckInBtn.toString());
      } catch (error) {
        console.log('Error saving timer:', error);
      }
    };

    saveTimer();
  }, [timer]);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      // clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const currentTimeForCheckInOut = () => {
    let currentSecond = new Date().getSeconds();
    const currentMinute = new Date().getMinutes();
    const currentHour = new Date().getHours();

    const currenTime = `${padTime(currentHour)}:${padTime(
      currentMinute,
    )}:${padTime(currentSecond)}`;
    return currenTime;
  };

  const handleCheckin = () => {
    setIsRunning(true);
    let currentTime = currentTimeForCheckInOut();
    setCheckInTime(currentTime);
    setToggleCheckInBtn(!toggleCheckInBtn);
  };

  const handleCheckout = () => {
    setIsRunning(false);
    setTimer(0);
    let currentTime = currentTimeForCheckInOut();
    setCheckoutTime(currentTime);
    setToggleCheckInBtn(!toggleCheckInBtn);
  };

  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
  };

  const padTime = value => {
    return value.toString().padStart(2, '0');
  };

  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.totalTimeAndBtnCont}>
        <View>
          <Text style={styles.textTimer}>{formatTime(timer)} Hrs</Text>
          <Text style={styles.textTotalWork}>Total Work Time</Text>
        </View>
        {toggleCheckInBtn ? (
          <LinearGradient
            locations={[0.1, 1, 0.1]}
            colors={[Colors.green, Colors.bluishGreen, Colors.green]}
            style={[styles.checkInOutBtn]}>
            <TouchableOpacity
              onPress={() => {
                handleCheckin();
              }}>
              <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>
                Checkin
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <LinearGradient
            locations={[0.1, 1, 0.1]}
            colors={[Colors.reddishTint, Colors.lightGray1, Colors.green]}
            style={[styles.checkInOutBtn]}>
            <TouchableOpacity
              onPress={() => {
                handleCheckout();
              }}>
              <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>
                Checkout
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        )}
      </View>
      <View style={styles.textInputCont}>
        <TextInput
          placeholder="Add Notes (Optional)"
          style={styles.textInput}
        />
        <TouchableOpacity>
          <View style={styles.addCommentBtn}>
            <Text style={styles.btnText}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.todayDate}>{totalDateString}</Text>
      </View>
      <View>
        <Text style={styles.lateByText}>Late By 04:01:12 Hours</Text>
      </View>
      <View style={[styles.checkInoutTimeCont, {marginTop: hp(5)}]}>
        <Text style={{fontSize: 16, color: Colors.black}}>Check In Time :</Text>
        <Text style={{fontSize: 16, color: Colors.black}}>
          Check Out Time :
        </Text>
      </View>
      <View style={styles.checkInoutTimeCont}>
        <Text style={{fontSize: 21, color: Colors.green}}>{checkInTime}</Text>
        <Text style={{fontSize: 21, color: Colors.orange}}>{checkOutTime}</Text>
      </View>
    </View>
  );
};

export default CheckInOut;
