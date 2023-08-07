import CustomHeader from 'navigation/CustomHeader';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import styles from './LunchRequestsStyles';
import {useDispatch, useSelector} from 'react-redux';
import {getTodayLunchRequests} from 'redux/homeSlice';
import {useEffect, useState} from 'react';
import Loader from 'component/loader/Loader';
import {MonthImages} from 'assets/monthImage/MonthImage';
import MailIcon from 'assets/newDashboardIcons/mail.svg';
import {Colors} from 'colors/Colors';
import {renewCurrentToken} from 'customComponents/CustomError';
import {renewToken} from 'Auth/LoginSlice';
import {useIsFocused} from '@react-navigation/native';

const LunchRequests = ({navigation}) => {
  const isFocussed = useIsFocused();
  const dispatch = useDispatch();
  const [lunchRequests, setLunchRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const refreshToken = useSelector(state => state?.auth?.refreshToken);

  const {userToken: token} = useSelector(state => state.auth);

  useEffect(() => {
    if (isFocussed) {
      (async () => {
        try {
          const todayDateObj = new Date();
          const todayDate = todayDateObj.getDate();
          const currentMonth =
            todayDateObj.getMonth() + 1 < 10
              ? `0${todayDateObj.getMonth() + 1}`
              : todayDateObj.getMonth() + 1;
          const currentYear = todayDateObj.getFullYear();
          const todayDateStr = `${currentYear}-${currentMonth}-${todayDate}`;
          setIsLoading(true);

          const allLunchRequests = await dispatch(
            getTodayLunchRequests({token, date: todayDateStr}),
          );

          // ===================================================================

          if (allLunchRequests?.error) {
            ShowAlert({
              messageHeader: ERROR,
              messageSubHeader: allLunchRequests?.error?.message,
              buttonText: 'Close',
              dispatch,
              navigation,
            });
          }
          // if (
          //   allLunchRequests?.error?.message?.toLowerCase() === 'token-expired'
          // ) {
          //   const newFetchedData = await renewCurrentToken({
          //     dispatch,
          //     renewToken,
          //     refreshToken,
          //     data: {date: todayDateStr},
          //     apiCallAgain: getTodayLunchRequests,
          //   });

          //   setLunchRequests(newFetchedData);
          // }
          // ===================================================================
          else {
            setLunchRequests(allLunchRequests.payload);
          }
        } catch (err) {
          console.error('error:', err);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [isFocussed]);

  const mailPressHandler = () => {};

  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Lunch Requests"
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
        headerRight={
          <Pressable onPress={mailPressHandler} style={{}}>
            <Image
              source={MonthImages.mailEmp}
              style={{
                height: 25,
                width: 25,
                tintColor: Colors.yellowishOrange,
              }}
            />
          </Pressable>
        }
      />
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainContainer}>
          <View style={styles.countContainer}>
            <Text style={styles.countText}>
              Total Count: {lunchRequests.length}
            </Text>
          </View>
          {lunchRequests.map(request => {
            return (
              <View key={request.employeeId} style={styles.cardContainer}>
                <View style={styles.leftContainer}>
                  <Text style={styles.empID}>{request.employeeId}</Text>
                  <Text style={styles.name}>{request.employeeName}</Text>
                </View>
                <View>
                  <Text style={styles.requestType}>{request.requestType}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

export default LunchRequests;
