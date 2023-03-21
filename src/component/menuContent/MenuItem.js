import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import {Menudata} from '../../../db';
import styles from './MenuItemStyle';
import {useSelector} from 'react-redux';
import {FontFamily} from 'constants/fonts';
const MenuItem = () => {
  const token = useSelector(state => state.auth.userToken);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [numOfDislike, SetNumberDislikes] = useState(0);
  const [foodMenu, setFoodMenu] = useState([]);
  console.log('foodMenu:', foodMenu);
  const getTodayMenu = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const menu = await axios.get(
      'http://10.101.23.48:81/api/EmployeeDashBoard/GetEmployeeDashBoard',
      config,
    );

    const totalFoodArr = [
      {
        type: 'Breakfast',
        food: menu.data.foodMenus[0].breakfast,
        img_url: MonthImages.breakfastImgS,
      },
      {
        type: 'Lunch',
        food: menu.data.foodMenus[0].lunch,
        img_url: MonthImages.Lunch,
      },
      {
        type: 'Snacks',
        food: menu.data.foodMenus[0].eveningSnack,
        img_url: MonthImages.snacksS,
      },
    ];

    setFoodMenu(totalFoodArr);
  };

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
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
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
                      {item?.food}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.likeView}>
                <TouchableOpacity
                  onPress={() => {
                    setNumOfLikes(item?.numberOfLikes + 1);
                  }}>
                  <Image
                    style={{height: 20, width: 20}}
                    source={MonthImages.LikeImage}
                  />
                </TouchableOpacity>
                <Text style={{flex: 1}}> {numOfLikes}</Text>
                <TouchableOpacity
                  onPress={() => {
                    SetNumberDislikes(item?.numberOfDislike + 1);
                  }}>
                  <Image
                    style={{height: 20, width: 20, marginLeft: wp(20)}}
                    source={MonthImages.dislikesm}
                  />
                </TouchableOpacity>
                <Text style={{flex: 1}}>{numOfDislike}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MenuItem;
