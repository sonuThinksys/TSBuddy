import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, Image, StyleSheet} from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import {Colors} from 'colors/Colors';
import reactotron from 'reactotron-react-native';
import NetInfo from '@react-native-community/netinfo';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {FontFamily} from 'constants/fonts';
import Loader from 'component/loader/Loader';

const checkInternetConnection = async () => {
  const netInfoState = await NetInfo.fetch();
  return netInfoState.isConnected;
};

const App = () => {
  if (__DEV__) {
    const yeOldeConsoleLog = console.log;
    console.log = (...args) => {
      yeOldeConsoleLog(...args);
      reactotron.display({
        name: 'CONSOLE.LOG',
        value: args,
        preview:
          args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
      });
    };
  }

  const [isInternedConnected, setIsInternedConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const isConnected = await checkInternetConnection();
      setIsLoading(false);
      setIsInternedConnected(isConnected);
    })();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isInternedConnected) {
    return (
      <View style={styles.noInternetMainContainer}>
        <Image source={MonthImages.NotFound} style={styles.image} />
        <Text style={styles.noInternerText}>
          Please turn on your Internet connection.
        </Text>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.mainContainer} />
      <MainNavigator />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0,
    backgroundColor: Colors.whitishBlue,
  },
  noInternetMainContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 120,
    width: 160,
  },
  noInternerText: {
    fontSize: 16,
    fontFamily: FontFamily.RobotoBold,
  },
});
