import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
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
import {useIsFocused} from '@react-navigation/native';
import baseUrl from 'services/Urls';
import moment from 'moment';
import {modalStatus} from 'redux/homeSlice';
import CommunicationModal from 'modals/CommunicationModal';
import Loader from 'component/loader/Loader';
import {Colors} from 'colors/Colors';
import {guestProfileData} from 'guestData';
import {ERROR} from 'constants/strings';
import ShowAlert from 'customComponents/CustomError';
import defaultUserIcon from 'assets/allImage/DefaultImage.imageset/defaultUserIcon.png';
import CustomHeader from 'navigation/CustomHeader';
import {FontFamily} from 'constants/fonts';

const Profile = ({navigation}) => {
  const isFocussed = useIsFocused();
  const [empDetail, setClickData] = useState({});
  const dispatch = useDispatch();
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;

  const {
    employeeProfile: profileData,
    isShowModal: isShowModal,
    employeeProfileLoading: isLoading,
  } = useSelector(state => state.home);

  const firstName = profileData?.firstName;
  const middleName = profileData?.middleName;
  const lastName = profileData?.lastName;

  const managerFirstName = profileData?.managerInfoDto?.firstName;
  const managerMiddleName = profileData?.managerInfoDto?.middleName;
  const managerLastName = profileData?.managerInfoDto?.lastName;

  const userName = `${firstName ? firstName : ''} ${
    middleName ? middleName + ' ' : ''
  }${lastName ? lastName : ''}`;

  const managerUserName = `${managerFirstName ? managerFirstName : ''} ${
    managerMiddleName ? managerMiddleName + ' ' : ''
  }${managerLastName ? managerLastName : ''}`;

  const data = [
    {
      image: MonthImages.EmailIconBAndW,
      nameOfField: 'Email ID',
      email: isGuestLogin
        ? guestProfileData.companyEmail
        : profileData.companyEmail,
      id: '1',
    },
    {
      image: MonthImages.phnIcon,
      nameOfField: 'Mobile No.',
      email: isGuestLogin
        ? guestProfileData.cellNumber
        : profileData.cellNumber,
      id: '2',
    },
    {
      image: MonthImages.DesignationIcon,
      nameOfField: 'Designation',
      email: isGuestLogin
        ? guestProfileData.designation
        : profileData.designation,
      id: '3',
    },
    {
      image: MonthImages.EmployeeIdIcon,
      nameOfField: 'Emp ID',
      email: isGuestLogin ? guestProfileData.empID : `EMP/${employeeID}`,
      id: '4',
    },
    {
      image: MonthImages.CalenderIcon,
      nameOfField: 'Date of Joining',
      // email: profileData.dateOfJoining,
      email: isGuestLogin
        ? moment(guestProfileData.dateOfJoining).format(`DD-MMM-YYYY`)
        : moment(profileData.dateOfJoining).format(`DD-MMM-YYYY`),
      id: '5',
    },
    {
      image: MonthImages.EducationIcon,
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
        ? 'guest@thinksys.com'
        : profileData.managerInfoDto.companyEmail,
      nameOfEmployee: isGuestLogin
        ? 'guest'
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
        ? 'guest manager'
        : profileData.managerInfoDto.employeeName,
      text: 'Send SMS to',
    });
    dispatch(modalStatus(true));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Profile"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      {isShowModal && isFocussed ? (
        <CommunicationModal empDetail={empDetail} />
      ) : null}
      {profileData && Object.keys(profileData).length !== 0 ? (
        <SafeAreaView
          style={{
            backgroundColor: Colors.whitishBlue,
          }}>
          <ImageBackground
            resizeMode="cover"
            style={{height: '60%', width: '100%'}}
            source={
              profileData?.image ? {uri: profileData?.image} : defaultUserIcon
            }
            // source={
            //   profileData?.image
            //     ? `data:image/jpeg;base64,${profileData?.image}`
            //     : TSBuddyBackImage
            // }
            blurRadius={0.9}>
            {/* source={TSBuddyBackImage}> */}
            <View style={styles.container}>
              <View style={styles.profileView}>
                {/* <Image
                  resizeMode="contain"
                  source={{uri: `${baseUrl}${profileData?.image}`}}
                  style={{height: 120, width: 120, borderRadius: 60}}
                /> */}

                {profileData?.image ? (
                  // <Image
                  //   resizeMode="stretch"
                  //   source={{
                  //     uri: `data:image/jpeg;base64,${profileData?.image}`,
                  //   }}
                  //   style={{height: '100%', width: '100%', borderRadius: 60}}
                  // />
                  <Image
                    source={{uri: profileData?.image}}
                    style={{height: '100%', width: '100%', borderRadius: 60}} // Define the width and height as needed
                  />
                ) : (
                  <Image
                    source={defaultUserIcon}
                    style={{height: 120, width: 120, borderRadius: 60}}
                  />
                )}
              </View>
              <Text style={styles.text}>
                {isGuestLogin ? 'guest user' : userName}
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
                  {/* <Image
                    resizeMode="cover"
                    source={{
                      uri: `${baseUrl}${profileData.managerInfoDto.image}`,
                    }}
                    style={{height: 80, width: 80, borderRadius: 20}}
                  /> */}

                  {profileData?.managerInfoDto?.image ? (
                    <Image
                      resizeMode="stretch"
                      // source={{
                      //   uri: `data:image/jpeg;base64,${profileData?.managerInfoDto?.image}`,

                      // }}
                      source={{uri: profileData?.managerInfoDto?.image}}
                      style={{height: 90, width: 90, borderRadius: 50}}
                    />
                  ) : (
                    <Image
                      // source={defaultUserIcon}
                      source={defaultUserIcon}
                      style={{height: 80, width: 80, borderRadius: 20}}
                    />
                  )}
                </View>
                <View>
                  <Text style={styles.managerNameText}>
                    {isGuestLogin ? 'Guest Manager' : managerUserName}
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
        </SafeAreaView>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{fontFamily: FontFamily.RobotoMedium, fontSize: 17}}>
            No Employee Data Found.
          </Text>
        </View>
      )}
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
