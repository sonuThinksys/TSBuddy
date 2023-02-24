import * as React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {MonthImages} from 'assets/monthImage/MonthImage';
export default function SalaryPdf() {
  const [increment, setIncrement] = React.useState(0);
  console.log('increment:---------------------------', increment);
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'black',
          height: 100,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            setIncrement(increment + 1);
          }}>
          <Image
            source={MonthImages.plus}
            style={{height: 30, width: 30, marginRight: 20}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIncrement(increment - 1);
          }}>
          <Image source={MonthImages.minus} style={{height: 30, width: 30}} />
        </TouchableOpacity>
      </View>
      <Text>ReactNativeZoomableView</Text>
      <View style={{borderWidth: 5, flexShrink: 1, height: 500, width: 310}}>
        <ReactNativeZoomableView
          maxZoom={30}
          // Give these to the zoomable view so it can apply the boundaries around the actual content.
          // Need to make sure the content is actually centered and the width and height are
          // dimensions when it's rendered naturally. Not the intrinsic size.
          // For example, an image with an intrinsic size of 400x200 will be rendered as 300x150 in this case.
          // Therefore, we'll feed the zoomable view the 300x150 size.
          contentWidth={300}
          contentHeight={150}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            source={MonthImages.BirthdayImage}
          />
        </ReactNativeZoomableView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

// export default SalaryPdf;
