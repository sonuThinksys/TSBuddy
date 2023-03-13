import React from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import {foodData} from 'utils/DummyData';

const Item = () => {
  return (
    <View style={{paddingHorizontal: wp(0.1)}}>
      <FlatList
        horizontal={true}
        data={foodData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const renderItem = ({item}) => {
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
            <Text style={{color: Colors.white, paddingVertical: hp(0.6)}}>
              Menu
            </Text>
            <Text style={{color: Colors.white}}> {item?.menu}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.likeView}>
        <Image style={{height: 20, width: 20}} source={MonthImages.LikeImage} />
        <Text style={{flex: 1}}> {item?.numberOfLikes}</Text>
        <Image
          style={{height: 20, width: 20, marginLeft: wp(20)}}
          source={MonthImages.dislikesm}
        />
        <Text style={{flex: 1}}>{item?.numberOfDislike}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGray,
    width: wp(50),
    marginTop: hp(1),
    marginHorizontal: wp(1),
    borderRadius: 5,
    opacity: 1,
  },
  imagebackground: {
    height: hp(15),
    width: wp(50),
    borderColor: Colors.black,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  menuView: {
    backgroundColor: Colors.menuTransparentColor,
    width: '42%',
    height: '100%',
    paddingLeft: wp(4),
  },
  likeView: {
    flexDirection: 'row',
    paddingLeft: wp(2),
    paddingVertical: hp(0.5),
    alignItems: 'center',
  },
});

export default Item;
