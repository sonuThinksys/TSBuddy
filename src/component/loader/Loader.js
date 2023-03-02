import {Colors} from 'colors/Colors';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import Modal from 'react-native-modal';
import ProgressLoader from 'rn-progress-loader';
const Loader = () => {
  return (
    // <View
    //   style={{
    //     backgroundColor: '#06566e',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: 100,
    //     width: 100,
    //     justifyContent: 'center',
    //   }}>
    <ProgressLoader
      barHeight={100}
      visible={true}
      isModal={true}
      isHUD={true}
      hudColor={'#06566e'}
      color={Colors.white}>
      <Text style={{color: 'white'}}>Loading..</Text>
    </ProgressLoader>
    // </View>
  );

  return (
    <AnimatedLoader
      visible={visible}
      animationStyle={styles.lottie}
      overlayColor="blue"
      speed={1}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>Loading...</Text>
    </AnimatedLoader>
  );
};
const styles = StyleSheet.create({
  lottie: {
    width: 30,
    height: 30,
    backgroundColor: 'black',
  },
});
export default Loader;
