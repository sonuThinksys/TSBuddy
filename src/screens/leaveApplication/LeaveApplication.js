import {View, Text, Pressable} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomHeader from 'navigation/CustomHeader';
import styles from './LeaveApplicationStyle';
import {Colors} from 'colors/Colors';
import {getOpenRequestHR} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import ApplicationListLayout from './ApplicationListLayout';
import {useIsFocused} from '@react-navigation/native';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';

const LEAVE = 'Leave';
const WFH = 'WFH';
const REGULARISATION = 'Regularisation';

const LeaveApplication = ({navigation}) => {
  const [selectedType, setSelectedType] = useState({
    type: LEAVE,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [leaveApplicationData, setLeaveApplicationData] = useState([]);
  const [isRegularisation, setIsRegularisation] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);

  const isFocused = useIsFocused();

  const getAllOpenRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const openRequestList = await dispatch(
        getOpenRequestHR({
          token,
        }),
      );

      if (openRequestList?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: openRequestList?.error?.message,
          buttonText: 'Close',
          dispatch,
          navigation,
        });
      } else {
        setLeaveApplicationData(openRequestList?.payload);
      }
    } catch (err) {
      console.error('err:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // if (isFocused)
    getAllOpenRequests();
  }, []);

  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Leave Application"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      <View style={styles.attendanceTypeContainer}>
        <View style={styles.typeContainer}>
          <Pressable
            onPress={() => {
              setSelectedType({type: LEAVE});
            }}
            style={[
              styles.leftType,
              {
                backgroundColor:
                  selectedType.type === LEAVE
                    ? Colors.lighterBlue
                    : Colors.white,
                borderRightWidth: 1,
                borderColor: Colors.lightGray1,
              },
            ]}>
            <Text
              style={{
                color: selectedType.type === LEAVE ? Colors.white : null,
              }}>
              Leave
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedType({type: REGULARISATION});
              setIsRegularisation(true);
            }}
            style={[
              styles.middleType,
              {
                backgroundColor:
                  selectedType.type === REGULARISATION
                    ? Colors.lighterBlue
                    : Colors.white,
              },
            ]}>
            <Text
              style={{
                color:
                  selectedType.type === REGULARISATION ? Colors.white : null,
              }}>
              Regularisation
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setSelectedType({type: WFH});
            }}
            style={[
              styles.rightType,
              {
                backgroundColor:
                  selectedType.type === WFH ? Colors.lighterBlue : Colors.white,
                borderLeftWidth: 1,
                borderColor: Colors.lightGray1,
              },
            ]}>
            <Text
              style={{
                color: selectedType.type === WFH ? Colors.white : null,
              }}>
              WFH
            </Text>
          </Pressable>
        </View>
      </View>
      <View>
        {selectedType.type == LEAVE ? (
          <ApplicationListLayout
            data={leaveApplicationData?.openLeaves}
            loading={isLoading}
            navigation={navigation}
            getAllOpenRequests={getAllOpenRequests}
            isRegularisation={false}
          />
        ) : selectedType.type == WFH ? (
          <ApplicationListLayout
            data={leaveApplicationData?.openWfh}
            loading={isLoading}
            navigation={navigation}
            isRegularisation={false}
          />
        ) : selectedType.type == REGULARISATION ? (
          <ApplicationListLayout
            data={leaveApplicationData?.openRegularizeRequest}
            loading={isLoading}
            navigation={navigation}
            isRegularisation={isRegularisation}
          />
        ) : null}
      </View>
    </>
  );
};

export default LeaveApplication;
