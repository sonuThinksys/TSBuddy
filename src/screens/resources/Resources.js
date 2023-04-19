import RenderListItem from 'component/useProfile/renderList';
import {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getEmployeesByLeaveApprover} from 'redux/homeSlice';
import styles from '../profile/ProfileStyle';
import {MonthImages} from 'assets/monthImage/MonthImage';
import baseUrl from 'services/Urls';
import {Colors} from 'colors/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {color} from 'react-native-reanimated';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import {useNavigation} from '@react-navigation/native';

const Resources = () => {
  const [numValue, setNumValue] = useState(1);
  const [scrollBegin, setScrollBegin] = useState(false);
  const [resourcesEmpiolyeeData, setResourcesEmpiolyeeData] = useState([]);
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const employeeData = await dispatch(getEmployeesByLeaveApprover(token));

      setResourcesEmpiolyeeData(employeeData?.payload);
      if (employeeData?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: employeeData?.error?.message,
          buttonText: 'Close',
          dispatch,
          navigation,
        });
      }
    })();
  }, []);

  return (
    <View
      style={{
        height: hp(93),
        borderWidth: 1,
        backgroundColor: Colors.white,
        paddingTop: 10,
      }}>
      <FlatList
        legacyImplementation={false}
        onScrollBeginDrag={() => setScrollBegin(true)}
        onEndReachedThreshold={0.01}
        scrollsToTop={false}
        showsVerticalScrollIndicator={false}
        // onEndReached={loadMoreData}
        onMomentumScrollBegin={() => setScrollBegin(true)}
        onMomentumScrollEnd={() => setScrollBegin(false)}
        data={resourcesEmpiolyeeData}
        numColumns={numValue}
        key={numValue}
        // numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return renderItem(item, index, navigation);
        }}
      />
    </View>
  );
};

const renderItem = (
  {designation, image, employeeName, managerInfoDto, name},
  index,
  navigation,
) => {
  return (
    <>
      <View key={index} style={{backgroundColor: Colors.white}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ResourcesDetailsScreen', {
              designation,
              image,
              employeeName,
              managerInfoDto,
              name,
              // navigation,
            });
          }}>
          <View style={style.container}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {image ? (
                <Image
                  resizeMode="stretch"
                  source={{uri: `${baseUrl}${image}`}}
                  style={style.image}
                />
              ) : (
                <Image
                  resizeMode="stretch"
                  source={{
                    uri: 'https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg',
                  }}
                  style={style.image}
                />
              )}
            </View>
            <View style={{flex: 0.7, marginLeft: 15}}>
              <Text style={style.nameText}>{employeeName} </Text>
              <Text style={style.desniationText}>{designation}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    borderRadius: 10,
    backgroundColor: '#ebfbee',
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: Colors.lightGray,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 10,
    borderWidth: 0.3,
    borderColor: Colors.brown,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
    opacity: 0.6,
  },
  desniationText: {
    fontSize: 16,
    color: Colors.lightBlue,
  },
  noEmployeeFound: {
    color: 'black',
    fontWeight: 'bold',
  },
  noEmployeeCont: {
    height: hp(30),
    borderWidth: 1,
    alignItems: 'center',
  },
});

export default Resources;
