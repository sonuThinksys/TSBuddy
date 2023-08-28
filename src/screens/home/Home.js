import React, {useState, useEffect, useRef} from 'react';
import {View, ScrollView} from 'react-native';

import CarouselAutoScroll from 'component/ImageSlide/CarouselAutoScroll';
import MenuDetails from 'component/menuContent/MenuDetails';
import MenuItem from 'component/menuContent/MenuItem';
import RecentLeaves from 'component/recentappliedLeaves/RecentLeaves';
import RemainingLeaves from 'component/remainingLeaves/RemainingLeaves';
import UpComingHolidays from 'component/upComingHolidays/UpComingHolidays';
import {Colors} from 'colors/Colors';
import {useSelector, useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';

import Loader from 'component/loader/Loader';
import {
  getCalendereventData,
  getConfigData as getConfigDataHandler,
  getEmployeeProfileData,
} from 'redux/homeSlice';
import {ERROR} from 'utils/string';
import ShowAlert, {renewCurrentToken} from 'customComponents/CustomError';
import WelcomeHeader from 'component/WelcomeHeader/WelcomeHeader';
import CustomHeader from 'navigation/CustomHeader';
import {useIsFocused} from '@react-navigation/native';
import {renewToken} from 'Auth/LoginSlice';

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
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;

  useEffect(() => {
    if (isFocussed && flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [isFocussed]);

  useEffect(() => {
    if (isFocussed) {
      (async () => {
        try {
          setLoading(true);
          const empData =
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
          console.log('err:', err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [token]);
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
  }, []);

  useEffect(() => {
    (async () => {
      const configData = await dispatch(getConfigDataHandler({token}));
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.whitishBlue,
      }}>
      <CustomHeader
        showDrawerMenu={true}
        title
        navigation={navigation}
        isHome={true}
        showHeaderRight={true}
      />
      {loading ? <Loader /> : null}

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
    </View>
  );
};
export default Home;
