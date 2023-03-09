import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, FlatList, LogBox} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {ScrollView} from 'react-native-virtualized-view';
import CarouselAutoScroll from 'component/ImageSlide/CarouselAutoScroll';
import MenuDetails from 'component/menuContent/MenuDetails';
import MenuItem from 'component/menuContent/MenuItem';
import RecentLeaves from 'component/recentappliedLeaves/RecentLeaves';
import RemainingLeaves from 'component/remainingLeaves/RemainingLeaves';
import UpComingHolidays from 'component/upComingHolidays/UpComingHolidays';
let data = [
  MenuDetails,
  MenuItem,
  RecentLeaves,
  RemainingLeaves,
  UpComingHolidays,
];
const Home = () => {
  // useEffect(() => {
  //   LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  // }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{height: hp(23), backgroundColor: 'white'}}>
        <CarouselAutoScroll />
      </View>
      <FlatList
        data={data}
        style={{flex: 1}}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          let Component = item;
          return <Component />;
        }}
      />
    </SafeAreaView>
  );
};
export default Home;
