import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

import {BarChart} from 'react-native-chart-kit';

const RemainingLeaves = () => {
  const earnedLeavesData = [20, 6, 14, 4];
  const restrictedLeavesData = [20, 6, 14];
  const totalEarnedTypesAvailable = earnedLeavesData.length;
  const totalRestrictedTypesAvailable = restrictedLeavesData.length;

  return (
    <View>
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Remaining Leaves</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={{}}>
          <BarChart
            segments={4}
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
                  data: earnedLeavesData,
                  colors: [
                    () => 'orange',
                    () => '#0E5E6F',
                    () => 'green',
                    () => 'red',
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width * 0.48}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#f1f3f5',
              backgroundGradientTo: '#f1f3f5',
              decimalPlaces: 0,
              fillShadowGradientOpacity: '0.5',
              barPercentage: totalEarnedTypesAvailable === 3 ? 0.8 : 0.64,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 0,
              },
            }}
            style={{
              marginVertical: 10,
              // borderColor: 'red',
              // borderWidth: 1,
              // marginRight: 4,
              // padding: 5,
              // paddingLeft: -20,
              // paddingRight: 40,
            }}
          />

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
          <BarChart
            segments={4}
            spacingInner={0}
            flatColor={true}
            showValuesOnTopOfBars={true}
            // withCustomBarColorFromData={true}
            showBarTops={false}
            withInnerLines={false}
            fromZero={true}
            withVerticalLabels={false}
            withCustomBarColorFromData={true}
            data={{
              datasets: [
                {
                  data: restrictedLeavesData,
                  colors: [
                    () => 'orange',
                    () => '#0E5E6F',
                    () => 'green',
                    () => 'red',
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width * 0.48}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#f1f3f5',
              backgroundGradientTo: '#f1f3f5',
              decimalPlaces: 0,
              fillShadowGradientOpacity: '0.5',
              barPercentage: totalRestrictedTypesAvailable === 3 ? 0.8 : 0.64,

              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 0,
              },
            }}
            style={{
              marginVertical: 10,
              marginLeft: 0,
              // borderRadius: 16,

              marginRight: 4,
              // paddingRight: 0,
              // borderColor: 'blue',
              // borderWidth: 1,
            }}
          />
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
          <Text>-ve Balance</Text>
        </View>
        <View style={styles.leaveType}>
          <View style={styles.leavesType4}></View>
          <Text>+ve Balance</Text>
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
              ? 'orange'
              : item.text === 'Taken'
              ? '#0E5E6F'
              : item.text === '-ve Balance'
              ? 'red'
              : 'green',
        }}></View>
      <Text
        style={{
          color:
            item.text === 'Allocate'
              ? 'orange'
              : item.text === 'Taken'
              ? '#0E5E6F'
              : item.text === '-ve Balance'
              ? 'red'
              : 'green',
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    backgroundColor: '#C3F8FF',
    marginTop: hp(1),
  },
  leavesTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leaveType: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    justifyContent: 'space-around',
    paddingRight: 10,
    // paddingHorizontal: 10,
    // minWidth: wp(20),
  },
  leavesType1: {
    height: 12,
    width: 12,
    backgroundColor: 'orange',
    marginRight: 5,
  },
  leavesType2: {
    height: 12,
    width: 12,
    backgroundColor: '#0E5E6F',
    marginRight: 5,
  },
  leavesType3: {
    height: 12,
    width: 12,
    backgroundColor: 'green',
    marginRight: 5,
  },
  leavesType4: {
    height: 12,
    width: 12,
    backgroundColor: 'red',
    marginRight: 5,
  },
  leaveTextColor: {},
});
