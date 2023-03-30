import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import styles from './salarySlipStyle';
import SalarSlipModal from 'modals/SalarySlipModal';
import {authLoginStatus} from 'Auth/LoginSlice';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import {monthImages} from 'defaultData';
import {SalaryDetailsScreen, SalaryPDFDownloadScreen} from 'navigation/Route';
const SalarySlip = ({navigation}) => {
  const [newyearWiseData, setnewyearWiseData] = useState([]);
  const dispatch = useDispatch();
  const {isAuthLoggedIn} = useSelector(state => state.auth);
  const {salarySlipData} = useSelector(state => state.home);
  const [newObjectData, setnewObjectData] = useState([]);
  console.log('salarySlipData123:----------------------------', salarySlipData);
  console.log(
    'salarySlipData123:----------------------------',
    salarySlipData[2],
  );
  console.log('newyearWiseData:------------------------', newyearWiseData);
  useEffect(() => {
    console.log('heelo indiss ');
    let newObjectData = [];
    newObjectData =
      salarySlipData &&
      salarySlipData.length &&
      salarySlipData.map(el => {
        console.log('el:-----------------------', el);
        return {...el, ...monthImages[Math.abs(el?.month)]};
      });
    setnewObjectData(newObjectData);
  }, [salarySlipData]);

  const keyOfObject = Object.keys(newyearWiseData);

  useEffect(() => {
    const newObj = {};
    newObjectData &&
      newObjectData.length &&
      newObjectData?.map(val => {
        newObj[val?.fiscalYear.substring(0, 4)] =
          newObj[val?.fiscalYear.substring(0, 4)] || [];
        newObj[val?.fiscalYear.substring(0, 4)].push(val);
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
      <Text style={styles.NameView}>{salarySlipData[2]?.employeeName}</Text>

      {!isAuthLoggedIn ? (
        <SalarSlipModal />
      ) : (
        <ScrollView>
          {keyOfObject &&
            keyOfObject.length > 0 &&
            keyOfObject.map(el => {
              return (
                <View key={el} style={{paddingHorizontal: wp(1)}}>
                  <View style={styles.yearMainView}>
                    <View style={styles.line}></View>
                    <View style={styles.yearTextView}>
                      <Text style={styles.yearText}>{el}</Text>
                    </View>
                  </View>
                  <View style={styles.MapView}>
                    {newyearWiseData &&
                      Object.keys(newyearWiseData).length !== 0 &&
                      newyearWiseData[el].map((elemnt, index) => {
                        return (
                          <View key={index} style={styles.ViewForMOnth}>
                            <View style={styles.backgroundImageView}>
                              <TouchableOpacity
                                style={{borderRadius: 5}}
                                onPress={() => {
                                  navigation.navigate(
                                    SalaryDetailsScreen,
                                    elemnt,
                                  );
                                }}>
                                <ImageBackground
                                  resizeMode="cover"
                                  imageStyle={{borderRadius: 8}}
                                  source={elemnt.monthImage}
                                  style={styles.backGroundImage}>
                                  <View style={styles.smalllImageView}>
                                    <Image
                                      source={elemnt.monthIcon}
                                      style={{height: 20, width: 20}}
                                    />
                                  </View>
                                  <Text style={styles.monthText}>
                                    {elemnt.monthName}
                                  </Text>
                                </ImageBackground>
                              </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate(
                                  SalaryPDFDownloadScreen,
                                  elemnt,
                                );
                              }}>
                              <View style={styles.downloadView}>
                                <View style={styles.downloadTextView}>
                                  <Text style={styles.downloadtext}>
                                    Download
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
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

export default SalarySlip;
// https://github.com/RadhikaThinksys/TSBuddy/invitations
