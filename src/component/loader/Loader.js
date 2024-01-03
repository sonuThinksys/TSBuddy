import {Colors} from 'colors/Colors';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
// import AnimatedLoader from 'react-native-animated-loader';
// import ProgressLoader from 'rn-progress-loader';
const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loaderBackground} />
      <ActivityIndicator size="large" />
    </View>
  );

  // <View style={styles.fullContentLoaderContainer}>
  //         <ActivityIndicator size="large" color={Colors.dune} />
  //       </View>
  // return (
  //   <ProgressLoader
  //     barHeight={100}
  //     visible={true}
  //     isModal={true}
  //     isHUD={true}
  //     hudColor={Colors.bluishGreen}
  //     color={Colors.white}>
  //     <Text style={{color: Colors.white}}>Loading..</Text>
  //   </ProgressLoader>
  // );

  // return (
  //   <AnimatedLoader
  //     visible={visible}
  //     animationStyle={styles.lottie}
  //     overlayColor={Colors.black}
  //     speed={1}>
  //     <Text style={{fontSize: 18, fontWeight: 'bold'}}>Loading...</Text>
  //   </AnimatedLoader>
  // );
};

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
    opacity: 0.5,
  },
});
