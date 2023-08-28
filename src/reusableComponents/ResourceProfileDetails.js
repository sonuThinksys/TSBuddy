import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import {memo} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

const screenWidth = Dimensions.get('window').width;

const ResourceProfileDetails = props => {
  const {
    employeeName,
    empFullName,
    image,
    companyEmail,
    cellNumber,
    designation,
    managerInfoDto,
  } = props.empDetails;

  const {sendWhatsApp} = props;

  return (
    <View style={{backgroundColor: Colors.lighterBlue, marginBottom: 5}}>
      <View style={style.profile_name_cont}>
        <View style={style.profile_cont}>
          {image ? (
            <Image
              resizeMode="stretch"
              source={{uri: image}}
              style={style.image}
            />
          ) : (
            <Image
              resizeMode="stretch"
              source={MonthImages.ProfileIcon}
              style={style.image}
            />
          )}
        </View>
        <View style={style.name_cont}>
          <Text style={style.name_txt}>{empFullName}</Text>
          <Text style={style.designation_txt}>{designation}</Text>
        </View>
      </View>
      <View style={style.social_icon_cont}>
        <View style={style.social_inner_cont}>
          <TouchableOpacity
            onPress={() => {
              props.sendMail();
            }}>
            <View style={style.social_icon}>
              <Image
                source={MonthImages.empMailS}
                style={{height: '100%', width: '100%'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.dialCall();
            }}>
            <View style={style.social_icon}>
              <Image
                source={MonthImages.empCallS}
                style={{height: '100%', width: '100%'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.sendMessage();
            }}>
            <View style={style.social_icon}>
              <Image
                source={MonthImages.empMsg}
                style={{height: '100%', width: '100%'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sendWhatsApp()}>
            <View style={style.social_icon}>
              <Image
                source={MonthImages.empWa}
                style={{height: '100%', width: '100%'}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorDodgerBlue2,
    marginBottom: 5,
  },
  profile_name_cont: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
    padding: 10,
    alignItems: 'center',
  },
  profile_cont: {
    width: wp(18),
    height: hp(9),
    marginRight: 10,
    borderRadius: 50,
  },
  name_cont: {},
  name_txt: {
    color: 'white',
    fontSize: 20,
    paddingBottom: 8,
  },
  designation_txt: {
    color: 'white',
    fontSize: 16,
  },
  social_icon_cont: {
    alignItems: 'center',
  },
  social_inner_cont: {
    width: screenWidth - wp(15),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  social_icon: {
    width: wp(11),
    height: hp(5.5),
    borderRadius: 50,
    backgroundColor: 'teal',
  },
  tab_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    width: screenWidth / 4,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  badges_number: {
    backgroundColor: Colors.reddishTint,
    width: 25,
    height: 25,
    borderRadius: 13,
    position: 'absolute',
    right: -26,
    top: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 50,
  },
  listOfLeaves: {
    height: hp(65),
    marginBottom: 5,
  },
});

export default memo(ResourceProfileDetails);
