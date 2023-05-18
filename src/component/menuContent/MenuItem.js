import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
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

  const {userToken: token} = useSelector(state => state.auth);

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
                    <ScrollView nestedScrollEnabled={true}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: 12,
                        }}>
                        {item.food ? item.food : 'N/A'}
                      </Text>
                    </ScrollView>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.likeView} key={index}>
                <TouchableOpacity
                  disabled={userFeedback[index]?.feedback === 1 || !dailyMenuID}
                  onPress={async () => {
                    const giveUserFeedback = await dispatch(
                      giveMenuFeedback({
                        token,
                        menuID: dailyMenuID,
                        index,
                        feedbackType: 'like',
                        userData,
                      }),
                    );

                    if (giveUserFeedback?.error) {
                      ShowAlert({
                        messageHeader: ERROR,
                        messageSubHeader: giveUserFeedback?.error?.message,
                        buttonText: 'Close',
                        dispatch,
                        navigation,
                      });
                    } else {
                      getFeedbackUpdatedData();
                    }
                  }}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      opacity: userFeedback[index]?.feedback === 1 ? 0.5 : 1,
                    }}
                    source={MonthImages.LikeImage}
                  />
                </TouchableOpacity>
                <Text style={{flex: 1}}>{feedbackCount[index]?.likes}</Text>
                <TouchableOpacity
                  // key={index}
                  disabled={userFeedback[index]?.feedback === 0 || !dailyMenuID}
                  onPress={async () => {
                    const giveUserFeedback = await dispatch(
                      giveMenuFeedback({
                        token,
                        menuID: dailyMenuID,
                        index,
                        feedbackType: 'dislike',
                        userData,
                      }),
                    );

                    if (giveUserFeedback?.error) {
                      ShowAlert({
                        messageHeader: ERROR,
                        messageSubHeader: giveUserFeedback?.error?.message,
                        buttonText: 'Close',
                        dispatch,
                        navigation,
                      });
                    } else {
                      getFeedbackUpdatedData();
                    }
                  }}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      marginLeft: wp(20),
                      opacity: userFeedback[index]?.feedback === 0 ? 0.5 : 1,
                    }}
                    source={MonthImages.dislikesm}
                  />
                </TouchableOpacity>
                <Text style={{flex: 1}}>{feedbackCount[index]?.dislikes}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MenuItem;
