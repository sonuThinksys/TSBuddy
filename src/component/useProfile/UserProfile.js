import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import Header from 'component/header/Header';
import {State} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import CommunicationModal from 'modals/CommunicationModal';
import {modalStatus} from 'redux/dataSlice';
//import {employeeData} from '../../../db';
const UserProfile = () => {
  console.log('employeeData:===================', employeeData);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const employeeData = useSelector(state => state.dataReducer.employeeData);
  const isShowModall = useSelector(state => state.dataReducer.isShowModal);
  console.log('employeeData:---------------', employeeData);
  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.darkBlue,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingHorizontal: wp(2),
          paddingVertical: hp(1),
        }}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={MonthImages.backArrowS}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 2,
            justifyContent: 'center',
            paddingTop: hp(1),
          }}>
          <Text
            style={{
              color: Colors.white,
              marginRight: wp(2),
              fontSize: 18,
              fontWeight: '500',
            }}>
            Employees
          </Text>
          <Image
            source={MonthImages.info_scopy}
            style={{height: 20, width: 20}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-end',
            paddingTop: hp(0.6),
          }}>
          <Image source={MonthImages.listS} style={{marginRight: wp(4)}} />
          <Header />
        </View>
      </View>

      <FlatList
        data={employeeData}
        numColumns={3}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return renderItem(item, index, navigation, isShowModall, dispatch);
        }}
      />
    </View>
  );
};

const renderItem = (
  {designation, email, id, imageURL, mobileNumber, nameOfEmployee, reporting},
  index,
  navigation,
  isShowModall,
  dispatch,
) => {
  const empDetails = {
    nameOfEmployee: nameOfEmployee,
    mobileNumber: mobileNumber,
    email: email,
    id: id,
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('UserDetail', {
            designation,
            email,
            id,
            imageURL,
            mobileNumber,
            nameOfEmployee,
            reporting,
          });
        }}>
        <View style={{paddingVertical: hp(0.5), paddingHorizontal: wp(1)}}>
          {isShowModall ? <CommunicationModal empDetail={empDetails} /> : null}
          <ImageBackground
            source={MonthImages.empbgS}
            style={{height: hp(18.5), width: wp(31)}}>
            <Image
              source={{uri: imageURL}}
              style={{
                height: hp(9),
                width: wp(20),
                borderRadius: 35,
                marginLeft: wp(5),
                marginTop: hp(1),
              }}
            />
            <Text
              style={{textAlign: 'center', fontWeight: 'bold', opacity: 0.8}}>
              {nameOfEmployee}
            </Text>
            <Text
              style={{
                fontSize: 10,
                textAlign: 'center',
                color: 'blue',
                opacity: 0.6,
              }}>
              {designation}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: wp(4),
                // backgroundColor: '#C3F8FF',
                borderTopWidth: 2,
                borderColor: 'white',
                marginTop: hp(0.5),
              }}>
              <View
                style={{borderRightWidth: 4, borderColor: 'white', flex: 1}}>
                <Image
                  source={MonthImages.callEmp}
                  style={{
                    height: 20,
                    width: 20,
                    // marginTop: hp(0.1),
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(modalStatus(true));
                }}>
                <View style={{flex: 1, paddingLeft: wp(6)}}>
                  <Image
                    source={MonthImages.mailEmp}
                    style={{height: 20, width: 20, marginTop: hp(0.1)}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default UserProfile;
