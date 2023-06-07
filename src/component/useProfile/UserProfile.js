import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Animated,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './userProfileStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {useIsFocused} from '@react-navigation/native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import RefreshIcon from 'assets/allImage/refresh.imageset/refreshIcon.png';
import {Colors} from 'colors/Colors';
// import Header from 'component/header/Header';
import baseUrl from 'services/Urls';
import {useNavigation} from '@react-navigation/native';
import CommunicationModal from 'modals/CommunicationModal';
import {getEmployeeData, modalStatus} from 'redux/homeSlice';
import {FontSize} from 'constants/fonts';
import {ERROR} from 'constants/strings';
import ShowAlert from 'customComponents/CustomError';
import defaultUserIcon from 'assets/allImage/DefaultImage.imageset/defaultUserIcon.png';
import RenderListItem from './RenderList';
import CrossIcon from 'assets/allImage/cross.imageset/cross.png';
import NotFound from 'assets/allImage/noInternet.imageset/internet2x.png';

const UserProfile = () => {
  const isFocussed = useIsFocused();
  const inputRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const animatedOpacity = useRef(new Animated.Value(1)).current;

  const {isShowModal: isShowModall, fromNavigatedScreen} = useSelector(
    state => state.home,
  );

  const {userToken: token} = useSelector(state => state.auth);
  const [showHoriZontal, setShowHorizontal] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [numValue, setNumValue] = useState(3);
  const [empDetail, setClickData] = useState({});
  const [allEmpData, setEmpData] = useState([]);
  const [scrollBegin, setScrollBegin] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchedName, setSearchedName] = useState('');
  const [isFetchingEmployees, setIsFetchingEmployees] = useState(false);
  let skipCount = allEmpData.length || 0;
  const [employeesCount, setEmployeesCount] = useState(0);
  const [refreshing, SetRefreshing] = useState(false);

  useEffect(() => {
    if (showTextInput) inputRef.current.focus();
  }, [showTextInput]);

  const fetchInitialData = async () => {
    await fetchEmployeesData({
      isInitial: true,
      currentEmployees: {
        page: 1,
        skip: 0,
        take: 18,
      },
    });
  };

  useEffect(() => {
    (async () => {
      await fetchEmployeesData({
        isInitial: true,
        currentEmployees: {
          page: 1,
          skip: 0,
          take: 18,
        },
      });
    })();
  }, []);

  const fetchEmployeesData = async ({
    isInitial,
    currentEmployees,
    isSearching,
  }) => {
    setIsFetchingEmployees(true);

    const result = await dispatch(getEmployeeData({token, currentEmployees}));
    setIsFetchingEmployees(false);
    if (isInitial && !isSearching) setTotalCount(result?.payload?.count);

    if (result?.error) {
      ShowAlert({
        messageHeader: ERROR,
        messageSubHeader: result?.error?.message,
        buttonText: 'Close',
        dispatch,
        navigation,
      });
    }
    // if (isSearching) {
    //   setEmpData(result?.payload?.data);
    //   return;
    // }

    if (result && result?.payload && result?.payload?.data) {
      if (isInitial) {
        setEmpData(result.payload.data);
      } else {
        setEmpData([...allEmpData, ...result?.payload?.data]);
      }
      // !isSearching && setEmployeesCount(result.payload.count);
      setEmployeesCount(result?.payload?.count);
    }
  };

  const onChangeText = async enteredName => {
    setSearchedName(enteredName);

    // const filterData = allEmpData.filter(el => {
    //   return el.employeeName.includes(e);
    // });
    // setEmpData(filterData);
  };

  const loadMoreData = () => {
    if (scrollBegin && employeesCount > skipCount) {
      // fetchEmployeesData({take: 15, skip: skipCount, page: 1});
      fetchEmployeesData({
        currentEmployees: {
          page: 1,
          skip: skipCount,
          take: 18,
        },
      });
    }
  };

  // if (allEmpData?.length === 0) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <Text>No Employee Found!</Text>
  //     </View>
  //   );
  // }

  {
    return isFetchingEmployees ? (
      <View style={styles.loaderContainer}>
        {/* <View style={styles.loaderBackground} /> */}
        <ActivityIndicator size="large" color={'white'} />
      </View>
    ) : (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: Colors.darkBlue,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: wp(4),
            paddingVertical: hp(1),
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                // =================================================================

                Animated.timing(animatedOpacity, {
                  toValue: 0,
                  duration: 10,
                  useNativeDriver: true,
                }).start(() => {
                  navigation.pop();
                  navigation.navigate(fromNavigatedScreen);
                  Animated.timing(animatedOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                  }).start();
                });

                // =================================================================
                // navigation.pop();
                // navigation.navigate(fromNavigatedScreen);
                // navigation.goBack();
              }}>
              <Image
                source={MonthImages.backArrowS}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: hp(1),
            }}>
            <Text
              style={{
                color: Colors.white,
                marginRight: wp(2),
                fontSize: 18,
                fontWeight: '500',
              }}>
              Employees
            </Text>
            <Image
              source={MonthImages.info_scopy}
              style={{height: 20, width: 20}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingTop: hp(0.6),
            }}>
            {showHoriZontal ? (
              <TouchableOpacity
                onPress={() => {
                  setNumValue(3);
                  setShowHorizontal(false);
                }}>
                <Image
                  source={MonthImages.thumbnailS}
                  style={{marginRight: wp(4)}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setNumValue(1);
                  setShowHorizontal(true);
                }}>
                <Image
                  source={MonthImages.listS}
                  style={{marginRight: wp(4)}}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                // if (!showTextInput) {
                //   setShowTextInput(true);
                // } else {
                //   setShowTextInput(false);
                // }
                setShowTextInput(prevState => !prevState);
                inputRef.current?.focus();
              }}>
              <Image
                source={MonthImages.searchIconwhite}
                style={{
                  height: 20,
                  width: 20,
                  // marginRight: wp(5),
                  color: Colors.white,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            zIndex: 999,
          }}>
          <Pressable
            onPress={() => {
              fetchInitialData();
            }}
            style={{position: 'absolute', bottom: hp(3), right: wp(5)}}>
            <Image
              source={RefreshIcon}
              style={{height: 32, width: 32, borderRadius: 25, zIndex: 9999}}
            />
          </Pressable>
        </View>
        {showTextInput ? (
          <View
            style={{
              backgroundColor: Colors.blackishGreen,
              flexDirection: 'row',
              paddingVertical: hp(1),
              paddingHorizontal: wp(5),
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              disabled={searchedName.length == 0}
              onPress={async () => {
                let currentEmployee = {
                  page: 1,
                  skip: 0,
                  take: 18,
                };

                if (searchedName.length) {
                  currentEmployee = {
                    page: 1,
                    skip: 0,
                    take: totalCount,
                    name: searchedName,
                  };
                }
                await fetchEmployeesData({
                  isInitial: true,
                  currentEmployees: currentEmployee,
                  isSearching: true,
                });
              }}>
              <Image
                source={MonthImages.searchIconwhite}
                style={{
                  height: 25,
                  width: 25,
                  marginRight: wp(5),
                }}
              />
            </TouchableOpacity>

            <TextInput
              autoFocus={true}
              value={searchedName}
              selectionColor={Colors.white}
              color={Colors.white}
              ref={inputRef}
              // value={e}
              onChangeText={onChangeText}
              isEditble
              style={{
                height: '120%',
                width: '80%',
                paddingVertical: 0,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setSearchedName('');
              }}
              style={styles.clearButton}>
              {/* <Text style={{color: 'white'}}>X</Text> */}
              <Image
                source={CrossIcon}
                style={{height: 20, width: 20, tintColor: Colors.white}}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        {isShowModall && isFocussed ? (
          <CommunicationModal empDetail={empDetail} />
        ) : null}

        {allEmpData?.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={NotFound} style={{height: 120, width: 160}} />
            <Text style={{color: 'maroon', marginTop: 20}}>
              No Employee Found!
            </Text>
          </View>
        ) : (
          <FlatList
            windowSize={5}
            removeClippedSubviews={true}
            legacyImplementation={false}
            onScrollBeginDrag={() => setScrollBegin(true)}
            onEndReachedThreshold={0}
            scrollsToTop={false}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreData}
            onMomentumScrollBegin={() => setScrollBegin(true)}
            onMomentumScrollEnd={() => setScrollBegin(false)}
            data={allEmpData}
            numColumns={numValue}
            key={numValue}
            //numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return renderItem(
                item,
                index,
                navigation,
                isShowModall,
                dispatch,
                setClickData,
                empDetail,
                showHoriZontal,
              );
            }}
          />
        )}
      </View>
    );
  }
};

const renderItem = (
  {designation, companyEmail, image, cellNumber, employeeName, managerInfoDto},
  index,
  navigation,
  isShowModall,
  dispatch,
  setClickData,
  empDetail,
  showHoriZontal,
) => {
  return (
    <View
      key={index}
      style={{
        backgroundColor: Colors.white,
      }}>
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
                  // source={{uri: `${baseUrl}${image}`}}
                  source={{uri: `data:image/jpeg;base64,${image}`}}
                  style={styles.image}
                />
              ) : (
                <Image source={defaultUserIcon} style={styles.image} />
              )}
            </View>
            <View style={{flex: 0.7}}>
              <Text style={styles.nameText}>{employeeName}</Text>
              <Text style={styles.desniationText}>{designation}</Text>
              <View style={styles.smallView}>
                <Image
                  source={MonthImages.userPS}
                  style={{height: 25, width: 25}}
                />
                <Text style={styles.reportingText}>
                  {managerInfoDto.employeeName}
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
                // source={{uri: `${baseUrl}${image}`}}
                source={{uri: `data:image/jpeg;base64,${image}`}}
                style={styles.image}
              />
            ) : (
              <Image source={defaultUserIcon} style={styles.image} />
            )}
            <Text numberOfLines={1} style={styles.nametext2}>
              {employeeName}
            </Text>
            <Text numberOfLines={1} style={styles.desText2}>
              {designation}
            </Text>
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

export default UserProfile;
