import RenderListItem from 'component/useProfile/RenderList';
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

const Resources = () => {
  const [numValue, setNumValue] = useState(1);
  const [scrollBegin, setScrollBegin] = useState(false);
  const [resourcesEmpiolyeeData, setResourcesEmpiolyeeData] = useState([]);
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const employeeData = await dispatch(getEmployeesByLeaveApprover(token));

      setResourcesEmpiolyeeData(employeeData.payload);
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
    <>
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
          return renderItem(item, index);
        }}
      />
    </>
  );
};

const renderItem = (
  {designation, image, employeeName, managerInfoDto},
  index,
) => {
  return (
    <View key={index} style={{backgroundColor: Colors.white}}>
      <TouchableOpacity onPress={() => {}}>
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
                style={styles.image}
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
          <View style={{flex: 0.7, marginTop: 10, marginLeft: 15}}>
            <Text style={style.nameText}>{employeeName} </Text>
            <Text style={style.desniationText}>{designation}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.brown,
    borderRadius: 4,
    margin: 7,
    shadowOpacity: 0.3,
  },
  image: {
    width: 70,
    height: 70,
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
});

export default Resources;
