import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {MonthImages} from 'assets/monthImage/MonthImage';

//import PhotoView from 'react-native-photo-view-ex';
//import PDFReader from 'rn-pdf-reader-js';
import Pdf from 'react-native-pdf';
import {Colors} from 'colors/Colors';
export default function SalaryPdf() {
  const [increment, setIncrement] = React.useState(0);
  console.log('increment:---------------------------', increment);
  const source = {
    uri: 'https://www.africau.edu/images/default/sample.pdf',
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        // onPageChanged={(page, numberOfPages) => {
        //   console.log(`Current page: ${page}`);
        // }}
        // onError={error => {
        //   console.log(error);
        // }}
        // onPressLink={uri => {
        //   console.log(`Link pressed: ${uri}`);
        // }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.lightBlue,
  },
  pdf: {
    marginRight: 20,
    marginLeft: 10,
    marginVertical: 10,

    // flex: 1,
    // height: hp(10),
    // width: wp(10),
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

// export default SalaryPdf;
