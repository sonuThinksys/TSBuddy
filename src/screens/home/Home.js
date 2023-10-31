import React, {useState, useEffect, useRef} from 'react';
import {View, ScrollView} from 'react-native';

import CarouselAutoScroll from 'component/ImageSlide/CarouselAutoScroll';
import MenuDetails from 'component/menuContent/MenuDetails';
import MenuItem from 'component/menuContent/MenuItem';
import RecentLeaves from 'component/recentappliedLeaves/RecentLeaves';
import RemainingLeaves from 'component/remainingLeaves/RemainingLeaves';
import UpComingHolidays from 'component/upComingHolidays/UpComingHolidays';
import {useSelector, useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';

import Loader from 'component/loader/Loader';
import {
  getCalendereventData,
  getConfigData as getConfigDataHandler,
  getEmployeeProfileData,
} from 'redux/homeSlice';
import {ERROR} from 'utils/string';
import ShowAlert from 'customComponents/CustomError';
// import {renewCurrentToken} from 'customComponents/CustomError';
import WelcomeHeader from 'component/WelcomeHeader/WelcomeHeader';
import CustomHeader from 'navigation/CustomHeader';
import {useIsFocused} from '@react-navigation/native';
import styles from './HomeStyles';
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
  const {userToken: token, refreshToken} = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
  const isFocussed = useIsFocused();
  const decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;

  useEffect(() => {
    if (isFocussed && flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [isFocussed]);

  useEffect(() => {
    // if (isFocussed) {
    (async () => {
      try {
        setLoading(true);

        token &&
          (await dispatch(
            getEmployeeProfileData({
              token,
              employeeID,
              refreshToken,
              dispatch,
            }),
          ));
      } catch (err) {
        console.log('errorProfile:', err);
      } finally {
        setLoading(false);
      }
    })();
    // }
  }, [token, dispatch, employeeID, refreshToken]);
  // }, [isFocussed, token]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const events = await dispatch(
          getCalendereventData({token, dispatch, refreshToken}),
        );

        if (events?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: events?.error?.message,
            buttonText: 'Close',
            dispatch,
            navigation,
          });
        }
      } catch (err) {
        console.log('errEvents:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, navigation, refreshToken, token]);

  useEffect(() => {
    (async () => {
      await dispatch(getConfigDataHandler({token}));

      // const result = await dispatch(
      //   getPermissions({
      //     token:
      //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImthbWFsLmRlZXBpa2FAdGhpbmtzeXMuY29tIiwiZW1wbG95ZWVOYW1lIjoiRGVlcGlrYSBLYW1hbCIsImdlbmRlciI6IkZlbWFsZSIsImVtcGxveWVlSWQiOjEwMjI0LCJ1c2VyUm9sZXMiOlt7InJvbGVJZCI6IlJMLzAwMDAwOCIsInJvbGVOYW1lIjoiRW1wbG95ZWUiLCJkZWZhdWx0X3JvbGUiOjF9LHsicm9sZUlkIjoiUkwvMDAwMDA3Iiwicm9sZU5hbWUiOiJMZWF2ZSBBcHByb3ZlciIsImRlZmF1bHRfcm9sZSI6MH0seyJyb2xlSWQiOiJSTC8wMDAwMDQiLCJyb2xlTmFtZSI6IkhSIE1hbmFnZXIiLCJkZWZhdWx0X3JvbGUiOjB9LHsicm9sZUlkIjoiUkwvMDAwMDAzIiwicm9sZU5hbWUiOiJBZG1pbmlzdHJhdG9yIiwiZGVmYXVsdF9yb2xlIjowfV0sImlzcyI6InRoaW5rc3lzLWhyIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwiYXV0aF90aW1lIjoxNjk3NzEyODMzODQwLCJpYXQiOjE2OTc3MTI4MzMsImV4cCI6MTY5NzcxNjQzM30.JfvxBlOluFOidyHNFePSBU4-ULjGw9cGHP6uwq6WaOs',
      //   }),
      // );
      // console.log('resultIs:', result);
    })();
  }, [dispatch, token]);

  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        showDrawerMenu={true}
        title
        navigation={navigation}
        isHome={true}
        showHeaderRight={true}
      />
      {loading ? <Loader /> : null}

      <ScrollView nestedScrollEnabled={true}>
        {data.map((item, index) => {
          let Component = item;
          return (
            <Component
              key={index}
              isTokenExpired={index === 0 ? true : false}
            />
          );
        })}
      </ScrollView>
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
