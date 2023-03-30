import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import styles from './ProfileStyle';
import {MonthImages} from 'assets/monthImage/MonthImage';
import TSBuddyBackImage from 'assets/mipmap/tsbuddyBack.png';
import {useSelector, useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {getEmployeeProfileData} from 'redux/homeSlice';
import baseUrl from 'services/Urls';
import moment from 'moment';
import {modalStatus} from 'redux/homeSlice';
import CommunicationModal from 'modals/CommunicationModal';
import Loader from 'component/loader/Loader';
import {Colors} from 'colors/Colors';
import {guestProfileData} from 'guestData';
const Profile = () => {
  const [empDetail, setClickData] = useState({});
  const dispatch = useDispatch();
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );
  var decoded = jwt_decode(token);
  const employeeID = decoded.Id;

  useEffect(() => {
    dispatch(getEmployeeProfileData({token, employeeID}));
  }, []);

  const {
    employeeProfile: profileData,
    isShowModal: isShowModal,
    employeeProfileLoading: isLoading,
  } = useSelector(state => state.home);

  const data = [
    {
      image: MonthImages.mailEmp,
      nameOfField: 'Email ID',
      email: isGuestLogin
        ? guestProfileData.companyEmail
        : profileData.companyEmail,
      id: '1',
    },
    {
      image: MonthImages.callEmp,
      nameOfField: 'Mobile No.',
      email: isGuestLogin
        ? guestProfileData.cellNumber
        : profileData.cellNumber,
      id: '2',
    },
    {
      image: MonthImages.mailEmp,
      nameOfField: 'Designation',
      email: isGuestLogin
        ? guestProfileData.designation
        : profileData.designation,
      id: '3',
    },
    {
      image: MonthImages.callEmp,
      nameOfField: 'Emp ID',
      email: isGuestLogin ? 'EMP/10234' : `EMP/${employeeID}`,
      id: '4',
    },
    {
      image: MonthImages.mailEmp,
      nameOfField: 'Date of Joining',
      // email: profileData.dateOfJoining,
      email: isGuestLogin
        ? moment(guestProfileData.dateOfJoining).format(`DD-MMM-YYYY`)
        : moment(profileData.dateOfJoining).format(`DD-MMM-YYYY`),
      id: '5',
    },
    {
      image: MonthImages.callEmp,
      nameOfField: 'Education',
      email: 'NA',
      id: '6',
    },
  ];
  const dialCall = () => {
    setClickData({
      medium: isGuestLogin
        ? '9801296234'
        : profileData.managerInfoDto.cellNumber,
      nameOfEmployee: isGuestLogin
        ? 'guest'
        : profileData.managerInfoDto.employeeName,
      text: 'Call',
    });
    dispatch(modalStatus(true));
  };

  const sendMail = () => {
    setClickData({
      medium: isGuestLogin
        ? 'guset@thinksys.com'
        : profileData.managerInfoDto.companyEmail,
      nameOfEmployee: isGuestLogin
        ? 'guset'
        : profileData.managerInfoDto.employeeName,
      text: 'Send Mail to',
    });
    dispatch(modalStatus(true));
  };

  const snedMessage = async () => {
    setClickData({
      medium: isGuestLogin
        ? '9801296234'
        : profileData.managerInfoDto.cellNumber,
      nameOfEmployee: isGuestLogin
        ? 'iguest manager'
        : profileData.managerInfoDto.employeeName,
      text: 'Send SMS to',
    });
    dispatch(modalStatus(true));
  };

  return (
    <>
      {isLoading ? <Loader /> : null}
      {isShowModal ? <CommunicationModal empDetail={empDetail} /> : null}
      {profileData && Object.keys(profileData).length !== 0 ? (
        <View>
          <ImageBackground
            style={{height: '60%', width: '100%'}}
            source={TSBuddyBackImage}>
            <View style={styles.container}>
              <View style={styles.profileView}>
                <Image
                  resizeMode="contain"
                  source={{uri: `${baseUrl}${profileData.image}`}}
                  style={{height: 120, width: 120, borderRadius: 60}}
                />
              </View>
              <Text style={styles.text}>
                {isGuestLogin ? 'guest user' : profileData.employeeName}
              </Text>
            </View>
            <View style={styles.detailsView}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
            <View style={styles.managerDetailView}>
              <View style={styles.managerDetailView1}>
                <Text
                  style={{
                    color: Colors.white,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Manager Info
                </Text>
              </View>
              <View style={styles.managerDetailView2}>
                <View style={styles.roundIcon}>
                  <Image
                    resizeMode="cover"
                    source={{
                      uri: `${baseUrl}${profileData.managerInfoDto.image}`,
                    }}
                    style={{height: 80, width: 80, borderRadius: 20}}
                  />
                </View>
                <View>
                  <Text style={styles.managerNameText}>
                    {isGuestLogin
                      ? 'Guest Manager'
                      : profileData.managerInfoDto.employeeName}
                  </Text>
                  <Text style={styles.emailText}>
                    {isGuestLogin
                      ? 'guest@thinksys.com'
                      : profileData.managerInfoDto.companyEmail}
                  </Text>
                  <View style={styles.socialIconView}>
                    <TouchableOpacity onPress={sendMail}>
                      <Image
                        source={MonthImages.empMailS}
                        style={{height: 40, width: 40}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={dialCall}>
                      <Image
                        source={MonthImages.empCallS}
                        style={{height: 40, width: 40}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={snedMessage}>
                      <Image
                        source={MonthImages.empMsg}
                        style={{height: 40, width: 40}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      ) : null}
    </>
  );
};

const renderItem = ({item}) => {
  return (
    <View style={styles.flatelistView}>
      <Image source={item.image} style={{height: 20, width: 20}} />
      <Text
        style={{flex: 1, marginLeft: wp(3), marginTop: hp(1), fontSize: 12}}>
        {item.nameOfField}
      </Text>
      <Text
        style={{flex: 2, marginTop: hp(1), marginLeft: wp(2), fontSize: 12}}>
        {item.email}
      </Text>
    </View>
  );
};

export default Profile;
// https://portal-hr.thinksys.com/files/Amit Kumar Pant (10352) ) O+.jpg
// https://portal-hr.thinksys.com/files/Akash%20Tyagi_Casual%20Photograph.jpg
