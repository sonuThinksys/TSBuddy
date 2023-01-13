import React from 'react';
import {View, Text, Dimensions, Image, FlatList} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
} from 'react-native-chart-kit';
import Plotly from 'react-native-plotly';
import RefreshImage from 'assets/allImage/refresh.imageset/refresh.png';

const RemainingLeaves = () => {
  const leavesData = [
    {
      text: 'Allocate',
      id: 1,
    },
    {
      text: 'Taken',
      id: 2,
    },
    {
      text: '-ve Balance',
      id: 3,
    },
    {
      text: '+ve Balance',
      id: 4,
    },
  ];

  // var trace1 = {
  //   type: 'bar',
  //   x: [1, 2, 3],
  //   y: [1, 2, 1],
  //   marker: {
  //     color: ['orange', '#0E5E6F', 'green'],
  //     line: {
  //       width: 2.5,
  //       color: 'white',
  //     },
  //   },
  // };
  // var data = [trace1];
  // var layout = {
  //   autosize: false,
  //   width: 200,
  //   height: 300,
  //   scrollZoom: false,
  //   displayModeBar: false,
  //   margin: {
  //     l: 50,
  //     r: 50,
  //     b: 100,
  //     t: 100,
  //     pad: 4,
  //   },
  // };

  const layout = {
    modebardisplay: false,
    showlegend: false,
    xaxis: {
      type: 'category',
      title: 'Earned Leave',
      showticklabels: false,
      fixedrange: true,
    },
    yaxis: {
      linecolor: '#636363',
      showgrid: false,
      zeroline: false,
      showline: true,
      fixedrange: true,
    },
    autosize: false,
    width: 200,
    height: 300,
    scrollZoom: false,
    displayModeBar: false,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4,
    },
  };
  var trace1 = {
    type: 'bar',
    x: [1, 2, 3, 4],
    y: [5, 4, 9, 3],
    marker: {
      color: ['orange', '#0E5E6F', 'green', 'red'],
      line: {
        color: 'white',
        width: 2.5,
      },
      height: 200,
    },
  };
  var data = [trace1];
  // const config = {
  //   displayModeBar: false, // this is the line that hides the bar.
  //   scrollZoom: false,
  // };

  const config = {
    dragMode: false,
    scrollZoom: false,
    displayModeBar: false,
  };
  // return (
  //   <Plotly
  //     data={data}
  //     layout={layout}
  //     config={config}
  //     // width={Dimensions.get('window').width / 2}
  //     // enableFullPlotly={false}
  //     // responsive={false}
  //   />
  // );

  return (
    <View style={{height: hp(30)}}>
      <View
        style={{
          paddingVertical: hp(1),
          paddingHorizontal: wp(3),
          backgroundColor: '#C3F8FF',
          marginVertical: hp(1),
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Remaining Leaves</Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
        }}>
        <Plotly
          data={data}
          layout={layout}
          config={config}
          // width={Dimensions.get('window').width / 2}
          // enableFullPlotly={false}
          // responsive={false}
        />
        <Plotly
          data={data}
          layout={layout}
          config={config}
          // width={Dimensions.get('window').width / 2}
        />
      </View>
      {/* <View
        style={{
          paddingHorizontal: wp(10),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}>
        <Text style={{fontSize: 13, opacity: 0.7}}>Earned Leave</Text>
        <Text style={{fontSize: 13, opacity: 0.7}}>Restricted Leave</Text>
      </View> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingHorizontal: wp(5),
          backgroundColor: 'white',
          // justifyContent: 'space-around',
          paddingVertical: hp(1),
        }}>
        <FlatList
          data={leavesData}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
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
