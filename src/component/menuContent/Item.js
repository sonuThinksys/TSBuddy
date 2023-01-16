import React from 'react';
import {ImageBackground, Image, Text, View, FlatList} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';

const Item = () => {
  const data = [
    {
      type_of_food: 'Breafast',
      img_url: MonthImages.breakfastImgS,
      menu: 'NA',
      numberOfLikes: 0,
      numberOfDislike: 0,
      id: 1,
    },
    {
      type_of_food: 'Lunch',
      img_url: MonthImages.Lunch,
      menu: 'NA',
      numberOfLikes: 0,
      numberOfDislike: 0,
      id: 2,
    },
    {
      type_of_food: 'Snacks',
      img_url: MonthImages.snacksS,
      menu: 'NA',
      numberOfLikes: 0,
      numberOfDislike: 0,
      id: 3,
    },
  ];
  return (
    <View style={{paddingHorizontal: wp(0.1)}}>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const renderItem = ({item}) => {
  return (
    <View
      style={{
        backgroundColor: '#CFD2CF',
        width: wp(50),
        marginTop: hp(1),
        marginHorizontal: wp(1),
        borderRadius: 5,
        opacity: 1,
      }}>
      <Text style={{paddingVertical: hp(1), paddingHorizontal: wp(4)}}>
        {item.type_of_food}
      </Text>
      <View>
        <ImageBackground
          source={item.img_url}
          resizeMode="contain"
          style={{
            height: hp(15),
            width: wp(50),
            borderColor: 'black',
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0, 76, 153, 0.8)',
              width: '42%',
              height: '100%',
              paddingLeft: wp(4),
            }}>
            <Text style={{color: 'white', paddingVertical: hp(0.6)}}>Menu</Text>
            <Text style={{color: 'white'}}> {item.menu}</Text>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: wp(2),
          paddingVertical: hp(0.5),
        }}>
        <Image
          style={{
            height: 20,
            width: 20,
            marginLeft: wp(2),
            marginBottom: 5,
          }}
          source={MonthImages.LikeImage}
        />
        <Text style={{flex: 1, marginTop: 2}}> {item.numberOfLikes}</Text>
        <Image
          style={{
            height: 20,
            width: 20,
            marginLeft: wp(20),
            marginTop: 4,
          }}
          source={MonthImages.dislikesm}
        />
        <Text style={{flex: 1, marginTop: 2}}>{item.numberOfDislike}</Text>
      </View>
    </View>
  );
};

export default Item;
