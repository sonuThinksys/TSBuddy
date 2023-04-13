import React from 'react';
import baseUrl from 'services/Urls';
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
import {Colors} from 'colors/Colors';
import styles from './userProfileStyles';
import {MonthImages} from 'assets/monthImage/MonthImage';

const RenderListItem = ({
  item: {
    designation,
    companyEmail,
    image,
    cellNumber,
    employeeName,
    managerInfoDto,
  } = {},
  index,
  navigation,
  isShowModall,
  dispatch,
  setClickData,
  empDetail,
  showHoriZontal,
}) => {
  return (
    <View key={index} style={{backgroundColor: Colors.white}}>
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
              {image ? (
                <Image
                  resizeMode="stretch"
                  source={{uri: `${baseUrl}${image}`}}
                  style={styles.image}
                />
              ) : null}
            </View>
            <View style={{flex: 0.7}}>
              <Text style={styles.nameText}>{employeeName}</Text>
              <Text style={styles.desniationText}>{designation}</Text>
              <View style={styles.smallView}>
                <Image
                  source={MonthImages?.userPS}
                  style={{height: 25, width: 25}}
                />
                <Text style={styles.reportingText}>
                  {managerInfoDto?.employeeName}
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
            {image ? (
              <Image
                resizeMode="stretch"
                source={{uri: `${baseUrl}${image}`}}
                style={styles.secondimage}
              />
            ) : null}
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

export default RenderListItem;
