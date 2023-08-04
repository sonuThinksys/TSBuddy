import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import MonthPicker from 'react-native-month-year-picker';
import styles from './MonthWiseStyle';
import {Colors} from 'colors/Colors';
import moment from 'moment';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAttendencaeData as incomingAttendanceData,
  getEmployeesByLeaveApprover,
} from 'redux/homeSlice';
import Loader from 'component/loader/Loader';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import {renewToken} from 'Auth/LoginSlice';

const MonthWiseCalnder = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state?.auth?.userToken);
  const refreshToken = useSelector(state => state?.auth?.refreshToken);
  const [date, setDate] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [state, setState] = useState({
    loading: false,
    attendanceData: [],
    selectedEmpl: '',
    isOpened: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const employeeData = await dispatch(getEmployeesByLeaveApprover(token));

        if (employeeData?.error) {
          const {payload} = await getTokenIfExpires(employeeData);
          const employeeData1 = await dispatch(
            getEmployeesByLeaveApprover(payload?.token),
          );
          setEmployeesData(employeeData1?.payload);
          setIsLoading(false);
        } else {
          setEmployeesData(employeeData?.payload);
        }
      } catch (err) {
        console.log('err:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const getTokenIfExpires = async ({error}) => {
    try {
      let result;
      if (error?.message.toLowerCase() === 'token-expired') {
        result = await dispatch(renewToken({token: refreshToken}));

        if (result?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: result?.error?.message,
            buttonText: 'Close',
            dispatch,
            navigation,
          });
        }
      }
      return result;
    } catch (err) {
      console.log('error:', err);
    }
  };

  const showPicker = useCallback(value => setShowMonthPicker(value), []);
  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
      setState({});
    },
    [date, showPicker],
  );

  const getAttandanceData = async ({employeeId}) => {
    if (employeeId != state.selectedEmpl) {
      setState({
        ...state,
        loading: true,
        selectedEmpl: employeeId,
        attendanceData: [],
        isOpened: true,
      });
      //   setTimeout(() => {
      const selectedMonth = new Date(date).getMonth() + 1;
      const selectedYear = new Date(date).getFullYear();
      const result = await dispatch(
        incomingAttendanceData({
          token,
          employeeID: employeeId,
          visisbleMonth: selectedMonth,
          visibleYear: selectedYear,
        }),
      );

      console.log('result:', result);

      if (result?.error) {
        console.log('result?.error:', result.error);
        const newResult = await getTokenIfExpires(result);
        console.log('newResult:', newResult);
        // setState({
        //   ...state,
        //   attendanceData: [],
        //   loading: false,
        //   selectedEmpl: employeeId,
        //   isOpened: true,
        // });

        const finalResult = await dispatch(
          incomingAttendanceData({
            token: newResult?.payload?.token,
            employeeID: employeeId,
            visisbleMonth: selectedMonth,
            visibleYear: selectedYear,
          }),
        );

        updateAttendanceData({employeeId, result: finalResult});
      } else {
        updateAttendanceData({employeeId, result});
      }

      //   }, 2000);
    } else {
      setState({
        ...state,
        loading: false,
        isOpened: !state.isOpened,
      });
    }
  };

  const updateAttendanceData = ({employeeId, result}) => {
    if (employeeId && result?.payload?.length) {
      const attendanceData = result?.payload;
      const attDataWithWeekends = [];

      setState({
        ...state,
        attendanceData: result?.payload,
        loading: false,
        selectedEmpl: employeeId,
        isOpened: true,
      });
    } else {
      setState({
        ...state,
        attendanceData: [],
        loading: false,
        selectedEmpl: employeeId,
        isOpened: true,
      });
    }
  };
  const commonItem = ({item, index}) => {
    const {image} = item;
    return (
      <>
        <View style={styles.commonContainer}>
          {/* <Image source={{uri: item?.image}} style={styles.imageStyle} /> */}
          {image ? (
            <Image
              resizeMode="stretch"
              // source={{uri: `${baseUrl}${image}`}}
              source={{uri: `data:image/jpeg;base64,${image}`}}
              style={styles.imageStyle}
            />
          ) : (
            <Image style={styles.imageStyle} source={MonthImages.ProfileIcon} />
          )}
          <Text style={{paddingLeft: wp(1.5)}}>{item.employeeName}</Text>
        </View>
        <View style={styles.arrowButtonStyle}>
          <Text style={styles.empTextStyle}>{`#${item.employeeId}`}</Text>
          <Pressable
            style={{paddingLeft: wp(4)}}
            onPress={() => getAttandanceData({employeeId: item.employeeId})}>
            {/* <Text>▽</Text> */}
            <View style={styles.dropdownIconContainer}>
              <MonthImages.DropDownIconSVG
                // fill={Colors.grey}
                color={Colors.lightBlack}
                height={16}
                width={16}
              />
            </View>
          </Pressable>
        </View>
      </>
    );
  };

  const renderSingleItem = ({item, index}) => {
    return (
      <View style={styles.singleItemStyle}>{commonItem({index, item})}</View>
    );
  };

  const renderTime = ({date, label}) => {
    return (
      <>
        <Text style={{fontSize: 12}}>{`${label}:`}</Text>
        <Text
          style={{paddingLeft: label == 'In' ? wp(6) : wp(4), fontSize: 12}}>
          {moment(date).format('hh:mm a')}
        </Text>
      </>
    );
  };

  const renderSelectedEmployee = ({item, index}) => {
    return (
      <View style={styles.selectedEmployeeStyle}>
        <View style={styles.selectedCommonEmployeeStyle}>
          {commonItem({index, item})}
        </View>
        {state.selectedEmpl == item.employeeId && state.isOpened ? (
          <>
            {state.loading ? (
              <View style={{paddingVertical: hp(1.2)}}>
                <ActivityIndicator />
              </View>
            ) : state.attendanceData && state.attendanceData.length ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={state.attendanceData}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.calenderListStyle}>
                      <Text>
                        {moment(item?.attendanceDate).format('MMM DD')}
                      </Text>
                      <View style={styles.listItemStyle}>
                        {renderTime({date: item.inTime, label: 'In'})}
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        {renderTime({date: item.outTime, label: 'Out'})}
                      </View>
                    </View>
                  );
                }}
              />
            ) : (
              <View style={{padding: 5, alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: Colors.dune}}>
                  No Data Found
                </Text>
              </View>
            )}
          </>
        ) : null}
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        {state.selectedEmpl == item.employeeId
          ? renderSelectedEmployee({index, item})
          : renderSingleItem({item, index})}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => showPicker(true)}
        style={styles.mainPressButton}>
        <View />
        <Text style={{fontSize: 14, color: Colors.dune}}>
          {moment(date).format('MMM, YYYY')}
        </Text>
        <View style={styles.dropdownIconContainer}>
          <MonthImages.DropDownIconSVG
            // fill={Colors.grey}
            color={Colors.lightBlack}
            height={16}
            width={16}
          />
        </View>
      </Pressable>
      {showMonthPicker && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          //minimumDate={new Date()}
          maximumDate={new Date()}
        />
      )}
      <FlatList
        data={employeesData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
      {isLoading ? <Loader /> : null}
    </View>
  );
};

export default MonthWiseCalnder;
