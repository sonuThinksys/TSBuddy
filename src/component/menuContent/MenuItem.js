import React, {useState} from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import {Menudata} from '../../../db';
import styles from './MenuItemStyle';
const MenuItem = () => {
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [numOfDislike, SetNumberDislikes] = useState(0);
  return (
    <View style={{paddingHorizontal: wp(0.1)}}>
      <FlatList
        horizontal={true}
        data={Menudata}
        // renderItem={renderItem}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
              <Text style={{paddingVertical: hp(1), paddingHorizontal: wp(4)}}>
                {item?.type_of_food}
              </Text>
              <View>
                <ImageBackground
                  source={item.img_url}
                  resizeMode="contain"
                  style={styles.imagebackground}>
                  <View style={styles.menuView}>
                    <Text
                      style={{color: Colors.white, paddingVertical: hp(0.6)}}>
                      Menu
                    </Text>
                    <Text style={{color: Colors.white}}> {item?.menu}</Text>
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
