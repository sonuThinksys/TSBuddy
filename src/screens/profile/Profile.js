import React from 'react';
import {View, Image, Text, ImageBackground, FlatList} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import ProfileIcon from 'assets/allImage/DefaultImage.imageset/default_user_icon.png';
import TSBuddyBackImage from 'assets/mipmap/tsbuddyBack.png';
import mailEmp from 'assets/allImage/mailImg.imageset/mailEmp.png';
import callEmp from 'assets/allImage/callImg.imageset/callEmp.png';
import phnIcon from 'assets/allImage/userphone.imageset/phnIcon.png';
import empMsg from 'assets/allImage/msg.imageset/empMsg.png';
const Profile = () => {
  const data = [
    {
      image: mailEmp,
      nameOfField: 'Email ID',
      email: 'gupta.radhika@thinksys.com',
      id: 1,
    },
    {
      image: callEmp,
      nameOfField: 'Mobile No.',
      email: '8544946426',
      id: 2,
    },
    {
      image: mailEmp,
      nameOfField: 'Designation',
      email: 'Software Engineer',
      id: 3,
    },
    {
      image: callEmp,
      nameOfField: 'Emp ID',
      email: 'EMP/10863',
      id: 4,
    },
    {
      image: mailEmp,
      nameOfField: 'Date of Joining',
      email: '26-Apr-2022',
      id: 5,
    },
    {
      image: callEmp,
      nameOfField: 'Education',
      email: 'NA',
      id: 6,
    },
  ];

  return (
    <>
      <View style={{}}>
        <ImageBackground
          resizeMethod="contain"
          style={{height: '60%', width: '100%'}}
          source={TSBuddyBackImage}>
          <View
            style={{
              paddingHorizontal: wp(5),
              paddingTop: hp(12),
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 120,
                width: 120,
                borderRadius: 60,
                backgroundColor: 'gray',
              }}>
              <Image
                resizeMode="cover"
                source={ProfileIcon}
                style={{height: 120, width: 120, borderRadius: 60}}
              />
            </View>
            <Text
              style={{
                marginTop: hp(7.5),
                marginHorizontal: wp(4),
                color: 'steelblue',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Radhika Gupta
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              marginHorizontal: wp(2),
              borderRadius: 5,
              marginVertical: hp(1),
              height: hp(35),
              shadowOpacity: 0.1,
            }}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
          <View
            style={{
              marginHorizontal: wp(2),
              borderWidth: 0.1,
              borderColor: 'gray',
              backgroundColor: 'white',
              marginTop: hp(1),
              paddingVertical: hp(1),
            }}>
            <View
              style={{
                paddingVertical: hp(1.5),
                paddingHorizontal: wp(4),
                backgroundColor: 'teal',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Manager Info
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: wp(5),
                paddingTop: hp(0.5),
                display: 'flex',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  backgroundColor: 'gray',
                }}>
                <Image
                  resizeMode="cover"
                  source={ProfileIcon}
                  style={{height: 80, width: 80, borderRadius: 20}}
                />
              </View>
              <View>
                <Text
                  style={{
                    marginTop: hp(1),
                    marginHorizontal: wp(4),
                    color: 'steelblue',
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Mayank Sharma
                </Text>
                <Text
                  style={{
                    marginHorizontal: wp(4),
                    marginTop: hp(1),
                    opacity: 0.7,
                  }}>
                  sharma.mayank@thinksys.com
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingHorizontal: wp(4),
                    justifyContent: 'space-around',
                  }}>
                  <Image source={empMsg} style={{height: 30, width: 30}} />
                  <Image source={empMsg} style={{height: 30, width: 30}} />
                  <Image source={empMsg} style={{height: 30, width: 30}} />
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
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 0.5,
        borderColor: 'gray',
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
      }}>
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
