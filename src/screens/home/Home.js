import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, FlatList, LogBox} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import CarouselAutoScroll from 'component/ImageSlide/CarouselAutoScroll';
import MenuDetails from 'component/menuContent/MenuDetails';
import MenuItem from 'component/menuContent/MenuItem';
import RecentLeaves from 'component/recentappliedLeaves/RecentLeaves';
import RemainingLeaves from 'component/remainingLeaves/RemainingLeaves';
import UpComingHolidays from 'component/upComingHolidays/UpComingHolidays';
import {Colors} from 'colors/Colors';
import {useSelector} from 'react-redux';
import Loader from 'component/loader/Loader';
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

  const {isLoading} = useSelector(state => state.auth);
  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? <Loader /> : null}
      <View style={{height: hp(23), backgroundColor: Colors.white}}>
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
