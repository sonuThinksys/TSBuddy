import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Pressable} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

import {BarChart} from 'react-native-chart-kit';
import {useNavigation} from '@react-navigation/native';
import jwt_decode from 'jwt-decode';

import styles from './RemainingLeavesStyles';
import {Colors} from 'colors/Colors';
import {useSelector} from 'react-redux';
import {FontFamily} from 'constants/fonts';
import {CommonActions} from '@react-navigation/native';

const RemainingLeaves = () => {
  const [loading, setLoading] = useState(false);
  const {userToken: token} = useSelector(state => state.auth);
  const decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;
  const navigation = useNavigation();
  const {isGuestLogin: isGuestLogin} = useSelector(state => state.auth);
  const {leaveMenuDetails: {remainingLeaves = []} = {}} = useSelector(
    state => state.home,
  );

  const {leavesData} = useSelector(state => state.home);

  const restrictedLeavesData = [
    isGuestLogin ? 1 : remainingLeaves[1]?.totalLeavesAllocated,
    isGuestLogin ? 0 : remainingLeaves[1]?.currentLeaveApplied,
    isGuestLogin ? 1 : remainingLeaves[1]?.currentLeaveBalance,
  ];

  const earnedLeavesData = [
    isGuestLogin ? 15 : remainingLeaves[0]?.totalLeavesAllocated,
    isGuestLogin ? 7 : remainingLeaves[0]?.currentLeaveApplied,
    isGuestLogin ? 8 : remainingLeaves[0]?.currentLeaveBalance,
  ];

  const barChartGraph = ({data, rh}) => {
    return (
      <BarChart
        showVerticalLabels={true}
        verticalLabelRotation={30}
        segments={rh ? 2 : 4}
        spacingInner={0}
        flatColor={true}
        showValuesOnTopOfBars={true}
        showBarTops={false}
        withInnerLines={false}
        fromZero={true}
        withVerticalLabels={false}
        withCustomBarColorFromData={true}
        data={{
          datasets: [
            {
              data,
              colors: [
                () => Colors.lovelyYellow,
                () => Colors.lovelyBlue,
                () => Colors.lovelyGreen,
                () => Colors.red,
              ],
            },
          ],
        }}
        width={
          rh
            ? Dimensions.get('window').width * 0.45
            : Dimensions.get('window').width * 0.45
        }
        height={220}
        chartConfig={{
          backgroundColor: Colors.white,
          backgroundGradientFrom: Colors.white,
          backgroundGradientTo: Colors.white,
          decimalPlaces: 0,
          fillShadowGradientOpacity: '0.5',
          barPercentage: 0.25,
          // barPercentage: !rh
          //   ? totalEarnedTypesAvailable === 3
          //     ? 0.72
          //     : 0.56
          //   : totalRestrictedTypesAvailable === 3
          //   ? 0.72
          //   : 0.56,
          color: (opacity = 1) =>
            Colors.customColor({opacity, r: 0, g: 0, b: 0}),
          style: {
            borderRadius: 0,
          },
          categoryPercentage: 0.5,
        }}
        style={{
          marginVertical: 10,
        }}
      />
    );
  };
  // if (remainingLeaves?.length === 0) {
  //   return (
  //     <View
  //       style={{
  //         height: hp(16),
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       <Text>No remaining leaves found.</Text>
  //     </View>
  //   );
  // }

  const updateData = async () => {
    try {
      setLoading(true);
      const allLeaves = await dispatch(getLeaveDetails({token, employeeID}));
      const openCount = openLeavesCount({leaves: allLeaves?.payload});
      setOpenLeaves(openCount);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    token && updateData();
    // if (isFocussed) token && updateData();
  }, [employeeID, token]);

  return (
    <View style={{paddingHorizontal: 20}}>
      <View style={styles.container}>
        <Text style={styles.remainingText}>Manage Leaves</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Leaves', {
              screen: 'LeaveApplyScreen',
              // params: {leavesData},
            });
          }}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Apply</Text>
        </Pressable>
      </View>
      {remainingLeaves?.length === 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.white,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}>
          <Text
            style={{
              fontFamily: FontFamily.RobotoMedium,
              fontSize: 16,
              color: Colors.lightBlue,
              marginVertical: 4,
            }}>
            No remaining leaves found.
          </Text>
        </View>
      ) : (
        <View style={styles.leavesContainer}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View>
              {earnedLeavesData && earnedLeavesData?.length
                ? barChartGraph({data: earnedLeavesData})
                : null}

              <Text
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  top: 200,
                  left: wp(19),
                  fontSize: 16,
                  fontFamily: FontFamily.RobotoLight,
                  marginTop: hp(0.5),
                }}>
                Earned Leave
              </Text>
            </View>
            <View>
              {restrictedLeavesData?.length
                ? barChartGraph({data: restrictedLeavesData, rh: true})
                : null}
              <Text
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  bottom: 0,
                  top: 200,
                  right: 10,
                  fontSize: 16,
                  fontFamily: FontFamily.RobotoLight,
                  marginTop: hp(0.5),
                }}>
                Restricted Leave
              </Text>
            </View>
          </View>
          <View style={styles.leavesTypeContainer}>
            <View style={styles.leaveType}>
              <View style={styles.leavesType1}></View>
              <Text>Allocated</Text>
            </View>
            <View style={styles.leaveType}>
              <View style={styles.leavesType2}></View>
              <Text>Taken</Text>
            </View>
            <View style={styles.leaveType}>
              <View style={styles.leavesType3}></View>
              <Text>+ve Balance</Text>
            </View>
            {/* <View style={styles.leaveType}>
              <View style={styles.leavesType4}></View>
              <Text>-ve Balance</Text>
            </View> */}
          </View>
        </View>
      )}
    </View>
  );
};

const renderItem = ({item}) => {
  return (
    <>
      <View
        style={{
          height: hp(1.2),
          width: wp(2.8),
          marginTop: hp(0.5),
          marginHorizontal: wp(1.5),
          backgroundColor:
            item.text === 'Allocate'
              ? Colors.orange
              : item.text === 'Taken'
              ? Colors.darkBlue
              : item.text === '-ve Balance'
              ? Colors.red
              : Colors.green,
        }}></View>
      <Text
        style={{
          color:
            item.text === 'Allocate'
              ? Colors.orange
              : item.text === 'Taken'
              ? Colors.darkBlue
              : item.text === '-ve Balance'
              ? Colors.red
              : Colors.green,
        }}>
        {item.text}
      </Text>
    </>
  );
};
export default RemainingLeaves;

// import React from 'react';
// import Plotly from 'react-native-plotly';
// export default () => {
//   const layout = {
//     xaxis: {
//       type: 'category',
//       title: 'Earned Leave',
//       showticklabels: false,
//       fixedrange: true,
//     },
//     yaxis: {
//       linecolor: '#636363',
//       showgrid: false,
//       zeroline: false,
//       showline: true,
//       fixedrange: true,
//     },
//   };
//   var trace1 = {
//     type: 'bar',
//     x: [1, 2, 3, 4, 7],
//     y: [5, 10, 2, 5, 8],
//     marker: {
//       color: '#C8A2C8',
//       line: {
//         width: 2.5,
//       },
//       height: 200,
//     },
//   };
//   var data = [trace1];
//   return (
//     <Plotly
//       data={data}
//       config={{
//         dragMode: false,
//         scrollZoom: false,
//         displayModeBar: false,
//       }}
//       enableFullPlotly={true}
//       layout={layout}
//     />
//   );
// };
