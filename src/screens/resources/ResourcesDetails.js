import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {Colors} from 'colors/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';

const screenWidth = Dimensions.get('window').width;

const ResourcesDetails = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={style.container}>
        <View style={style.profile_name_cont}>
          <View style={style.profile_cont}>
            {/* <Image style={style.pro_img} sources={require('')} /> */}
          </View>
          <View style={style.name_cont}>
            <Text style={style.name_txt}>Navanit Singh</Text>
            <Text style={style.designation_txt}>Sr. Software Engineer</Text>
          </View>
        </View>
        <View style={style.social_icon_cont}>
          <View style={style.social_inner_cont}>
            <View style={style.social_icon}>
              <Image
                source={MonthImages.empMailS}
                style={{height: 40, width: 40}}
              />
            </View>
            <View style={style.social_icon}>
              <Image
                source={MonthImages.empCallS}
                style={{height: 40, width: 40}}
              />
            </View>
            <View style={style.social_icon}>
              <Image
                source={MonthImages.empMsg}
                style={{height: 40, width: 40}}
              />
            </View>
            <View style={style.social_icon}>
              <Image
                source={MonthImages.empWa}
                style={{height: 40, width: 40}}
              />
            </View>
          </View>
        </View>
        <View style={style.tab_view}>
          <View style={style.tab}>
            <Text style={{color: 'white', fontSize: 17}}>Leaves</Text>
            <Text style={style.badges_number}>2</Text>
          </View>
          <View style={style.tab}>
            <Text style={{color: 'white', fontSize: 17}}>Attendence</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
  },
  profile_name_cont: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
    padding: 10,
  },
  profile_cont: {
    width: wp(16),
    height: hp(8),
    marginRight: 10,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  name_txt: {
    color: 'white',
    fontSize: 17,
  },
  designation_txt: {
    color: 'white',
    fontSize: 14,
  },
  social_icon_cont: {
    alignItems: 'center',
  },
  social_inner_cont: {
    width: screenWidth - wp(15),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  social_icon: {
    width: wp(10),
    height: hp(5),
    borderRadius: 50,
    backgroundColor: 'teal',
  },
  tab_view: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tab: {
    borderWidth: 1,
    borderColor: Colors.dune,
    width: screenWidth / 2,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  badges_number: {
    backgroundColor: Colors.reddishTint,
    width: wp(5),
    height: hp(2.5),
    borderRadius: 50,
    color: 'white',
    marginBottom: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ResourcesDetails;
