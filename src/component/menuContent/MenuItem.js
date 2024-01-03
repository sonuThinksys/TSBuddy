import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, View, FlatList, ScrollView, Pressable} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useDispatch} from 'react-redux';
import {Colors} from 'colors/Colors';
import styles from './MenuItemStyle';
import {useSelector} from 'react-redux';
import {ERROR} from 'constants/strings';
import jwt_decode from 'jwt-decode';

const breakfast = 'Breakfast';
const lunch = 'Lunch';
const snacks = 'Evening Snack';

import {getTodayMenuDetails} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import FoodFeedback from 'modals/FoodFeedback';
import EditIcon from 'assets/newDashboardIcons/edit.svg';

const MenuItem = ({navigation}) => {
  const dispatch = useDispatch();

  let {dailyMenuID} = useSelector(state => state.home);

  const [todayMenu, setTodayMenu] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const {userToken: token} = useSelector(state => state.auth);

  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id || '';

  useEffect(() => {
    // if (isFocussed) updateData();
    updateData();
  }, [updateData]);

  const updateData = useCallback(() => {
    if (token) {
      (async () => {
        try {
          const menuDetails = await dispatch(getTodayMenuDetails(token));
          const totalMenusLength = menuDetails.payload?.foodMenus?.length;

          setTodayMenu([
            {
              type: breakfast,
              food: menuDetails.payload?.foodMenus[totalMenusLength - 1]
                ?.breakfast,
              img_url: MonthImages.breakfastImgS,
            },
            {
              type: lunch,
              food: menuDetails.payload?.foodMenus[totalMenusLength - 1]?.lunch,
              img_url: MonthImages.Lunch,
            },
            {
              type: snacks,
              food: menuDetails.payload?.foodMenus[totalMenusLength - 1]
                ?.eveningSnack,
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
              isTokenExpired: false,
            });
          }
        } catch (err) {
          console.log('errMenu:', err);
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
  }, [dispatch, navigation, token]);

  return (
    <View style={styles.mainContainer}>
      <FoodFeedback modalData={modalData} showModal={showModal} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={todayMenu}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => {
          return (
            <View>
              <View key={index} style={styles.container}>
                <Image source={item.img_url} style={styles.foodImage} />
                <Text style={styles.foodTypeText}>{item?.type}</Text>
                <ScrollView nestedScrollEnabled={true}>
                  <Text style={styles.foodItem}>
                    {item.food ? item.food : 'N/A'}
                  </Text>
                </ScrollView>
              </View>
              <Pressable
                disabled={!dailyMenuID}
                style={[
                  styles.feedbackContainer,
                  !dailyMenuID && styles.opacity50,
                ]}
                onPress={() => {
                  setShowModal(true);
                  setModalData({
                    setShowModal: setShowModal,
                    type: item?.type,
                    dailyMenuID: dailyMenuID,
                    employeeID: employeeID,
                  });
                }}>
                <EditIcon
                  height={22}
                  width={22}
                  marginRight={6}
                  color={Colors.black}
                />
                <Text>Feedback</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MenuItem;
