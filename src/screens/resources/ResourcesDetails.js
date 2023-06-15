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
import {getResourcesEmployeesLeaves, modalStatus} from 'redux/homeSlice';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import styles from '../leaves/LeaveStyles';
import {guestLeavesScreenData} from 'guestData';
import AttendenceTab from './AttendenceTab';
import {FontFamily} from 'constants/fonts';
import {useIsFocused} from '@react-navigation/native';
import WfhTab from './wfhTab';
import CommunicationModal from 'modals/CommunicationModal';
import RegularisationTab from './RegularisationTab';

const screenWidth = Dimensions.get('window').width;

const ResourcesDetails = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const {
    designation,
    employeeName,
    image,
    managerInfoDto,
    name: employeeId,
    companyEmail,
    cellNumber,
  } = route.params;

  const employeeID = employeeId?.split('/')[1];

  const dispatch = useDispatch();
  const isFocussed = useIsFocused();
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  const [isRefresh, setRefresh] = useState(false);
  const [filteredSelectedDate, setFilteredSelectedDate] = useState(null);
  const [resurcesEmployeeLeaves, setResourcesEmployeesLeaves] = useState([]);
  const [selectedTab, setSelectedTab] = useState('leaves');
  const [openCount, setOpenCount] = useState(0);
  const [wfhCount, setWfhCount] = useState(0);
  const [empDetail, setClickData] = useState({});

  const {isShowModal: isShowModal, employeeProfileLoading: isLoading} =
    useSelector(state => state.home);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const leavesData = await dispatch(
          getResourcesEmployeesLeaves({token, empID: employeeID}),
        );
        let count = 0;
        leavesData.payload.employeeLeaves.forEach(element => {
          if (element.status == 'Open') {
            count++;
          }
        });

        // setOpenCount(count);

        let count1 = 0;
        leavesData.payload.employeeWfh.forEach(element => {
          if (element.status == 'Open') {
            count1++;
          }
        });

        setWfhCount(count1);
        setOpenCount(count);

        // let sortedLeavesData = leavesData.payload[0].sort((a, b) => {
        //   return a.fromDate - b.fromDate;
        // });

        // sortedLeavesData.reverse();

        setResourcesEmployeesLeaves(leavesData.payload.employeeLeaves);
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

  const updateData = async () => {
    try {
      setRefresh(true);
      const allLeaves = await dispatch(getResourcesEmployeesLeaves({token}));
    } catch (err) {
      console.error('err:', err);
    } finally {
      setRefresh(false);
    }
  };

  const renderItem = ({item, employeeName}) => {
    // if (filteredSelectedDate) {
    //   const shouldRender =
    //     filteredSelectedDate?.getTime() >= new Date(item?.fromDate).getTime();
    //   if (!shouldRender) return null;
    // }
    return (
      <TouchableOpacity
        onPress={() => {
          item.status !== 'Open'
            ? navigation.navigate(
                'resourceLeaveDetailsScreen',
                item,
                employeeName,
              )
            : navigation.navigate('resourceLeaveDetailsScreenOpen', {
                ...item,
                fromResource: true,
                employeeId,
              });
        }}>
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

  if (isLoading) {
    return <Loader />;
  }

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
              <TouchableOpacity onPress={() => sendMessage()}>
                <View style={style.social_icon}>
                  <Image
                    source={MonthImages.empWa}
                    style={{height: '100%', width: '100%'}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.tab_view}>
            <Pressable
              onPress={() => {
                setSelectedTab('leaves');
              }}>
              <View
                style={[
                  style.tab,
                  selectedTab === 'leaves' && {
                    borderBottomColor: Colors.red,
                    borderBottomWidth: 2,
                  },
                ]}>
                <View style={{position: 'relative'}}>
                  <Text style={{color: 'white', fontSize: 17}}>Leaves</Text>
                  {openCount > 0 ? (
                    <View style={style.badges_number}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: 16,
                          fontFamily: FontFamily.RobotoMedium,
                        }}>
                        {openCount}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setSelectedTab('attendence');
              }}>
              <View
                style={[
                  style.tab,
                  selectedTab == 'attendence' && {
                    borderBottomColor: Colors.red,
                    borderBottomWidth: 2,
                  },
                ]}>
                <Text style={{color: 'white', fontSize: 17}}>Att</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setSelectedTab('wfh');
              }}>
              <View
                style={[
                  style.tab,
                  selectedTab === 'wfh' && {
                    borderBottomColor: Colors.red,
                    borderBottomWidth: 2,
                  },
                ]}>
                <View style={{position: 'relative'}}>
                  <Text style={{color: 'white', fontSize: 17}}>WFH</Text>
                  {wfhCount > 0 ? (
                    <View style={style.badges_number}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: 16,
                          fontFamily: FontFamily.RobotoMedium,
                        }}>
                        {wfhCount}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setSelectedTab('regularisation');
              }}>
              <View
                style={[
                  style.tab,
                  selectedTab === 'regularisation' && {
                    borderBottomColor: Colors.red,
                    borderBottomWidth: 2,
                  },
                ]}>
                <View style={{position: 'relative'}}>
                  <Text style={{color: 'white', fontSize: 17}}>Reg</Text>
                  {wfhCount > 0 ? (
                    <View style={style.badges_number}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: 16,
                          fontFamily: FontFamily.RobotoMedium,
                        }}>
                        {wfhCount}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={style.listOfLeaves}>
          {selectedTab === 'leaves' ? (
            resurcesEmployeeLeaves.length > 0 ? (
              <FlatList
                refreshing={isRefresh}
                onRefresh={updateData}
                data={
                  isGuestLogin ? guestLeavesScreenData : resurcesEmployeeLeaves
                }
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
                  Applied Leaves Not Found.
                </Text>
              </View>
            )
          ) : selectedTab == 'attendence' ? (
            <AttendenceTab
              employeeName={employeeName}
              employeeID={employeeID}
            />
          ) : selectedTab == 'wfh' ? (
            <WfhTab employeeName={employeeName} employeeID={employeeID} />
          ) : (
            <RegularisationTab
              employeeName={employeeName}
              employeeID={employeeID}
            />
          )}
        </View>
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
    marginRight: 10,
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
    justifyContent: 'space-between',
  },
  tab: {
    width: screenWidth / 4,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  badges_number: {
    backgroundColor: Colors.reddishTint,
    width: 25,
    height: 25,
    borderRadius: 13,
    position: 'absolute',
    right: -26,
    top: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  listOfLeaves: {
    height: hp(65),
    marginBottom: 5,
  },
});

export default ResourcesDetails;
