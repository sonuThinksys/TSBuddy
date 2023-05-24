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
import ResourceIcon from 'assets/allImage/user.svg';
import {FontFamily} from 'constants/fonts';
import {getCalendereventData, getEmployeeProfileData} from 'redux/homeSlice';
import {ERROR} from 'utils/string';
import ShowAlert from 'customComponents/CustomError';
let data = [
  MenuDetails,
  MenuItem,
  RecentLeaves,
  RemainingLeaves,
  UpComingHolidays,
];

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.auth);
  const {calendereventData: calenderData} = useSelector(state => state.home);
  const {userToken: token} = useSelector(state => state.auth);

  const birthdays = calenderData?.calenderEvent;
  const anniversaries = calenderData?.anniversaryEvent;
  const [loading, setLoading] = useState(false);

  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        token && dispatch(getEmployeeProfileData({token, employeeID}));
        console.log('calling::::::::', 'api');

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
      } catch (err) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? <Loader /> : null}

      {birthdays?.length > 0 || anniversaries?.length > 0 ? (
        !loading ? (
          <View style={{height: hp(23), backgroundColor: Colors.white}}>
            <CarouselAutoScroll />
          </View>
        ) : (
          <Loader />
        )
      ) : loading ? (
        <Loader />
      ) : (
        <View
          style={{
            height: hp(23),
            backgroundColor: Colors.black,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontFamily: FontFamily.RobotoBold,
              color: Colors.white,
            }}>
            No Events found for this month.
          </Text>
        </View>
      )}

      {/* ) : null} */}
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
