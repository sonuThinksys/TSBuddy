// import RenderListItem from 'component/useProfile/RenderList';
import React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getEmployeesAtManagerEnd} from 'redux/homeSlice';
import {Colors} from 'colors/Colors';
import {heightPercentageToDP as hp} from 'utils/Responsive';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import {useNavigation} from '@react-navigation/native';
import ResourceIcon from 'assets/allImage/user.svg';
import Loader from 'component/loader/Loader';

const ResourcesList = props => {
  const numValue = 1;
  const [resourcesEmpiolyeeData, setResourcesEmpiolyeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {userToken: token} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigation();

  const flatListRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const employeeData = await dispatch(getEmployeesAtManagerEnd(token));
        // const employeeData = await dispatch(getEmployeesByLeaveApprover(token));
        setResourcesEmpiolyeeData(employeeData?.payload);

        if (employeeData?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: employeeData?.error?.message,
            buttonText: 'Close',
            dispatch,
            nav,
          });
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch, nav, token]);

  const renderItem = useCallback(
    (
      {
        designation,
        image,
        firstName,
        lastName,
        middleName,
        managerInfoDto,
        name,
        cellNumber,
        companyEmail,
        employeeId,
      },
      index,
      navigation,
    ) => {
      const empName =
        firstName && lastName
          ? `${firstName} ${lastName}`
          : firstName && middleName
          ? `${firstName} ${middleName}`
          : firstName;
      return (
        <View key={index} style={{backgroundColor: Colors.whitishBlue}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(props.navigateToScreen, {
                designation,
                image,
                firstName,
                lastName,
                managerInfoDto,
                name,
                cellNumber,
                companyEmail,
                employeeId,
              });
            }}>
            <View style={style.container}>
              <View style={style.imageContainer}>
                {image ? (
                  <Image
                    resizeMode="stretch"
                    source={{uri: image}}
                    style={style.image}
                  />
                ) : (
                  <View style={style.iconContainer}>
                    <ResourceIcon
                      borderWidth={1}
                      borderColor={'black'}
                      height={50}
                      width={50}
                      color={Colors.darkBlue}
                    />
                  </View>
                )}
              </View>
              <View style={style.empDetailContainer}>
                <Text numberOfLines={1} style={style.nameText}>
                  {empName}
                </Text>
                <Text style={style.desniationText}>{designation}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    },
    [props.navigateToScreen],
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FlatList
      ref={flatListRef}
      legacyImplementation={false}
      onEndReachedThreshold={0.01}
      scrollsToTop={false}
      showsVerticalScrollIndicator={false}
      data={resourcesEmpiolyeeData}
      numColumns={numValue}
      key={numValue}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
        return renderItem(item, index, nav);
      }}
    />
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
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
  imageContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 100,
    padding: 4,
  },
  empDetailContainer: {
    flex: 0.7,
    marginLeft: 15,
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

export default ResourcesList;
