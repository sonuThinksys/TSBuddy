import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'colors/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import baseUrl from 'services/Urls';
import {getResourcesEmployeesLeaves} from 'redux/homeSlice';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import styles from '../leaves/LeaveStyles';
import {guestLeavesScreenData} from 'guestData';
import Attendence from 'screens/attendence/Attendence';
import AttendenceTab from './AttendenceTab';

const screenWidth = Dimensions.get('window').width;

const ResourcesDetails = ({route}) => {
  const {designation, employeeName, image, managerInfoDto} = route.params;
  const dispatch = useDispatch();
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  const [isRefresh, setRefresh] = useState(false);
  const [filteredSelectedDate, setFilteredSelectedDate] = useState(null);
  const [resurcesEmployeeLeaves, setResourcesEmployeesLeaves] = useState([]);
  const [selectedTab, setSelectedTab] = useState('leaves');
  const [openCount, setOpenCount] = useState(0);

  useEffect(() => {
    (async () => {
      const leavesData = await dispatch(getResourcesEmployeesLeaves(token));
      let count = 0;
      leavesData.payload.forEach(element => {
        if (element.status == 'Open') {
          count++;
        }
      });

      setOpenCount(count);

      setResourcesEmployeesLeaves(leavesData.payload);
      if (leavesData?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: leavesData?.error?.message,
          buttonText: 'Close',
          dispatch,
        });
      }
    })();
  }, []);

  const updateData = async () => {
    try {
      setRefresh(true);
      const allLeaves = await dispatch(getResourcesEmployeesLeaves({token}));

      setRefresh(false);
    } catch (err) {
      setRefresh(false);
    }
  };

  const renderItem = ({item}) => {
    if (filteredSelectedDate) {
      const shouldRender =
        filteredSelectedDate?.getTime() >= new Date(item?.fromDate).getTime();

      if (!shouldRender) return null;
    }

    return (
      <TouchableOpacity
      // onPress={() => navigation.navigate(LeaveDetailsScreen, item)}
      >
        <View style={styles.flateListView}>
          <View
            style={{
              flex: 1,
              backgroundColor:
                item.status === 'Rejected' || item.status === 'Dismissed'
                  ? Colors.grey
                  : item.status === 'Open'
                  ? Colors.darkPink
                  : Colors.parrotGreenLight,
              paddingHorizontal: wp(2),
              paddingVertical: hp(1),
              justifyContent: 'center',
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              shadowOpacity: 0.1,
            }}>
            <Text style={{textAlign: 'center', fontSize: 18}}>
              {item.totalLeaveDays}{' '}
              {item.leaveType
                .split(' ')
                .map(word => word.charAt(0).toUpperCase())
                .join('')}
            </Text>
            <Text style={{textAlign: 'center'}}>({item.status})</Text>
          </View>
          <View style={styles.secondView}>
            <Text style={{fontWeight: 'bold', opacity: 0.7, fontSize: 16}}>
              {item.leaveApplicationId}
            </Text>
            <Text style={{opacity: 0.6}}>
              {`${new Date(item.fromDate).getDate()} ${new Date(
                item.fromDate,
              ).toLocaleString('default', {month: 'short'})} ${new Date(
                item.fromDate,
              ).getFullYear()}`}
              {' - '}
              {`${new Date(item.toDate).getDate()} ${new Date(
                item.toDate,
              ).toLocaleString('default', {month: 'short'})} ${new Date(
                item.toDate,
              ).getFullYear()}`}
            </Text>
            <Text style={{opacity: 0.8}}>{item.currentStatus}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={style.container}>
        <View style={style.profile_name_cont}>
          <View style={style.profile_cont}>
            {image ? (
              <Image
                resizeMode="stretch"
                source={{uri: `${baseUrl}${image}`}}
                style={style.image}
              />
            ) : (
              <Image
                resizeMode="stretch"
                source={{
                  uri: 'https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg',
                }}
                style={style.image}
              />
            )}
          </View>
          <View style={style.name_cont}>
            <Text style={style.name_txt}>{employeeName}</Text>
            <Text style={style.designation_txt}>{designation}</Text>
          </View>
        </View>
        <View style={style.social_icon_cont}>
          <View style={style.social_inner_cont}>
            <View style={style.social_icon}>
              <Image
                source={MonthImages.empMailS}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            <View style={style.social_icon}>
              <Image
                source={MonthImages.empCallS}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            <View style={style.social_icon}>
              <Image
                source={MonthImages.empMsg}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            <View style={style.social_icon}>
              <Image
                source={MonthImages.empWa}
                style={{height: '100%', width: '100%'}}
              />
            </View>
          </View>
        </View>
        <View style={style.tab_view}>
          <Pressable
            onPress={() => {
              setSelectedTab('leaves');
            }}>
            <View style={style.tab}>
              <Text style={{color: 'white', fontSize: 17}}>Leaves</Text>
              <Text style={style.badges_number}>{openCount}</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedTab('attendence');
            }}>
            <View style={style.tab}>
              <Text style={{color: 'white', fontSize: 17}}>Attendence</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={style.listOfLeaves}>
        {selectedTab == 'leaves' ? (
          <FlatList
            refreshing={isRefresh}
            onRefresh={updateData}
            data={isGuestLogin ? guestLeavesScreenData : resurcesEmployeeLeaves}
            renderItem={renderItem}
            keyExtractor={(_, index) => index}
          />
        ) : (
          <AttendenceTab />
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
  },
  profile_name_cont: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
    padding: 10,
  },
  profile_cont: {
    width: wp(18),
    height: hp(9),
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 50,
  },
  name_txt: {
    color: 'white',
    fontSize: 19,
  },
  designation_txt: {
    color: 'white',
    fontSize: 16,
  },
  social_icon_cont: {
    alignItems: 'center',
  },
  social_inner_cont: {
    width: screenWidth - wp(15),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  social_icon: {
    width: wp(11),
    height: hp(5.5),
    borderRadius: 50,
    backgroundColor: 'teal',
  },
  tab_view: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tab: {
    borderWidth: 1,
    borderColor: Colors.dune,
    width: screenWidth / 2,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  badges_number: {
    backgroundColor: Colors.reddishTint,
    width: wp(5),
    height: hp(2.5),
    borderRadius: 50,
    color: 'white',
    marginBottom: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  listOfLeaves: {
    height: hp(67),
  },
});

export default ResourcesDetails;
