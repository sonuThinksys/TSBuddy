import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Pressable,
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
import {useIsFocused} from '@react-navigation/native';

const breakfast = 'Breakfast';
const lunch = 'Lunch';
const snacks = 'Snacks';

import {getTodayMenuDetails} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import LinearGradient from 'react-native-linear-gradient';
import FoodFeedback from 'modals/FoodFeedback';
import EditIcon from 'assets/newDashboardIcons/edit.svg';

const MenuItem = ({navigation}) => {
  const isFocussed = useIsFocused();
  const dispatch = useDispatch();

  let {userFeedback, dailyMenuID} = useSelector(state => state.home);

  const [todayMenu, setTodayMenu] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const {userToken: token} = useSelector(state => state.auth);

  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id || '';

  useEffect(() => {
    if (isFocussed) updateData();
  }, [token, isFocussed]);

  const updateData = () => {
    if (token) {
      (async () => {
        try {
          const menuDetails = await dispatch(getTodayMenuDetails(token));
          // const menuDetails = await dispatch(getTodayMenuDetails(token));
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
              isTokenExpired: false,
            });
          }
        } catch (err) {}
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
  };

  const userData = {
    employee: 'EMP/10352',
    employeeName: 'Amit Kumar Pant',
    creation: new Date(),
    breakfast: userFeedback[0]?.feedback,
    lunch: userFeedback[1]?.feedback,
    meal: userFeedback[2]?.feedback,
  };

  return (
    <View style={{paddingLeft: 20}}>
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
                <Image
                  source={item.img_url}
                  style={{
                    height: wp(26),
                    width: wp(26),
                    borderRadius: wp(13),
                    overflow: 'hidden',
                  }}
                />
                <Text style={styles.foodTypeText}>{item?.type}</Text>
                <ScrollView nestedScrollEnabled={true}>
                  <Text
                    style={{
                      color: Colors.dune,
                      fontSize: 14,
                      textAlign: 'center',
                    }}>
                    {item.food ? item.food : 'N/A'}
                  </Text>
                </ScrollView>
                {/* <Text style={{paddingVertical: hp(1), paddingHorizontal: wp(4)}}>
                {item?.type}fffff
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
                <LinearGradient
                  // start={{x: 0.1, y: 0.1}}
                  //  end={{x: 0.1, y: 1.0}}
                  locations={[0.1, 1, 0.01]}
                  colors={[Colors.bluishGreen, Colors.green, Colors.grey]}
                  style={[
                    styles.feedbackBtn,
                    {opacity: dailyMenuID ? 1 : 0.5},
                  ]}>
                  <TouchableOpacity
                    disabled={dailyMenuID ? false : true}
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
              </View> */}
              </View>
              <Pressable
                style={styles.feedbackContainer}
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
