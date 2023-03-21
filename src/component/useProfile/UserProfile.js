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
  const employeeData = useSelector(state => state.dataReducer.employeeData);
  const isShowModall = useSelector(state => state.dataReducer.isShowModal);
  useEffect(() => {
    setEmpData(employeeData);
  }, [employeeData]);

  const onChangeText = e => {
    const filterData = employeeData.filter(el => {
      return el.employeeName.includes(e);
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
  {
    designation,
    companyEmail,
    id,
    imageURL,
    cellNumber,
    employeeName,
    reporting,
  },
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
              companyEmail,
              id,
              imageURL,
              cellNumber,
              employeeName,
              reporting,
            });
          }}>
          <View style={styles.container}>
            <View style={{}}>
              <Image source={{uri: imageURL}} style={styles.image} />
            </View>
            <View style={{paddingLeft: wp(5)}}>
              <Text style={styles.nameText}>{employeeName}</Text>
              <Text style={styles.desniationText}>{designation}</Text>
              <View style={styles.smallView}>
                <Image
                  source={MonthImages.userPS}
                  style={{height: 30, width: 30}}
                />
                <Text style={styles.reportingText}>{reporting}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserDetail', {
              designation,
              companyEmail,
              id,
              imageURL,
              cellNumber,
              employeeName,
              reporting,
            });
          }}>
          <View style={styles.container2}>
            {/* {isShowModall ? <CommunicationModal empDetail={empDetail} /> : null} */}
            <ImageBackground
              style={styles.backgroundImage}
              source={MonthImages.empbgS}>
              <Image source={{uri: imageURL}} style={styles.secondimage} />
              <Text numberOfLines={1} style={styles.nametext2}>
                {employeeName}
              </Text>
              <Text style={styles.desText2}>{designation}</Text>
              <View style={styles.iconView}>
                <TouchableOpacity
                  onPress={() => {
                    setClickData({
                      id: id,
                      medium: cellNumber,
                      nameOfEmployee: employeeName,
                      text: 'Call ',
                    });

                    // setClickData('fghfgh');
                    dispatch(modalStatus(true));
                  }}>
                  <View style={styles.callimageView}>
                    <Image
                      style={styles.callImage}
                      source={MonthImages.callEmp}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setClickData({
                      id: id,
                      medium: companyEmail,
                      nameOfEmployee: employeeName,
                      text: 'Send Mail to ',
                    });
                    // setClickData('fghfgh');
                    dispatch(modalStatus(true));
                  }}>
                  <View style={styles.mailView}>
                    <Image
                      style={styles.mailImage}
                      source={MonthImages.mailEmp}
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

const styles = StyleSheet.create({
  image: {
    height: hp(7),
    width: wp(15),
    borderRadius: 35,
    marginLeft: wp(5),
    marginTop: hp(1),
  },
  container: {
    backgroundColor: Colors.skyColor,
    flexDirection: 'row',
    width: '100%',
    marginVertical: hp(0.6),
    shadowOpacity: 0.2,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    opacity: 0.6,
  },
  desniationText: {
    fontSize: 14,
    color: Colors.lightBlue,
  },
  smallView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingVertical: hp(1),
  },
  reportingText: {paddingTop: hp(1), marginLeft: wp(2), color: 'green'},
  container2: {paddingVertical: hp(0.5), paddingHorizontal: wp(1)},
  backgroundImage: {height: hp(18.5), width: wp(31)},
  secondimage: {
    height: hp(9),
    width: wp(20),
    borderRadius: 35,
    marginLeft: wp(5),
    marginTop: hp(1),
  },
  nametext2: {
    textAlign: 'center',
    fontWeight: 'bold',
    opacity: 0.8,
    fontSize: FontSize.h11,
  },
  desText2: {fontSize: 10, textAlign: 'center', color: 'blue', opacity: 0.6},
  iconView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    // backgroundColor: '#C3F8FF',
    borderTopWidth: 2,
    borderColor: 'white',
    marginTop: hp(0.5),
  },
  callimageView: {
    borderRightWidth: 4,
    borderColor: Colors.white,
    flex: 1,
  },
  callImage: {height: 20, width: 20},
  mailView: {flex: 1, paddingLeft: wp(6)},
  mailImage: {height: 20, width: 20, marginTop: hp(0.1)},
});
export default UserProfile;
