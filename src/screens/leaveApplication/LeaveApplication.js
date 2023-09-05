import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from 'navigation/CustomHeader';
import styles from './LeaveApplicationStyle';
import {Colors} from 'colors/Colors';
import {getOpenRequestHR} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import ApplicationListLayout from './ApplicationListLayout';
import {useIsFocused} from '@react-navigation/native';

const LEAVE = 'Leave';
const WFH = 'WFH';
const REGULARISATION = 'Regularisation';

const LeaveApplication = ({navigation}) => {
  const [selectedType, setSelectedType] = useState({
    type: LEAVE,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [wfhData, setWFHData] = useState([]);
  const [regularisationData, setRegularisationData] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);

  const isFocused = useIsFocused();

  const getAllOpenRequests = async () => {
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
        setLeaveData(openRequestList?.payload?.openLeaves);
        setWFHData(openRequestList?.payload?.openWfh);
        setRegularisationData(openRequestList?.payload?.openRegularizeRequest);
      }
    } catch (err) {
      console.error('err:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllOpenRequests();
  }, [isFocused]);

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
              setSelectedType({type: WFH});
            }}
            style={[
              styles.leftType,
              {
                backgroundColor:
                  selectedType.type === WFH ? Colors.lighterBlue : Colors.white,
              },
            ]}>
            <Text
              style={{
                color: selectedType.type === WFH ? Colors.white : null,
              }}>
              Leave
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedType({type: REGULARISATION});
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
              setSelectedType({type: LEAVE});
            }}
            style={[
              styles.rightType,
              {
                backgroundColor:
                  selectedType.type === LEAVE
                    ? Colors.lighterBlue
                    : Colors.white,
              },
            ]}>
            <Text
              style={{
                color: selectedType.type === LEAVE ? Colors.white : null,
              }}>
              WFH
            </Text>
          </Pressable>
        </View>
      </View>
      <View>
        {selectedType.type == LEAVE ? (
          <ApplicationListLayout
            data={leaveData}
            loading={isLoading}
            navigation={navigation}
            getAllOpenRequests={getAllOpenRequests}
          />
        ) : selectedType.type == WFH ? (
          <ApplicationListLayout
            data={wfhData}
            loading={isLoading}
            navigation={navigation}
          />
        ) : (
          <ApplicationListLayout
            data={regularisationData}
            loading={isLoading}
          />
        )}
      </View>
    </>
  );
};

export default LeaveApplication;
