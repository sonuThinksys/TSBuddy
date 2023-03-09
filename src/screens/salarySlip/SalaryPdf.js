import * as React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

import Pdf from 'react-native-pdf';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';
const SalaryPdf = () => {
  return (
    <View style={styles.container}>
      <Pdf
        source={MonthImages.BirthdayImage}
        onLoadComplete={(numberOfPages, filePath) => {}}
        style={styles.pdf}
      />
    </View>
  );
};

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

export default SalaryPdf;
