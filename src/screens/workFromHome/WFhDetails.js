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
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ResourceIcon from 'assets/allImage/user.svg';
import {RegularzitionScreen} from 'navigation/Route';
import {getResourcesEmployeesLeaves, modalStatus} from 'redux/homeSlice';
import {useIsFocused} from '@react-navigation/native';
import {FontFamily} from 'constants/fonts';
import CommunicationModal from 'modals/CommunicationModal';

const screenWidth = Dimensions.get('window').width;

const WFHDetails = ({route, navigation}) => {
  const {
    designation,
    employeeName,
    image,
    managerInfoDto,
    name: employeeId,
    cellNumber,
    companyEmail,
  } = route.params;

  const isFocused = useIsFocused();
  const [isRefresh, setRefresh] = useState(false);
  const [resurcesEmployeeLeaves, setResourcesEmployeesLeaves] = useState([]);
  const [openCount, setOpenCount] = useState(0);
  const [empDetail, setClickData] = useState({});

  const {isShowModal: isShowModal, employeeProfileLoading: isLoading} =
    useSelector(state => state.home);

  const isFocussed = useIsFocused();
  const employeeID = employeeId?.split('/')[1];

  const dispatch = useDispatch();
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const leavesData = await dispatch(
          getResourcesEmployeesLeaves({token, empID: employeeID}),
        );

        let count = 0;
        leavesData.payload.employeeWfh.forEach(element => {
          if (element.status == 'Open') {
            count++;
          }
        });

        setOpenCount(count);

        // let sortedLeavesData = leavesData.payload.employeeWfh.sort((a, b) => {
        //   return a.fromDate - b.fromDate;
        // });

        // sortedLeavesData.reverse();

        setResourcesEmployeesLeaves(leavesData.payload.employeeWfh);
        if (leavesData?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: leavesData?.error?.message,
            buttonText: 'Close',
            dispatch,
          });
        }
      })();
    }
  }, [isFocused]);

  const updateData = async () => {
    try {
      setRefresh(true);
      const allLeaves = await dispatch(getResourcesEmployeesLeaves({token}));
    } catch (err) {
    } finally {
      setRefresh(false);
    }
  };

  const dialCall = () => {
    setClickData({
      medium: isGuestLogin ? '9801296234' : cellNumber,
      nameOfEmployee: isGuestLogin ? 'guest' : employeeName,
      text: 'Call',
    });
    dispatch(modalStatus(true));
  };

  const sendMail = () => {
    setClickData({
      medium: isGuestLogin ? 'guest@thinksys.com' : companyEmail,
      nameOfEmployee: isGuestLogin ? 'guest' : employeeName,
      text: 'Send Mail to',
    });
    dispatch(modalStatus(true));
  };

  const sendMessage = async () => {
    setClickData({
      medium: isGuestLogin ? '9801296234' : cellNumber,
      nameOfEmployee: isGuestLogin ? 'guest manager' : employeeName,
      text: 'Send SMS to',
    });
    dispatch(modalStatus(true));
  };

  const renderItem = ({item}) => {
    // if (filteredSelectedDate) {
    //   const shouldRender =
    //     filteredSelectedDate?.getTime() >= new Date(item?.fromDate).getTime();
    //   if (!shouldRender) return null;
    // }
    return (
      <TouchableOpacity
        onPress={() => {
          item.status !== 'Open'
            ? navigation.navigate('workFromHomeLeaveDetailsScreen', item)
            : navigation.navigate('workFromHomeLeaveApplyScreenOpen', {
                ...item,
                fromWfh: true,
                employeeID,
              });
        }}>
        <View style={style.flateListView}>
          <View
            style={{
              flex: 1,
              backgroundColor:
                item.status === 'Rejected' || item.status === 'Dismissed'
                  ? Colors.grey
                  : item.status === 'Open'
                  ? Colors.darkPink
                  : Colors.parrotGreenLight,
              paddingHorizontal: widthPercentageToDP(2),
              paddingVertical: heightPercentageToDP(1),
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
          <View style={style.secondView}>
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
    <>
      {isShowModal && isFocussed ? (
        <CommunicationModal empDetail={empDetail} />
      ) : null}
      <SafeAreaView style={{flex: 1}}>
        <View style={style.container}>
          <View style={style.profile_name_cont}>
            <View style={style.profile_cont}>
              {image ? (
                <Image
                  resizeMode="stretch"
                  source={{uri: `data:image/jpeg;base64,${image}`}}
                  style={style.image}
                />
              ) : (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.white,
                    borderRadius: 50,
                    padding: 10,
                  }}>
                  <ResourceIcon
                    borderWidth={1}
                    borderColor={'black'}
                    height={50}
                    width={50}
                    color={Colors.white}
                  />
                </View>
              )}
            </View>
            <View style={style.name_cont}>
              <Text style={style.name_txt}>{employeeName}</Text>
              <Text style={style.designation_txt}>{designation}</Text>
            </View>
          </View>
          <View style={style.social_icon_cont}>
            <View style={style.social_inner_cont}>
              <TouchableOpacity
                onPress={() => {
                  sendMail();
                }}>
                <View style={style.social_icon}>
                  <Image
                    source={MonthImages.empMailS}
                    style={{height: '100%', width: '100%'}}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dialCall();
                }}>
                <View style={style.social_icon}>
                  <Image
                    source={MonthImages.empCallS}
                    style={{height: '100%', width: '100%'}}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  sendMessage();
                }}>
                <View style={style.social_icon}>
                  <Image
                    source={MonthImages.empMsg}
                    style={{height: '100%', width: '100%'}}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  sendMessage();
                }}>
                <View style={style.social_icon}>
                  <Image
                    source={MonthImages.empWa}
                    style={{height: '100%', width: '100%'}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {resurcesEmployeeLeaves.length > 0 ? (
          <FlatList
            refreshing={isRefresh}
            onRefresh={updateData}
            data={isGuestLogin ? guestLeavesScreenData : resurcesEmployeeLeaves}
            renderItem={renderItem}
            keyExtractor={(_, index) => index}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontFamily: FontFamily.RobotoBold, fontSize: 16}}>
              Work from home Not Found.
            </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorDodgerBlue2,
    marginBottom: 5,
  },
  profile_name_cont: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
    padding: 10,
    alignItems: 'center',
  },
  profile_cont: {
    width: wp(18),
    height: hp(9),
    marginRight: 20,
    borderRadius: 50,
  },
  name_cont: {},
  name_txt: {
    color: 'white',
    fontSize: 20,
    paddingBottom: 8,
  },
  designation_txt: {
    color: 'white',
    fontSize: 16,
  },
  social_icon_cont: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
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
    // borderWidth: 11,
    backgroundColor: 'teal',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  flateListView: {
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical: heightPercentageToDP(0.5),
    marginHorizontal: widthPercentageToDP(2),
    backgroundColor: Colors.lightcyan,
    shadowOpacity: 0.1,
  },
  secondView: {
    flex: 2,
    backgroundColor: Colors.lightcyan,
    paddingHorizontal: widthPercentageToDP(2),
    paddingVertical: heightPercentageToDP(1),
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default WFHDetails;
