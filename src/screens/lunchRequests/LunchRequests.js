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

const LunchRequests = ({navigation}) => {
  const dispatch = useDispatch();
  const [lunchRequests, setLunchRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {userToken: token} = useSelector(state => state.auth);

  useEffect(() => {
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

        setLunchRequests(allLunchRequests.payload);
      } catch (err) {
        console.error('errorIs:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
