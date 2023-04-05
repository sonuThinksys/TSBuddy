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

import {
  getMenuFeedback,
  getSingleUserFeedback,
  getTodayMenuDetails,
  giveMenuFeedback,
} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';

const MenuItem = ({navigation}) => {
  const dispatch = useDispatch();

  let {
    menuFeedback: getMenuFeedbackTotalCount,
    userFeedback,
    dailyMenuID,
    leaveMenuDetails: {foodMenus: foodMenuDatails},
  } = useSelector(state => state.home);

  const [keyIndex, setKeyIndex] = useState('');

  const {userToken: token} = useSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      const menuDetails = await dispatch(getTodayMenuDetails(token));

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
  }, []);

  useEffect(() => {
    (async () => {
      const expiredToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOTY4OGI2Ny05N2NkLTRmYjQtYWI5YS0yZDQ3NjY5NzVkMWIiLCJlbWFpbCI6InBhbnQuYW1pdEB0aGlua3N5cy5jb20iLCJJZCI6IjEwMzUyIiwiZXhwIjoxNjc5NjQxNjY2LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYxOTU1IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.U3fK-qSdMFPQ1KnseKzGnCA12hQ-PyU6OSRcVQ1dDhI';

      try {
        const foodFeedback = await dispatch(getMenuFeedback(token));

        if (foodFeedback?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: foodFeedback?.error?.message,
            buttonText: 'Close',
            dispatch,
            navigation,
          });
        }

        const myFeedback =
          dailyMenuID &&
          (await dispatch(getSingleUserFeedback({token, menuID: dailyMenuID})));

        if (myFeedback?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: myFeedback?.error?.message,
            buttonText: 'Close',
            dispatch,
            navigation,
          });
        }
      } catch (err) {}
    })();
  }, [keyIndex]);

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
        horizontal={true}
        data={foodMenuDatails}
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
              <View style={styles.likeView}>
                <TouchableOpacity
                  disabled={userFeedback[index]?.feedback === 1}
                  onPress={async () => {
                    // const expiredToken =
                    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOTY4OGI2Ny05N2NkLTRmYjQtYWI5YS0yZDQ3NjY5NzVkMWIiLCJlbWFpbCI6InBhbnQuYW1pdEB0aGlua3N5cy5jb20iLCJJZCI6IjEwMzUyIiwiZXhwIjoxNjc5NjQxNjY2LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYxOTU1IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.U3fK-qSdMFPQ1KnseKzGnCA12hQ-PyU6OSRcVQ1dDhI';

                    let keyIndex = `like_${index}`;
                    setKeyIndex(keyIndex);

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
                <Text style={{flex: 1}}>
                  {/* {userFeedback[index].feedback === null
                    ? 0
                    : userFeedback[index].feedback === undefined
                    ? 0
                    : userFeedback[index].feedback === 0
                    ? 0
                    : 1} */}
                  {getMenuFeedbackTotalCount[index]?.likes}
                </Text>
                <TouchableOpacity
                  disabled={userFeedback[index]?.feedback === 0}
                  onPress={() => {
                    let keyIndex = `dislike_${index}`;
                    setKeyIndex(keyIndex);
                    dispatch(
                      giveMenuFeedback({
                        token,
                        menuID: dailyMenuID,
                        index,
                        feedbackType: 'dislike',
                        userData,
                      }),
                    );
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
                <Text style={{flex: 1}}>
                  {/* {userFeedback[index].feedback === null
                    ? 0
                    : userFeedback[index].feedback === 1
                    ? 0
                    : userFeedback[index].feedback === undefined
                    ? 0
                    : 1} */}
                  {getMenuFeedbackTotalCount[index]?.dislikes}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MenuItem;

