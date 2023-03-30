import React, {useEffect} from 'react';
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

import {
  getMenuFeedback,
  getSingleUserFeedback,
  getTodayMenuDetails,
  giveMenuFeedback,
} from 'redux/homeSlice';

const MenuItem = () => {
  const dispatch = useDispatch();

  const {
    menuFeedback: getMenuFeedbackTotalCount,
    userFeedback,
    dailyMenuID,
    leaveMenuDetails: {foodMenus: foodMenuDatails},
  } = useSelector(state => state.home);

  const {userToken: token} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getTodayMenuDetails(token));
    dispatch(getMenuFeedback(token));
    dispatch(getSingleUserFeedback({token, menuID: dailyMenuID}));
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
                  onPress={() => {
                    dispatch(
                      giveMenuFeedback({
                        token,
                        menuID: dailyMenuID,
                        index,
                        feedbackType: 'like',
                        userData,
                      }),
                    );
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
