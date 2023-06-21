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
import {useSelector, useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';

import Loader from 'component/loader/Loader';
import {getCalendereventData, getEmployeeProfileData} from 'redux/homeSlice';
import {ERROR} from 'utils/string';
import ShowAlert from 'customComponents/CustomError';
import WelcomeHeader from 'component/WelcomeHeader/WelcomeHeader';
import CustomHeader from 'navigation/CustomHeader';

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
  console.log('navigationDrawer:', navigation);
  const dispatch = useDispatch();
  const {userToken: token} = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);

  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const empData =
          token &&
          (await dispatch(
            getEmployeeProfileData({
              token,
              employeeID,
            }),
          ));

        if (empData?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: empData?.error?.message,
            buttonText: 'Close',
            dispatch,
            navigation,
            isTokenExpired: true,
          });

          if (empData?.error?.message.toLowerCase() === 'token-expired') {
            return;
          }
        }
      } catch (err) {
        setLoading(false);
      }

      try {
        const events = await dispatch(getCalendereventData(token));
        if (events?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: events?.error?.message,
            buttonText: 'Close',
            dispatch,
            navigation,
          });
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);

  // if (isLoading) {
  //   return <Loader />;
  // }

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

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        style={{flex: 1}}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => {
          let Component = item;
          return <Component isTokenExpired={index === 0 ? true : false} />;
        }}
      />
    </View>
  );
};
export default Home;
