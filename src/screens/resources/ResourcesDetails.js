import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import {Colors} from 'colors/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AttendenceTab from './AttendenceTab';
import {FontFamily} from 'constants/fonts';
import {useIsFocused} from '@react-navigation/native';
import WfhTab from './wfhTab';
import CommunicationModal from 'modals/CommunicationModal';
import RegularisationTab from './RegularisationTab';
import ResourceProfileDetails from 'reusableComponents/ResourceProfileDetails';
import LeavesList from 'reusableComponents/LeavesList';
import {
  getEmployeeRegularizationRequest,
  getResourcesEmployeesLeaves,
  modalStatus,
} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import CustomHeader from 'navigation/CustomHeader';

const screenWidth = Dimensions.get('window').width;

const ResourcesDetails = ({route, navigation}) => {
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
  const [resurcesEmployeeLeaves, setResourcesEmployeesLeaves] = useState([]);
  const [selectedTab, setSelectedTab] = useState('leaves');
  const [openCount, setOpenCount] = useState(0);
  const [wfhCount, setWfhCount] = useState(0);
  const [regCount, setRegCount] = useState(0);
  const [empDetail, setClickData] = useState({});

  useEffect(() => {
    if (isFocussed) {
      (async () => {
        const regularisationRequests = await dispatch(
          getEmployeeRegularizationRequest({token, empId: employeeID}),
        );
        let count = 0;
        regularisationRequests.payload.forEach(element => {
          if (element.status == 'Open') {
            count++;
          }
        });
        setRegCount(count);
        if (regularisationRequests?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: regularisationRequests?.error?.message,
            buttonText: 'Close',
            dispatch,
          });
        }
      })();

      (async () => {
        const leavesData = await dispatch(
          getResourcesEmployeesLeaves({
            token,
            empID: employeeID,
          }),
        );

        let wfhCount = 0;
        leavesData?.payload?.employeeWfh?.forEach(element => {
          if (element.status == 'Open') {
            wfhCount++;
          }
        });
        setWfhCount(wfhCount);

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
  }, [isFocussed]);

  const {isShowModal: isShowModal, employeeProfileLoading: isLoading} =
    useSelector(state => state.home);

  const getLeaveCount = count => {
    setOpenCount(count);
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
      nameOfEmployee: isGuestLogin ? 'guest' : employeeName,
      text: 'Send SMS to',
    });
    dispatch(modalStatus(true));
  };

  const sendWhatsAppMessage = async () => {
    setClickData({
      medium: isGuestLogin ? '9801296234' : cellNumber,
      nameOfEmployee: isGuestLogin ? 'guest' : employeeName,
      text: 'Send WhatsApp to',
    });
    dispatch(modalStatus(true));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CustomHeader
        showDrawerMenu={false}
        title="Resource Details"
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
      />
      {isShowModal && isFocussed ? (
        <CommunicationModal empDetail={empDetail} />
      ) : null}
      <SafeAreaView style={{flex: 1}}>
        <View style={style.container}>
          <ResourceProfileDetails
            dialCall={dialCall}
            sendMail={sendMail}
            sendMessage={sendMessage}
            sendWhatsApp={sendWhatsAppMessage}
            empDetails={{
              employeeName,
              image,
              companyEmail,
              cellNumber,
              designation,
              managerInfoDto,
            }}
          />
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
                  {regCount > 0 ? (
                    <View style={style.badges_number}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: 16,
                          fontFamily: FontFamily.RobotoMedium,
                        }}>
                        {regCount}
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
            <LeavesList
              fromResource={true}
              getLeaveCount={getLeaveCount}
              resourceEmployeeID={employeeID}
            />
          ) : selectedTab == 'attendence' ? (
            <AttendenceTab
              employeeName={employeeName}
              employeeID={employeeID}
            />
          ) : selectedTab == 'wfh' ? (
            <WfhTab
              employeeName={employeeName}
              employeeID={employeeID}
              fromResource={true}
              resourceEmployeeID={employeeID}
            />
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
