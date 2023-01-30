import React, {useState, useEffect} from 'react';
import {
  View,
  // Text,
  // StatusBar,
  // SafeAreaView,
  // ScrollView,
  Image,
  FlatList,
  LogBox,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {ScrollView} from 'react-native-virtualized-view';
import CarouselAutoScroll from 'component/ImageSlide/CarouselAutoScroll';
import MenuDetails from 'component/menuContent/MenuDetails';
import Item from 'component/menuContent/Item';
import RecentLeaves from 'component/recentappliedLeaves/RecentLeaves';
import RemainingLeaves from 'component/remainingLeaves/RemainingLeaves';
import UpComingHolidays from 'component/upComingHolidays/UpComingHolidays';

const Home = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{height: hp(23), backgroundColor: 'white'}}>
        <CarouselAutoScroll />
      </View>
      <ScrollView
        nestedScrollEnabled={false}
        contentContainerStyle={{flexGrow: 1}}
        style={{flex: 1}}
        horizontal={false}>
        <MenuDetails />
        <Item />
        <RemainingLeaves />
        <RecentLeaves />
        <UpComingHolidays />
      </ScrollView>
    </View>
  );
};
export default Home;
