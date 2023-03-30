import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './userProfileStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
// import Header from 'component/header/Header';
import baseUrl from 'services/Urls';
import {useNavigation} from '@react-navigation/native';
import CommunicationModal from 'modals/CommunicationModal';
import {modalStatus} from 'redux/homeSlice';
import {FontSize} from 'constants/fonts';
//import {employeeData} from '../../../db';
const UserProfile = () => {
  const [showHoriZontal, setShowHorizontal] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [numValue, setNumValue] = useState(3);
  const [empDetail, setClickData] = useState({});
  const [allEmpData, setEmpData] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {employeeData,isShowModal:isShowModall} = useSelector(state => state.home);
  useEffect(() => {
    setEmpData(employeeData);
  }, [employeeData]);

  const onChangeText = e => {
    const filterData = employeeData.filter(el => {
      return el.employeeName.includes(e);
    });

    setEmpData(filterData);
  };

  console.log(
    'employeeData:--------------------------------------',
    employeeData,
  );

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
                color: Colors.white,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {showTextInput ? (
        <View
          style={{
            backgroundColor: Colors.blackishGreen,
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
              color: Colors.white,
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
        numColumns={numValue}
        //numColumns={1}
        keyExtractor={(item, index) => index.toString()}
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
  {designation, companyEmail, image, cellNumber, employeeName, managerInfoDto},
  index,
  navigation,
  isShowModall,
  dispatch,
  setClickData,
  empDetail,
  showHoriZontal,
) => {
  return (
    <View key={index} style={{backgroundColor: 'white'}}>
      {showHoriZontal ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserDetail', {
              designation,
              companyEmail,
              image,
              cellNumber,
              employeeName,
              managerInfoDto,
            });
          }}>
          <View style={styles.container}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Image source={{uri: imageURL}} style={styles.image} /> */}
              <Image
                resizeMode="stretch"
                source={{uri: `${baseUrl}${image}`}}
                style={styles.image}
              />
            </View>
            <View style={{flex: 0.7}}>
              <Text style={styles.nameText}>{employeeName}</Text>
              <Text style={styles.desniationText}>{designation}</Text>
              <View style={styles.smallView}>
                <Image
                  source={MonthImages.userPS}
                  style={{height: 25, width: 25}}
                />
                <Text style={styles.reportingText}>
                  {managerInfoDto.employeeName}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.container2}
          onPress={() => {
            navigation.navigate('UserDetail', {
              designation,
              companyEmail,
              image,
              cellNumber,
              employeeName,
              managerInfoDto,
            });
          }}>
          <ImageBackground
            resizeMode="contain"
            style={styles.backgroundImage}
            source={MonthImages.empbgS}>
            <Image
              resizeMode="stretch"
              source={{uri: `${baseUrl}${image}`}}
              style={styles.secondimage}
            />
            <Text numberOfLines={1} style={styles.nametext2}>
              {employeeName}
            </Text>
            <Text style={styles.desText2}>{designation}</Text>
            <View style={styles.buttomView}>
              <TouchableOpacity
                style={styles.imagecontainer1}
                onPress={() => {
                  setClickData({
                    medium: cellNumber,
                    nameOfEmployee: employeeName,
                    text: 'Call ',
                  });

                  // setClickData('fghfgh');
                  dispatch(modalStatus(true));
                }}>
                <Image style={styles.callImage} source={MonthImages.callEmp} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imagecontainer2}
                onPress={() => {
                  setClickData({
                    medium: companyEmail,
                    nameOfEmployee: employeeName,
                    text: 'Send Mail to ',
                  });
                  // setClickData('fghfgh');
                  dispatch(modalStatus(true));
                }}>
                <Image style={styles.mailImage} source={MonthImages.mailEmp} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserProfile;
