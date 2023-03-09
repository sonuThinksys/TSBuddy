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
const Profile = () => {
  const [empDetail, setClickData] = useState({});
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);
  var decoded = jwt_decode(token);
  const employeeID = decoded.Id;

  useEffect(() => {
    dispatch(getEmployeeProfileData({token, employeeID}));
  }, []);

  const profileData = useSelector(state => state.dataReducer.employeeProfile);
  const isShowModall = useSelector(state => state.dataReducer.isShowModal);
  const isLoading = useSelector(
    state => state.dataReducer.employeeProfileLoading,
  );

  console.log('isLoading:-----------------------------', isLoading);

  const data = [
    {
      image: MonthImages.mailEmp,
      nameOfField: 'Email ID',
      email: profileData.companyEmail,
      id: '1',
    },
    {
      image: MonthImages.callEmp,
      nameOfField: 'Mobile No.',
      email: profileData.cellNumber,
      id: '2',
    },
    {
      image: MonthImages.mailEmp,
      nameOfField: 'Designation',
      email: profileData.designation,
      id: '3',
    },
    {
      image: MonthImages.callEmp,
      nameOfField: 'Emp ID',
      email: `EMP/${employeeID}`,
      id: '4',
    },
    {
      image: MonthImages.mailEmp,
      nameOfField: 'Date of Joining',
      // email: profileData.dateOfJoining,
      email: moment(profileData.dateOfJoining).format(`DD-MMM-YYYY`),
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
      id: profileData.id,
      medium: profileData.managerInfoDto.cellNumber,
      nameOfEmployee: profileData.managerInfoDto.employeeName,
      text: 'Call',
    });
    dispatch(modalStatus(true));
  };

  const sendMail = () => {
    setClickData({
      id: profileData.id,
      medium: profileData.managerInfoDto.companyEmail,
      nameOfEmployee: profileData.managerInfoDto.employeeName,
      text: 'Send Mail to',
    });
    dispatch(modalStatus(true));
  };

  const snedMessage = async () => {
    setClickData({
      id: profileData.id,
      medium: profileData.managerInfoDto.cellNumber,
      nameOfEmployee: profileData.managerInfoDto.employeeName,
      text: 'Send SMS to',
    });
    dispatch(modalStatus(true));
  };

  return (
    <>
      {isLoading ? <Loader /> : null}
      {isShowModall ? <CommunicationModal empDetail={empDetail} /> : null}
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
              <Text style={styles.text}>{profileData.employeeName}</Text>
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
                  style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
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
                    {profileData.managerInfoDto.employeeName}
                  </Text>
                  <Text style={styles.emailText}>
                    {profileData.managerInfoDto.companyEmail}
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
