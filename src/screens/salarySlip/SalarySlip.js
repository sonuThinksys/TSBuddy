import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  Image,
  TextInput,
  ImageBackground,
  FlatList,
  Button,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import SalarSlipModal from 'modals/SalarySlipModal';
import {authLoginStatus} from 'Auth/LoginSlice';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';

const SalarySlip = ({navigation}) => {
  const [newyearWiseData, setnewyearWiseData] = useState([]);
  const dispatch = useDispatch();
  const isAuthLoggedIn = useSelector(state => state.auth.isAuthLoggedIn);
  const salarySlipData = useSelector(state => state.dataReducer.salarySlipData);
  const [newObjectData, setnewObjectData] = useState([]);
  const [salaryDetailsData, setSalaryDetailsData] = useState({});

  useEffect(() => {
    const newObjectDataaa = [];
    salarySlipData &&
      salarySlipData.length &&
      salarySlipData.map(el => {
        const newdata = {...el};
        if (el.month === 'January') {
          Object.assign(newdata, {monthImage: MonthImages.janImage});
          Object.assign(newdata, {monthIcon: MonthImages.janIcon});
        } else if (el.month === 'February') {
          Object.assign(newdata, {monthImage: MonthImages.febImage});
          Object.assign(newdata, {monthIcon: MonthImages.febIcon});
        } else if (el.month === 'March') {
          Object.assign(newdata, {monthImage: MonthImages.marchImage});
          Object.assign(newdata, {monthIcon: MonthImages.marchIcon});
        } else if (el.month === 'April') {
          Object.assign(newdata, {monthImage: MonthImages.aprilImage});
          Object.assign(newdata, {monthIcon: MonthImages.aprilIcon});
        } else if (el.month === 'May') {
          Object.assign(newdata, {monthImage: MonthImages.mayImage});
          Object.assign(newdata, {monthIcon: MonthImages.mayIcon});
        } else if (el.month === 'June') {
          Object.assign(newdata, {monthImage: MonthImages.junImage});
          Object.assign(newdata, {monthIcon: MonthImages.junIcon});
        } else if (el.month === 'Jully') {
          Object.assign(newdata, {monthImage: MonthImages.julyImage});
          Object.assign(newdata, {monthIcon: MonthImages.julyIcon});
        } else if (el.month === 'August') {
          Object.assign(newdata, {monthImage: MonthImages.augImage});
          Object.assign(newdata, {monthIcon: MonthImages.augIcon});
        } else if (el.month === 'September') {
          Object.assign(newdata, {monthImage: MonthImages.sepImage});
          Object.assign(newdata, {monthIcon: MonthImages.sepIcon});
        } else if (el.month === 'October') {
          Object.assign(newdata, {monthImage: MonthImages.octImage});
          Object.assign(newdata, {monthIcon: MonthImages.octIcon});
        } else if (el.month === 'November') {
          Object.assign(newdata, {monthImage: MonthImages.novImage});
          Object.assign(newdata, {monthIcon: MonthImages.novIcon});
        } else if (el.month === 'December') {
          Object.assign(newdata, {monthImage: MonthImages.decImage});
          Object.assign(newdata, {monthIcon: MonthImages.decIcon});
        }
        newObjectDataaa.push(newdata);
      });

    setnewObjectData(newObjectDataaa);
  }, [salarySlipData]);

  const keyOfObject = Object.keys(newyearWiseData);

  useEffect(() => {
    const newObj = {};
    newObjectData &&
      newObjectData.length &&
      newObjectData?.map(val => {
        newObj[val.year] = newObj[val.year] || [];
        newObj[val.year].push(val);
      });

    setnewyearWiseData(newObj);
  }, [newObjectData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(authLoginStatus(false));
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text
        style={{
          paddingVertical: hp(1.5),
          backgroundColor: '#0073cf',
          color: 'white',
          paddingHorizontal: wp(5),
          fontWeight: '500',
          fontSize: 18,
        }}>
        Radhika Gupta
      </Text>
      {!isAuthLoggedIn ? (
        <SalarSlipModal />
      ) : (
        <ScrollView>
          {keyOfObject &&
            keyOfObject.length > 0 &&
            keyOfObject.map(el => {
              return (
                <View key={el} style={{paddingHorizontal: wp(1)}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: hp(1),
                      alignItems: 'center',
                      paddingRight: wp(1),
                    }}>
                    <View
                      style={{
                        flex: 3,
                        backgroundColor: 'gray',
                        height: 1,
                      }}></View>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'rgb(225,225,225)',
                        paddingVertical: hp(1),
                        paddingHorizontal: wp(3),
                        borderRadius: 1,
                      }}>
                      <Text
                        style={{
                          color: Colors.darkBlue,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}>
                        {el}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                    {newyearWiseData &&
                      Object.keys(newyearWiseData).length !== 0 &&
                      newyearWiseData[el].map((elemnt, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              paddingHorizontal: wp(1),
                              width: '33.3%',
                            }}>
                            {/* <View
                              style={{
                                borderRadius: 5,
                                // height: hp(18),
                                // width: '30%',
                                //  flex: 1,
                                shadowOpacity: 0.5,
                                backgroundColor: 'gray',
                                backgroundColor: 'white',
                                marginRight: wp(3),
                              }}> */}
                            <TouchableOpacity
                              onPress={() => {
                                // setSalaryDetailsData(elemnt);
                                navigation.navigate('SalaryDetail', elemnt);
                              }}>
                              <ImageBackground
                                resizeMode="contain"
                                source={elemnt.monthImage}
                                style={{height: hp(10), width: '100%'}}>
                                <View
                                  style={{
                                    height: 40,
                                    width: 40,
                                    backgroundColor: 'blue',
                                    borderBottomRightRadius: 30,
                                    borderTopRightRadius: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Image
                                    source={elemnt.monthIcon}
                                    style={{height: 20, width: 20}}
                                  />
                                </View>
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 24,
                                  }}>
                                  January
                                </Text>
                              </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                //setSalaryDetailsData(elemnt);
                                navigation.navigate('SalaryPdf', elemnt);
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  paddingVertical: hp(1),
                                  paddingHorizontal: wp(2),
                                  borderRadius: 5,
                                  shadowOpacity: 0.5,
                                }}>
                                <View
                                  style={{
                                    backgroundColor: Colors.lightBlue,
                                    padding: hp(1),
                                    height: hp(5),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 5,
                                  }}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontWeight: 'bold',
                                      fontSize: 17,
                                    }}>
                                    Download
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                            {/* </View> */}
                          </View>
                        );
                      })}
                  </View>
                </View>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
};

const renderItems = (item, index) => {
  return (
    <View
      key={index}
      style={{
        paddingVertical: hp(1),
        flex: 1,
      }}>
      <View
        style={{
          borderRadius: 5,
          height: hp(18),
          width: wp(33),
          shadowOpacity: 0.5,
          backgroundColor: 'gray',
          backgroundColor: 'white',
          marginRight: wp(3),
        }}>
        <ImageBackground
          resizeMode="contain"
          source={MonthImages.janImage}
          style={{height: hp(11), width: '100%'}}>
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: 'blue',
              borderBottomRightRadius: 30,
              borderTopRightRadius: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={MonthImages.janIcon}
              style={{height: 20, width: 20}}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 24,
            }}>
            January
          </Text>
        </ImageBackground>
        <View
          style={{
            height: hp(6),
            width: wp(35),
            backgroundColor: 'white',
            paddingTop: hp(1),
            paddingHorizontal: wp(2),
            // marginHorizontal: wp(1),
            borderRadius: 5,
            shadowOpacity: 0.5,
          }}>
          <View
            style={{
              backgroundColor: Colors.lightBlue,
              padding: hp(1),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
              Download
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SalarySlip;
