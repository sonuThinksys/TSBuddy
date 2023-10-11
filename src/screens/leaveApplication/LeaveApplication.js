import {View, Text, Pressable} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomHeader from 'navigation/CustomHeader';
import styles from './LeaveApplicationStyle';
import {Colors} from 'colors/Colors';
import {useDispatch, useSelector} from 'react-redux';
import ApplicationListLayout from './ApplicationListLayout';

import {
  LeaveApplicationForApproverName,
  WFHApplicationForApproverName,
} from 'navigation/Route';
import {getLeaveApplicationData} from 'redux/homeSlice';
import jwt_decode from 'jwt-decode';
import {useIsFocused} from '@react-navigation/native';

const LEAVE = 'Leave';
const REGULARISATION = 'Regularisation';
const WFH = 'WFH';

const LeaveApplication = ({navigation}) => {
  const token = useSelector(state => state.auth.userToken);
  const {emailId, role, id} = jwt_decode(token);
  const isFocussed = useIsFocused();
  // 10224;

  const isHRManager = role.includes('HR Manager');

  const [selectedType, setSelectedType] = useState(LEAVE);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [applicationData, setApplicationData] = useState({
    [LEAVE]: {data: [], count: 0},
    [WFH]: {data: [], count: 0},
    [REGULARISATION]: {data: [], count: 0},
  });

  const tabButton = ({type, tabText, onTabPress}) => {
    return (
      <Pressable
        onPress={() => {
          onTabPress(type);
        }}
        style={[
          styles.tabContainer,
          {
            backgroundColor:
              selectedType === type ? Colors.lighterBlue : Colors.white,
          },
        ]}>
        <Text style={selectedType === type ? styles.textColorWhite : null}>
          {tabText}
        </Text>
      </Pressable>
    );
  };

  const onNewPress = () => {
    if (selectedType === LEAVE) {
      navigation.navigate(LeaveApplicationForApproverName);
    } else if (selectedType === WFH) {
      navigation.navigate(WFHApplicationForApproverName);
    }
  };

  const getLeavesForManager = useCallback(
    async (type, isRefreshing) => {
      try {
        let approver = {approverEmail: emailId};
        if (type === REGULARISATION) {
          approver = {approverId: id};
        }

        setIsLoading(true);
        const leaves = await dispatch(
          getLeaveApplicationData({
            token,
            body: {
              take: 12,
              skip: isRefreshing ? 0 : applicationData[type].data.length,
              page: 1,
              name: null,
              ...approver,
            },
            selectedType: type,
            isHR: isHRManager,
          }),
        );

        const {
          payload: {data: initialLeaves, count},
        } = leaves;

        setApplicationData(prevData => ({
          ...prevData,
          [type]: {
            data: isRefreshing
              ? [...initialLeaves]
              : [...prevData[type].data, ...initialLeaves],
            count,
          },
        }));
        return {count};
      } catch (err) {
        console.log('errr22:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, emailId, token, applicationData, isHRManager, id],
  );

  useEffect(() => {
    if (isFocussed) {
      (async () => {
        await getLeavesForManager(selectedType, true);
      })();
    }
  }, [isFocussed]);

  const renderMoreLeaves = async () => {
    if (
      applicationData[selectedType].data.length <
      applicationData[selectedType].count
    ) {
      getLeavesForManager(selectedType);
    }
  };

  const onTabPress = async type => {
    setSelectedType(type);
    if (applicationData[type]?.data?.length === 0) {
      await getLeavesForManager(type);
    }
  };

  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Leave Application"
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
        headerRight={
          selectedType !== REGULARISATION ? (
            <Pressable onPress={onNewPress} style={styles.headerRightContainer}>
              <Text style={styles.headerRightText}>New</Text>
            </Pressable>
          ) : null
        }
      />

      <View style={styles.attendanceTypeContainer}>
        <View style={styles.typeContainer}>
          {tabButton({type: LEAVE, tabText: 'Leave', onTabPress})}
          {tabButton({
            type: REGULARISATION,
            tabText: 'Regularisation',
            onTabPress,
          })}
          {tabButton({type: WFH, tabText: 'WFH', onTabPress})}
        </View>
      </View>
      <View style={styles.listContainer}>
        <ApplicationListLayout
          data={applicationData[selectedType].data || []}
          loading={isLoading}
          navigation={navigation}
          isRegularisation={selectedType === REGULARISATION ? true : false}
          loadMoreData={renderMoreLeaves}
          getLeavesForManager={getLeavesForManager}
          selectedType={selectedType}
        />
      </View>
    </>
  );
};

export default LeaveApplication;
