import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
// import Header from 'component/header/Header';

import {useNavigation} from '@react-navigation/native';
import CommunicationModal from 'modals/CommunicationModal';
import {modalStatus} from 'redux/homeSlice';
//import {employeeData} from '../../../db';
const UserProfile = () => {
  const [showHoriZontal, setShowHorizontal] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [numValue, setNumValue] = useState(3);
  const [empDetail, setClickData] = useState({});
  const [allEmpData, setEmpData] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const employeeData = useSelector(state => state.dataReducer.employeeData);
  const isShowModall = useSelector(state => state.dataReducer.isShowModal);
  console.log('isShowModall:--------------------', isShowModall);
  useEffect(() => {
    setEmpData(employeeData);
  }, [employeeData]);

  const onChangeText = e => {
    const filterData = employeeData.filter(el => {
      return el.nameOfEmployee.includes(e);
    });

    setEmpData(filterData);
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.darkBlue,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingHorizontal: wp(4),
          paddingVertical: hp(1),
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={MonthImages.backArrowS}
              style={{height: 20, width: 20}}
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
          {showHoriZontal ? (
            <TouchableOpacity
              onPress={() => {
                setNumValue(3);
                setShowHorizontal(false);
              }}>
              <Image
                source={MonthImages.thumbnailS}
                style={{marginRight: wp(4)}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setNumValue(1);
                setShowHorizontal(true);
              }}>
              <Image source={MonthImages.listS} style={{marginRight: wp(4)}} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              if (!showTextInput) {
                setShowTextInput(true);
              } else {
                setShowTextInput(false);
              }
            }}>
            <Image
              source={MonthImages.searchIconwhite}
              style={{
                height: 25,
                width: 25,
                marginRight: wp(5),
                color: 'white',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {showTextInput ? (
        <View
          style={{
            backgroundColor: '#003333',
            flexDirection: 'row',
            paddingVertical: hp(1.5),
            paddingHorizontal: wp(5),
          }}>
          <Image
            source={MonthImages.searchIconwhite}
            style={{
              height: 25,
              width: 25,
              marginRight: wp(5),
              color: 'white',
            }}
          />
          <TextInput
            selectionColor={Colors.white}
            color={Colors.white}
            // value={e}
            onChangeText={onChangeText}
            isEditble
            style={{height: '120%', width: '90%'}}
          />
        </View>
      ) : null}
      {true ? <CommunicationModal empDetail={empDetail} /> : null}
      <FlatList
        data={allEmpData}
        key={numValue}
        numColumns={numValue}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return renderItem(
            item,
            index,
            navigation,
            isShowModall,
            dispatch,
            setClickData,
            empDetail,
            showHoriZontal,
          );
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
  setClickData,
  empDetail,
  showHoriZontal,
) => {
  return (
    <View>
      {showHoriZontal ? (
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
          <View
            style={{
              backgroundColor: Colors.skyColor,
              flexDirection: 'row',
              width: '100%',
              marginVertical: hp(0.6),
              shadowOpacity: 0.2,
            }}>
            <View style={{}}>
              <Image
                source={{uri: imageURL}}
                style={{
                  height: hp(7),
                  width: wp(15),
                  borderRadius: 35,
                  marginLeft: wp(5),
                  marginTop: hp(1),
                }}
              />
            </View>
            <View style={{paddingLeft: wp(5)}}>
              <Text
                style={{
                  // textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'black',
                  opacity: 0.6,
                }}>
                {nameOfEmployee}
              </Text>
              <Text
                style={{
                  // textAlign: 'center',
                  fontSize: 14,
                  color: Colors.lightBlue,
                }}>
                {designation}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  // paddingVertical: hp(1),
                }}>
                <Image
                  source={MonthImages.userPS}
                  style={{height: 30, width: 30}}
                />
                <Text
                  style={{
                    paddingTop: hp(1),
                    marginLeft: wp(2),
                    color: 'green',
                  }}>
                  {reporting}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
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
            {/* {isShowModall ? <CommunicationModal empDetail={empDetail} /> : null} */}
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
                <TouchableOpacity
                  onPress={() => {
                    setClickData({
                      id: id,
                      medium: mobileNumber,
                      nameOfEmployee: nameOfEmployee,
                      text: 'Call ',
                    });
                    // setClickData('fghfgh');
                    dispatch(modalStatus(true));
                  }}>
                  <View
                    style={{
                      borderRightWidth: 4,
                      borderColor: 'white',
                      flex: 1,
                    }}>
                    <Image
                      source={MonthImages.callEmp}
                      style={{
                        height: 20,
                        width: 20,
                        // marginTop: hp(0.1),
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setClickData({
                      id: id,
                      medium: email,
                      nameOfEmployee: nameOfEmployee,
                      text: 'Send Mail to ',
                    });
                    // setClickData('fghfgh');
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
      )}
    </View>
  );
};
export default UserProfile;
