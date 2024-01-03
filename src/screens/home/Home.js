import React, {useEffect, useRef} from 'react';
import {View, ScrollView, FlatList} from 'react-native';

import CarouselAutoScroll from 'component/ImageSlide/CarouselAutoScroll';
import MenuDetails from 'component/menuContent/MenuDetails';
import MenuItem from 'component/menuContent/MenuItem';
import RecentLeaves from 'component/recentappliedLeaves/RecentLeaves';
import RemainingLeaves from 'component/remainingLeaves/RemainingLeaves';
import UpComingHolidays from 'component/upComingHolidays/UpComingHolidays';
import {useSelector, useDispatch} from 'react-redux';

import {getConfigData as getConfigDataHandler} from 'redux/homeSlice';
// import {ERROR} from 'utils/string';
// import ShowAlert from 'customComponents/CustomError';
// import {renewCurrentToken} from 'customComponents/CustomError';
import WelcomeHeader from 'component/WelcomeHeader/WelcomeHeader';
import CustomHeader from 'navigation/CustomHeader';
import {useIsFocused} from '@react-navigation/native';
import styles from './HomeStyles';
import {Text} from 'react-native';
// import {renewToken} from 'Auth/LoginSlice';

let data = [
  WelcomeHeader,
  CarouselAutoScroll,
  MenuDetails,
  MenuItem,
  RemainingLeaves,
  RecentLeaves,
  UpComingHolidays,
];

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {userToken: token} = useSelector(state => state.auth);
  const flatListRef = useRef(null);
  const isFocussed = useIsFocused();
  const {isGuestLogin} = useSelector(state => state.auth);

  useEffect(() => {
    if (isFocussed && flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [isFocussed]);

  useEffect(() => {
    if (!isGuestLogin) {
      (async () => {
        await dispatch(getConfigDataHandler({token}));
      })();
    }
  }, [dispatch, token, isGuestLogin]);

  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        showDrawerMenu={true}
        title
        navigation={navigation}
        isHome={true}
        showHeaderRight={true}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => {
          let Component = item;
          return <Component key={index} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* <ScrollView
        nestedScrollEnabled={true}
        onMomentumScrollEnd={() => console.log('Calling:', 'on Scroll')}> */}
      {/* {data.map((item, index) => {
        let Component = item;
        return (
          <Component key={index} isTokenExpired={index === 0 ? true : false} />
        );
      })} */}
      {/* </ScrollView> */}
      {/* <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={data}
        style={{flex: 1}}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => {
          let Component = item;
          return <Component isTokenExpired={index === 0 ? true : false} />;
        }}
      /> */}
    </View>
  );
};
export default Home;
