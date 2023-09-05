import {View, Text, FlatList, Pressable} from 'react-native';
import styles from './ApplicationListLayoutStyle';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import ApprovedIcon from 'assets/newDashboardIcons/circle-check.svg';
import RejectedIcon from 'assets/newDashboardIcons/ban.svg';
import PendingIcon from 'assets/newDashboardIcons/circle-minus.svg';
import {FontFamily} from 'constants/fonts';
import {Colors} from 'colors/Colors';
import Loader from 'component/LoadingScreen/LoadingScreen';

const ApplicationListLayout = ({data, loading, navigation}) => {
  const keyExtractor = item => Math.random() * Math.random();
  const renderListOfAppliedRequests = ({item}) => {
    const options = {month: 'short', day: '2-digit', year: 'numeric'};

    const formattedStartDate = new Date(item?.fromDate)?.toLocaleDateString(
      'en-US',
      options,
    );

    const formattedEndDate = new Date(item?.toDate)?.toLocaleDateString(
      'en-US',
      options,
    );

    const appliedDate = new Date(item?.postingDate)?.toLocaleDateString(
      'en-US',
      options,
    );

    return (
      <Pressable
        onPress={() => {
          navigation.navigate('applicationDetailsScreen', {
            item,
          });
        }}>
        <View style={styles.request} key={item.leaveApplicationId}>
          <View style={styles.appliedRequestsLeft}>
            <View
              style={{
                alignItems: 'center',
                marginRight: wp(4),
              }}>
              <Text style={{fontSize: 25, fontFamily: FontFamily.RobotoLight}}>
                {item?.totalLeaveDays < 9 ? '0' : null}
                {item?.totalLeaveDays}
              </Text>
              <Text style={{fontSize: 12, fontFamily: FontFamily.RobotoMedium}}>
                {item?.totalLeaveDays === 1 ? 'Day' : 'Days'}
              </Text>
            </View>
            <View style={{marginLeft: 20, marginTop: 4}}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: FontFamily.RobotoRegular,
                  color: Colors.dune,
                  marginBottom: hp(1),
                }}>
                {formattedStartDate} - {formattedEndDate}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 11, color: Colors.lightGray1}}>
                  Applied on:{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.lightGray1,
                    fontFamily: FontFamily.RobotoMedium,
                  }}>
                  {appliedDate}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {item.status?.toLowerCase() === 'open' ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <PendingIcon
                  fill={Colors.gold}
                  height={20}
                  width={20}
                  marginBottom={4}
                />
                <Text style={{fontSize: 12, color: Colors.gold}}>Open</Text>
              </View>
            ) : item.status?.toLowerCase() === 'dismissed' ||
              item.status?.toLowerCase() === 'rejected' ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <RejectedIcon
                  fill={Colors.darkBrown}
                  height={20}
                  width={20}
                  marginBottom={4}
                />
                <Text style={{fontSize: 12, color: Colors.darkBrown}}>
                  {item.status}
                </Text>
              </View>
            ) : (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ApprovedIcon
                  fill={Colors.darkLovelyGreen}
                  height={20}
                  width={20}
                  marginBottom={4}
                />
                <Text style={{fontSize: 12, color: Colors.darkLovelyGreen}}>
                  {item.status || 'Approved'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <View>
      {data?.length > 0 && (
        <View>
          {loading ? (
            <Loader />
          ) : (
            <FlatList
              style={{height: '100%'}}
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={renderListOfAppliedRequests}
              keyExtractor={keyExtractor}
            />
            // <Text>hh</Text>
          )}
        </View>
      )}

      {!loading && data?.length == 0 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: FontFamily.RobotoMedium,
              fontSize: 16,
              color: Colors.lightBlue,
              marginVertical: 4,
            }}>
            You don't have any WFH.
          </Text>
        </View>
      )}
    </View>
  );
};

export default ApplicationListLayout;
