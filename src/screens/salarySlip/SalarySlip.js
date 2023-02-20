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
  console.log(
    'newyearWiseData:----------------------------------------------',
    newyearWiseData,
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(authLoginStatus(false));
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const newObj = {};
    salarySlipData &&
      salarySlipData.length &&
      salarySlipData?.map(val => {
        newObj[val.year] = newObj[val.year] || [];
        newObj[val.year].push(val);
      });
    setnewyearWiseData(newObj);
  }, [salarySlipData]);

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
        <View style={{paddingHorizontal: wp(2)}}>
          {newyearWiseData &&
            newyearWiseData.length &&
            newyearWiseData.map(el => {
              console.log('el:-------------------', el);
              return (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: hp(2),
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
                        backgroundColor: 'gray',
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
                        2022
                      </Text>
                    </View>
                  </View>

                  <FlatList
                    data={el}
                    keyExtractor={item => item.name}
                    key={3}
                    numColumns={3}
                    renderItem={renderItems}
                  />
                </>
              );
            })}
        </View>
      )}
    </View>
  );
};

const renderItems = item => {
  return (
    <View
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
