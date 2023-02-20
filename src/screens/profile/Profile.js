import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import styles from './ProfileStyle';
import {MonthImages} from 'assets/monthImage/MonthImage';
import TSBuddyBackImage from 'assets/mipmap/tsbuddyBack.png';

const Profile = () => {
  const data = [
    {
      image: MonthImages.mailEmp,
      nameOfField: 'Email ID',
      email: 'gupta.radhika@thinksys.com',
      id: '1',
    },
    {
      image: MonthImages.callEmp,
      nameOfField: 'Mobile No.',
      email: '8544946426',
      id: '2',
    },
    {
      image: MonthImages.mailEmp,
      nameOfField: 'Designation',
      email: 'Software Engineer',
      id: '3',
    },
    {
      image: MonthImages.callEmp,
      nameOfField: 'Emp ID',
      email: 'EMP/10863',
      id: '4',
    },
    {
      image: MonthImages.mailEmp,
      nameOfField: 'Date of Joining',
      email: '26-Apr-2022',
      id: '5',
    },
    {
      image: MonthImages.callEmp,
      nameOfField: 'Education',
      email: 'NA',
      id: '6',
    },
  ];

  return (
    <>
      <View>
        <ImageBackground
          style={{height: '60%', width: '100%'}}
          source={TSBuddyBackImage}>
          <View style={styles.container}>
            <View style={styles.profileView}>
              <Image
                source={MonthImages.ProfileIcon}
                style={{height: 120, width: 120, borderRadius: 60}}
              />
            </View>
            <Text style={styles.text}>Radhika Gupta</Text>
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
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Manager Info
              </Text>
            </View>
            <View style={styles.managerDetailView2}>
              <View style={styles.roundIcon}>
                <Image
                  resizeMode="cover"
                  source={MonthImages.ProfileIcon}
                  style={{height: 80, width: 80, borderRadius: 20}}
                />
              </View>
              <View>
                <Text style={styles.managerNameText}>Mayank Sharma</Text>
                <Text style={styles.emailText}>sharma.mayank@thinksys.com</Text>
                <View style={styles.socialIconView}>
                  <Image
                    source={MonthImages.empMailS}
                    style={{height: 40, width: 40}}
                  />
                  <Image
                    source={MonthImages.empCallS}
                    style={{height: 40, width: 40}}
                  />
                  <Image
                    source={MonthImages.empMsg}
                    style={{height: 40, width: 40}}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
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
