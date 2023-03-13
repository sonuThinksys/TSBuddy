import {Colors} from 'colors/Colors';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import Modal from 'react-native-modal';
import ProgressLoader from 'rn-progress-loader';
const Loader = () => {
  return (
    <ProgressLoader
      barHeight={100}
      visible={true}
      isModal={true}
      isHUD={true}
      hudColor={Colors.bluishGreen}
      color={Colors.white}>
      <Text style={{color: Colors.white}}>Loading..</Text>
    </ProgressLoader>
  );

  return (
    <AnimatedLoader
      visible={visible}
      animationStyle={styles.lottie}
      overlayColor={Colors.black}
      speed={1}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>Loading...</Text>
    </AnimatedLoader>
  );
};
const styles = StyleSheet.create({
  lottie: {
    width: 30,
    height: 30,
    backgroundColor: Colors.black,
  },
});
export default Loader;
