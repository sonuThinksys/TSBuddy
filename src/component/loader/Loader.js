import {Colors} from 'colors/Colors';
import React from 'react';
import {Text} from 'react-native';
// import AnimatedLoader from 'react-native-animated-loader';
// import Modal from 'react-native-modal';
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
