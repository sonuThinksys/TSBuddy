import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
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
      id: '1',
    },
    {
      text: 'Taken',
      id: '2',
    },
    {
      text: '-ve Balance',
      id: '3',
    },
    {
      text: '+ve Balance',
      id: '4',
    },
  ];

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

  return (
    <View style={{height: hp(30)}}>
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Remaining Leaves</Text>
      </View>

      <View style={styles.plotlyContainer}>
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

      <View style={styles.flatlistView}>
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
const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    backgroundColor: '#C3F8FF',
    marginVertical: hp(1),
  },
  plotlyContainer: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  flatlistView: {
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    backgroundColor: 'white',
    paddingVertical: hp(1),
  },
});
export default RemainingLeaves;
