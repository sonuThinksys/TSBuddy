import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, FlatList, LogBox, Text, Image} from 'react-native';
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
import ResourceIcon from 'assets/allImage/user.svg';
let data = [
  MenuDetails,
  MenuItem,
  RecentLeaves,
  RemainingLeaves,
  UpComingHolidays,
];

const Home = () => {
  const {isLoading} = useSelector(state => state.auth);
  const {calendereventData: calenderData} = useSelector(state => state.home);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? <Loader /> : null}
      {calenderData?.calenderEvent?.length > 0 ||
      calenderData?.anniversaryEvent?.length > 0 ? (
        <View style={{height: hp(23), backgroundColor: Colors.white}}>
          <CarouselAutoScroll />
        </View>
      ) : null}
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
