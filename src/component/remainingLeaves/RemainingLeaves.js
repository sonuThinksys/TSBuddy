import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

import {BarChart, LineChart} from 'react-native-chart-kit';

import styles from './RemainingLeavesStyles';
import {Colors} from 'colors/Colors';
import {useSelector} from 'react-redux';
const RemainingLeaves = () => {
  const {isGuestLogin: isGuestLogin} = useSelector(state => state.auth);
  const {leaveMenuDetails: {remainingLeaves = []} = {}} = useSelector(
    state => state.home,
  );

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

  const totalEarnedTypesAvailable = earnedLeavesData.length;
  const totalRestrictedTypesAvailable = restrictedLeavesData.length;

  const barChartGraph = ({data, rh}) => {
    return (
      <BarChart
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
                () => Colors.orange,
                () => Colors.darkBlue,
                () => Colors.green,
                () => Colors.red,
              ],
            },
          ],
        }}
        width={
          rh
            ? Dimensions.get('window').width * 0.44
            : Dimensions.get('window').width * 0.5
        }
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#f1f3f5',
          backgroundGradientTo: '#f1f3f5',
          decimalPlaces: 0,
          fillShadowGradientOpacity: '0.5',
          barPercentage: !rh
            ? totalEarnedTypesAvailable === 3
              ? 0.72
              : 0.56
            : totalRestrictedTypesAvailable === 3
            ? 0.72
            : 0.56,
          color: (opacity = 1) =>
            Colors.customColor({opacity, r: 0, g: 0, b: 0}),
          style: {
            borderRadius: 0,
          },
        }}
        style={{
          marginVertical: 10,
        }}
      />
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.remainingText}>Remaining Leaves</Text>
      </View>
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
        <View style={styles.leaveType}>
          <View style={styles.leavesType4}></View>
          <Text>-ve Balance</Text>
        </View>
      </View>
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
