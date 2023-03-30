import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
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

import URLs from '../../../src/config';
const {giveFeedbackPost, getUserFeedback, getTodayMenuGet} = URLs;
import {
  getTodayMenuDetails,
  setRecentAppliedLeaves,
  setRemainingLeaves,
} from 'redux/homeSlice';

const breakfast = 'Breakfast';
const lunch = 'Lunch';
const snacks = 'Snacks';
const MenuItem = () => {
  const dispatch = useDispatch();

  // WILL IMPLEMENT LATER

  const foodMenuDatails = useSelector(
    state => state.dataReducer.foodMenuDatails,
  );
  console.log('foodMenuDatails111111:', foodMenuDatails.data);

  // WILL IMPLEMENT LATER

  const token = useSelector(state => state.auth.userToken);

  useEffect(() => {
    dispatch(getTodayMenuDetails(token));
  }, []);

  const [foodMenu, setFoodMenu] = useState([]);
  const [menuId, setMenuId] = useState(null);
  // const [foodFeedback, setFoodFeedback] = useState([
  //   {
  //     type: breakfast,
  //     like: 0,
  //     dislike: 0,
  //   },
  //   {
  //     type: lunch,
  //     like: 0,
  //     dislike: 0,
  //   },
  //   {
  //     type: snacks,
  //     like: 0,
  //     dislike: 0,
  //   },
  // ]);

  const [foodFeedback, setFoodFeedback] = useState([
    {
      type: breakfast,
      feedback: null,
      totalLikes: 0,
      totalDislikes: 0,
    },
    {
      type: lunch,
      feedback: null,
      totalLikes: 0,
      totalDislikes: 0,
    },
    {
      type: snacks,
      feedback: null,
      totalLikes: 0,
      totalDislikes: 0,
    },
  ]);

  const getFeedback = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const {data = {}} = await axios.get(
        `${getUserFeedback}${menuId && menuId}`,
        config,
      );

      // const data = await response.json();
      const breakfastRating = data?.breakfast;
      const lunchRating = data?.lunch;
      const snacksRating = data?.meal;

      setFoodFeedback([
        {
          type: breakfast,
          feedback: breakfastRating,
          totalLikes: 0,
          totalDislikes: 0,
        },
        {
          type: lunch,
          feedback: lunchRating,
          totalLikes: 0,
          totalDislikes: 0,
        },
        {
          type: snacks,
          feedback: snacksRating,
          totalLikes: 0,
          totalDislikes: 0,
        },
      ]);
    } catch (err) {
      console.log(
        `Getting an error in fetching feedback. Check after sometime. Thanks😊`,
      );
    }
  };

  const getTodayMenu = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let totalFoodArr = [
      {
        type: breakfast,
        food: null,
        img_url: MonthImages.breakfastImgS,
      },
      {
        type: lunch,
        food: null,
        img_url: MonthImages.Lunch,
      },
      {
        type: snacks,
        food: null,
        img_url: MonthImages.snacksS,
      },
    ];

    try {
      const menu = await axios.get(getTodayMenuGet, config);

      // console.log('menu:', menu)

      setMenuId(menu.data.foodMenus[0]?.dailyMenuId);
      dispatch(setRecentAppliedLeaves(menu.data.recentAppliedLeaves));
      dispatch(setRemainingLeaves(menu.data.remainingLeaves));

      totalFoodArr = [
        {
          type: breakfast,
          food: menu.data.foodMenus[0]?.breakfast,
          img_url: MonthImages.breakfastImgS,
        },
        {
          type: lunch,
          food: menu.data.foodMenus[0]?.lunch,
          img_url: MonthImages.Lunch,
        },
        {
          type: snacks,
          food: menu.data.foodMenus[0]?.eveningSnack,
          img_url: MonthImages.snacksS,
        },
      ];
    } catch (err) {
      console.log('err:', err);
    } finally {
      setFoodMenu(totalFoodArr);
    }
  };

  const giveFeedback = async (feedbackType, index) => {
    const isLike = feedbackType === 'like';
    let value;
    if (isLike) value = 1;
    else value = 0;

    let type;
    if (index === 0) type = 'breakfast';
    if (index === 1) type = 'lunch';
    if (index === 2) type = 'meal';
    try {
      const apiEndpoint = giveFeedbackPost;
      const data = {
        employee: 'EMP/10352',
        employeeName: 'Amit Kumar Pant',
        dailyMenuId: menuId,
        creation: new Date(),
        breakfast: foodFeedback[0].feedback,
        lunch: foodFeedback[1].feedback,
        meal: foodFeedback[2].feedback,
        [type]: value,
      };

      axios
        .post(
          apiEndpoint,
          data,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(response => {
          setFoodFeedback(prevFeedback => {
            prevFeedback[index].feedback = value;
            return [...prevFeedback];
          });
        })
        .catch(error => {
          console.error(error);
        });
    } catch (err) {}
  };
  useEffect(() => {
    getFeedback();
  }, [menuId]);

  useEffect(() => {
    getTodayMenu();
  }, []);

  return (
    <View style={{paddingHorizontal: wp(0.1)}}>
      <FlatList
        horizontal={true}
        data={foodMenu}
        // renderItem={renderItem}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => {
          return (
            <View style={styles.container}>
              <Text style={{paddingVertical: hp(1), paddingHorizontal: wp(4) }}>
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
                  disabled={foodFeedback[index].feedback === 1}
                  onPress={() => {
                    // PREVIOUS LOGIC
                    // ========================================
                    // foodFeedback[index].dislike === 1 &&
                    //   (foodFeedback[index].dislike = 0);
                    // const like = !!foodFeedback[index].like;
                    // if (like) {
                    //   setFoodFeedback(prevFeedback => {
                    //     prevFeedback[index].like = 0;
                    //     // return prevFeedback;
                    //     return [...prevFeedback];
                    //   });
                    // } else {
                    //   // setFoodFeedback(prevFeedback => {
                    //   //   prevFeedback[index].like = 1;
                    //   //   return prevFeedback;
                    //   // });
                    //   setFoodFeedback(prevFeedback => {
                    //     prevFeedback[index].like = 1;
                    //     // return prevFeedback;
                    //     return [...prevFeedback];
                    //   });
                    // }
                    // ========================================

                    giveFeedback('like', index);
                  }}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      opacity: foodFeedback[index].feedback === 1 ? 0.5 : 1,
                    }}
                    source={MonthImages.LikeImage}
                  />
                </TouchableOpacity>
                <Text style={{flex: 1}}>
                  {foodFeedback[index].feedback === null
                    ? 0
                    : foodFeedback[index].feedback === undefined
                    ? 0
                    : foodFeedback[index].feedback === 0
                    ? 0
                    : 1}
                </Text>
                <TouchableOpacity
                  disabled={foodFeedback[index].feedback === 0}
                  onPress={() => {
                    // PREVIOUS LOGIC
                    // ========================================
                    // foodFeedback[index].like === 1 &&
                    //   (foodFeedback[index].like = 0);
                    // const dislike = !!foodFeedback[index].dislike;
                    // if (dislike) {
                    //   setFoodFeedback(prevFeedback => {
                    //     prevFeedback[index].dislike = 0;
                    //     // return prevFeedback;
                    //     return [...prevFeedback];
                    //   });
                    // } else {
                    //   // setFoodFeedback(prevFeedback => {
                    //   //   prevFeedback[index].like = 1;
                    //   //   return prevFeedback;
                    //   // });
                    //   setFoodFeedback(prevFeedback => {
                    //     prevFeedback[index].dislike = 1;
                    //     // return prevFeedback;
                    //     return [...prevFeedback];
                    //   });
                    // }
                    // ========================================
                    // setFoodFeedback(prevFeedback=> {
                    //   prevFeedback
                    // })

                    giveFeedback('dislike', index);
                  }}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      marginLeft: wp(20),
                      opacity: foodFeedback[index].feedback === 0 ? 0.5 : 1,
                    }}
                    source={MonthImages.dislikesm}
                  />
                </TouchableOpacity>
                <Text style={{flex: 1}}>
                  {foodFeedback[index].feedback === null
                    ? 0
                    : foodFeedback[index].feedback === 1
                    ? 0
                    : foodFeedback[index].feedback === undefined
                    ? 0
                    : 1}
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
