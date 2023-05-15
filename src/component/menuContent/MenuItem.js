import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useDispatch} from 'react-redux';
import {Colors} from 'colors/Colors';
import styles from './MenuItemStyle';
import {useSelector} from 'react-redux';
import {FontFamily} from 'constants/fonts';
import {ERROR} from 'constants/strings';
import jwt_decode from 'jwt-decode';

const breakfast = 'breakfast';
const lunch = 'lunch';
const snacks = 'snacks';

import {
  getMenuFeedback,
  getSingleUserFeedback,
  getTodayMenuDetails,
  giveMenuFeedback,
} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {color} from 'react-native-reanimated';
import FoodFeedback from 'modals/FoodFeedback';

const MenuItem = ({navigation}) => {
  const dispatch = useDispatch();

  let {userFeedback, dailyMenuID} = useSelector(state => state.home);

  const [feedbackCount, setFeedbackCount] = useState([
    {
      likes: 0,
      dislikes: 0,
    },
    {
      likes: 0,
      dislikes: 0,
    },
    {
      likes: 0,
      dislikes: 0,
    },
  ]);

  const [todayMenu, setTodayMenu] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const {userToken: token} = useSelector(state => state.auth);

  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id || '';

  useEffect(() => {
    if (token) {
      (async () => {
        const menuDetails = await dispatch(getTodayMenuDetails(token));
        setTodayMenu([
          {
            type: breakfast,
            food: menuDetails.payload?.foodMenus[0]?.breakfast,
            img_url: MonthImages.breakfastImgS,
          },
          {
            type: lunch,
            food: menuDetails.payload?.foodMenus[0]?.lunch,
            img_url: MonthImages.Lunch,
          },
          {
            type: snacks,
            food: menuDetails.payload?.foodMenus[0]?.eveningSnack,
            img_url: MonthImages.snacksS,
          },
        ]);

        if (menuDetails?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: menuDetails?.error?.message,
            buttonText: 'Close',
            dispatch,
            navigation,
          });
        }
      })();
    } else {
      setTodayMenu([
        {
          type: breakfast,
          food: 'N/A',
          img_url: MonthImages.breakfastImgS,
        },
        {
          type: lunch,
          food: 'N/A',
          img_url: MonthImages.Lunch,
        },
        {
          type: snacks,
          food: 'N/A',
          img_url: MonthImages.snacksS,
        },
      ]);
    }
  }, []);

  const getFeedbackUpdatedData = async () => {
    try {
      // const foodFeedback = await dispatch(getMenuFeedback(token));
      // setFeedbackCount([
      //   {
      //     likes: foodFeedback?.payload?.totalBreakfastlikes,
      //     dislikes: foodFeedback?.payload?.totalBreakfastdislikes,
      //   },
      //   {
      //     likes: foodFeedback?.payload?.totalLunchlikes,
      //     dislikes: foodFeedback?.payload?.totalLunchdislikes,
      //   },
      //   {
      //     likes: foodFeedback?.payload?.totalMeallikes,
      //     dislikes: foodFeedback?.payload?.totalMealdislikes,
      //   },
      // ]);
      // if (foodFeedback?.error) {
      //   ShowAlert({
      //     messageHeader: ERROR,
      //     messageSubHeader: foodFeedback?.error?.message,
      //     buttonText: 'Close',
      //     dispatch,
      //     navigation,
      //   });
      // }
      // const myFeedback =
      //   dailyMenuID &&
      //   (await dispatch(getSingleUserFeedback({token, menuID: dailyMenuID})));
      // if (myFeedback?.error) {
      //   ShowAlert({
      //     messageHeader: ERROR,
      //     messageSubHeader: myFeedback?.error?.message,
      //     buttonText: 'Close',
      //     dispatch,
      //     navigation,
      //   });
      // }
    } catch (err) {}
  };

  useEffect(() => {
    getFeedbackUpdatedData();
  }, []);

  const userData = {
    employee: 'EMP/10352',
    employeeName: 'Amit Kumar Pant',
    creation: new Date(),
    breakfast: userFeedback[0]?.feedback,
    lunch: userFeedback[1]?.feedback,
    meal: userFeedback[2]?.feedback,
  };

  return (
    <View style={{paddingHorizontal: wp(0.1)}}>
      {showModal ? (
        <FoodFeedback modalData={modalData} showModal={showModal} />
      ) : null}
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={todayMenu}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles.container}>
              <Text style={{paddingVertical: hp(1), paddingHorizontal: wp(4)}}>
                {item?.type}
              </Text>
              <View>
                <ImageBackground
                  source={item.img_url}
                  resizeMode="stretch"
                  style={styles.imagebackground}>
                  <View style={styles.menuView}>
                    <Text
                      style={{
                        color: Colors.white,
                        paddingVertical: hp(0.6),
                        fontFamily: FontFamily.RobotoBold,
                      }}>
                      Menu
                    </Text>
                    <Text style={{color: Colors.white, fontSize: 12}}>
                      {item.food ? item.food : 'N/A'}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.likeView} key={index}>
                <LinearGradient
                  // start={{x: 0.1, y: 0.1}}
                  //  end={{x: 0.1, y: 1.0}}
                  locations={[0.1, 1, 0.01]}
                  colors={[Colors.bluishGreen, Colors.green, Colors.grey]}
                  style={[
                    styles.feedbackBtn,
                    {opacity: dailyMenuID ? 1 : 0.6},
                  ]}>
                  <TouchableOpacity
                    disabled={!dailyMenuID}
                    onPress={() => {
                      setShowModal(true);
                      setModalData({
                        setShowModal: setShowModal,
                        type: item?.type,
                        dailyMenuID: dailyMenuID,
                        employeeID: employeeID,
                      });
                    }}>
                    <Text style={styles.textStyle}> Feedback </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MenuItem;
